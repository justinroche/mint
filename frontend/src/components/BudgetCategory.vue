<script setup lang="ts">
import BudgetProgressBar from './BudgetProgressBar.vue';
import { useUserStore } from '../stores/UserStore';
import { formatNumberToCash } from '../utils/Utils';

const userStore = useUserStore();

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const category = userStore.user.categories.find(
  (category) => category.name === props.category
);

const transactionTotal = userStore.currentMonthsTransactions
  .filter((transaction) => transaction.categoryID === category!._id)
  .reduce((total, transaction) => total + transaction.amount, 0);

let adjustedTransactionTotal = transactionTotal;

if (
  (transactionTotal < 0 && category!.type === 'income') ||
  (transactionTotal > 0 && category!.type !== 'income')
) {
  adjustedTransactionTotal = 0;
} else if (transactionTotal < 0) {
  adjustedTransactionTotal = Math.abs(transactionTotal);
}

const budgetAmount = userStore.user.budgets.find(
  (budget) => budget.categoryID === category!._id
)?.amount;
</script>

<template>
  <div class="budget-wrapper">
    <h3 class="title" :class="{ isIncome: category?.type === 'income' }">
      {{ props.category }}
    </h3>
    <budget-progress-bar
      :spentAmount="adjustedTransactionTotal"
      :budgetAmount="budgetAmount!"
      :isIncome="category!.type === 'income'"
    />
    <div class="budget-details">
      <div v-if="category?.type === 'expense'">
        <span>Spent: {{ formatNumberToCash(adjustedTransactionTotal) }}</span>
        <span>Budget: {{ formatNumberToCash(budgetAmount!) }}</span>
      </div>
      <div v-else>
        <span>Earned: {{ formatNumberToCash(adjustedTransactionTotal) }}</span>
        <span>Expected: {{ formatNumberToCash(budgetAmount!) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.budget-wrapper {
  border-bottom: 2px solid #ffffff40;
  padding: 15px;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.isIncome {
  color: #3dcc98;
  font-weight: 700;
}

.budget-details div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
