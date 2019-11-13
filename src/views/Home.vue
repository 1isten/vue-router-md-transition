<template>
  <div class="home">
    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon class="d-lg-none" @click="$store.dispatch('toggleDrawer')"/>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon href="https://github.com/1isten/vue-router-md-transition" target="_blank">
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <v-layout text-center align-content-center wrap>
          <v-flex xs12>
            <v-img
              :src="require('../assets/logo.svg')"
              class="my-3"
              contain
              height="200"
            ></v-img>
          </v-flex>

          <v-flex mb-4>
            <h1 class="display-2 font-weight-bold mb-3">
              I ♥️ Vuetify
            </h1>
            <p class="subheading font-weight-regular">
              <br><a href="https://github.com/1isten/vue-router-md-transition" target="_blank" rel="noopener noreferrer">@vue-router-md-transition</a>
            </p>
            <p class="subheading font-weight-regular">
              Material Design<br>navigation transition effect
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>

</style>
