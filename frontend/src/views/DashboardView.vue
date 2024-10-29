<script setup lang="ts">
import BudgetBreakdown from '../components/BudgetBreakdown.vue';
import ManageBudget from '../components/ManageBudget.vue';
import { useShowModalStore } from '../stores/ShowModalStore';

const showModalStore = useShowModalStore();

const openManageBudgetModal = () => {
  showModalStore.showManageBudgetModal = true;
};
</script>

<template>
  <div class="page-body">
    <div class="columns">
      <div class="left-column">
        <div class="component-wrapper">
          <h2 class="title">Spending pie chart</h2>
        </div>
        <div class="component-wrapper">
          <h2 class="title">Income vs expenses by month</h2>
        </div>
      </div>
      <div class="right-column">
        <div class="component-wrapper">
          <h2 class="title">Budget status</h2>
          <button class="menu-button" @click="openManageBudgetModal">
            Manage budget
          </button>
        </div>
        <div class="component-wrapper">
          <budget-breakdown />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
}

.columns {
  width: 1248px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.left-column,
.right-column {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.component-wrapper {
  border: 2px solid #ffffff80;
  padding: 20px;
  border-radius: 10px;
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
