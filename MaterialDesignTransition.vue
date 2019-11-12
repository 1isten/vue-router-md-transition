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
  animation: fadeOut var(--md-transition-duration, 250ms);
  /* detach current view from the normal document flow */
  position: absolute;
  /* retain relative width */
  left: 0;
  right: 0;
}
.md-forward-enter-active, .md-forward-enter-to { /* to */
  animation: slideIn var(--md-transition-duration, 250ms);
}

/* nav back */
.md-backward-leave-active, .md-backward-leave-to { /* from */
  animation: slideOut var(--md-transition-duration, 250ms);
  /* detach current view from the normal document flow */
  position: absolute;
  /* retain relative width */
  left: 0;
  right: 0;
}
.md-backward-enter-active, .md-backward-enter-to { /* to */
  animation: fadeIn var(--md-transition-duration, 250ms);
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
    animation: slideInBig var(--md-transition-duration, 250ms);
  }

  .md-backward-leave-active, .md-backward-leave-to {
    animation: slideOutBig var(--md-transition-duration, 250ms);
  }
}
</style>
