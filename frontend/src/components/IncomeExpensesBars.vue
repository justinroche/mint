<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
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

// Original data
const data = [
  ['2024-01', '5000', '1100'],
  ['2024-02', '6000', '1200'],
  ['2024-03', '5000', '1300'],
  ['2024-04', '6000', '1300'],
  ['2024-05', '5000', '1200'],
  ['2024-06', '6000', '1100'],
];

// Transform data for Chart.js - converting strings to numbers
const chartData = {
  labels: data.map((item) => item[0]), // year-month
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#3eb489', // green
      data: data.map((item) => Number(item[1])), // Convert to number
    },
    {
      label: 'Expenses',
      backgroundColor: '#c3c3c3', // gray
      data: data.map((item) => Number(item[2])), // Convert to number
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
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 30px 0;
}

.chart-container {
  height: 300px;
  width: 100%;
}
</style>
