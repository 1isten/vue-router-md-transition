<template>
  <v-app dark>
    <nav-drawer />

    <md-transition
      :offset-top="$vuetify.application.top"
      :duration="300"
      :reverse="isRouteBack"
      :disabled="!$store.getters.transitionEnabled || transitionDisabled"
    >
      <router-view />
    </md-transition>
  </v-app>
</template>

<script>
import MaterialDesignTransition from 'vue-router-md-transition';
import NavDrawer from '@/components/NavDrawer.vue';

export default {
  name: 'App',
  components: {
    'md-transition': MaterialDesignTransition,
    'nav-drawer': NavDrawer,
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
