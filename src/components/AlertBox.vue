<template>
  <div class="alert-box" :class="alertBoxClasses" v-if="show">
    <div class="alert-box__content">
      <slot></slot>
    </div>
    <button class="alert-box__close" @click="closeAlert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { toRef, computed } from 'vue';

const props = defineProps<{
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
}>();

const show = toRef(props, 'show');

const emit = defineEmits(['close']);

const closeAlert = () => {
  emit('close');
  show.value = false;
};

const alertBoxClasses = computed(() => {
  return {
    'alert-box--success': props.type === 'success',
    'alert-box--error': props.type === 'error',
    'alert-box--warning': props.type === 'warning',
    'alert-box--info': props.type === 'info',
  };
});
</script>

<style lang="scss" scoped>
.alert-box {
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.alert-box--success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.alert-box--error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.alert-box--warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.alert-box--info {
  background-color: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
}
</style>
