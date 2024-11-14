<script setup lang="ts">
import { ref } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartOptions,
} from 'chart.js';
import { useUserStore } from '../stores/UserStore';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const userStore = useUserStore();

// Define chartData with labels and dataset
const chartData = ref({
  labels: userStore.currentMonthsExpensesByCategory.map(
    (categoryTotal) => `${categoryTotal.category.name}`
  ),
  datasets: [
    {
      data: userStore.currentMonthsExpensesByCategory.map(
        (categoryTotal) => categoryTotal.total
      ),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9FFF',
        '#FFCD56',
        '#4BC0FF',
        '#C9CBCF',
        '#FF9F40',
        '#A3E4D7',
        '#3498DB',
        '#E74C3C',
        '#9B59B6',
        '#5D6D7E',
        '#1ABC9C',
        '#F1948A',
        '#7DCEA0',
        '#AF7AC5',
        '#D7BDE2',
      ],
    },
  ],
});

const chartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.formattedValue || 0;
          return `${label}: $${value}`;
        },
      },
    },
  },
};
</script>

<template>
  <h2 class="title">Spending by category this month</h2>
  <div
    v-if="userStore.currentMonthsExpensesByCategory.length === 0"
    class="no-chart"
  >
    <p class="no-expenses">No expenses yet this month.</p>
  </div>
  <div v-else class="chart-container">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 30px 0;
}

.no-expenses {
  text-align: center;
  margin: 0;
}

.chart-container {
  margin-bottom: 20px;
}
</style>
