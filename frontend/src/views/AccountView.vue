<script setup lang="ts">
import { useUserStore } from '../stores/UserStore';
import { performLogout } from '../clients/UserClient';
import router from '../router';

const userStore = useUserStore();

const logOut = () => {
  performLogout();
  router.push('/');
};
</script>

<template>
  <div class="page-body">
    <div class="columns">
      <div class="left-column">
        <div class="component-wrapper">
          <h2 class="title">Account</h2>
          <p>Display Name: {{ userStore.user.displayName }}</p>
          <p>Email: {{ userStore.user.email }}</p>
          <button class="menu-button" @click="logOut">Sign out</button>
        </div>
      </div>
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

.menu-button {
  width: 50%;
  margin-top: 10px;
}
</style>
