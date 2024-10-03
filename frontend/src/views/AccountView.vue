<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue';
</script>

<template>
  <page-header></page-header>
  <div class="page-body">
    <div class="columns">
      <div class="left-column"></div>
      <div class="right-column"></div>
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
