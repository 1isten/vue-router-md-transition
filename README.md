# vue-router-md-transition [![Version](https://img.shields.io/npm/v/vue-router-md-transition)](https://www.npmjs.com/package/vue-router-md-transition)

A simple transparent wrapper component for Vue's built-in [`<transition>` component](https://vuejs.org/v2/guide/transitions.html#Transitioning-Single-Elements-Components) with [Material Design transition effect](https://material.io/design/navigation/navigation-transitions.html#hierarchical-transitions) baked in.


### Demo

- [Codepen (CDN)](https://codepen.io/1isten/pen/mdJqQJm)
- [Vuetify SPA (ES module)](https://1isten.github.io/vue-router-md-transition)

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

📦 This package is available on [unpkg](https://unpkg.com/vue-router-md-transition), [jsdelivr](https://cdn.jsdelivr.net/npm/vue-router-md-transition), [bundle.run](https://bundle.run/vue-router-md-transition), etc...

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
// globally in the entry file such as "main.js"
Vue.component('md-transition', MaterialDesignTransition);

// or, locally in specific components
export default {
  components: {
    'md-transition': MaterialDesignTransition,
  },
};
```

### Props

##### `offsetTop` (**Type**: `number` | **Default**: `64`)

Used to fine tune the `translate3d` CSS function to match the height of the [top app bar](https://material.io/components/app-bars-top#specs) in Material Design spec.

##### `duration` (**Type**: `number` | **Default**: `250`)

Transition duration in milliseconds.

##### `reverse` (**Type**: `boolean` | **Default**: `false`)

Reverse transition direction.

##### `disabled` (**Type**: `boolean` | **Default**: `false`)

Do not apply any transition.

##### ...

For other props, please refer to Vue's [official api doc]((https://vuejs.org/v2/api/#transition)) about the built-in `<transition>` component.

### Example

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <md-transition
      :offset-top="56"
      :duration="300"
      :reverse="isRouteBack"
      :disabled="transitionDisabled"
    >
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
    isRouteBack: false,
    transitionDisabled: false,
  }),
  watch: {
    $route(to, from) {
      // disabled when refreshing browser
      this.transitionDisabled = !from.name;
      // reverse direction when routing back
      if (to.path === '/') {
        this.isRouteBack = true;
      } else if (from.path === '/') {
        this.isRouteBack = false;
      } else {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.isRouteBack = toDepth < fromDepth;
      }
    },
  },
};
</script>
```

##### Not Only for Vue Router

You can also use it in regular transitions, just like the built-in `<transition>`:

```html
<md-transition>
  <div key="foo" v-if="show">Foo</div>
  <div key="bar" v-else>Bar</div>
</md-transition>
```

Or, you can simply copy the [MaterialDesignTransition.vue](https://github.com/1isten/vue-router-md-transition/blob/master/src/components/MaterialDesignTransition.vue) file to your own project, tweak it and use it like any other Vue components.
