<script setup lang="ts">
import ModalBorder from './ModalBorder.vue';
import { performLogin } from '../clients/UserClient';
import { ref } from 'vue';
import { useShowModalStore } from '../stores/ShowModalStore';

const showModalStore = useShowModalStore();

const email = ref('');
const password = ref('');

const switchToCreateAccountModal = () => {
  showModalStore.showSignInModal = false;
  showModalStore.showCreateAccountModal = true;
};

const attemptLogin = async () => {
  const error = await performLogin(email.value, password.value);
  if (error) {
    // TODO: handle error more elegantly
    alert(error);
    return;
  }
  showModalStore.showSignInModal = false;
};
</script>

<template>
  <modal-border>
    <div class="modal-header">
      <h2 class="modal-title gowun-batang-bold">Welcome</h2>
      <p class="modal-subtitle">Sign in to continue.</p>
    </div>
    <div class="modal-body">
      <form class="sign-in-form" @submit.prevent="attemptLogin">
        <input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          placeholder="Email"
          required
        />
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
          required
        />
        <button class="submit-button" type="submit">Sign in</button>
      </form>
    </div>
    <div class="modal-footer">
      <p class="create-account-text">Don't have an account?</p>
      <button class="create-account-button" @click="switchToCreateAccountModal">
        Create one
      </button>
    </div>
  </modal-border>
</template>

<style scoped>
.modal-header {
  padding: 30px 0 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-title {
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 2.25rem;
}

.modal-subtitle {
  text-align: center;
  margin: 0;
  font-size: 1rem;
}

.modal-body {
  padding: 20px 40px;
  border-bottom: 1px solid #ffffff40;
}

.modal-footer {
  padding: 25px 40px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.create-account-text {
  margin: 0;
}

.create-account-button {
  padding: 0px;
  font-size: 1rem;
  font-family: inherit;
  border: 0px;
  background-color: transparent;
  color: #40cc99;
  cursor: pointer;
}

.create-account-button:hover {
  text-decoration: underline;
}

.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-input {
  width: 100%;
  background-color: transparent;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-bottom: 2px solid #ffffff80;
}

.submit-button {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  font-family: inherit;
  background-color: #3eb489;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #3eb489cc;
}
</style>
