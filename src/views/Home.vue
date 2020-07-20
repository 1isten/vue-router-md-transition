<template>
  <v-container class="fill-height" tag="section">
    <v-layout column justify-center align-center text-center>
      <v-flex shrink>
        <v-img
          :src="require('../assets/logo.svg')"
          min-width="131"
          height="200"
          contain
        ></v-img>
      </v-flex>

      <v-flex shrink>
        <h1 class="text-h4 font-weight-black">
          I ♥️ Vuetify
        </h1>
        <br>
        <p class="text-body-1">
          <a class="info--text" href="https://github.com/1isten/vue-router-md-transition" target="_blank" rel="noopener noreferrer">@vue-router-md-transition</a>
        </p>
        <p class="text-body-2">
          Material Design<br />
          navigation transition effect
        </p>
      </v-flex>

      <v-flex shrink>
        <v-switch
          v-model="transition"
          :label="transition ? 'ON' : 'OFF'"
        ></v-switch>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    transition: {
      get() {
        return this.$store.state.transition;
      },
      set(val) {
        this.$store.dispatch('toggleTransition', val);
      },
    },
  },
};
</script>

<style scoped>

</style>
