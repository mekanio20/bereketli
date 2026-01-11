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
    path: "/news",
    name: "News",
    component: () => import("@/views/News.vue"),
  },
  {
    path: "/news/:id",
    name: "NewsDetail",
    component: () => import("@/views/NewsDetail.vue"),
  },
  {
    path: "/forbidden-cargo",
    name: "Forbidden",
    component: () => import("@/views/Forbidden.vue"),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("@/views/FAQ.vue"),
  },
  {
    path: "/order/requests",
    name: "OrderRequest",
    component: () => import("@/views/OrderRequest.vue"),
  },
  {
    path: "/order/request/new",
    name: "OrderRequestNew",
    component: () => import("@/views/OrderRequestNew.vue"),
  },
  {
    path: "/order/history",
    name: "OrderHistory",
    component: () => import("@/views/OrderHistory.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/Chat.vue"),
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
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
