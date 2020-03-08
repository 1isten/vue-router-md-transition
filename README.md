# vue-router-md-transition [![Version](https://img.shields.io/npm/v/vue-router-md-transition)](https://www.npmjs.com/package/vue-router-md-transition)

The [MaterialDesignTransition.vue](https://github.com/1isten/vue-router-md-transition/blob/master/src/components/MaterialDesignTransition.vue) SFC(Single File Component) wraps Vue's built-in `<transition>` component with additional CSS styles to achieve [Material Design](https://material.io/design/navigation/navigation-transitions.html#hierarchical-transitions) transition effect.

### Demo

[A Vuetify SPA](https://1isten.github.io/vue-router-md-transition)

### Usage

```html
<md-transition>
  <router-view></router-view>
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

📦 This package is available on [unpkg](https://unpkg.com/vue-router-md-transition), [jsdelivr](https://cdn.jsdelivr.net/npm/vue-router-md-transition) and [bundle.run](https://bundle.run/vue-router-md-transition).

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

##### Transition direction

```html
<md-transition :reverse="true">
  <router-view></router-view>
</md-transition>
```

##### Disable transition

```html
<md-transition :disabled="true">
  <router-view></router-view>
</md-transition>
```

You can dynamically control the transition by watching router's behavior. For example:

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <md-transition :reverse="routeBack" :disabled="transitionDisabled">
      <router-view></router-view>
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
    transitionDisabled: false,
  }),
  watch: {
    $route(to, from) {
      // disabled for browser refresh
      this.transitionDisabled = !from.name;
      // dynamically set direction
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

##### Transition speed

Use CSS variable to override the default (250ms) animation duration:

```html
<style>
:root {
  --md-transition-duration: 400ms;
}
</style>
```

##### The fading layer

The fading effect is achieved by adding an additional layer between the current view element and the upcoming view element. This fading layer is just the `::after` psuedo element of the element of current view (or previous view in reversed direction), with its `background` set to the same with the element container's background and gradually increasing its `opacity` from `0` to `1`. This creates a visual effect of fading.

##### Change fading layer background

To get the best result, the the fading layer's background should match the background of the element's container.

Use CSS variable to override the default background:

```html
<style>
:root {
  /* set a color to match container's background, default is #fafafa */
  --md-fading-background: white;
}
</style>
```

If your app is in dark mode you may want the fading background to be dark:

```html
<md-transition class="md-dark">
  <router-view></router-view>
</md-transition>

<style>
:root {
  /* set a color to match container's background, default is #121212 */
  --md-fading-background-dark: black;
}
</style>
```

##### Change fading layer offset top

By default, during transition there will be an offset top for the fading layer in order to not overlap with the [Material Design top app bar](https://material.io/components/app-bars-top/#specs). This can also be overriden by CSS variables:

```html
<style>
:root {
  /* default is 56px, when viewport width < 960px */
  --md-app-bar-height: 0;
  /* default is 64px, when viewport width >= 960px */
  --md-app-bar-height-large: 0;
}
</style>
```

You can use `.md-no-app-bar` to quickly disable the offset top if your page is not using the app bar:

```html
<md-transition class="md-no-app-bar">
  <router-view></router-view>
</md-transition>
```

Or use `.md-app-bar-extended` to set it to `128px` if you're using an [extended top app bar](https://material.io/components/app-bars-top/#specs):

```html
<md-transition class="md-app-bar-extended">
  <router-view></router-view>
</md-transition>
```

##### Beyond Vue Router

By default, the `<md-transition></md-transition>` will treat its direct child as a full width/height (block-level) element. This should be fine under most circumstances. But you can add `.md-auto-width`/`.md-auto-height` classes to disable this feature in case you don't want a full width/height router view:

```html
<md-transition class="md-auto-width md-auto-height">
  <router-view></router-view>
</md-transition>
```

In fact, with these classes applied, you can not only use this package for Vue Router, but also any arbitrary transitions supported by Vue:

```html
<md-transition class="md-auto-width md-auto-height">
  <div key="foo" v-if="show">Foo</div>
  <div key="bar" v-else>Bar</div>
</md-transition>
```

If you want more customizations, simply take the `src/components/MaterialDesignTransition.vue`, tweak it and use it just as any normal Vue SFC the way you like. Or you can submit a pull request to help me make it better.
