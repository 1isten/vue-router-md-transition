<template>
  <v-app dark>
    <nav-drawer />

    <md-transition class="md-dark" :reverse="routeBack" :disabled="transitionDisabled">
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
    routeBack: false,
    transitionDisabled: false,
  }),
  watch: {
    $route(to, from) {
      this.transitionDisabled = !from.name;
      if (to.path === '/') {
        this.routeBack = true;
        return;
      }
      if (from.path === '/') {
        this.routeBack = false;
        return;
      }
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.routeBack = toDepth < fromDepth;
    },
  },
};
</script>

<style>
:root {
  background-color: #121212;
  --md-transition-duration: 400ms;
}
</style>
