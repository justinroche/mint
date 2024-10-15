<script setup lang="ts">
import { ref, watch } from 'vue';
import PageHeader from './components/PageHeader.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showHeader = ref(route.path !== '/');
const headerHeight = 76;

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      showHeader.value = false;
    } else if (!showHeader.value) {
      // Delay showing header to allow for route transition
      setTimeout(() => {
        showHeader.value = true;
      }, 800);
    }
  }
);
</script>

<template>
  <div
    class="app-container"
    :style="{ paddingTop: showHeader ? `${headerHeight}px` : '0' }"
  >
    <Transition name="slide-down">
      <PageHeader v-if="showHeader" class="page-header" />
    </Transition>

    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  transition: padding-top 0.2s ease;
}

.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
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
