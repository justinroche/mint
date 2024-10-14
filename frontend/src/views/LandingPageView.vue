<script setup lang="ts">
import { useUserStore } from '../stores/UserStore';
import { useShowModalStore } from '../stores/ShowModalStore';
import router from '../router';
import SignInComponent from '../components/SignInComponent.vue';
import CreateAccountComponent from '../components/CreateAccountComponent.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const userStore = useUserStore();
const showModalStore = useShowModalStore();

if (userStore.user._id) {
  router.push('/dashboard');
}

// Cycling text logic
const texts = ref([
  'Track expenses',
  'Build a budget',
  'Achieve financial freedom',
]);

const currentIndex = ref(0);

const updateText = () => {
  currentIndex.value = (currentIndex.value + 1) % texts.value.length;
};

let intervalId: number;

onMounted(() => {
  intervalId = setInterval(updateText, 5000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="page-body">
    <div class="left-column">
      <div>
        <h1 class="gowun-batang-bold title">Mint</h1>
        <div class="cycling-text">
          <transition name="fade" mode="out-in">
            <span :key="currentIndex">{{ texts[currentIndex] }}</span>
          </transition>
        </div>
      </div>
      <div class="credits">
        <span>Developed by Justin Roche</span>
      </div>
    </div>
    <div class="vertical-line"></div>
    <div class="right-column">
      <div class="sign-in-wrapper">
        <Transition name="modal" mode="out-in">
          <component
            :is="
              showModalStore.showSignInComponent
                ? SignInComponent
                : CreateAccountComponent
            "
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
  box-sizing: border-box;
  gap: 5%;
}

.vertical-line {
  width: 4px;
  height: 800px;
  max-height: 80%;
  background-color: #ffffff20;
  margin: 0 20px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
}

.left-column {
  text-align: left;
  flex: 1;
  height: 400px;
  max-height: 90%;
  justify-content: space-between;
}

.title {
  font-size: 6rem;
  line-height: 1;
  margin: 0;
}

.cycling-text {
  font-size: 1.5rem;
  margin-top: 10px;
}

.credits {
  font-size: 0.8rem;
  color: #ffffff80;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
