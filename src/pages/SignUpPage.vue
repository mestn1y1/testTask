<template>
  <div class="container">
    <h2 v-if="isAuthenticated">Ласкаво просимо до Movie Cluster!</h2>
    <button v-if="isAuthenticated" @click="backToMovies">
      Назад до Фільмів
    </button>

    <div v-else>
      <h2>Зареєструйся, щоб скористатися сервісом!</h2>
      <Form
        @submit="handleSubmit"
        :username="formData.username"
        :email="formData.email"
        @update:username="formData.username = $event"
        @update:email="formData.email = $event"
        :formError="formError"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Form from "@/components/Form.vue";

const router = useRouter();
const isAuthenticated = inject("isAuthenticated");

const formData = ref({
  username: "",
  email: "",
});

const formError = ref(false);

const handleSubmit = () => {
  if (formData.value.username && formData.value.email) {
    localStorage.setItem("isAuthenticated", "true");
    isAuthenticated.value = true;
    router.push("/movies");
  } else {
    formError.value = true;
    toast("Будь ласка, заповніть всі поля.", {
      type: "error",
      position: "top-right",
      autoClose: 2000,
    });
  }
};

const backToMovies = () => {
  router.push("/movies");
};
</script>

<style scoped>
.container {
  height: 820px;
  background: url(/0585964.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.container h2 {
  font-size: 40px;
  font-weight: bold;
  color: #242424;
  margin-bottom: 24px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.error {
  margin-top: 12px;
  color: red;
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
