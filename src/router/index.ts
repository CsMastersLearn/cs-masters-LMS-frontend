import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/views/HomeView.vue';
import LoginView from '@/views/views/LoginView.vue';
import RegisterView from '@/views/views/RegisterView.vue';
import DemoView from '@/views/pages/CoursesPage.vue';
import BlogsPage from '@/views/pages/BlogsPage.vue';
import StudyMaterialPage from '@/views/pages/StudyMaterialPage.vue';
import DashboardPage from '@/views/pages/DashboardPage.vue';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardPage,
        },
        {
          path: '/demo',
          name: 'demo',
          component: DemoView,
        },
        {
          path: '/blogs',
          name: 'blogs',
          component: BlogsPage,
        },
        {
          path: '/study-materials',
          name: 'study-materials',
          component: StudyMaterialPage,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
});

export const setupRouteGaurds = async () => {
  const authStore = useAuthStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router.beforeEach(async (to, from) => {
    const { data, error } = await authStore.getSession();

    if (error) {
      // TODO: Toast Display of error
      return { name: 'login' };
    }

    if (!data?.session && to.name !== 'login' && to.name !== 'register') {
      return { name: 'login' };
    }

    if (data?.session && (to.name === 'login' || to.name === 'register')) {
      return { name: 'home' };
    }
  });
};

export default router;
