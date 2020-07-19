import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

Vue.use(VueRouter);

export default new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
      },
    },
    {
      path: '/about',
      name: 'about',
      components: {
        default: About,
      },
    },
    {
      path: '*',
      name: 'not-found',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import(/* webpackChunkName: "not-found" */ '@/views/404.vue'),
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    const isRouteBack = toDepth < fromDepth;
    if (to.hash) {
      window.scroll({ top: 0, left: 0, behavior: 'auto' });
      return new Promise((resolve) => {
        const anchor = document.querySelector(to.hash);
        const top = anchor ? anchor.offsetTop - 10 : 0;
        const d = store.state.transitionDuration;
        window.__VUE_MD_TRANSITION_SCROLL_TIMEOUT__ = setTimeout(() => {
          resolve(window.scroll({ top, left: 0, behavior: 'smooth' }));
        }, d > 0 ? d + 100 : 0);
      });
    } else if (savedPosition && isRouteBack) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
