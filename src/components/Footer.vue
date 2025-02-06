<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2025 Your Company. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/privacy-policy">Privacy Policy</router-link>
        <router-link to="/terms-of-service">Terms of Service</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-links {
  margin-top: 10px;
}

.footer-links a {
  color: #4caf50;
  margin: 0 10px;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>