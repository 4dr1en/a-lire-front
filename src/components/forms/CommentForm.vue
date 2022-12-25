<template>
  <div v-if="userStore.isLoggedIn">
    <button
      v-if="parentComment !== undefined"
      class="article__comment__reply-btn"
      @click="showReplyForm = !showReplyForm"
    >
      Répondre
    </button>
    <form
      v-if="showReplyForm || parentComment === undefined"
      id="comment-form"
      @submit.prevent="submitCommentForm"
    >
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
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import type { Ref } from 'vue';
import type Article from '../../interfaces/articleFullI';
import type CommentI from '../../interfaces/commentI';

const showReplyForm: Ref<boolean> = ref(false);
const userStore = useUserStore();

const props = defineProps<{
  article: Article;
  parentComment?: CommentI;
}>();

const comment: Ref<{
  text: string;
  article: number;
  parentComment: number | null;
}> = ref({
  text: '',
  article: props.article.id,
  parentComment: props.parentComment ? props.parentComment.id : null,
});

watch(
  () => props.article,
  (newVal) => {
    comment.value.article = newVal.id;
  }
);

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
