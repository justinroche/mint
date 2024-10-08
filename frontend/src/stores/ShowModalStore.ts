import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShowModalStore = defineStore('showModal', () => {
  const showCreateAccountModal = ref(false);
  const showSignInModal = ref(true);

  return {
    showCreateAccountModal,
    showSignInModal,
  };
});
