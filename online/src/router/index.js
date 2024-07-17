import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name:'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/my',
      name:'my',
      component: () => import('../views/MyView.vue')
    },
    {
      path: '/property',
      name: 'property',
      component: () => import('../views/PropertyView.vue')
    },
    {
      path: '/adddeadproperty',
      name: 'adddeadproperty',
      component: () => import('../views/AddDeadPropertyView.vue')
    },
    {
      path:'/resurrect',
      name:'resurrect',
      component: () => import('../views/ResurrectView.vue')
    },
    {
      path: '/realhome',
      name:'realhome',
      component: () => import('../views/RealHomeView.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../views/TransferView.vue')
    },
    {
      path: '/tradelist',
      name: 'tradelist',
      component: () => import('../views/TradeListView.vue')
    },
    {
      path: '/myfriend',
      name:'myfriend',
      component: () => import('../views/MyFriendView.vue')
    }
  ]
})

export default router
