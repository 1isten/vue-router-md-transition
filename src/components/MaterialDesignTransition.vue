<template>
  <transition
    :css="false"

    :name="`md-transition-${direction}`"
    :mode="isDisabled ? 'out-in' : ''"
    :duration="isDisabled ? 0 : {}"

    @appear="appear"
    @before-enter="beforeEnter"
    @before-leave="beforeLeave"
    :leave-active-class="isDisabled ? '' : `md-transition-${direction}-leave-active`"
    :leave-to-class="''"
    @leave="leave"
    :enter-active-class="isDisabled ? '' : `md-transition-${direction}-enter-active`"
    :enter-to-class="''"
    @enter="enter"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
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
    // just for triggering `afterEnter` on the initial render
    appear(a) {
      return a;
    },

    beforeEnter(b) {
      if (this.isDisabled) return b.removeAttribute('data-md-transition-duration');

      // before b is inserted, retain some styles of a that may be lost because of `position: absolute`
      if (this.a) {
        const aStyle = getComputedStyle(this.a);
        this.aStyleVars = '';
        this.aStyleVars += `--width-a: ${aStyle.width}; `;
        this.aStyleVars += `--height-a: ${aStyle.height}; `;
        this.aStyleVars += `--margin-a: ${aStyle.margin}; `;
      }

      this.b = b;
      const bStyle = getComputedStyle(this.b);
      this.bStyleVars = '';
      this.bStyleVars += `--transform-original: ${bStyle.transform}; `;
      this.bStyleVars += `--opacity-original: ${bStyle.opacity}; `;
      this.bStyleVars += `--duration: ${this.duration}ms; `;
      this.bStyleVars += `--transform: translate3d(0, ${this.offsetTop}px, 0);`;

      b.style.cssText += this.bStyleVars;
      b.dataset.mdTransitionDuration = this.duration;
    },
    beforeLeave(a) {
      if (this.isDisabled) return;

      this.a = a;
      const aStyle = getComputedStyle(this.a);
      if (!this.aStyleVars) this.aStyleVars = '';
      this.aStyleVars += `--transform-original: ${aStyle.transform}; `;
      this.aStyleVars += `--opacity-original: ${aStyle.opacity}; `;
      this.aStyleVars += `--duration: ${this.duration}ms; `;
      this.aStyleVars += `--transform: translate3d(0, ${this.offsetTop}px, 0);`;

      a.style.cssText += this.aStyleVars;
    },

    leave(a, done) {
      if (this.isDisabled) return done();

      if (a.classList.contains(`md-transition-${this.direction}-enter-active`)) {
        a.classList.remove(`md-transition-${this.direction}-enter-active`);
      }
      a.classList.add(`md-transition-${this.direction}-leave-active`)
      a.addEventListener('animationend', done, { once: true });
    },
    enter(b, done) {
      if (this.isDisabled) return done();

      if (b.classList.contains(`md-transition-${this.direction}-leave-active`)) {
        b.classList.remove(`md-transition-${this.direction}-leave-active`);
      }
      b.classList.add(`md-transition-${this.direction}-enter-active`)
      b.addEventListener('animationend', done, { once: true });
    },

    afterEnter(b) {
      // b will be a on next frame, save it so `beforeEnter` can access `this.a`
      (this.$nextTick || setTimeout)(() => this.a = b);

      if (this.isDisabled) return;

      b.classList.remove(`md-transition-${this.direction}-enter-active`);
      b.setAttribute('style', b.style.cssText.replace(this.bStyleVars, '').trim());
      if (!b.getAttribute('style')) b.removeAttribute('style');
      b.removeAttribute('data-md-transition-duration');
    },
    afterLeave(a) {
      if (this.isDisabled) return;

      a.classList.remove(`md-transition-${this.direction}-leave-active`);
      a.setAttribute('style', a.style.cssText.replace(this.aStyleVars, '').trim());
      if (!a.getAttribute('style')) a.removeAttribute('style');
    },

    enterCancelled(b) {
      clearTimeout(window.__MD_TRANSITION_SCROLL_TIMEOUT__); // if any

      if (this.isDisabled) return;

      b.classList.remove(`md-transition-${this.direction}-enter-active`);
      b.setAttribute('style', b.style.cssText.replace(this.bStyleVars, '').trim());
      if (!b.getAttribute('style')) b.removeAttribute('style');
    },
    leaveCancelled(a) {
      clearTimeout(window.__MD_TRANSITION_SCROLL_TIMEOUT__); // if any

      if (this.isDisabled) return;

      a.classList.remove(`md-transition-${this.direction}-leave-active`);
      a.setAttribute('style', a.style.cssText.replace(this.aStyleVars, '').trim());
      if (!a.getAttribute('style')) a.removeAttribute('style');
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
  height: var(--height-a);
  margin: var(--margin-a);
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
  height: var(--height-a);
  margin: var(--margin-a);
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
