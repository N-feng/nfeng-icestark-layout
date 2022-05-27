import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Login from './pages/Login.vue';
import NotFound from './pages/NotFound.vue';
import Layout from "./layouts/BasicLayout/index.vue";
import IcestarkApp from './components/IcestarkApp.vue';
import IcestarkReact from './components/IcestarkReact.vue';

const routerHistory = createWebHistory();

const routes: any = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: Home,
      // component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'el-icon-s-home', affix: true }
    }]
  },
  {
    path: '/seller',
    component: Layout,
    name: 'Seller',
    meta: { title: '商家平台（React）', icon: 'el-icon-edit-outline' },
    children: [
      {
        path: '',
        name: 'IcestarkReact',
        meta: { title: '商家首页', icon: 'el-icon-setting' },
        component:  IcestarkReact
      },
      {
        path: 'list',
        name: 'List',
        meta: { title: '商家列表', icon: 'el-icon-setting' },
        component:  IcestarkReact
      },
      {
        path: 'detail',
        name: 'Detail',
        meta: { title: '商家详情', icon: 'el-icon-setting' },
        component:  IcestarkReact
      }
    ]
  },
   {
    path: '/waiter',
    component: Layout,
    name: 'Waiter',
    meta: { title: '小二平台（Vue）', icon: 'el-icon-edit-outline' },
    children: [
      {
        path: '',
        name: 'IcestarkApp',
        meta: { title: '小二首页', icon: 'el-icon-setting' },
        component:  IcestarkApp
      },
      {
        path: 'list',
        name: 'List',
        meta: { title: '小二列表', icon: 'el-icon-setting' },
        component:  IcestarkApp
      },
      {
        path: 'detail',
        name: 'Detail',
        meta: { title: '小二详情', icon: 'el-icon-setting' },
        component:  IcestarkApp
      }
    ]
  }
]

const router = createRouter({
  history: routerHistory,
  routes: routes,
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: Home,
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     component: About,
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     component: Login,
  //   },
  //   {
  //     path: '/:pathMatch(.*)',
  //     name: 'notfound',
  //     component: NotFound,
  //   },
  // ],
});

export default router;
