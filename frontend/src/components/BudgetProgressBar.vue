<script setup lang="ts">
import { computed, ref } from 'vue';

const spentAmount = ref(500);
const budgetAmount = ref(1000);

const spentPercent = computed(() => {
  if (spentAmount.value <= budgetAmount.value) {
    return (spentAmount.value / budgetAmount.value) * 100;
  }
  return 100;
});

const budgetLinePosition = computed(() => {
  if (spentAmount.value > budgetAmount.value) {
    return (budgetAmount.value / spentAmount.value) * 100;
  }
  return 0;
});
</script>

<template>
  <div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${spentPercent}%` }"></div>
      <div
        class="budget-line"
        v-if="spentAmount > budgetAmount"
        :style="{ left: `${budgetLinePosition}%` }"
      ></div>
      <div class="month-progress-line"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 15px;
  background-color: #222;
  border: 2px solid #ffffff80;
  border-radius: 5px;
}

.progress {
  height: 100%;
  background-color: #3eb489;
  border-radius: 3px;
}

.budget-line {
  position: absolute;
  top: -7px;
  width: 2px;
  height: 29px;
  background-color: #ccc;
}

.month-progress-line {
  position: absolute;
  top: 0px;
  width: 2px;
  height: 15px;
  border-left: 2px dashed #ffffff80;
}
</style>
