<script setup lang="ts">
import Dropdown from './Dropdown.vue';
import { useUserStore } from '../stores/UserStore';
import { computed, ref } from 'vue';

const props = defineProps({
  category: String,
  budgetAmount: Number,
});

const categoryName = ref(props.category ?? '');
const amount = ref(props.budgetAmount ?? '');

const userStore = useUserStore();

const categories = computed(() => userStore.user.categories);

const expenseCategories = computed(() =>
  categories.value.filter((category) => category.type === 'expense')
);

const incomeCategories = computed(() =>
  categories.value.filter((category) => category.type === 'income')
);

const formatAmount = (value: string) => {
  // Remove any non-digit characters
  const digitsOnly = value.replace(/\D/g, '');

  // If the input is empty or invalid, return an empty string
  if (!digitsOnly) {
    return '';
  }

  // Format as currency
  const formatted = (parseInt(digitsOnly) / 100).toFixed(2);

  // Add commas
  const parts = formatted.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
</script>

<template>
  <div class="budget-wrapper">
    <dropdown
      class="budget-category-dropdown"
      :options="{
        Expenses: expenseCategories.map((c) => c.name),
        Income: incomeCategories.map((c) => c.name),
      }"
      v-model="categoryName"
    />
    <input class="form-input" type="text" v-model="amount" placeholder="0.00" />
  </div>
</template>

<style scoped>
.budget-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.budget-category-dropdown {
  width: 100%;
}
</style>
