import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import WebFont from 'webfontloader';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#ee44aa',
      },
      dark: {
        primary: '#ee44aa',
      },
    },
    options: {
      customProperties: true,
    },
  },
});

WebFont.load({
  google: {
    families: ['Roboto Mono', 'Material+Icons'],
  },
});
