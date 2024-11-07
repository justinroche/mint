<script setup lang="ts">
import { computed } from 'vue';
import { useShowModalStore } from '../stores/ShowModalStore';
import { useUserStore } from '../stores/UserStore';
import { useDateStore } from '../stores/DateStore';
import BudgetAll from './BudgetAll.vue';

const showModalStore = useShowModalStore();
const userStore = useUserStore();
const dateStore = useDateStore();

const budgetStatus = computed(() => {
  if (
    userStore.budgetExpenseTotal * dateStore.amountThroughMonth >
    userStore.currentMonthsExpensesTotal
  ) {
    return 'on track';
  }
  if (userStore.budgetExpenseTotal > userStore.currentMonthsExpensesTotal) {
    return 'over target';
  }
  return 'over budget';
});

const openManageBudgetModal = () => {
  showModalStore.showManageBudgetModal = true;
};
</script>

<template>
  <div class="budget-status-container">
    <p class="budget-status">
      You are
      <span
        class="budget-status-text"
        :class="{
          onTrack: budgetStatus === 'on track',
          overTarget: budgetStatus === 'over target',
          overBudget: budgetStatus === 'over budget',
        }"
        >{{ budgetStatus }}</span
      >
      this month
    </p>
    <budget-all />
    <button class="menu-button" @click="openManageBudgetModal">
      Manage budget
    </button>
  </div>
</template>

<style scoped>
.budget-status-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.budget-status {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
}

.budget-status-text {
  font-weight: 700;
}

.onTrack {
  color: #3dcc98;
}

.overTarget {
  color: #f5a623;
}

.overBudget {
  color: #ff3d3d;
}

.menu-button {
  margin-top: 10px;
  width: 50%;
}
</style>
