import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // DEVELOPMENT
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/tests/index.vue"),
  },
  {
    path: "/component",
    name: "component",
    component: () => import("@/views/tests/component.vue"),
  },
  // MAIN
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/warehouses",
    name: "warehouses",
    component: () => import("@/views/Warehouses.vue"),
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: () => import("@/views/PrivacyPolicy.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;