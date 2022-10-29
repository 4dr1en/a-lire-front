<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
    </nav>
    <div v-if="isLoggedIn">
      <p>logged as {{ userStore.user.login }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const isLoggedIn = ref(userStore.isLoggedIn);
userStore.$subscribe(() => {
  isLoggedIn.value = userStore.isLoggedIn;
  console.log('isLoggedIn', isLoggedIn);
});

const logout = () => {
  userStore.logout();
};
</script>
<style lang="scss"></style>
