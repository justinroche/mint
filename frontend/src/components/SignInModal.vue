<script setup lang="ts">
import Modal from './Modal.vue';

const signIn = () => {
  console.log('Sign in');
};
</script>

<template>
  <Modal>
    <div class="modal-header">
      <h2 class="modal-title gowun-batang-bold">Welcome</h2>
      <p class="modal-subtitle">Sign in to continue.</p>
    </div>
    <div class="modal-body">
      <form class="sign-in-form" @submit.prevent="signIn">
        <input
          class="form-input"
          type="email"
          id="email"
          placeholder="Email"
          required
        />
        <input
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
      <button class="create-account-button">Create one</button>
    </div>
  </Modal>
</template>

<style scoped>
.modal-header {
  padding: 25px 0 20px;
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
  padding: 25px 40px;
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
  color: #3bc290;
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
