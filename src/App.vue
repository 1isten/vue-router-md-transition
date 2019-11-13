<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list nav dense>
        <v-list-item :to="{ name: 'home' }" exact>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'about' }" exact>
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <md-transition :reverse="routeBack">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </md-transition>
  </v-app>
</template>

<script>
// @ is an alias to /src
import MaterialDesignTransition from '@/components/MaterialDesignTransition.vue';

export default {
  name: 'App',
  components: {
    'md-transition': MaterialDesignTransition,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.dispatch('toggleDrawer', { val });
      },
    },
  },
  data: () => ({
    routeBack: false,
  }),
  watch: {
    $route(to, from) {
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
  --md-transition-duration: 400ms;
}
</style>
