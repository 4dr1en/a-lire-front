<template>
  <div>
    <h1>{{ flux.title }}</h1>
    <p>{{ flux.description }}</p>
    <date v-if="flux.created_at">créé le : {{ flux.created_at }}</date>
    <div>
      <ul>
        <li v-for="article in flux.articles" :key="article.id" class="card-article">
          <router-link :to="'/articles/' + article.id">
            <h2 class="card-article__title">{{ article.title }}</h2>
            <img
              class="card-article__thumbnail"
              v-if="article.thumbnail"
              :src="article.thumbnail"
              :alt="article.title"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type Article from '../interfaces/fluxFullI';
import { useRouter, useRoute } from 'vue-router';

const flux: Ref<Article> = ref({
  id: 0,
  title: '',
  description: '',
  slug: '',
  created_at: '',
  updated_at: null,
  created_by: '',
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

<style lang="scss" scoped>
.card-article__thumbnail {
  width: 400px;
}
</style>
