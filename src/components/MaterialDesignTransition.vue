<template>
  <transition
    :name="`md-transition-${direction}`"
    :mode="isDisabled ? 'out-in' : ''"
    :duration="isDisabled ? 0 : {}"

    @before-enter="beforeEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    :leave-to-class="''"
    @enter="enter"
    :enter-to-class="''"
    @enter-cancelled="enterCancelled"
    @leave-cancelled="leaveCancelled"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
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
  data: () => ({
    a: null, // leave (from)
    b: null, // enter (to)

    aStyleVars: '',
    bStyleVars: '',
  }),
  computed: {
    duration0() {
      return !this.duration || Number.isNaN(+this.duration) || this.duration <= 0;
    },
    direction() {
      return this.reverse ? 'backward' : 'forward';
    },
    isDisabled() {
      return this.disabled || this.duration0;
    },
  },
  methods: {
    beforeEnter(b) {
      if (this.isDisabled) return b.removeAttribute('data-md-transition-duration');

      this.b = b;
      this.bStyleVars = '';
      this.bStyleVars += `--transform-original: ${getComputedStyle(b).transform}; `;
      this.bStyleVars += `--opacity-original: ${getComputedStyle(b).opacity}; `;
      this.bStyleVars += `--duration: ${this.duration}ms; `;
      this.bStyleVars += `--transform: translate3d(0, ${this.offsetTop}px, 0);`;

      b.style.cssText += this.bStyleVars;
      b.dataset.mdTransitionDuration = this.duration;
    },
    beforeLeave(a) {
      if (this.isDisabled) return;

      this.a = a;
      this.aStyleVars = '';
      this.aStyleVars += `--transform-original: ${getComputedStyle(a).transform}; `;
      this.aStyleVars += `--opacity-original: ${getComputedStyle(a).opacity}; `;
      this.aStyleVars += `--width-a: ${getComputedStyle(a).width}; `;
      this.aStyleVars += `--duration: ${this.duration}ms; `;
      this.aStyleVars += `--transform: translate3d(0, ${this.offsetTop}px, 0);`;

      a.style.cssText += this.aStyleVars;
    },

    leave(a, done) {
      if (this.isDisabled) return done();

      if (a.classList.contains(`md-transition-${this.direction}-enter-active`)) {
        a.classList.remove(`md-transition-${this.direction}-enter-active`);
      }

      a.addEventListener('animationend', done, { once: true });
      this.$nextTick(() => a.classList.add(`md-transition-${this.direction}-leave-active`));
    },
    enter(b, done) {
      if (this.isDisabled) return done();

      if (b.classList.contains(`md-transition-${this.direction}-leave-active`)) {
        b.classList.remove(`md-transition-${this.direction}-leave-active`);
      }

      b.addEventListener('animationend', done, { once: true });
      this.$nextTick(() => b.classList.add(`md-transition-${this.direction}-enter-active`));
    },

    enterCancelled(b) {
      if (this.isDisabled) return;

      b.classList.remove(`md-transition-${this.direction}-enter-active`);
      b.setAttribute('style', b.style.cssText.replace(this.bStyleVars, '').trim());
      if (!b.getAttribute('style')) {
        b.removeAttribute('style');
      }
      // if any, can be used with vue router scroll behavior
      clearTimeout(window.__MD_TRANSITION_SCROLL_TIMEOUT__);
    },
    leaveCancelled(a) {
      if (this.isDisabled) return;

      a.classList.remove(`md-transition-${this.direction}-leave-active`);
      a.setAttribute('style', a.style.cssText.replace(this.aStyleVars, '').trim());
      if (!a.getAttribute('style')) {
        a.removeAttribute('style');
      }
      // if any, can be used with vue router scroll behavior
      clearTimeout(window.__MD_TRANSITION_SCROLL_TIMEOUT__);
    },

    afterEnter(b) {
      if (this.isDisabled) return;

      b.classList.remove(`md-transition-${this.direction}-enter-active`);
      b.setAttribute('style', b.style.cssText.replace(this.bStyleVars, '').trim());
      if (!b.getAttribute('style')) {
        b.removeAttribute('style');
      }
    },
    afterLeave(a) {
      if (this.isDisabled) return;

      a.classList.remove(`md-transition-${this.direction}-leave-active`);
      a.setAttribute('style', a.style.cssText.replace(this.aStyleVars, '').trim());
      if (!a.getAttribute('style')) {
        a.removeAttribute('style');
      }
    },
  },
};
</script>

<style scoped>
@keyframes fadeOut {
  from {
    opacity: var(--opacity-original, 1);
  }
  to {
    opacity: 0;
  }
}
/* leave (from) a */
.md-transition-forward-leave-active {
  width: var(--width-a);
  min-height: inherit;
  position: absolute;
  z-index: 0;
  animation-name: fadeOut;
  animation-duration: var(--duration, 250ms);
  animation-timing-function: ease-in;
}

@keyframes slideIn {
  from {
    transform: var(--transform, translate3d(0, 56px, 0));
    opacity: 0;
  }
  to {
    transform: var(--transform-original, translate3d(0, 0, 0));
    opacity: var(--opacity-original, 1);
  }
}
/* enter (to) b */
.md-transition-forward-enter-active {
  position: relative;
  z-index: 1;
  user-select: none;
  animation-name: slideIn;
  animation-duration: var(--duration, 250ms);
  animation-timing-function: ease-out;
}

@keyframes slideOut {
  from {
    transform: var(--transform-original, translate3d(0, 0, 0));
    opacity: var(--opacity-original, 1);
  }
  to {
    transform: var(--transform, translate3d(0, 56px, 0));
    opacity: 0;
  }
}
/* leave (from) a */
.md-transition-backward-leave-active {
  width: var(--width-a);
  min-height: inherit;
  position: absolute;
  z-index: 1;
  user-select: none;
  animation-name: slideOut;
  animation-duration: var(--duration, 250ms);
  animation-timing-function: ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: var(--opacity-original, 1);
  }
}
/* enter (to) b */
.md-transition-backward-enter-active {
  position: relative;
  z-index: 0;
  animation-name: fadeIn;
  animation-duration: var(--duration, 250ms);
  animation-timing-function: ease-in;
}
</style>
