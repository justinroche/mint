<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { DollarSign } from 'lucide-vue-next';
import { addTransaction } from '../clients/UserClient';
import { Transaction } from '../types';
import Dropdown from './Dropdown.vue';
import { formatStringToCash } from '../utils/Utils';

const userStore = useUserStore();

const categories = computed(() => userStore.user.categories);

const expenseCategories = computed(() =>
  categories.value.filter((category) => category.type === 'expense')
);

const incomeCategories = computed(() =>
  categories.value.filter((category) => category.type === 'income')
);

// Form data
const description = ref('');
const date = ref('');
const categoryName = ref('');
const isIncome = ref(false);
const hasIncomeOrExpenseBeenForced = ref(false);
const amount = ref('');

const toggleIncome = () => {
  hasIncomeOrExpenseBeenForced.value = true;
  isIncome.value = !isIncome.value;
};

const handleAmountInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart;
  const oldValue = input.value;

  // Format the input value
  const formattedValue = formatStringToCash(input.value);

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

const submitTransaction = async () => {
  const amountValue = parseFloat(amount.value.replace(/,/g, ''));

  if (isNaN(amountValue) || amountValue === 0) {
    // TODO: handle error more elegantly
    alert('Please enter a valid amount.');
    return;
  }

  const categoryID = categories.value.find(
    (category) => category.name === categoryName.value
  )?._id!;

  if (!categoryID) {
    // TODO: handle error more elegantly
    alert('Please select a category.');
    return;
  }

  const transaction: Transaction = {
    description: description.value,
    date: date.value,
    categoryID: categoryID,
    amount: isIncome.value ? amountValue : amountValue * -1.0,
  };

  const error = await addTransaction(transaction);

  if (error) {
    // TODO: handle error more elegantly
    alert(error);
    return;
  }

  // Clear form
  description.value = '';
  date.value = '';
  categoryName.value = '';
  isIncome.value = false;
  hasIncomeOrExpenseBeenForced.value = false;
  amount.value = '';
};

watch(
  () => categoryName.value,
  () => {
    if (!hasIncomeOrExpenseBeenForced.value) {
      const category = categories.value.find(
        (category) => category.name === categoryName.value
      );

      if (category) {
        isIncome.value = category.type === 'income';
      }
    }
  }
);
</script>

<template>
  <div>
    <h2 class="title">Add a Transaction</h2>
    <form class="add-transaction-form" @submit.prevent="submitTransaction">
      <input
        v-model="description"
        class="add-transaction-input"
        type="text"
        id="description"
        placeholder="Description"
        required
      />
      <div class="category-date-section">
        <dropdown
          :options="{
            Expenses: expenseCategories.map((c) => c.name),
            Income: incomeCategories.map((c) => c.name),
          }"
          v-model="categoryName"
          class="category-select"
        />
        <input
          v-model="date"
          class="add-transaction-input date-input"
          type="date"
          id="date"
          required
        />
      </div>
      <div class="amount-section">
        <button
          type="button"
          class="income-expense-button"
          @click="toggleIncome"
          :class="{ income: isIncome }"
        >
          <span v-if="isIncome" class="income-span">Income</span>
          <span v-else class="expense-span">Expense</span>
        </button>
        <div class="amount-input-wrapper">
          <DollarSign class="dollar-icon" :size="32" />
          <input
            v-model="amount"
            class="add-transaction-input amount-input"
            type="text"
            inputmode="decimal"
            placeholder="0.00"
            @input="handleAmountInput"
            required
          />
        </div>
      </div>
      <div class="submit-section">
        <button class="menu-button submit-button" type="submit">
          Add {{ isIncome ? 'income' : 'expense' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.add-transaction-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.add-transaction-input {
  background-color: transparent;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #ffffff80;
  border-radius: 5px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
}

.amount-section,
.category-date-section {
  display: flex;
  gap: 25px;
}

.category-select,
.date-input {
  width: 100%;
  transition: background-color 0.1s;
}

.category-select:hover {
  cursor: pointer;
  background-color: #ffffff10;
}

.category-option {
  font-size: 1rem;
  background-color: #222222;
}

.amount-input {
  font-size: 1.5rem;
  font-weight: 600;
}

.income-expense-button {
  font-family: inherit;
  color: inherit;
  font-weight: 600;
  background-color: transparent;
  border: 2px solid #ffffff80;
  border-radius: 5px;
  cursor: pointer;
  padding: 15px;
  width: 200px;
  transition: background-color 0.1s;
}

.income-expense-button:hover {
  background-color: #ffffff10;
}

.income-expense-button:active {
  background-color: #ffffff20;
}

.income {
  border-color: #3eb489;
}

.income-span,
.expense-span {
  font-size: 1.5rem;
}

.income-span {
  color: #3eb489;
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
  font-size: 2rem;
  text-align: right;
  padding-left: 35px;
  padding-right: 10px;
  width: 100%;
}

.submit-section {
  display: flex;
  justify-content: center;
}

.submit-button {
  width: 70%;
}

/* Remove spinner for WebKit browsers */
.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Remove spinner for Firefox */
.amount-input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
