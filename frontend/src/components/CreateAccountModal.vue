<script setup lang="ts">
import ModalBorder from './ModalBorder.vue';
import { createUser } from '../clients/UserClient';
import { ref } from 'vue';
import { useShowModalStore } from '../stores/ShowModalStore';

const showModalStore = useShowModalStore();

const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const switchToSignInModal = () => {
  showModalStore.showCreateAccountModal = false;
  showModalStore.showSignInModal = true;
};

const createAccount = async () => {
  if (await createUser(displayName.value, email.value, password.value)) {
    // account created successfully
  } else {
    // account creation failed
  }
};
</script>

<template>
  <modal-border>
    <div class="modal-header">
      <h2 class="modal-title gowun-batang-bold">Create an account</h2>
      <p class="modal-subtitle">Please sign up below.</p>
    </div>
    <div class="modal-body">
      <form class="create-account-form" @submit.prevent="createAccount">
        <input
          v-model="displayName"
          class="form-input"
          type="text"
          id="displayName"
          placeholder="Display Name"
          required
        />
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
        <input
          v-model="confirmPassword"
          class="form-input"
          type="password"
          id="confirm-password"
          placeholder="Confirm Password"
          required
        />
        <button class="submit-button" type="submit">Create account</button>
      </form>
    </div>
    <div class="modal-footer">
      <p class="sign-in-text">Already have an account?</p>
      <button class="sign-in-button" @click="switchToSignInModal">
        Sign in
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

.sign-in-text {
  margin: 0;
}

.sign-in-button {
  padding: 0px;
  font-size: 1rem;
  font-family: inherit;
  border: 0px;
  background-color: transparent;
  color: #40cc99;
  cursor: pointer;
}

.sign-in-button:hover {
  text-decoration: underline;
}

.create-account-form {
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
