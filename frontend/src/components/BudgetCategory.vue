<script setup lang="ts">
import BudgetProgressBar from './BudgetProgressBar.vue';
import { useUserStore } from '../stores/UserStore';

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

const spentAmount =
  userStore.user.transactions
    .filter((transaction) => transaction.categoryID === category!._id)
    .reduce((total, transaction) => total + transaction.amount, 0) * -1;

const budgetAmount = userStore.user.budgets.find(
  (budget) => budget.categoryID === category!._id
)?.amount;
</script>

<template>
  <div class="budget-wrapper">
    <h2 class="title">{{ props.category }}</h2>
    <budget-progress-bar
      :spentAmount="spentAmount"
      :budgetAmount="budgetAmount!"
    />
    <div class="budget-details">
      <span>Spent: ${{ spentAmount }}</span>
      <span>Budget: ${{ budgetAmount }}</span>
    </div>
  </div>
</template>

<style scoped>
.budget-wrapper {
  border-bottom: 2px solid #ffffff80;
  padding: 20px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.budget-details {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
