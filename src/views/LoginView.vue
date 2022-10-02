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

    <AlertBox type="info" :show="showError" @close="showError = false">{{
      errorTxt
    }}</AlertBox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AlertBox from '@/components/AlertBox.vue';

const login = ref('');
const password = ref('');

const showError = ref(false);
const errorTxt = ref('');

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
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      showErrors(error);
    });
};

const showErrors = (error: unknown) => {
  if (error instanceof Error) {
    console.log('error instanceof Error');
    console.log(error.message);
    errorTxt.value = error.message;
    showError.value = true;
  }
  if (error instanceof Response) {
    console.log('error instanceof Response');
    error.json().then((data) => {
      console.log(data);
      errorTxt.value = data.message;
      showError.value = true;
    });
  }
};
</script>

<style scoped></style>
