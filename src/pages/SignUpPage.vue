<template>
  <div class="container">
    <h2 v-if="isAuthenticated">Welcome to the Movie Cluster!</h2>
    <button v-if="isAuthenticated" @click="backToHome">Back to Home</button>

    <div v-else>
      <h2>Register</h2>
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
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
