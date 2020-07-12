import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
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
        const md = document.querySelector('[data-md-transition-duration]');
        const d = md ? +md.dataset.mdTransitionDuration + 100 : 0;
        window.__MD_TRANSITION_SCROLL_TIMEOUT__ = setTimeout(() => {
          window.scroll({ top, left: 0, behavior: 'smooth' });
          resolve();
        }, Number.isNaN(d) ? 0 : d);
      });
    } else if (savedPosition && isRouteBack) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});
