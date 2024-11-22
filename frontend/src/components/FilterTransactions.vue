<script setup lang="ts">
import { useFilterTransactionsStore } from '../stores/FilterTransactionsStore';
import { useUserStore } from '../stores/UserStore';
import { useShowModalStore } from '../stores/ShowModalStore';
import Dropdown from './Dropdown.vue';
import { computed } from 'vue';
import { Plus, Minus } from 'lucide-vue-next';

const filterTransactionsStore = useFilterTransactionsStore();
const userStore = useUserStore();
const showModalStore = useShowModalStore();

const categories = computed(() => userStore.user.categories);

const expenseCategories = computed(() =>
  categories.value.filter((category) => category.type === 'expense')
);

const incomeCategories = computed(() =>
  categories.value.filter((category) => category.type === 'income')
);

const toggleShowFilter = () => {
  showModalStore.showFilterTransactionsComponent =
    !showModalStore.showFilterTransactionsComponent;
};
</script>

<template>
  <div class="component-container">
    <div class="top-right">
      <button @click="toggleShowFilter" class="icon-button">
        <template v-if="showModalStore.showFilterTransactionsComponent">
          <Minus class="icon" :size="32" :stroke-width="3" />
        </template>
        <template v-else>
          <Plus class="icon" :size="32" :stroke-width="3" />
        </template>
      </button>
    </div>
    <h2 class="title">Filter Transactions</h2>
    <div
      class="component-body"
      v-if="showModalStore.showFilterTransactionsComponent"
    >
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
    </div>
  </div>
</template>

<style scoped>
.component-container {
  position: relative;
}

.top-right {
  position: absolute;
  top: 0;
  right: 0;
}

.icon-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-button:hover {
  color: #ffffffb0;
  transition: background-color 0.05s;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.component-body {
  margin-top: 20px;
}

.search {
  margin-bottom: 25px;
}

.sort-filter-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
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
