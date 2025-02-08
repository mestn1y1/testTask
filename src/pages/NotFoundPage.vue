<template>
  <div class="not-found">
    <h2>Сторінка не знайдена</h2>
    <p>Сторінка, яку ви шукаєте, не існує.</p>
    <button @click="backToHome">На Домашню</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const backToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.not-found {
  height: 818px;
  text-align: center;
  padding-top: 350px;
}

.not-found button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  margin: 0 auto;
  margin-top: 24px;
}

.not-found button:hover {
  background-color: #45a049;
}
</style>
