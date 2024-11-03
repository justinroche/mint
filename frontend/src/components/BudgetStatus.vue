<script setup lang="ts">
import { useShowModalStore } from '../stores/ShowModalStore';

const showModalStore = useShowModalStore();

const openManageBudgetModal = () => {
  showModalStore.showManageBudgetModal = true;
};
</script>

<template>
  <div class="budget-status">
    <span>On budget</span>
    <button class="menu-button" @click="openManageBudgetModal">
      Manage budget
    </button>
  </div>
</template>

<style scoped></style>
