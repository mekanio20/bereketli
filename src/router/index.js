import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/stores/app";

const routes = [
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
    meta: { requiresAuth: true },
  },
  {
    path: "/order/requests/detail/:id",
    name: "OrderRequestDetail",
    component: () => import("@/views/OrderRequestDetail.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/order/request/simple",
    name: "OrderRequestSimple",
    component: () => import("@/views/OrderRequestSimple.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/order/request/advanced",
    name: "OrderRequestAdvanced",
    component: () => import("@/views/OrderRequestAdvanced.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/order/history",
    name: "OrderHistory",
    component: () => import("@/views/OrderHistory.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: () => import("@/views/OrderDetail.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("@/views/Account.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/Chat.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import('@/views/About.vue'),
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
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 120,
        behavior: "smooth",
      };
    }

    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const accessToken = localStorage.getItem("bereketli_access");

  if (requiresAuth && !accessToken) {
    appStore.setModal("login");
  } else {
    next();
  }
});

export default router;
