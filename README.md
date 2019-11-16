# vue-router-md-transition [![Version](https://img.shields.io/npm/v/vue-router-md-transition)](https://www.npmjs.com/package/vue-router-md-transition) [![Size](https://img.shields.io/bundlephobia/minzip/vue-router-md-transition@1.0.0?color=brightgreen&label=gzip%20size)](https://bundlephobia.com/result?p=vue-router-md-transition@1.0.0)

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

This package available on [unpkg](https://unpkg.com/vue-router-md-transition) and [jsdelivr](https://cdn.jsdelivr.net/npm/vue-router-md-transition).

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

### Beyond `<router-view/>`

By default, the `<md-transition></md-transition>` will treat the element inside it as a full width (block-level) element. This should be fine under most circumstances as the `<router-view/>` is usually a full width element. But you can add the `.md-auto-width` class to disable this feature in case you don't use a full width router view:

```html
<md-transition class="md-auto-width">
  <router-view/>
</md-transition>
```

In fact, with `.md-auto-width` applied, you can not only use this package for Vue Router, but also any arbitrary transitions supported by Vue:

```html
<md-transition class="md-auto-width">
  <div key="foo" v-if="show">Foo</div>
  <div key="bar" v-else>Bar</div>
</md-transition>
```

If you want more customizations, you can simply take the `src/components/MaterialDesignTransition.vue` file and use it just as any normal Vue SFC and tweak it as you like. Or you can submit a pull request to help me make it better.
