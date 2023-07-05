import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/lista-passeios',
    name: 'ListaPasseios',
    component: () => import('@/views/ListaPasseiosPage.vue')
  },

  {
    path: '/admin-users',
    name: 'AdminUsers',
    component: () => import('@/views/Admin/AdminUsersPage.vue')
  },
  {
    path: '/admin-create-user',
    name: 'AdminCreateUser',
    component: () => import('@/views/Admin/AdminCreateUserPage.vue')
  },
  {
    path: '/admin-companies',
    name: 'AdminCompanies',
    component: () => import('@/views/Admin/AdminCompaniesPage.vue')
  },
  {
    path: '/admin-create-company',
    name: 'AdminCreateCompany',
    component: () => import('@/views/Admin/AdminCreateCompanyPage.vue')
  },

  {
    path: '/register-trip',
    name: 'RegisterTrip',
    component: () => import('@/views/Manager/RegisterTripPage.vue')
  },

  {
    path: '/trips/:id',
    name: 'TripDetails',
    component: () => import('@/views/Manager/TripDetailsPage.vue')
  },
  {
    path: '/trips/:id/map',
    name: 'TripMap',
    component: () => import('@/views/TripMapPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
