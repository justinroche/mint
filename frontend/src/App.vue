<script lang="ts">
import PageHeader from './components/PageHeader.vue';

export default {
  components: {
    PageHeader,
  },
};
</script>

<template>
  <page-header></page-header>
  <router-view></router-view>
</template>
