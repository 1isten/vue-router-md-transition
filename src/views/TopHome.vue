<template>
  <v-app-bar app dark tag="section">
    <v-app-bar-nav-icon @click="$store.dispatch('toggleDrawer')" class="d-lg-none" />
    <v-toolbar-title>Home</v-toolbar-title>
    <v-spacer />
    <v-btn icon href="https://github.com/1isten/vue-router-md-transition/tree/demo" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopHome',
};
</script>

<style scoped>

</style>
