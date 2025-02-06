<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="isAuthenticated" to="/home">Movies</router-link>
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = inject("isAuthenticated");

const logout = () => {
  localStorage.removeItem("isAuthenticated");
  isAuthenticated.value = false;
  router.push("/");
};
</script>

<style scoped>
header {
  width: 100%;
  background: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
