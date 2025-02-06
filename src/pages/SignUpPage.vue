<template>
  <div>
    <h2>Register</h2>
    <Form @submit="handleSubmit" />
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
</script>
