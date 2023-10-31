import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const base = '/miniutils';
const routes = [
  {
    path: '/',
    redirect: '/miniutils/home',
  },
  // {
  //   path: base,
  //   redirect: base + '/login',
  // },
  // {
  //   path: base + '/login',
  //   name: 'login',
  //   component: () => import('@/pages/login.vue'),
  // },
  {
    path: '/miniutils',
    name: '布局',
    component: () => import('@/pages/layout.vue'),
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/pages/home.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  base,
  routes,
});

router.beforeEach(to => {
  if (to.name === 'login') {
    sessionStorage.setItem('miniutils', null);
    sessionStorage.clear();
  } else {
    store.commit('CHANGE_ROUTER_VIEW_LOADING', true);
  }
});

router.afterEach(() => {
  setTimeout(() => {
    store.commit('CHANGE_ROUTER_VIEW_LOADING', false);
  }, 1000);
});

export { routes, router };
