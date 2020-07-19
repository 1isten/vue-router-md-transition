<template>
  <v-content>
    <v-app-bar app dark color="error" tag="section">
      <v-btn icon @click="$router.back()" class="d-lg-none">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Not Found</v-toolbar-title>
    </v-app-bar>

    <v-container class="fill-height" tag="section">
      <v-layout column justify-center align-center>
        <h1>404</h1>
        <p>Page not found</p>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>

</style>
