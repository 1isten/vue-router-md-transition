# vue-router-md-transition

This SFC wraps the built-in `<transition>` component with additional CSS style to achieve [Material Design](https://material.io/design/navigation/navigation-transitions.html#hierarchical-transitions) transition effect for `<router-view/>`.

### Example

In `App.vue`:

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <md-transition :reverse="routeBack">
      <router-view/>
    </md-transition>
  </div>
</template>

<script>
import MaterialDesignTransition from '@/components/MaterialDesignTransition.vue';

export default {
  name: 'App',
  components: {
    'md-transition': MaterialDesignTransition,
  },
  data: () => ({
    routeBack: false,
  }),
  watch: {
    $route(to, from) {
      if (to.path === '/') {
        this.routeBack = true;
        return;
      }
      if (from.path === '/') {
        this.routeBack = false;
        return;
      }
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.routeBack = toDepth < fromDepth;
    },
  },
};
</script>

<style>
:root {
  /* you can override the animation duration, default is 250ms */
  --md-transition-duration: 400ms;
}
</style>
```
