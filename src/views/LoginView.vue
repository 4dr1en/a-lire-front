<template>
  <div>
    <h1>Login</h1>
    <form>
      <label for="login">Login</label>
      <input type="text" id="login" v-model="login" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button type="submit" @click.prevent="sendLogin">Login</button>
    </form>

    <AlertBox :type="popupType" :show="showPopup" @close="showPopup = false">{{
      popupTxt
    }}</AlertBox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AlertBox from '@/components/AlertBox.vue';
import { useUserStore } from '@/stores/user';

const login = ref('');
const password = ref('');

const showPopup = ref(false);
const popupTxt = ref('');
const popupType = ref<'success' | 'error'>('success');

const sendLogin = () => {
  fetch('http://localhost:80/api/login_check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pseudo: login.value,
      password: password.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => {
      if ('token' in data) {
        finalizeConnection(data);
      } else {
        throw new Error('No token in response');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      showErrors(error);
    });
};

const showErrors = (error: unknown) => {
  popupType.value = 'error';
  if (error instanceof Error) {
    popupTxt.value = error.message;
    showPopup.value = true;
  }
  if (error instanceof Response) {
    error.json().then((data) => {
      popupTxt.value = data.message;
      showPopup.value = true;
    });
  }
};

const finalizeConnection = (data: { token: string }) => {
  const userStore = useUserStore();
  userStore.setToken(data.token);
  userStore.setLogin(login.value);
  console.log(`${userStore.user.login} is now connected `);
  popupTxt.value = 'You are now connected';
  showPopup.value = true;
  popupType.value = 'success';
};
</script>

<style scoped></style>
