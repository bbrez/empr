import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

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
      path: '/admin',
      name: 'Admin-Panel',
      component: DashboardView,
      meta: {
        requiresAuth: true,
        roles: ['admin'],
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = localStorage.getItem('user');

    if (!user) {
      // Se não estiver logado, redireciona para a página de login
      next({ name: 'Home', query: { redirect: to.fullPath } });
      return;
    }

    // Se a rota necessita de uma role específica, verifica se o usuário tem a role necessária
    if (to.meta.roles) {
      const userRole = JSON.parse(user).role;

      // Se o usuário tem a role necessária, prossegue para a rota
      if (to.meta.roles.includes(userRole)) {
        next();

      } else { // Se o usuário não tem a role necessária, redireciona para a página de login
        next({ name: 'Home', query: { redirect: to.fullPath } });

      }
    }
  }

  next();
});

export default router
