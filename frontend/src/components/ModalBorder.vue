<script setup lang="ts"></script>

<template>
  <div class="overlay">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #222222;
  min-width: 400px;
  max-width: 800px;
  border-radius: 10px;
  position: relative;
}

.modal::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(180deg, #3ac491, #9ad8c1);
  z-index: -1;
  border-radius: 12px;
}
</style>
