<script setup lang="ts">
import { performLogin } from '../clients/UserClient';
import { ref, watch } from 'vue';
import { useShowModalStore } from '../stores/ShowModalStore';
import router from '../router';

const showModalStore = useShowModalStore();

const email = ref('');
const password = ref('');

const showEmailError = ref(false);
const showPasswordError = ref(false);

const switchToCreateAccountComponent = () => {
  showModalStore.showSignInComponent = false;
};

const attemptLogin = async () => {
  const error = await performLogin(email.value, password.value);
  if (error) {
    if (error === 'User not found') {
      showEmailError.value = true;
    } else if (error === 'Invalid password') {
      showPasswordError.value = true;
    } else {
      // TODO: handle other errors more elegantly
      alert(error);
    }
    return;
  }
  router.push('/dashboard');
};

watch(email, () => {
  showEmailError.value = false;
});
watch(password, () => {
  showPasswordError.value = false;
});
</script>

<template>
  <div class="component">
    <div class="header">
      <h2 class="title gowun-batang-bold">Welcome</h2>
      <p class="subtitle">Sign in to continue.</p>
    </div>
    <div class="body">
      <form class="sign-in-form" @submit.prevent="attemptLogin">
        <div>
          <input
            v-model="email"
            class="form-input"
            :class="{ error: showEmailError }"
            type="email"
            id="email"
            placeholder="Email"
            required
          />
          <span class="error-span" v-if="showEmailError"
            >No user found with this email address.</span
          >
        </div>
        <div>
          <input
            v-model="password"
            class="form-input"
            :class="{ error: showPasswordError }"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <span class="error-span" v-if="showPasswordError"
            >Incorrect password.</span
          >
        </div>
        <button class="menu-button" type="submit">Sign in</button>
      </form>
    </div>
    <div class="footer">
      <p class="create-account-text">Don't have an account?</p>
      <button
        class="create-account-button"
        @click="switchToCreateAccountComponent"
      >
        Create one
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

.error-span {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 0.8rem;
  padding-top: 5px;
}
</style>
