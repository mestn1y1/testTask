<template>
  <div class="container">
    <h2 v-if="isAuthenticated">Welcome to the Movie Cluster!</h2>
    <button v-if="isAuthenticated" @click="backToHome">Back to Home</button>

    <div v-else>
      <h2>Please sign up to continue</h2>
      <Form @submit="handleSubmit" />
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import Form from "@/components/Form.vue";

const router = useRouter();
const isAuthenticated = inject("isAuthenticated");

const handleSubmit = () => {
  localStorage.setItem("isAuthenticated", "true");
  isAuthenticated.value = true;
  router.push("/home");
};

const backToHome = () => {
  router.push("/home");
};
</script>

<style scoped>
.container {
  height: 100vh;
  background: url(/public/0585964.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container h2 {
  font-size: 50px;
  font-weight: bold;
  color: #242424;
  margin-bottom: 24px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  margin: 0 auto;
}

button:hover {
  background-color: #45a049;
}

</style>
