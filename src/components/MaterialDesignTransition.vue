<template>
  <transition
    name="md-transition"
    :mode="disabled ? 'out-in' : ''"
    :duration="disabled || duration0 ? 0 : {}"

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
    a: null, // leave from
    b: null, // enter to

    aStyleVars: '',
    bStyleVars: '',
  }),
  computed: {
    duration0() {
      return !this.duration || Number.isNaN(this.duration) || this.duration <= 0;
    },
    direction() {
      return this.reverse ? 'backward' : 'forward';
    },

    leaveActiveClass() {
      return 'md-transition-leave-active' + (this.disabled ? '' : ` md-transition-${this.direction}-a`);
    },
    enterActiveClass() {
      return 'md-transition-enter-active' + (this.disabled ? '' : ` md-transition-${this.direction}-b`);
    },
  },
  methods: {
    beforeEnter(b) {
      if (this.disabled) return b.removeAttribute('data-md-transition-duration');

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
      if (this.disabled) return;

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
      if (this.disabled) return setTimeout(done);

      if (a.classList.contains(`md-transition-${this.direction}-b`)) {
        a.classList.remove(`md-transition-${this.direction}-b`);
      }
      this.$nextTick(() => a.classList.add(`md-transition-${this.direction}-a`));

      if (this.duration0) {
        done();
      } else {
        a.addEventListener('animationend', done, { once: true });
      }
    },
    enter(b, done) {
      if (this.disabled) return setTimeout(done);

      if (b.classList.contains(`md-transition-${this.direction}-a`)) {
        b.classList.remove(`md-transition-${this.direction}-a`);
      }
      this.$nextTick(() => b.classList.add(`md-transition-${this.direction}-b`));

      if (this.duration0) {
        done();
      } else {
        b.addEventListener('animationend', done, { once: true });
      }
    },

    enterCancelled(b) {
      if (this.disabled) return;

      clearTimeout(window.__MD_TRANSITION_SCROLL_TIMEOUT__);

      b.classList.remove(`md-transition-${this.direction}-b`);
      b.setAttribute('style', b.style.cssText.replace(this.bStyleVars, '').trim());
      if (!b.getAttribute('style')) b.removeAttribute('style');
    },
    leaveCancelled(a) {
      if (this.disabled) return;

      clearTimeout(window.__MD_TRANSITION_SCROLL_TIMEOUT__);

      a.classList.remove(`md-transition-${this.direction}-a`);
      a.setAttribute('style', a.style.cssText.replace(this.aStyleVars, '').trim());
      if (!a.getAttribute('style')) a.removeAttribute('style');
    },

    afterEnter(b) {
      if (this.disabled) return;

      b.classList.remove(`md-transition-${this.direction}-b`);
      b.setAttribute('style', b.style.cssText.replace(this.bStyleVars, '').trim());
      if (!b.getAttribute('style')) b.removeAttribute('style');
    },
    afterLeave(a) {
      if (this.disabled) return;

      a.classList.remove(`md-transition-${this.direction}-a`);
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
.md-transition-leave-active.md-transition-forward-a {
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
.md-transition-enter-active.md-transition-forward-b {
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
.md-transition-leave-active.md-transition-backward-a {
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
.md-transition-enter-active.md-transition-backward-b {
  position: relative;
  z-index: 0;
  animation-name: fadeIn;
  animation-duration: var(--duration, 250ms);
  animation-timing-function: ease-in;
}
</style>
