<script setup lang="ts">
import Dropdown from './Dropdown.vue';
import { DollarSign, Trash2 } from 'lucide-vue-next';
import { useUserStore } from '../stores/UserStore';
import { computed, ref } from 'vue';

const props = defineProps({
  category: String,
  budgetAmount: Number,
});

const emit = defineEmits(['delete']);

const categoryName = ref(props.category ?? '');
const amount = ref(props.budgetAmount?.toString() ?? '');

const userStore = useUserStore();

const categories = computed(() => userStore.user.categories);

const expenseCategories = computed(() =>
  categories.value.filter((category) => category.type === 'expense')
);

const incomeCategories = computed(() =>
  categories.value.filter((category) => category.type === 'income')
);

const formatAmount = (value: string) => {
  // Remove any non-digit characters
  const digitsOnly = value.replace(/\D/g, '');

  // If the input is empty or invalid, return an empty string
  if (!digitsOnly) {
    return '';
  }

  // Format as currency
  const formatted = (parseInt(digitsOnly) / 100).toFixed(2);

  // Add commas
  const parts = formatted.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const handleAmountInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart;
  const oldValue = input.value;

  // Format the input value
  const formattedValue = formatAmount(input.value);

  // Update the input value
  amount.value = formattedValue;

  // Adjust cursor position
  setTimeout(() => {
    if (cursorPosition !== null) {
      const newCursorPosition = Math.min(
        cursorPosition + (formattedValue.length - oldValue.length),
        formattedValue.length
      );
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    } else {
      // If cursorPosition is null, move cursor to the end
      input.setSelectionRange(formattedValue.length, formattedValue.length);
    }
  }, 0);
};

const deleteBudget = () => {
  emit('delete');
};
</script>

<template>
  <div class="budget-wrapper">
    <dropdown
      class="budget-category-dropdown"
      :options="{
        Expenses: expenseCategories.map((c) => c.name),
        Income: incomeCategories.map((c) => c.name),
      }"
      v-model="categoryName"
    />
    <div class="amount-input-wrapper">
      <DollarSign class="dollar-icon" :size="24" />
      <input
        v-model="amount"
        class="edit-budget-input amount-input"
        type="text"
        inputmode="decimal"
        placeholder="0.00"
        @input="handleAmountInput"
        required
      />
    </div>
    <button
      class="menu-button delete-button"
      type="button"
      @click="deleteBudget"
    >
      <Trash2 />
    </button>
  </div>
</template>

<style scoped>
.budget-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.budget-category-dropdown {
  width: 100%;
}

.edit-budget-input {
  background-color: transparent;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  padding: 5.5px 10px;
  box-sizing: border-box;
  border: 2px solid #ffffff80;
  border-radius: 5px;
}

.amount-input-wrapper {
  position: relative;
  flex-grow: 1;
}

.dollar-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffffff80;
}

.amount-input {
  font-size: 1.5rem;
  text-align: right;
  padding-left: 35px;
  padding-right: 10px;
  width: 100%;
}

.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  padding: 10px;
  background-color: #ff3d3d;
  color: white;
}

.delete-button:hover {
  background-color: #ff3d3da0;
}

.delete-button:active {
  background-color: #ff3d3d80;
}
</style>
