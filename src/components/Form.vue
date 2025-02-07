<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit", { name: this.name, email: this.email });
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
