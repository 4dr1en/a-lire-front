import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/Fluxes",
      name: "fluxes",
      component: () => import("../views/FluxesView.vue"),
    },
    {
      path: "/Fluxes/:id",
      name: "flux",
      component: () => import("../views/FluxView.vue"),
    },
        {
      path: "/articles/:id",
      name: "article",
      component: () => import("../views/ArticleView.vue"),
    },
  ],
});

export default router;
