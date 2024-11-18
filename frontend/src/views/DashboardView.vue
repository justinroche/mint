<script setup lang="ts">
import BudgetBreakdown from '../components/BudgetBreakdown.vue';
import ManageBudget from '../components/ManageBudget.vue';
import SpendingPieChart from '../components/SpendingPieChart.vue';
import IncomeExpensesBars from '../components/IncomeExpensesBars.vue';
import { useShowModalStore } from '../stores/ShowModalStore';
import { useUserStore } from '../stores/UserStore';
import BudgetStatus from '../components/BudgetStatus.vue';

const showModalStore = useShowModalStore();
const userStore = useUserStore();

const openManageBudgetModal = () => {
  showModalStore.showManageBudgetModal = true;
};
</script>

<template>
  <div class="page-body">
    <div class="columns">
      <div
        class="left-column create-budget-column"
        v-if="userStore.user.budgets.length === 0"
      >
        <div class="component-wrapper">
          <button class="menu-button" @click="openManageBudgetModal">
            Set up budget
          </button>
        </div>
      </div>
      <div v-else class="left-column">
        <div class="component-wrapper">
          <budget-status />
        </div>
        <div class="component-wrapper breakdown-wrapper">
          <budget-breakdown />
        </div>
      </div>
      <div class="right-column">
        <div class="component-wrapper">
          <spending-pie-chart />
        </div>
        <div class="component-wrapper">
          <income-expenses-bars />
        </div>
      </div>
    </div>
    <Transition name="modal">
      <manage-budget v-if="showModalStore.showManageBudgetModal" />
    </Transition>
  </div>
</template>

<style scoped>
.page-body {
  width: 100%;
  height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  box-sizing: border-box;
}

.columns {
  width: 1248px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 100%;
}

.left-column,
.right-column {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.component-wrapper {
  border: 2px solid #ffffff80;
  padding: 20px;
  border-radius: 10px;
}

.breakdown-wrapper {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>
