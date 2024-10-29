<script setup lang="ts">
import BudgetCategory from './BudgetCategory.vue';
import { useUserStore } from '../stores/UserStore';

const userStore = useUserStore();
</script>

<template>
  <div class="budget-breakdown">
    <budget-category
      v-for="budget in userStore.user.budgets"
      :key="budget._id"
      :category="userStore.user.categories.find(category => category._id === budget.categoryID)!.name"
    />
  </div>
</template>

<style scoped></style>
