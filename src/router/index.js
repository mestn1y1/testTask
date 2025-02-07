import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import MovieDetailsPage from "@/pages/MovieDetailsPage.vue";

const routes = [
  { path: "/", component: SignUpPage },
  { path: "/movies", component: HomePage, meta: { requiresAuth: true } },
  { path: "/movie/:id", component: MovieDetailsPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
