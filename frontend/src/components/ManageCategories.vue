<script setup lang="ts">
import { useUserStore } from '../stores/UserStore';

const userStore = useUserStore();
const categories = userStore.user.categories;
</script>

<template>
  <h2 class="title">Manage Categories</h2>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
}
</style>
