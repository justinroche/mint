<script setup lang="ts">
import {
  ref,
  defineProps,
  defineEmits,
  watch,
  onMounted,
  onUnmounted,
} from 'vue';
import { ChevronDown } from 'lucide-vue-next';

interface OptionGroup {
  [key: string]: string[];
}

const props = defineProps<{
  options: OptionGroup;
  modelValue: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', option: string | null): void;
  (e: 'select', option: string | null): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: string) => {
  isOpen.value = false;
  emit('update:modelValue', option);
  emit('select', option);
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === null) {
      isOpen.value = false;
    }
  }
);

const handleOutsideClick = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<template>
  <div class="dropdown" :style="{ background: '#222222' }" ref="dropdownRef">
    <div
      @click="toggleDropdown"
      class="dropdown-header"
      :class="{ 'is-open': isOpen }"
    >
      <div class="header-text">
        {{ modelValue ? modelValue : 'Select an option' }}
      </div>
      <chevron-down :size="20" />
    </div>
    <div v-if="isOpen" class="dropdown-content">
      <div v-for="(group, groupName) in props.options" :key="groupName">
        <div class="group-label">{{ groupName }}</div>
        <div
          v-for="option in group"
          :key="option"
          @click="selectOption(option)"
          class="option"
          :class="{ 'is-selected': modelValue === option }"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
  color: #ffffff;
  font-size: 1rem;
  line-height: normal;
}

.dropdown-header {
  padding: 10px;
  cursor: pointer;
  border: 2px solid #ffffff80;
  border-radius: 5px;
  transition: background 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-header:hover {
  background: #333333;
}

.dropdown-header.is-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #222222;
  border: 2px solid #ffffff80;
  border-top: none;
  border-bottom-left-radius: 4px;
  max-height: 350px;
  overflow-y: auto;
  z-index: 1;
  font-size: 1rem;
}

.group-label {
  padding: 10px 10px 5px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  cursor: default;
}

.option {
  padding: 8px 10px;
  cursor: pointer;
}

.option:hover {
  background: #333333;
}

.option.is-selected {
  background: #333333;
}
</style>
