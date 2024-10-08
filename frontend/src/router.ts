import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardView from './views/DashboardView.vue';
import TransactionsView from './views/TransactionsView.vue';
import BudgetsView from './views/BudgetsView.vue';
import AccountView from './views/AccountView.vue';
import { useUserStore } from './stores/UserStore';

let userStore: ReturnType<typeof useUserStore>;

export const initializeRouter = () => {
  userStore = useUserStore();
};

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
    meta: { requiresAuth: true },
  },
  {
    path: '/budgets',
    name: 'Budgets',
    component: BudgetsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (
    to.meta.requiresAuth &&
    !userStore.user._id &&
    !localStorage.getItem('userID')
  ) {
    // Redirect to the dashboard if user is not signed in
    next('/');
  } else {
    next();
  }
});

export default router;
