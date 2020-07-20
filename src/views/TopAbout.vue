<template>
  <v-app-bar app dark color="accent" tag="section">
    <v-btn icon @click="$router.back()" class="d-lg-none">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>About</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopAbout',
};
</script>

<style scoped>

</style>
