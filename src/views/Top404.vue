<template>
  <v-app-bar app dark color="error" tag="section">
    <v-btn icon @click="$router.back()" class="d-lg-none">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>Not Found</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopNotFound',
};
</script>

<style scoped>

</style>
