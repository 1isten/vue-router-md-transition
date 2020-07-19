export default (props = {}) => {
  if (!props.offsetTop) props.offsetTop = 64;
  if (!props.duration) props.duration = 250;
  props.reverse = !!props.reverse;
  props.disabled = !!props.disabled;

  const data = {
    a: null, // leave (from)
    b: null, // enter (to)

    aStyleVars: '',
    bStyleVars: '',
  };

  const computed = {
    duration0: undefined,
    direction: undefined,
    isDisabled: undefined,
  };
  computed.duration0 = !props.duration || Number.isNaN(+props.duration) || props.duration <= 0;
  computed.direction = props.reverse ? 'backward' : 'forward';
  computed.isDisabled = props.disabled || computed.duration0;

  const methods = {
    beforeEnter(b) {
      if (computed.isDisabled) return;

      data.b = b;
      const bStyle = getComputedStyle(b);
      data.bStyleVars = '';
      data.bStyleVars += `--transform-original: ${bStyle.transform}; `;
      data.bStyleVars += `--opacity-original: ${bStyle.opacity}; `;
      data.bStyleVars += `--duration: ${props.duration}ms; `;
      data.bStyleVars += `--transform: translate3d(0, ${props.offsetTop}px, 0);`;
      b.style.cssText += data.bStyleVars;
      b.classList.add('md-transition-hidden'); // hide b before a's width, height, margin, etc., are computed
    },
    beforeLeave(a) {
      if (computed.isDisabled) return;

      data.a = a;
      const aStyle = getComputedStyle(a);
      data.aStyleVars = '';
      data.aStyleVars += `--width-a: ${aStyle.width}; `;
      data.aStyleVars += `--height-a: ${aStyle.height}; `;
      data.aStyleVars += `--margin-a: ${aStyle.marginTop} ${aStyle.marginRight} ${aStyle.marginBottom} ${aStyle.marginLeft}; `;
      data.aStyleVars += `--transform-original: ${aStyle.transform}; `;
      data.aStyleVars += `--opacity-original: ${aStyle.opacity}; `;
      data.aStyleVars += `--duration: ${props.duration}ms; `;
      data.aStyleVars += `--transform: translate3d(0, ${props.offsetTop}px, 0);`;
      a.style.cssText += data.aStyleVars;
      data.b.classList.remove('md-transition-hidden'); // unhide b after a's width, height, margin, etc., are computed
    },

    leave(a, done) {
      if (computed.isDisabled) return done();

      a.addEventListener('animationend', done, { once: true });
      a.classList.add(`md-transition-${computed.direction}-leave-active`);
    },
    enter(b, done) {
      if (computed.isDisabled) return done();

      b.addEventListener('animationend', done, { once: true });
      b.classList.add(`md-transition-${computed.direction}-enter-active`);
    },

    afterEnter(b) {
      if (computed.isDisabled) return;

      b.classList.remove(`md-transition-${computed.direction}-enter-active`);
      b.setAttribute('style', b.style.cssText.replace(data.bStyleVars, '').trim());
      if (!b.getAttribute('style')) b.removeAttribute('style');
    },
    afterLeave(a) {
      if (computed.isDisabled) return;

      a.classList.remove(`md-transition-${computed.direction}-leave-active`);
      a.setAttribute('style', a.style.cssText.replace(data.aStyleVars, '').trim());
      if (!a.getAttribute('style')) a.removeAttribute('style');
    },

    enterCancelled(b) {
      if (computed.isDisabled) return;

      b.classList.remove('md-transition-forward-enter-active');
      b.classList.remove('md-transition-backward-enter-active');
      b.setAttribute('style', b.style.cssText.replace(data.bStyleVars, '').trim());
      if (!b.getAttribute('style')) b.removeAttribute('style');
      // clearTimeout(window.__VUE_MD_TRANSITION_SCROLL_TIMEOUT__);
    },
    leaveCancelled(a) {
      if (computed.isDisabled) return;

      a.classList.remove('md-transition-forward-enter-active');
      a.classList.remove('md-transition-backward-enter-active');
      a.setAttribute('style', a.style.cssText.replace(data.aStyleVars, '').trim());
      if (!a.getAttribute('style')) a.removeAttribute('style');
      // clearTimeout(window.__VUE_MD_TRANSITION_SCROLL_TIMEOUT__);
    },
  };

  return {
    name: `md-transition-${computed.direction}`,
    mode: computed.isDisabled ? 'out-in' : '',
    duration: computed.isDisabled ? 0 : {},
    css: false,
    beforeEnter: methods.beforeEnter,
    beforeLeave: methods.beforeLeave,
    leaveActiveClass: computed.isDisabled ? '' : `md-transition-${computed.direction}-leave-active`,
    leaveToClass: '',
    leave: methods.leave,
    enterActiveClass: computed.isDisabled ? '' : `md-transition-${computed.direction}-enter-active`,
    enterToClass: '',
    enter: methods.enter,
    afterEnter: methods.afterEnter,
    afterLeave: methods.afterLeave,
    enterCancelled: methods.enterCancelled,
    leaveCancelled: methods.leaveCancelled,
  };
};
