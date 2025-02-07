import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import MovieDetailsPage from "@/pages/MovieDetailsPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  { path: "/", component: SignUpPage },
  { path: "/movies", component: HomePage, meta: { requiresAuth: true } },
  { path: "/movie/:id", component: MovieDetailsPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
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
