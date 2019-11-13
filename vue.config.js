module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-router-md-transition/'
    : '/',
  transpileDependencies: [
    'vuetify',
  ],
};
