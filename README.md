# vue-router-md-transition

The `MaterialDesignTransition.vue` SFC(Single File Component) wraps Vue's built-in `<transition>` component with additional CSS styles to achieve [Material Design](https://material.io/design/navigation/navigation-transitions.html#hierarchical-transitions) transition effect.

### Demo

[A Vuetify SPA](https://1isten.github.io/vue-router-md-transition)

### Usage

```html
<md-transition>
  <router-view/>
</md-transition>
```

### Install

##### Direct Download / CDN

Include the UMD build after `vue` and `vue-router`, the component will be registered automatically:

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
<script src="/path/to/vue-router-md-transition.umd.min.js"></script>
```

##### ES module

Install via npm:

```sh
npm install vue-router-md-transition
```

Import into your application:

```js
import MaterialDesignTransition from 'vue-router-md-transition';
```

Register the component:

```js
// globally
Vue.component('md-transition', MaterialDesignTransition);
```

or

```js
// locally
export default {
  components: {
    'md-transition': MaterialDesignTransition,
  },
};
```

### Customize:

Revert the transition direction:

```html
<md-transition :reverse="true">
  <router-view/>
</md-transition>
```

You can dynamically apply the direction by watching router's behavior. For example:

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
import MaterialDesignTransition from 'vue-router-md-transition';

export default {
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
```

There are currently 4 CSS variables you can override:

```html
<style>
:root {
  /* override the animation duration, default is 250ms */
  --md-transition-duration: 400ms;

  /* override the fading layer background, default is #fafafa */
  --md-fading-background: white;

  /* disable the fading layer offset top if you are not using the material design app bar */
  /* default are 56px (when viewport width < 960px) and 64px (when viewport width >= 960px) */
  --md-app-bar-height: 0;
  --md-app-bar-height-large: 0;
}
</style>
```

If you want more customizations, you can simply take the `src/components/MaterialDesignTransition.vue` file and use it just as any normal Vue SFC and tweak it as you like. Or you can submit a pull request to help me make it better.
