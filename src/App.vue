<script setup>
import { ref, provide, watch } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

// Реактивное состояние авторизации
const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true");

// Следим за изменением в localStorage
watch(
  () => localStorage.getItem("isAuthenticated"),
  (newValue) => {
    isAuthenticated.value = newValue === "true";
  }
);

// Передаем состояние вниз по компонентному дереву
provide("isAuthenticated", isAuthenticated);
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>
