<template>
  <div>
    <h1>Register</h1>
    <form>
      <label for="login">Login</label>
      <input type="text" id="login" v-model="login" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button type="submit" @click="sendRegister">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const login = ref("");
const email = ref("");
const password = ref("");

const sendRegister = () => {
  console.log("register", login.value, email.value, password.value);
};

</script>


<style scoped></style>
