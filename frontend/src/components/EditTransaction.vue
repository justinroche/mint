<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useEditTransactionStore } from '../stores/EditTransactionStore';
import { useShowModalStore } from '../stores/ShowModalStore';
import { DollarSign, Trash2 } from 'lucide-vue-next';
import { updateTransaction, removeTransaction } from '../clients/UserClient';
import { Transaction } from '../types';
import ModalBorder from './ModalBorder.vue';
import Dropdown from './Dropdown.vue';

const userStore = useUserStore();
const editTransactionStore = useEditTransactionStore();
const showModalStore = useShowModalStore();

const categories = computed(() => userStore.user.categories);

const expenseCategories = computed(() =>
  categories.value.filter((category) => category.type === 'expense')
);

const incomeCategories = computed(() =>
  categories.value.filter((category) => category.type === 'income')
);

const categoryName = ref(
  categories.value.find(
    (category) => category._id === editTransactionStore.categoryID
  )?.name!
);

const toggleIncome = () => {
  editTransactionStore.isIncome = !editTransactionStore.isIncome;
};

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
  editTransactionStore.amount = formattedValue;

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
  const amountValue = parseFloat(editTransactionStore.amount.replace(/,/g, ''));

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
    _id: editTransactionStore.id,
    description: editTransactionStore.description,
    date: editTransactionStore.date,
    categoryID,
    amount: editTransactionStore.isIncome ? amountValue : amountValue * -1.0,
  };

  const error = await updateTransaction(transaction);

  if (error) {
    // TODO: handle error more elegantly
    alert(error);
    return;
  }

  showModalStore.showEditTransactionModal = false;

  // Clear form
  editTransactionStore.description = '';
  editTransactionStore.date = '';
  editTransactionStore.categoryID = '';
  editTransactionStore.isIncome = false;
  editTransactionStore.amount = '';
};

const cancelEdit = () => {
  showModalStore.showEditTransactionModal = false;

  // Clear form
  editTransactionStore.description = '';
  editTransactionStore.date = '';
  editTransactionStore.categoryID = '';
  editTransactionStore.isIncome = false;
  editTransactionStore.amount = '';
};

const deleteTransaction = async () => {
  const error = await removeTransaction(editTransactionStore.id);

  if (error) {
    // TODO: handle error more elegantly
    alert(error);
    return;
  }

  showModalStore.showEditTransactionModal = false;

  // Clear form
  editTransactionStore.description = '';
  editTransactionStore.date = '';
  editTransactionStore.categoryID = '';
  editTransactionStore.isIncome = false;
  editTransactionStore.amount = '';
};

editTransactionStore.amount = formatAmount(editTransactionStore.amount);
</script>

<template>
  <modal-border>
    <div class="modal-content">
      <h2 class="title">Edit Transaction</h2>
      <form class="add-transaction-form" @submit.prevent="submitTransaction">
        <input
          v-model="editTransactionStore.description"
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
            v-model="editTransactionStore.date"
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
            :class="{ income: editTransactionStore.isIncome }"
          >
            <span v-if="editTransactionStore.isIncome" class="income-span"
              >Income</span
            >
            <span v-else class="expense-span">Expense</span>
          </button>
          <div class="amount-input-wrapper">
            <DollarSign class="dollar-icon" :size="32" />
            <input
              v-model="editTransactionStore.amount"
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
          <button
            class="menu-button delete-button"
            type="button"
            @click="deleteTransaction"
          >
            <Trash2 />
          </button>
          <button
            class="menu-button cancel-button"
            type="button"
            @click="cancelEdit"
          >
            Cancel
          </button>
          <button class="menu-button" type="submit">Save changes</button>
        </div>
      </form>
    </div>
  </modal-border>
</template>

<style scoped>
.modal-content {
  padding: 30px;
  width: 600px;
  box-sizing: border-box;
}

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
  flex-grow: 1;
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
  gap: 25px;
}

.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
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

.cancel-button {
  width: 300px;
  background-color: #444444;
  color: white;
}

.cancel-button:hover {
  background-color: #444444a0;
}

.cancel-button:active {
  background-color: #44444480;
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
