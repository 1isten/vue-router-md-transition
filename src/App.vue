<template>
  <v-app dark>
    <nav-drawer />

    <md-transition
      :duration="300"
      :reverse="isRouteBack"
      :disabled="transitionDisabled"
    >
      <keep-alive>
        <router-view />
      </keep-alive>
    </md-transition>
  </v-app>
</template>

<script>
import MaterialDesignTransition from 'vue-router-md-transition';
import NavDrawer from '@/components/NavDrawer.vue';

export default {
  name: 'App',
  components: {
    'nav-drawer': NavDrawer,
    'md-transition': MaterialDesignTransition,
  },
  data: () => ({
    isRouteBack: false,
    transitionDisabled: false,
  }),
  watch: {
    $route(to, from) {
      this.transitionDisabled = !from.name;
      if (to.path === '/') {
        this.isRouteBack = true;
      } else if (from.path === '/') {
        this.isRouteBack = false;
      } else {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.isRouteBack = toDepth < fromDepth;
      }
    },
  },
};
</script>
