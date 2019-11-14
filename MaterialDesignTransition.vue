<template>
  <transition :name="reverse ? 'md-backward' : 'md-forward'">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'MaterialDesignTransition',
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* nav push */
.md-forward-leave-active, .md-forward-leave-to { /* from */
  /* detach current view from the normal document flow */
  position: absolute;
  /* retain width */
  left: 0;
  right: 0;
  /* place current view behind next view */
  z-index: 0;
  /* remove current view ahead of time to prevent flash back issue */
  animation: none calc(var(--md-transition-duration, 250ms) - 60ms);
}
.md-forward-enter-active, .md-forward-enter-to { /* to */
  position: relative;
  /* place next view in front of current view */
  z-index: 1;
  /* slide in next view */
  animation: slideIn var(--md-transition-duration, 250ms);
}

/* nav back */
.md-backward-leave-active, .md-backward-leave-to { /* from */
  position: relative;
  /* place current view in front of previous view */
  z-index: 1;
  /* slide out current view ahead of time to prevent flash back issue */
  animation: slideOut calc(var(--md-transition-duration, 250ms) - 60ms);
}
.md-backward-enter-active, .md-backward-enter-to { /* to */
  /* detach previous view from the normal document flow */
  position: absolute;
  /* retain width */
  left: 0;
  right: 0;
  /* place previous view behind current view */
  z-index: 0;
  /* remove previous view after animation */
  animation: none var(--md-transition-duration, 250ms);
}

/* additional middle layers for fading effect */
.md-forward-leave-active::after, .md-forward-leave-to::after, /* the layer after current view during nav push */
.md-backward-enter-active::after, .md-backward-enter-to::after { /* the layer after previous view during nav back */
  content: "";
  position: absolute;
  top: var(--md-app-bar-height, 56px);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: var(--md-fading-background, #fafafa);
}
.md-forward-leave-active::after, .md-forward-leave-to::after {
  animation: fadeIn var(--md-transition-duration, 250ms);
}
.md-backward-enter-active::after, .md-backward-enter-to::after {
  animation: fadeOut var(--md-transition-duration, 250ms);
}

@keyframes slideIn {
  from {
    transform: translate3d(0, 56px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes slideInBig {
  from {
    transform: translate3d(0, 64px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(0, 56px, 0);
    opacity: 0;
  }
}
@keyframes slideOutBig {
  from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  to {
    transform: translate3d(0, 64px, 0);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media screen and (min-width: 960px) {
  .md-forward-enter-active, .md-forward-enter-to {
    animation-name: slideInBig;
  }

  .md-backward-leave-active, .md-backward-leave-to {
    animation-name: slideOutBig;
  }

  .md-forward-leave-active::after, .md-forward-leave-to::after,
  .md-backward-enter-active::after, .md-backward-enter-to::after {
    top: var(--md-app-bar-height-large, 64px);
  }
}
</style>
