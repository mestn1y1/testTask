<script setup>
import { ref, provide, watch } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true");

watch(
  () => localStorage.getItem("isAuthenticated"),
  (newValue) => {
    isAuthenticated.value = newValue === "true";
  }
);

provide("isAuthenticated", isAuthenticated);
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>
