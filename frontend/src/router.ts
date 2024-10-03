import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from './views/DashboardView.vue';
import TransactionsView from './views/TransactionsView.vue';
import BudgetsView from './views/BudgetsView.vue';
import AccountView from './views/AccountView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: TransactionsView,
  },
  {
    path: '/budgets',
    name: 'Budgets',
    component: BudgetsView,
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
