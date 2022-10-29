<script setup lang="ts">
import MainMenu from '@/components/MainMenu.vue';
</script>

<template>
  <header>
    <h1>hello world</h1>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <MainMenu />
  </header>
  <RouterView />
</template>

<style scoped lang="scss"></style>
