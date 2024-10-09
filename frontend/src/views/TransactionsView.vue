<script setup lang="ts">
import AddATransaction from '../components/AddATransaction.vue';
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
        <div class="component-wrapper">
          <!-- <router-view name="add-transaction"></router-view> -->
          <h2 class="title">Transactions</h2>
        </div>
      </div>
    </div>
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
</style>
