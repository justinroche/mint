<script setup lang="ts">
import ModalBorder from './ModalBorder.vue';
import { performCreateAccountAndLogin } from '../clients/UserClient';
import { computed, ref } from 'vue';
import { useShowModalStore } from '../stores/ShowModalStore';

const showModalStore = useShowModalStore();

// Form data
const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Password validation
const minimumPasswordLength = 8;
const isPasswordLongEnough = computed(
  () => password.value.length >= minimumPasswordLength
);
const doesPasswordContainALetter = computed(() =>
  /[a-zA-Z]/.test(password.value)
);
const doesPasswordContainANumber = computed(() => /\d/.test(password.value));
const doPasswordsMatch = computed(
  () => password.value === confirmPassword.value
);
const showPasswordError = computed(
  () =>
    password.value.length > 0 &&
    (!isPasswordLongEnough.value ||
      !doesPasswordContainALetter.value ||
      !doesPasswordContainANumber.value)
);
const showConfirmPasswordError = computed(
  () => confirmPassword.value.length > 0 && !doPasswordsMatch.value
);

const switchToSignInModal = () => {
  showModalStore.showCreateAccountModal = false;
  showModalStore.showSignInModal = true;
};

const createAccount = async () => {
  if (showPasswordError.value || showConfirmPasswordError.value) {
    return;
  }
  const error = await performCreateAccountAndLogin(
    displayName.value,
    email.value,
    password.value
  );
  if (error) {
    // TODO: handle error more elegantly
    alert(error);
    return;
  }
  showModalStore.showCreateAccountModal = false;
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
        <div>
          <input
            v-model="password"
            class="form-input"
            :class="{
              error: showPasswordError,
            }"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <div v-if="showPasswordError" class="password-requirements">
            <span v-if="!isPasswordLongEnough"
              >Password must be at least 8 characters long.</span
            >
            <span v-if="!doesPasswordContainALetter"
              >Password must contain at least one letter.</span
            >
            <span v-if="!doesPasswordContainANumber"
              >Password must contain at least one number.</span
            >
          </div>
        </div>
        <div>
          <input
            v-model="confirmPassword"
            class="form-input"
            :class="{ error: showConfirmPasswordError }"
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            required
          />
          <div class="password-requirements" v-if="showConfirmPasswordError">
            <span> Passwords do not match.</span>
          </div>
        </div>
        <button class="menu-button" type="submit">Create account</button>
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

.password-requirements {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.8rem;
  padding-top: 5px;
}
</style>
