<template>
  <transition
    :name="name"
    :mode="mode"
    @before-leave="beforeLeave"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @leave-cancelled="leaveCancelled"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'MaterialDesignTransition',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    name() {
      if (this.disabled) return '';
      return this.reverse ? 'md-backward' : 'md-forward';
    },
    mode() {
      if (this.disabled) return 'out-in';
      return '';
    },
  },
  data: () => ({
    backup: {
      current: {
        minHeight: null,
      },
      parent: {
        position: null,
        minHeight: null,
        maxHeight: null,
        overflow: null,
      },
    },
  }),
  methods: {
    beforeLeave(el) {
      if (this.disabled || !el) return;
      this.setTemporaryStyle(el, el.parentElement);
    },
    afterEnter(el) {
      if (this.disabled || !el) return;
      this.unsetTemporaryStyle(el, el.parentElement);
    },
    leaveCancelled(el) {
      if (this.disabled || !el) return;
      this.unsetTemporaryStyle(el, el.parentElement);
    },
    enterCancelled(el) {
      if (this.disabled || !el) return;
      this.unsetTemporaryStyle(el, el.parentElement);
    },
    setTemporaryStyle(current, parent) {
      if (this.disabled || !current || !parent) {
        return;
      }
      if (this.backup.parent.position === null) {
        this.backup.parent.position = parent.style.position;
      }
      if (this.backup.parent.minHeight === null) {
        this.backup.parent.minHeight = parent.style.minHeight;
      }
      if (this.backup.parent.maxHeight === null) {
        this.backup.parent.maxHeight = parent.style.maxHeight;
      }
      if (this.backup.parent.overflow === null) {
        this.backup.parent.overflow = parent.style.overflow;
      }
      parent.style.position = 'relative';
      parent.style.minHeight = '100vh';
      parent.style.maxHeight = '100vh';
      parent.style.overflow = 'hidden';
      if (current.clientHeight < parent.clientHeight) {
        if (current.tagName.toLowerCase() === 'header') {
          return;
        }
        if (this.backup.current.minHeight === null) {
          this.backup.current.minHeight = current.style.minHeight;
        }
        current.style.minHeight = '100vh';
      }
    },
    unsetTemporaryStyle(current, parent) {
      if (this.disabled || !current || !parent) {
        return;
      }
      if (parent.style.position === 'relative') {
        parent.style.position = this.backup.parent.position;
      }
      if (parent.style.minHeight === '100vh') {
        parent.style.minHeight = this.backup.parent.minHeight;
      }
      if (parent.style.maxHeight === '100vh') {
        parent.style.maxHeight = this.backup.parent.maxHeight;
      }
      if (parent.style.overflow === 'hidden') {
        parent.style.overflow = this.backup.parent.overflow;
      }
      this.backup.parent.position = null;
      this.backup.parent.minHeight = null;
      this.backup.parent.maxHeight = null;
      this.backup.parent.overflow = null;
      if (parent.hasAttribute('style') && !parent.attributes.style.value) {
        parent.removeAttribute('style');
      }
      if (current.style.minHeight === '100vh') {
        current.style.minHeight = this.backup.current.minHeight;
      }
      this.backup.current.minHeight = null;
      if (current.hasAttribute('style') && !current.attributes.style.value) {
        current.removeAttribute('style');
      }
    },
  },
};
</script>

<style scoped>
/* nav push (from) */
.md-forward-leave-active, .md-forward-leave-to {
  /* detach current view from the normal document flow */
  position: absolute;
  /* retain full width in non-static positioned parent element */
  left: 0;
  right: 0;
  /* place current view behind next view */
  z-index: 0 !important;
  /* remove current view ahead of time to prevent flash back issue */
  animation: none calc(var(--md-transition-duration, 250ms) - 60ms);
}
/* nav push (to) */
.md-forward-enter-active, .md-forward-enter-to {
  position: relative;
  /* place next view in front of current view */
  z-index: 1 !important;
  /* slide in next view */
  animation: slideIn var(--md-transition-duration, 250ms);
}

/* nav back (from) */
.md-backward-leave-active, .md-backward-leave-to {
  /* detach current view from the normal document flow */
  position: absolute;
  /* retain full width in non-static positioned parent element */
  left: 0;
  right: 0;
  /* place current view in front of previous view */
  z-index: 1 !important;
  /* slide out current view ahead of time to prevent flash back issue */
  animation: slideOut calc(var(--md-transition-duration, 250ms) - 60ms);
}
/* nav back (to) */
.md-backward-enter-active, .md-backward-enter-to {
  position: relative;
  /* place previous view behind current view */
  z-index: 0 !important;
  /* remove previous view after animation */
  animation: none var(--md-transition-duration, 250ms);
}

/* additional middle layers for fading effect */
.md-forward-leave-active::after, .md-forward-leave-to::after,
.md-backward-enter-active::after, .md-backward-enter-to::after {
  content: "";
  position: absolute;
  top: var(--md-app-bar-height, 56px);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999 !important;
  background: var(--md-fading-background, #fafafa);
}
/* the layer after current view during nav push */
.md-forward-leave-active::after, .md-forward-leave-to::after {
  animation: fadeIn var(--md-transition-duration, 250ms);
}
/* the layer after previous view during nav back */
.md-backward-enter-active::after, .md-backward-enter-to::after {
  animation: fadeOut var(--md-transition-duration, 250ms);
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

/* set fading layer offset top to 128px when using an extended material design app bar */
.md-app-bar-extended.md-forward-leave-active::after, .md-app-bar-extended.md-forward-leave-to::after,
.md-app-bar-extended.md-backward-enter-active::after, .md-app-bar-extended.md-backward-enter-to::after {
  top: 128px;
}

/* unset app bar offset top for the fading layers */
.md-no-app-bar.md-forward-leave-active::after, .md-no-app-bar.md-forward-leave-to::after,
.md-no-app-bar.md-backward-enter-active::after, .md-no-app-bar.md-backward-enter-to::after {
  top: 0;
}

/* unset full width retainment */
.md-auto-width.md-forward-leave-active, .md-auto-width.md-forward-leave-to,
.md-auto-width.md-backward-leave-active, .md-auto-width.md-backward-leave-to {
  left: unset;
  right: unset;
}

/* dark theme */
.md-dark.md-forward-leave-active::after, .md-dark.md-forward-leave-to::after,
.md-dark.md-backward-enter-active::after, .md-dark.md-backward-enter-to::after {
  background: var(--md-fading-background-dark, #121212);
}
</style>
