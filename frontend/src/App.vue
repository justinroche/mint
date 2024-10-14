<script setup lang="ts">
import PageHeader from './components/PageHeader.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <Transition name="fade" mode="out-in">
    <component :is="PageHeader" v-if="route.path !== '/'" />
  </Transition>

  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style scoped>
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
