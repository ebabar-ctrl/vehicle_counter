import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import LoginRegister from '../LoginRegister.vue'
import Dashboard from '../Dashboard.vue'
import Summary from '../Summary.vue'
import truckImg from '@/assets/truck.jpg';
import padyakImg from '@/assets/padyak.jpg';
import tricycleImg from '@/assets/tricycle.jpg';
import motorcycleImg from '@/assets/motorcycle.jpg';
const checkAuth = () => {
  const user = localStorage.getItem('currentUser')
  return !!user
}

const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

const routes = [
  { path: '/', component: LoginRegister },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      if (checkAuth()) next()
      else next('/')
    },
    props: () => ({ currentUser: getCurrentUser() }),
  },
  {
    path: '/summary',
    component: Summary,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      if (checkAuth()) next()
      else next('/')
    },
    props: () => ({ currentUser: getCurrentUser() }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
