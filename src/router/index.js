import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/SignUpPage.vue"),
  },
  {
    path: "/movies",
    component: () => import("@/pages/HomePage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/movie/:id",
    component: () => import("@/pages/MovieDetailsPage.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFoundPage.vue"),
  },
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
