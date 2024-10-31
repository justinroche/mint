<script setup lang="ts">
import BudgetProgressBar from './BudgetProgressBar.vue';
import { useUserStore } from '../stores/UserStore';
import { computed } from 'vue';
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

const thisMonthsTransactions = computed(() => {
  const currentDate = new Date();
  const currentYearMonth = currentDate.toISOString().slice(0, 7);

  return userStore.user.transactions.filter((transaction) => {
    const transactionYearMonth = transaction.date.slice(0, 7);
    return transactionYearMonth === currentYearMonth;
  });
});

const transactionTotal = thisMonthsTransactions.value
  .filter((transaction) => transaction.categoryID === category!._id)
  .reduce((total, transaction) => total + transaction.amount, 0);

const budgetAmount = userStore.user.budgets.find(
  (budget) => budget.categoryID === category!._id
)?.amount;
</script>

<template>
  <div class="budget-wrapper">
    <h3 class="title">{{ props.category }}</h3>
    <budget-progress-bar
      :spentAmount="Math.abs(transactionTotal)"
      :budgetAmount="budgetAmount!"
      :isIncome="category!.type === 'income'"
    />
    <div class="budget-details">
      <div v-if="transactionTotal < 0">
        <span>Spent: {{ formatNumberToCash(Math.abs(transactionTotal)) }}</span>
        <span>Budget: {{ formatNumberToCash(budgetAmount!) }}</span>
      </div>
      <div v-else>
        <span>Earned: {{ formatNumberToCash(transactionTotal) }}</span>
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

.budget-details div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
