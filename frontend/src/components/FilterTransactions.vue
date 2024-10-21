<script setup lang="ts">
import { useFilterTransactionsStore } from '../stores/FilterTransactionsStore';
import { useUserStore } from '../stores/UserStore';
import Dropdown from './Dropdown.vue';
import { computed } from 'vue';

const filterTransactionsStore = useFilterTransactionsStore();
const userStore = useUserStore();

const categories = computed(() => userStore.user.categories);

const expenseCategories = computed(() =>
  categories.value.filter((category) => category.type === 'expense')
);

const incomeCategories = computed(() =>
  categories.value.filter((category) => category.type === 'income')
);
</script>

<template>
  <h2 class="title">Filter Transactions</h2>
  <div class="search">
    <input
      class="form-input"
      type="text"
      v-model="filterTransactionsStore.searchQuery"
      placeholder="Search transactions"
    />
  </div>
  <div class="sort-filter-row">
    <div class="sort-by">
      <label for="sort-by" class="filter-label">Sort by</label>
      <dropdown
        v-model="filterTransactionsStore.sortBy"
        :options="{
          Date: ['Newest', 'Oldest'],
          Amount: ['Largest', 'Smallest'],
        }"
      />
    </div>
    <div class="filter-by">
      <label for="filter-by" class="filter-label">Category</label>
      <dropdown
        v-model="filterTransactionsStore.filterByCategory"
        :options="{
          All: ['Show all'],
          Expenses: expenseCategories.map((c) => c.name),
          Income: incomeCategories.map((c) => c.name),
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
}

.search {
  margin-bottom: 25px;
}

.sort-filter-row {
  display: flex;
  justify-content: space-between;
  gap: 25px;
}

.form-input {
  border: 2px solid #ffffff80;
  border-radius: 5px;
}

.sort-by,
.filter-by {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 10px;
}
</style>
