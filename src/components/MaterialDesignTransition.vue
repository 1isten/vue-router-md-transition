<template>
  <transition
    :name="md.name"
    :mode="md.mode"
    :duration="md.duration"
    :css="md.css"
    @before-enter="md.beforeEnter"
    @before-leave="md.beforeLeave"
    :leave-active-class="md.leaveActiveClass"
    :leave-to-class="md.leaveToClass"
    @leave="md.leave"
    :enter-active-class="md.enterActiveClass"
    :enter-to-class="md.enterToClass"
    @enter="md.enter"
    @after-enter="md.afterEnter"
    @after-leave="md.afterLeave"
    @enter-cancelled="md.enterCancelled"
    @leave-cancelled="md.leaveCancelled"
  >
    <slot></slot>
  </transition>
</template>

<script>
import MaterialDesignTransition from './MaterialDesignTransition';

export default {
  name: 'MaterialDesignTransition',
  props: {
    offsetTop: {
      type: Number,
      default: 64,
    },
    duration: {
      type: Number,
      default: 250,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    md() {
      return MaterialDesignTransition({
        offsetTop: this.offsetTop,
        duration: this.duration,
        reverse: this.reverse,
        disabled: this.disabled,
      });
    },
  },
};
</script>

<style src="./MaterialDesignTransition.css" scoped>

</style>
