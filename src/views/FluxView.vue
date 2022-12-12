<template>
  <div>
    <h1>{{ flux.title }}</h1>
    <p>{{ flux.description }}</p>
    <date>créé le : {{ flux.created_at }}</date>
    <div>
      <ul>
        <li v-for="article in flux.articles" :key="article.id">
          <h2>{{ article.title }}</h2>
          <img v-if="article.thumbnail" :src="article.thumbnail" :alt="article.title" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type Flux from '../interfaces/fluxFullI';
import { useRouter, useRoute } from 'vue-router';

const flux: Ref<Flux> = ref({
  id: 0,
  title: '',
  description: '',
  slug: '',
  created_at: '',
  updatedAt: null,
  createdBy: '',
  articles: [],
});

onMounted(() => {
  getFluxes();
});

function getFluxes() {
  const $route = useRoute();
  console.warn($route.params.id);
  fetch('http://localhost:80/fluxes/' + $route.params.id)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      flux.value = json.flux;
    });
}
</script>

<style scoped></style>
