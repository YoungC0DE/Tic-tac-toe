import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/tic-tac-toe"
    },
    {
      path: "/tic-tac-toe",
      name: "Game",
      component: () => import("../App.vue"),
    },
  ]
})

export default router
