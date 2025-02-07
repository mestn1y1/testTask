<template>
  <footer class="footer">
    <p>&copy; 2025 Your Company. All rights reserved.</p>
    <ul class="footer-links">
      <li><router-link to="/">Privacy Policy</router-link></li>
      <li>
        <router-link to="/">Terms of Service</router-link>
      </li>
      <li><router-link to="/">Contact</router-link></li>
    </ul>
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
  max-width: 100%;
  margin: 0 auto;
}

.footer-links {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}

.footer-links a {
  color: #4caf50;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

@media screen and (min-width: 374px) {
  .footer-links {
    flex-direction: row;
    justify-content: center;
    gap: 12px;
  }
}
</style>
