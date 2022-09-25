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
// pinia user store
import { useUserStore } from '@/stores/user';
// router
import { useRouter } from 'vue-router';

const login = ref('');
const email = ref('');
const password = ref('');

// form errors states
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
      pseudo: login.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        // read body
        res.json().then((jsonErrors) => {
          if (jsonErrors.pseudo) {
            formError.login = jsonErrors.errors.pseudo;
          }
          if (jsonErrors.email) {
            formError.email = jsonErrors.errors.email;
          }
          if (jsonErrors.password) {
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

        /**
         * TODO : redirect to home
         */
      }
    });
};
</script>

<style scoped>
.fielgroup {
}
</style>
