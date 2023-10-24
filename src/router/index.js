import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/RegisterPlayer.vue'),
      props: true
    },
    {
      path: '/trivia',
      name: 'trivia',
      component: () => import('../components/Trivia.vue'),
      props: true
    }
  ]
})

export default router
