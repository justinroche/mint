<script setup lang="ts">
import AddATransaction from '../components/AddATransaction.vue';
import Transactions from '../components/Transactions.vue';
import EditTransaction from '../components/EditTransaction.vue';
import { useShowModalStore } from '../stores/ShowModalStore';
import { Transition } from 'vue';

const showModalStore = useShowModalStore();
</script>

<template>
  <div class="page-body">
    <div class="columns">
      <div class="left-column">
        <div class="component-wrapper">
          <!-- <router-view name="add-transaction"></router-view> -->
          <h2 class="title">Filter transactions</h2>
        </div>
        <div class="component-wrapper">
          <add-a-transaction />
        </div>
      </div>
      <div class="right-column">
        <div class="component-wrapper transactions-wrapper">
          <transactions />
        </div>
      </div>
    </div>
    <Transition name="modal">
      <edit-transaction v-if="showModalStore.showEditTransactionModal" />
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

.transactions-wrapper {
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
