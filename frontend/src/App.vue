<script setup lang="ts">
import { ref, watch } from 'vue';
import PageHeader from './components/PageHeader.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showHeader = ref(route.path !== '/');

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      showHeader.value = false;
    } else if (!showHeader.value) {
      // Delay showing header to allow for route transition
      setTimeout(() => {
        showHeader.value = true;
      }, 500);
    }
  }
);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <PageHeader v-if="showHeader" />
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
