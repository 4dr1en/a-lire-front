<template>
  <div>
    <form id="comment-form" @submit.prevent="submitCommentForm">
      <textarea
        id="comment.content"
        cols="30"
        rows="10"
        v-model="comment.text"
      ></textarea>
      <input type="submit" value="Envoyer" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import type { Ref } from 'vue';
import type Article from '../../interfaces/articleFullI';

const userStore = useUserStore();

const props = defineProps<{ article: Article }>();

const comment: Ref<{
  text: string;
  article: number;
}> = ref({
  text: '',
  article: props.article.id,
});

function submitCommentForm() {
  const fetchParam = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userStore.user.token}`,
    }),
    body: JSON.stringify(comment.value),
  };

  fetch('http://localhost:80/user/create_comment', fetchParam)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
    });
}
</script>

<style scoped></style>
