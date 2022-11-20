<template>
  <div>
    <h1>Register</h1>
    <form>
      <div class="fielgroup">
        <div class="field-error" v-if="formError.login">
          <p>{{ formError.login }}</p>
        </div>
        <label for="login">Login</label>
        <input type="text" id="login" v-model="login" />
      </div>
      <div class="fielgroup">
        <div class="field-error" v-if="formError.email">
          <p>{{ formError.email }}</p>
        </div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="fieldgroup">
        <div class="field-error" v-if="formError.password">
          <p>{{ formError.password }}</p>
        </div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" @click.prevent="sendRegister">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const login = ref('');
const email = ref('');
const password = ref('');

const formError = reactive({
  login: '',
  email: '',
  password: '',
});

const sendRegister = () => {
  fetch('http://localhost:80/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: login.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        res.json().then((jsonErrors) => {
          if (!('errors' in jsonErrors)) {
            return;
          }
          const error = jsonErrors.errors;
          if (error.username) {
            formError.login = jsonErrors.errors.username;
          }
          if (error.email) {
            formError.email = jsonErrors.errors.email;
          }
          if (error.password) {
            formError.password = jsonErrors.errors.password;
          }
        });
      }
    })
    .then((json) => {
      for (const key in formError) {
        formError[key as keyof typeof formError] = '';
      }

      if (json?.token) {
        const userStore = useUserStore();
        userStore.setToken(json.token);
        userStore.setLogin(login.value);
        userStore.setEmail(email.value);
        console.log(`${userStore.user.login} is  now registred`);
        router.push('/');
      }
    });
};
</script>

<style scoped>
.fielgroup {
}

.field-error {
  color: rgb(241, 90, 90);
}
</style>
