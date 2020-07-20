<template>
  <v-app dark>
    <nav-drawer />

    <md-transition
      :offset-top="$vuetify.application.top"
      :duration="$store.state.transitionDuration"
      :reverse="isRouteBack"
      :disabled="transitionDisabled || $store.getters.transitionDisabled"
    >
      <router-view name="top" />
    </md-transition>

    <v-main>
      <md-transition
        :offset-top="$vuetify.application.top"
        :duration="$store.state.transitionDuration + $store.state.transitionDuration * 0.1 * (isRouteBack ? -1 : 1)"
        :reverse="isRouteBack"
        :disabled="transitionDisabled || $store.getters.transitionDisabled"
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </md-transition>
    </v-main>
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

<style>
.v-app-bar.v-app-bar--fixed {
  position: fixed !important;
}
</style>
