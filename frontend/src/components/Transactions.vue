<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/UserStore';

const userStore = useUserStore();

const transactions = computed(() => userStore.user.transactions);
const categories = computed(() => userStore.user.categories);
</script>

<template>
  <div v-for="transaction in transactions" :key="transaction._id">
    <div>{{ transaction.date }}</div>
    <div>{{ transaction.amount }}</div>
    <div>{{ transaction.description }}</div>
    <div>
      {{
        categories.find((category) => category._id === transaction.categoryId)
          ?.name
      }}
    </div>
  </div>
</template>

<style scoped></style>
