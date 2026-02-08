import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // DEVELOPMENT
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/tests/index.vue"),
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
    path: "/order/requests/detail/:id",
    name: "OrderRequestDetail",
    component: () => import("@/views/OrderRequestDetail.vue"),
  },
  {
    path: "/order/request/simple",
    name: "OrderRequestSimple",
    component: () => import("@/views/OrderRequestSimple.vue"),
  },
  {
    path: "/order/request/advanced",
    name: "OrderRequestAdvanced",
    component: () => import("@/views/OrderRequestAdvanced.vue"),
  },
  {
    path: "/order/history",
    name: "OrderHistory",
    component: () => import("@/views/OrderHistory.vue"),
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: () => import("@/views/OrderDetail.vue"),
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
