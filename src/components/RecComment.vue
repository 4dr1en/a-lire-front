<template>
  <div class="comment">
    <p class="article__comment__author">
      <span>{{ comment.id }}</span>
      par {{ comment.written_by.username }} le
      <span class="article__comment__date">{{ comment.created_at }}</span>
    </p>
    <p class="article__comment__text">{{ comment.text }}</p>
    <CommentForm :article="article" :parentComment="comment" />
    <div
      class="comment__children"
      v-if="comment.children_comments && comment.children_comments.length"
    >
      <RecComment
        :comment="child"
        :article="article"
        v-for="child in comment.children_comments"
        :key="child.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CommentForm from '../components/forms/CommentForm.vue';
import type { ImbricatedCommentI } from '../interfaces/commentI';
import type Article from '../interfaces/articleFullI';

const props = defineProps<{
  comment: ImbricatedCommentI;
  article: Article;
}>();

const comment = ref(props.comment);
</script>

<style lang="scss" scoped>
.comment__children {
  margin-left: 0.8rem;
  padding-left: 0.6rem;
  border-left: 1px solid rgb(97, 97, 97);
}
</style>
