<script setup lang="ts">
import BudgetProgressBar from './BudgetProgressBar.vue';
import { useUserStore } from '../stores/UserStore';
import { useDateStore } from '../stores/DateStore';
import { formatNumberToCash } from '../utils/Utils';

const userStore = useUserStore();
const dateStore = useDateStore();
</script>

<template>
  <div class="budget-wrapper">
    <budget-progress-bar
      :spentAmount="userStore.currentMonthsExpensesTotal"
      :budgetAmount="userStore.budgetExpenseTotal"
    />
    <div class="budget-details">
      <div>
        <span
          >Spent:
          {{ formatNumberToCash(userStore.currentMonthsExpensesTotal) }}</span
        >
        <span
          >Target:
          {{
            formatNumberToCash(
              userStore.budgetExpenseTotal * dateStore.amountThroughMonth
            )
          }}</span
        >
        <span
          >Budget: {{ formatNumberToCash(userStore.budgetExpenseTotal) }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.budget-details div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
