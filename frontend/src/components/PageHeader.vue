<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/UserStore';
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

const userStore = useUserStore();

const title = ref('Mint');
const route = useRoute();
const navLinks = ref<NavLink[]>([
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Coins },
  { name: 'Budgets', href: '/budgets', icon: Wallet },
  {
    name: userStore.user.displayName ? userStore.user.displayName : 'Account',
    href: '/account',
    icon: CircleUserRound,
  },
]);

const isActiveLink = computed(
  () => (linkName: string) =>
    route.name === linkName ||
    route.path === navLinks.value.find((link) => link.name === linkName)?.href
);
</script>

<template>
  <header class="top-bar">
    <div class="content-wrapper">
      <h1 class="gowun-batang-bold title">{{ title }}</h1>
      <nav>
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.name">
            <router-link
              :to="link.href"
              class="nav-link"
              :class="{ 'active-link': isActiveLink(link.name) }"
            >
              <component :is="link.icon" class="icon" />
              {{ link.name.toUpperCase() }}
            </router-link>
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
  width: 100%;
  max-width: 1312px;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
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
  gap: 0.5rem;
  color: #ffffff80;
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 1.2px;
  padding: 10px 15px;
  position: relative;
  transition: color 0.3s ease;
  line-height: 1.25rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #ffffff80;
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-link:hover {
  color: #fff;
}

.active-link {
  color: #fff;
  cursor: default;
}

.nav-link.active-link::after {
  left: 0;
  width: 100%;
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
  background-color: #ffffff80;
}
</style>
