import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: () => import('@/view/layout/Mall'),
    children: [
      {
        path: '',
        name: 'mall',
        meta: { title: 'Home' },
        component: () => import('@/view/page/Mall.vue')
      }
    ]
  },
  {
    path: '/accounted',
    component: () => import('@/view/layout/Lockedout'),
    children: [
      {
        path: '',
        name: 'accounted',
        meta: { title: 'New Account' },
        component: () => import('@/view/page/lockedout/NewAccount.vue')
      },
      {
        path: '/redirect/:source/:artifact',
        meta: { title: 'Redirect' },
        name: 'redirect',
        component: () => import('@/view/page/lockedout/Redirect.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('@/view/layout/Auth'),
    children: [
      {
        path: '',
        name: 'signin',
        meta: { title: 'Sign In' },
        component: () => import('@/view/page/auth/SignIn')
      },
      {
        path: '/signup',
        name: 'signup',
        meta: { title: 'Sign Up' },
        component: () => import('@/view/page/auth/SignUp')
      }
    ]
  },
  {
    path: '/',
    redirect: '/dash',
    component: () => import('@/view/layout/Admin'),
    children: [
      {
        path: '/dash',
        name: 'monitor',
        meta: { title: 'Monitor' },
        component: () => import('@/view/page/admin/Monitor')
      },
      {
        path: '/industry',
        name: 'industry',
        meta: { title: 'Industry' },
        component: () => import('@/view/page/admin/Industry')
      },
      {
        path: '/trackrecord',
        name: 'trackrecord',
        meta: { title: 'Track Record' },
        component: () => import('@/view/page/admin/TrackRecord')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    // the 404 route, when none of the above matches
    path: '/404',
    name: '404',
    meta: { title: 'Not Found' },
    component: () => import('@/view/page/error/Error-1.vue')
  }
];
export const router = new Router({
  routes
});
export const { isNavigationFailure, NavigationFailureType } = Router;

export default { router, isNavigationFailure, NavigationFailureType };
