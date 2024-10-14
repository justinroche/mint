<script setup lang="ts">
import {
  performCreateAccountAndLogin,
  checkForExistingEmail,
} from '../clients/UserClient';
import { computed, ref, watch } from 'vue';
import { useShowModalStore } from '../stores/ShowModalStore';
import router from '../router';

const showModalStore = useShowModalStore();

// Form data
const displayName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Email/password validation
const isEmailTaken = ref(false);
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
const disableCreateAccountButton = computed(
  () =>
    showPasswordError.value ||
    showConfirmPasswordError.value ||
    isEmailTaken.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value ||
    !displayName.value
);

const switchToSignInComponent = () => {
  showModalStore.showCreateAccountComponent = false;
  showModalStore.showSignInComponent = true;
};

const createAccount = async () => {
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
  router.push('/dashboard');
};

// Check for existing emails
watch(email, async (newEmail) => {
  if (newEmail) {
    isEmailTaken.value = await checkForExistingEmail(newEmail);
  } else {
    isEmailTaken.value = false;
  }
});
</script>

<template>
  <div class="component">
    <div class="header">
      <h2 class="title gowun-batang-bold">Create an account</h2>
      <p class="subtitle">Please sign up below.</p>
    </div>
    <div class="body">
      <form class="create-account-form" @submit.prevent="createAccount">
        <input
          v-model="displayName"
          class="form-input"
          type="text"
          id="displayName"
          placeholder="Display Name"
          required
        />
        <div>
          <input
            v-model="email"
            class="form-input"
            :class="{ error: isEmailTaken }"
            type="email"
            id="email"
            placeholder="Email"
            required
          />
          <span v-if="isEmailTaken" class="requirements"
            >This email is already registered.</span
          >
        </div>
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
          <div v-if="showPasswordError" class="requirements">
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
          <div class="requirements" v-if="showConfirmPasswordError">
            <span> Passwords do not match.</span>
          </div>
        </div>
        <button
          class="menu-button"
          type="submit"
          :disabled="disableCreateAccountButton"
        >
          Create account
        </button>
      </form>
    </div>
    <div class="footer">
      <p class="sign-in-text">Already have an account?</p>
      <button class="sign-in-button" @click="switchToSignInComponent">
        Sign in
      </button>
    </div>
  </div>
</template>

<style scoped>
.component {
  width: 400px;
}

.header {
  padding: 30px 0 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.title {
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 2.25rem;
}

.subtitle {
  text-align: center;
  margin: 0;
  font-size: 1rem;
}

.body {
  padding: 20px 40px;
  border-bottom: 1px solid #ffffff40;
}

.footer {
  padding: 25px 40px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.menu-button {
  margin: 10px 0;
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

.requirements {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.8rem;
  padding-top: 5px;
}
</style>
