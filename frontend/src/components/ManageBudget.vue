<script setup lang="ts">
import ModalBorder from './ModalBorder.vue';
import { useShowModalStore } from '../stores/ShowModalStore';
import EditBudgetCategory from './EditBudgetCategory.vue';
import { SquarePlus } from 'lucide-vue-next';
import { useUserStore } from '../stores/UserStore';
import { computed, ref, watch } from 'vue';
import { Budget } from '../types';
import { updateBudgets } from '../clients/UserClient';

const userStore = useUserStore();
const showModalStore = useShowModalStore();
const rows = ref<Partial<Budget>[]>([]);
const usedCategories = ref<string[]>([]);

const budgetExpenseTotal = computed(() =>
  rows.value
    .filter((row) => row.amount !== undefined)
    .filter(
      (row) =>
        userStore.user.categories.find(
          (category) => category._id === row.categoryID
        )?.type === 'expense'
    )
    .reduce((acc, row) => acc + (row.amount || 0), 0)
    .toFixed(2)
);

const budgetIncomeTotal = computed(() =>
  rows.value
    .filter((row) => row.amount !== undefined)
    .filter(
      (row) =>
        userStore.user.categories.find(
          (category) => category._id === row.categoryID
        )?.type === 'income'
    )
    .reduce((acc, row) => acc + (row.amount || 0), 0)
    .toFixed(2)
);

const leftForSaving = computed(() => {
  const income = parseFloat(budgetIncomeTotal.value);
  const expenses = parseFloat(budgetExpenseTotal.value);
  return (income - expenses).toFixed(2);
});

rows.value = userStore.user.budgets.map((budget) => ({ ...budget }));

const addBudgetRow = () => {
  rows.value.push({ categoryID: '' });
};

const removeBudgetRow = (index: number) => {
  rows.value = rows.value.filter((_, i) => i !== index);
};

const updateBudgetRow = (index: number, updates: Partial<Budget>) => {
  rows.value[index] = { ...rows.value[index], ...updates };
};

const cancelEdit = () => {
  rows.value = userStore.user.budgets;
  showModalStore.showManageBudgetModal = false;
};

const saveChanges = async () => {
  if (rows.value.some((row) => !row.categoryID || row.amount === undefined)) {
    // TODO: Handle error more elegantly
    alert('Please fill out all fields');
    return;
  }

  const budgets = rows.value.map((row) => ({
    categoryID: row.categoryID,
    amount: row.amount,
  }));

  await updateBudgets(budgets as Budget[]);
  showModalStore.showManageBudgetModal = false;
};

const updateUsedCategories = () => {
  usedCategories.value = rows.value
    .filter((row) => row.categoryID)
    .map((row) => row.categoryID!);
};

watch(rows, updateUsedCategories, { deep: true });
</script>

<template>
  <modal-border>
    <div class="modal-content">
      <h2 class="title">Monthly Budget</h2>
      <div class="info-section">
        <button class="menu-button add-button" @click="addBudgetRow">
          <SquarePlus /> New
        </button>
      </div>
      <div class="budget-rows">
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="edit-budget-category"
        >
          <edit-budget-category
            :categoryID="row.categoryID"
            :budget-amount="row.amount"
            :used-categories="usedCategories"
            @update:categoryID="
              (val: string) => updateBudgetRow(index, { categoryID: val })
            "
            @update:amount="(val: number) => updateBudgetRow(index, { amount: val })"
            @delete="removeBudgetRow(index)"
          />
        </div>
      </div>
      <div class="budget-amounts">
        <span
          >Income: <strong>${{ budgetIncomeTotal }}</strong></span
        >
        <span
          >Expenses: <strong>${{ budgetExpenseTotal }}</strong></span
        >
        <span v-if="parseFloat(leftForSaving) > 0"
          >Left for saving:
          <strong class="isIncome">${{ leftForSaving }}</strong></span
        >
        <span v-else
          >Loss:
          <strong class="isLoss"
            >${{ Math.abs(parseFloat(leftForSaving)) }}</strong
          ></span
        >
      </div>
      <div class="submit-section">
        <button class="menu-button cancel-button" @click="cancelEdit">
          Cancel
        </button>
        <button class="menu-button" @click="saveChanges">Save changes</button>
      </div>
    </div>
  </modal-border>
</template>

<style scoped>
.modal-content {
  padding: 30px;
  width: 800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.info-section {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.budget-amounts {
  display: flex;
  justify-content: space-between;
}

.isIncome {
  color: #3dcc98;
}

.isLoss {
  color: #ff3d3d;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100px;
  padding: 10px;
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

.submit-section {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button {
  width: 300px;
  background-color: #444444;
  color: white;
}

.cancel-button:hover {
  background-color: #444444a0;
}

.cancel-button:active {
  background-color: #44444480;
}
</style>
