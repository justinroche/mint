<script setup lang="ts">
import { useUserStore } from '../stores/UserStore';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  TooltipItem,
} from 'chart.js';

// Register the components we need
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const userStore = useUserStore();

// Transform user store data
const data = Object.entries(userStore.incomeAndExpensesByMonth);

// Generate the last 6 months
const currentDate = new Date();
const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
  const date = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - i,
    1
  );
  return date.toISOString().slice(0, 7); // Format as 'YYYY-MM'
}).reverse();

// Map data to the last 6 months and fill blanks with 0
const mappedData = lastSixMonths.map((month) => {
  const entry = data.find(([key]) => key === month);
  return {
    month,
    income: entry ? Number(entry[1].income) : 0,
    expenses: entry ? Math.abs(Number(entry[1].expenses)) : 0,
  };
});

// Prepare data for Chart.js
const chartData = {
  labels: mappedData.map(({ month }) => month), // Labels for the chart
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#3eb489', // green
      data: mappedData.map(({ income }) => income), // Income values
    },
    {
      label: 'Expenses',
      backgroundColor: '#c3c3c3', // gray
      data: mappedData.map(({ expenses }) => expenses), // Expenses values
    },
  ],
};

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Amount ($)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Month',
      },
    },
  },
  plugins: {
    legend: {
      position: 'right' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'bar'>) => {
          const label = context.dataset.label || '';
          const value = context.formattedValue || 0;
          return `${label}: $${value}`;
        },
      },
      bodyColor: '#FFFFFF',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
};
</script>

<template>
  <h2 class="title">Income and expenses by month</h2>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 30px 0;
}

.chart-container {
  height: 250px;
  width: 100%;
}
</style>
