<script lang="ts">
import PageHeader from './components/PageHeader.vue';
import SignInModal from './components/SignInModal.vue';

export default {
  components: {
    PageHeader,
    SignInModal,
  },
};
</script>

<template>
  <page-header></page-header>
  <sign-in-modal></sign-in-modal>
  <router-view></router-view>
</template>
