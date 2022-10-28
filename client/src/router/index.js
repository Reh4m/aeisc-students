import Vue from "vue";
import VueRouter from "vue-router";
import authGuard from "./authGuard.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: () => import("../views/Errors/NotFound.vue"),
  },
  {
    path: "/",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/Auth/Signin.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
