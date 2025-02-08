<script setup>
import { ref, provide, watch } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true");
const searchQuery = ref(localStorage.getItem("searchQuery") || "");
const page = ref(localStorage.getItem("page") || 1);

watch(
  () => localStorage.getItem("isAuthenticated"),
  (newValue) => {
    isAuthenticated.value = newValue === "true";
    searchQuery.value = "";
    page.value = 1;
  }
);

watch(
  [searchQuery, page],
  () => {
    localStorage.setItem("searchQuery", searchQuery.value);
    localStorage.setItem("page", page.value);
  },
  { deep: true }
);
provide("isAuthenticated", isAuthenticated);
provide("searchQuery", searchQuery);
provide("page", page);
</script>

<template>
  <Header />
  <main><router-view /></main>
  <Footer />
</template>
