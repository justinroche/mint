<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  spentAmount: {
    type: Number,
    required: true,
  },
  budgetAmount: {
    type: Number,
    required: true,
  },
});

const spentPercent = computed(() => {
  if (props.spentAmount <= props.budgetAmount) {
    return (props.spentAmount / props.budgetAmount) * 100;
  }
  return 100;
});

const budgetLinePosition = computed(() => {
  if (props.spentAmount > props.budgetAmount) {
    return (props.budgetAmount / props.spentAmount) * 100;
  }
  return 100;
});

const monthProgressLinePosition = computed(() => {
  return (
    (new Date().getDate() /
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate()) *
    (budgetLinePosition.value / 100) *
    100
  );
});
</script>

<template>
  <div>
    <div class="progress-bar-container">
      <div class="progress-bar">
        <div
          class="progress"
          :class="{
            'exceeded-budget': props.spentAmount > props.budgetAmount,
            'exceeded-month': spentPercent > monthProgressLinePosition,
          }"
          :style="{ width: `${spentPercent}%` }"
        ></div>
        <div
          class="month-progress-line"
          v-if="monthProgressLinePosition < 100"
          :style="{ left: `${monthProgressLinePosition}%` }"
        ></div>
      </div>
      <div
        class="budget-line"
        v-if="props.spentAmount > props.budgetAmount"
        :style="{ left: `${budgetLinePosition}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-container {
  position: relative;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #222;
  border: 2px solid #ffffff80;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #3ac491;
  border-radius: 3px;
}

.exceeded-month {
  background-color: #078686;
}

.exceeded-budget {
  background-color: #ff3d3d;
}

.budget-line {
  position: absolute;
  top: -5px;
  width: 2px;
  height: 30px;
  background-color: #ddd;
  z-index: 10;
}

.month-progress-line {
  position: absolute;
  top: 0px;
  width: 2px;
  height: 15px;
  border-left: 2px dashed #ddd;
}
</style>
