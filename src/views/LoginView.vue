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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const login = ref("");
const password = ref("");

const sendLogin = () => {
  try {
    fetch("http://localhost:80/api/login_check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo: login.value,
        password: password.value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res);
        }
      })
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.log(error + 2);
  }
};

</script>

<style scoped></style>
