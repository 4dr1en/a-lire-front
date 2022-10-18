<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
</script>

<style lang="scss" scoped></style>
