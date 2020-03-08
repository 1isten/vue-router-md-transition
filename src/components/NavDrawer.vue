<template>
  <v-navigation-drawer v-model="drawer" app dark tag="aside">
    <v-list>
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
</template>

<script>
export default {
  name: 'NavDrawer',
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(drawer) {
        this.$store.dispatch('toggleDrawer', { drawer });
      },
    },
  },
};
</script>

<style scoped>

</style>
