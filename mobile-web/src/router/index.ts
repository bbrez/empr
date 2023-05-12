import { useAuthStore } from '@/stores/authStore';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/maps',
    name: 'Mapas',
    component: () => import('../views/MapView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '',
    name: 'Debug',
    component: () => import('../views/DebugView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (to.name !== 'Login' && !authStore.isAuthenticated) {
    return { name: 'Login' };
  }

  return true;
})

export default router
