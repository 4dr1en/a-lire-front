<template>
  <div class="article">
    <h1 class="article__title">{{ article.title }}</h1>
    <img
      class="article__thumbnail"
      v-if="article.thumbnail"
      :src="article.thumbnail"
      :alt="article.title"
    />
    <p class="article__description" v-if="article.description">
      {{ article.description }}
    </p>
    <div class="article__metas">
      <p class="article__author" v-if="article.created_by.username">
        par {{ article.created_by.username }}
      </p>
      <p class="article__date" v-if="article.created_at">le {{ article.created_at }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type Article from '../interfaces/articleFullI';
import { useRouter, useRoute } from 'vue-router';

const article: Ref<Article> = ref({
  id: 0,
  url: '',
  title: '',
  thumbnail: '',
  status: '',
  created_at: '',
  belong_to: 0,
  description: '',
  updated_at: '',
  moderated_at: '',
  created_by: {
    id: 0,
    username: '',
  },
  comments: [],
});

onMounted(() => {
  getArticle();
});

function getArticle() {
  const $route = useRoute();
  console.warn($route.params.id);
  fetch('http://localhost:80/articles/' + $route.params.id)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      article.value = json.article;
    });
}
</script>

<style lang="scss" scoped>
.article__thumbnail {
  max-width: 500px;
}
</style>
