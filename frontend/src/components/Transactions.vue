<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../stores/UserStore';

const userStore = useUserStore();

const transactions = computed(() => userStore.user.transactions);
const categories = computed(() => userStore.user.categories);

const sortedTransactions = computed(() => {
  return [...transactions.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

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
      v-for="transaction in sortedTransactions"
      :key="transaction._id"
      class="transaction"
    >
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
  </div>
</template>

<style scoped>
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.transaction {
  border: 2px solid #ffffff80;
  background-color: #ffffff08;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}

.transaction-info-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.description {
  font-size: 1.2rem;
  font-weight: 600;
}

.date-category-section {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
}

.transaction-amount-section {
  display: flex;
  align-items: center;

  font-size: 1.5rem;
  font-weight: 600;
}

.isIncome {
  color: #3eb489;
}
</style>
