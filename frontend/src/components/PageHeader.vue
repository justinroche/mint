<script setup lang="ts">
import { ref } from 'vue';
import {
  LayoutDashboard,
  Coins,
  Wallet,
  CircleUserRound,
} from 'lucide-vue-next';

interface NavLink {
  name: string;
  href: string;
  icon: any;
}

const title = ref('Mint');

const navLinks = ref<NavLink[]>([
  { name: 'DASHBOARD', href: '#', icon: LayoutDashboard },
  { name: 'TRANSACTIONS', href: '#', icon: Coins },
  { name: 'BUDGETS', href: '#', icon: Wallet },
  { name: 'ACCOUNT', href: '#', icon: CircleUserRound },
]);
</script>

<template>
  <header class="top-bar">
    <div class="content-wrapper">
      <h1 class="gowun-batang-bold title">{{ title }}</h1>
      <nav>
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.name">
            <a :href="link.href" class="nav-link">
              <component :is="link.icon" class="icon" />
              {{ link.name }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="horizontal-bar"></div>
  </header>
</template>

<style scoped>
.top-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-wrapper {
  width: 1248px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nav-list {
  display: flex;
  gap: 25px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 1.2px;
  gap: 0.5rem;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

.title {
  font-size: 2.5rem;
  margin: 1rem 0;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.horizontal-bar {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
