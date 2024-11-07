import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useDateStore = defineStore('date', () => {
  const amountThroughMonth = computed(() => {
    return (
      new Date().getDate() /
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    );
  });

  return {
    amountThroughMonth,
  };
});
