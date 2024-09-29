<script setup lang="ts"></script>

<template>
  <div class="header-bar">
    <h1 class="gowun-batang-bold">Mint</h1>
    <div class="nav-links">
      <span>DASHBOARD</span>
      <span>TRANSACTIONS</span>
      <span>BUDGETS</span>
      <span>ACCOUNT</span>
    </div>
  </div>
  <hr />
</template>

<style scoped>
.header-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
  gap: 75px;
}

h1 {
  font-size: 2.5rem;
}
</style>
