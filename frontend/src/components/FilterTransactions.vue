<script setup lang="ts">
import { useFilterTransactionsStore } from '../stores/FilterTransactionsStore';
import Dropdown from './Dropdown.vue';

const filterTransactionsStore = useFilterTransactionsStore();
</script>

<template>
  <h2 class="title">Filter Transactions</h2>
  <div class="sort-by">
    <label for="sort-by">Sort by:</label>
    <dropdown
      v-model="filterTransactionsStore.sortBy"
      :options="{
        Date: ['Newest', 'Oldest'],
        Amount: ['Largest', 'Smallest'],
      }"
    />
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
}
</style>
