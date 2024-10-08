<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { Transaction } from '../types';

const userStore = useUserStore();

const transactions = computed(() => userStore.user.transactions);
const categories = computed(() => userStore.user.categories);

const sortedTransactions = computed(() => {
  return [...transactions.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

const transactionsByMonth = computed<Record<string, Transaction[]>>(() => {
  const grouped: { [key: string]: Transaction[] } = {};
  sortedTransactions.value.forEach((transaction) => {
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
</script>

<template>
  <div class="transactions-list">
    <div
      v-for="(monthTransactions, monthYear) in transactionsByMonth"
      :key="monthYear"
      class="transaction-month-group"
    >
      <h2 class="month-header">{{ formatMonthYear(monthYear) }}</h2>
      <button
        v-for="transaction in monthTransactions"
        :key="transaction._id"
        class="transaction-button"
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
                    (category) => category._id === transaction.categoryId
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
