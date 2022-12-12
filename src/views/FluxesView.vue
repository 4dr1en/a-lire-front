<template>
  <div>
    <h1>liste des fluxes</h1>
    <ul>
      <li v-for="flux in fluxes" :key="flux.id">
        <router-link :to="'/fluxes/' + flux.slug">
          <h2>{{ flux.title }}</h2>
          <p>{{ flux.description }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type Flux from '../interfaces/fluxLightI';

const fluxes: Ref<Flux[]> = ref([]);

onMounted(() => {
  getFluxes();
});

function getFluxes() {
  fetch('http://localhost:80/fluxes')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      fluxes.value = json.fluxes;
    });
}
</script>

<style scoped></style>
