import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

import LoginView from '../views/LoginView.vue';
import EmptyPage from '../views/EmptyPage.vue';
import ManagerDashboardView from '../views/ManagerDashboardView.vue';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    roles?: string[];
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },

    {
      path: '/dashboard',
      redirect: to => {
        const authStore = useAuthStore();
        if (authStore.userData.role.toLowerCase() === 'manager') {
          return '/manager';
        } else if (authStore.userData.role.toLowerCase() === 'admin') {
          return '/admin';
        }
        return '/';
      },
      meta: {
        requiresAuth: true,
      }
    },

    {
      path: '/manager',
      name: 'Manager-Panel',
      component: ManagerDashboardView,
      meta: {
        requiresAuth: true,
        roles: ['manager', 'admin'],
      }
    },

    {
      path: '/admin',
      component: EmptyPage,
      children: [
        {
          path: '',
          name: 'Admin-Panel',
          component: () => import('../views/AdminDashboardView.vue'),
        },
        {
          path: 'simulator',
          name: 'Simulator',
          component: () => import('../views/SimulatorView.vue'),
        }
      ],
      meta: {
        requiresAuth: true,
        roles: ['admin'],
      }
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  // Se o usuario estiver logado e tentar acessar a página de login, redireciona para a página inicial
  if (to.name === 'login') {

    if (authStore.isAuthenticated) {
      return { name: 'Home' };
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!authStore.isAuthenticated) {
      // Se não estiver logado, redireciona para a página de login
      return { name: 'login' };
    }

    // Se a rota necessita de uma role específica, verifica se o usuário tem a role necessária
    if (to.meta.roles) {
      const userRole = authStore.userData.role;

      // Se o usuário tem a role necessária, prossegue para a rota
      if (to.meta.roles.includes(userRole)) {
        return true;

      } else { // Se o usuário não tem a role necessária, redireciona para a página de login
        return { name: 'Home' }
      }
    }
  }

  return true;
});

export default router
