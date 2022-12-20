<template>
  <div class="article">
    <h1 class="article__title">{{ article.id }} {{ article.title }}</h1>
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
    <div class="article__comments">
      <h2>Commentaires</h2>
      <RecComment
        :comment="comment"
        v-for="comment in imbricatedComments"
        :key="comment.id"
      />
    </div>
    <CommentForm :article="article" v-if="article.id" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type Article from '../interfaces/articleFullI';
import type { ImbricatedCommentI } from '../interfaces/commentI';
import { useRouter, useRoute } from 'vue-router';
import CommentForm from '../components/forms/CommentForm.vue';
import RecComment from '@/components/RecComment.vue';
import orderComments from '@/services/orderComments';

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

const imbricatedComments: Ref<ImbricatedCommentI[]> = ref([]);

onMounted(() => {
  getArticle();
});

function getArticle() {
  const $route = useRoute();
  fetch('http://localhost:80/articles/' + $route.params.id)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      article.value = json.article;
      imbricatedComments.value = orderComments(json.article.comments);
    });
}
</script>

<style lang="scss" scoped>
.article__thumbnail {
  max-width: 500px;
}

.article__comment {
  border-top: 1px solid grey;
}
</style>
