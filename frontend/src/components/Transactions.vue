<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useShowModalStore } from '../stores/ShowModalStore';
import { useEditTransactionStore } from '../stores/EditTransactionStore';
import { useFilterTransactionsStore } from '../stores/FilterTransactionsStore';
import { Transaction } from '../types';

const userStore = useUserStore();
const showModalStore = useShowModalStore();
const editTransactionStore = useEditTransactionStore();
const filterTransactionsStore = useFilterTransactionsStore();

const transactions = computed(() => userStore.user.transactions);
const categories = computed(() => userStore.user.categories);

const sortedTransactions = computed(() => {
  if (filterTransactionsStore.sortBy === 'Newest') {
    return [...transactions.value].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (filterTransactionsStore.sortBy === 'Oldest') {
    return [...transactions.value].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } else if (filterTransactionsStore.sortBy === 'Largest') {
    return [...transactions.value].sort(
      (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
    );
  } else {
    return [...transactions.value].sort(
      (a, b) => Math.abs(a.amount) - Math.abs(b.amount)
    );
  }
});

const filteredTransactions = computed(() => {
  if (filterTransactionsStore.filterByCategory === 'Show all') {
    return sortedTransactions.value;
  } else {
    return sortedTransactions.value.filter(
      (transaction) =>
        categories.value.find(
          (category) => category._id === transaction.categoryID
        )?.name === filterTransactionsStore.filterByCategory
    );
  }
});

const searchedTransactions = computed(() => {
  return filteredTransactions.value.filter((transaction) =>
    transaction.description
      .toLowerCase()
      .includes(filterTransactionsStore.searchQuery.toLowerCase())
  );
});

const transactionsByMonth = computed<Record<string, Transaction[]>>(() => {
  const grouped: { [key: string]: Transaction[] } = {};
  searchedTransactions.value.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear: string = `${date.getUTCFullYear()}-${String(
      date.getUTCMonth() + 1
    ).padStart(2, '0')}`;
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(transaction);
  });
  return grouped;
});

const formatMonthYear = (monthYear: string) => {
  const [year, month] = monthYear.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatAmount = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const handleEditTransaction = (transaction: Transaction) => {
  editTransactionStore.id = transaction._id!;
  editTransactionStore.description = transaction.description;
  editTransactionStore.date = transaction.date.slice(0, 10);
  editTransactionStore.categoryID = transaction.categoryID;
  editTransactionStore.isIncome = transaction.amount > 0;
  editTransactionStore.amount = Math.abs(transaction.amount)
    .toFixed(2)
    .toString();

  showModalStore.showEditTransactionModal = true;
};
</script>

<template>
  <div class="no-transactions" v-if="transactions.length === 0">
    No transactions yet. Add one to get started!
  </div>
  <div class="no-transactions" v-else-if="searchedTransactions.length === 0">
    No transactions match the selected filters.
  </div>
  <div class="transactions-list" v-else>
    <div
      v-if="
        filterTransactionsStore.sortBy === 'Newest' ||
        filterTransactionsStore.sortBy === 'Oldest'
      "
      v-for="(monthTransactions, monthYear) in transactionsByMonth"
      :key="monthYear"
      class="transaction-month-group"
    >
      <h2 class="month-header">{{ formatMonthYear(monthYear) }}</h2>
      <button
        v-for="transaction in monthTransactions"
        :key="transaction._id"
        class="transaction-button"
        @click="handleEditTransaction(transaction)"
      >
        <div class="transaction">
          <div class="transaction-info-section">
            <div class="description">{{ transaction.description }}</div>
            <div class="date-category-section">
              <div>{{ formatDate(transaction.date) }}</div>
              <span>&#8226;</span>
              <div>
                {{
                  categories.find(
                    (category) => category._id === transaction.categoryID
                  )?.name
                }}
              </div>
            </div>
          </div>
          <div
            class="transaction-amount-section"
            :class="{ isIncome: transaction.amount > 0 }"
          >
            {{
              (transaction.amount > 0 ? '+' : '') +
              formatAmount(Math.abs(transaction.amount))
            }}
          </div>
        </div>
        <div class="edit-text">Edit</div>
      </button>
    </div>
    <div v-else v-for="transaction in filteredTransactions">
      <button
        class="transaction-button"
        @click="handleEditTransaction(transaction)"
      >
        <div class="transaction">
          <div class="transaction-info-section">
            <div class="description">{{ transaction.description }}</div>
            <div class="date-category-section">
              <div>{{ formatDate(transaction.date) }}</div>
              <span>&#8226;</span>
              <div>
                {{
                  categories.find(
                    (category) => category._id === transaction.categoryID
                  )?.name
                }}
              </div>
            </div>
          </div>
          <div
            class="transaction-amount-section"
            :class="{ isIncome: transaction.amount > 0 }"
          >
            {{
              (transaction.amount > 0 ? '+' : '') +
              formatAmount(Math.abs(transaction.amount))
            }}
          </div>
        </div>
        <div class="edit-text">Edit</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-transactions {
  text-align: center;
}

.transactions-list {
  display: flex;
  flex-direction: column;
}

.transaction-button {
  display: flex;
  width: 100%;
  font-family: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ffffff40;
  transition: background-color 0.1s;
  position: relative;
  overflow: hidden;
}

.transaction-button:hover {
  background-color: #ffffff10;
  cursor: pointer;
}

.transaction-button:active {
  background-color: #ffffff20;
}

.transaction {
  padding: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.transaction-month-group {
  margin-bottom: 20px;
}

.month-header {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  margin: 10px 0 5px;
}

.transaction-info-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.description {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
}

.date-category-section {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
}

.transaction-amount-section {
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 1.5rem;
  font-weight: 600;
}

.isIncome {
  color: #3eb489;
}

.edit-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #00000020;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0;
  transition: opacity 0.1s ease;
}

.transaction-button:hover .edit-text {
  opacity: 1;
}
</style>
