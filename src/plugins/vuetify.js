import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import WebFont from 'webfontloader';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#ee44aa',
        secondary: colors.grey.darken3, // #424242
        accent: colors.blue.accent1,    // #82b1ff
        error: colors.red.accent2,      // #ff5252
        info: colors.blue,              // #2196f3
        success: colors.green,          // #4caf50
        warning: colors.amber,          // #ffc107
        anchor: colors.blue.darken2,    // #1976d2
      },
    },
  },
});

WebFont.load({
  google: {
    families: ['Roboto Mono', 'Material+Icons'],
  },
});
