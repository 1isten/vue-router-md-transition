<template>
  <v-content>
    <v-app-bar app dark tag="section">
      <v-app-bar-nav-icon @click="$store.dispatch('toggleDrawer')" class="d-lg-none" />
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer />
      <v-btn icon href="https://github.com/1isten/vue-router-md-transition/tree/demo" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container class="fill-height" tag="section">
      <v-layout column justify-center align-center text-center>
        <v-flex shrink>
          <v-img
            :src="require('../assets/logo.svg')"
            height="200"
            contain
          ></v-img>
        </v-flex>

        <v-flex shrink>
          <h1 class="display-1 font-weight-black">
            I ♥️ Vuetify
          </h1>
          <p class="body-1">
            <br><a href="https://github.com/1isten/vue-router-md-transition" target="_blank" rel="noopener noreferrer">@vue-router-md-transition</a>
          </p>
          <p class="body-2">
            Material Design<br />
            navigation transition effect
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>

</style>
