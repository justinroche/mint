<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue';
</script>

<template>
  <page-header></page-header>
  <div class="page-body">
    <div class="left-column">
      <h2>Add a transaction</h2>
    </div>
    <div class="right-column">
      <h2>Transactions</h2>
    </div>
  </div>
</template>

<style scoped>
.page-body {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.left-column,
.right-column {
  width: 50%;
}
</style>
