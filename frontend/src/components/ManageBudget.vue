<script setup lang="ts">
import ModalBorder from './ModalBorder.vue';
import EditBudgetCategory from './EditBudgetCategory.vue';
import { SquarePlus } from 'lucide-vue-next';

import { ref } from 'vue';
import { Budget } from '../types';

const rows = ref<Partial<Budget>[]>([]);

const addBudgetRow = () => {
  rows.value.push({});
};
</script>

<template>
  <modal-border>
    <div class="modal-content">
      <h2 class="title">Your Budget</h2>
      <button class="menu-button add-button" @click="addBudgetRow">
        <SquarePlus /> New
      </button>
      <div v-for="(row, index) in rows" :key="index">
        <edit-budget-category />
      </div>
    </div>
  </modal-border>
</template>

<style scoped>
.modal-content {
  padding: 30px;
  width: 600px;
  box-sizing: border-box;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100px;
  padding: 10px;
}
</style>
