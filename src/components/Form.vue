<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <label for="username">Ім'я:</label>
      <input
        type="text"
        id="username"
        :value="username"
        @input="$emit('update:username', $event.target.value)"
      />

      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        :value="email"
        @input="$emit('update:email', $event.target.value)"
      />
      <button>Зареєструватися</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    formError: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
  color: #333;
  text-align: left;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background: transparent;
  color: #333;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
