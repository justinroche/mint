<script setup lang="ts">
import PageHeader from './components/PageHeader.vue';
import SignInModal from './components/SignInModal.vue';
import CreateAccountModal from './components/CreateAccountModal.vue';
import { useShowModalStore } from './stores/ShowModalStore';

const showModalStore = useShowModalStore();
</script>

<template>
  <page-header />

  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>

  <Transition name="modal">
    <create-account-modal v-if="showModalStore.showCreateAccountModal" />
  </Transition>

  <Transition name="modal">
    <sign-in-modal v-if="showModalStore.showSignInModal" />
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
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
