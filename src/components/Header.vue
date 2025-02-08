<template>
  <header>
    <nav>
      <div class="nav-links">
        <router-link to="/">Домашня</router-link>
        <router-link v-if="isAuthenticated" to="/movies">Фільми</router-link>
      </div>
      <button class="header-btn" v-if="isAuthenticated" @click="logout">
        Вийти
      </button>
    </nav>
  </header>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = inject("isAuthenticated");
const searchQuery = inject("searchQuery");
const page = inject("page");

const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("searchQuery");
  localStorage.removeItem("page");
  searchQuery.value = "";
  page.value = 1;
  isAuthenticated.value = false;
  router.push("/");
};
</script>

<style scoped>
header {
  width: 100%;
}
nav {
  width: 100%;
  background: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
nav a {
  color: white;
  text-decoration: none;
}
nav a:hover {
  color: #45a049;
}
.nav-links {
  display: flex;
  gap: 10px;
}
.header-btn {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.header-btn:hover {
  background-color: #45a049;
}
</style>
