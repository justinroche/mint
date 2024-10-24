<script setup lang="ts">
import ModalBorder from './ModalBorder.vue';
import EditBudgetCategory from './EditBudgetCategory.vue';
import { SquarePlus } from 'lucide-vue-next';
import { useUserStore } from '../stores/UserStore';

import { ref } from 'vue';
import { Budget } from '../types';

const userStore = useUserStore();

const rows = ref<Partial<Budget>[]>(userStore.user.budgets);

const addBudgetRow = () => {
  rows.value.push({});
};

const removeBudgetRow = (index: number) => {
  rows.value = rows.value.filter((_, i) => i !== index);
};
</script>

<template>
  <modal-border>
    <div class="modal-content">
      <h2 class="title">Your Budget</h2>
      <button class="menu-button add-button" @click="addBudgetRow">
        <SquarePlus /> New
      </button>
      <div class="budget-rows">
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="edit-budget-category"
        >
          <edit-budget-category
            :category="row.categoryID"
            :budget-amount="row.amount"
            @delete="removeBudgetRow(index)"
          />
        </div>
      </div>
    </div>
  </modal-border>
</template>

<style scoped>
.modal-content {
  padding: 30px;
  width: 800px;
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
  margin-bottom: 10px;
}

.budget-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 450px;
  overflow-y: auto;
  border: 2px solid #ffffff80;
  padding: 10px;
  border-radius: 5px;
}
</style>
