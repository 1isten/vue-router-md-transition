export default function (props = {}) {
  props.offsetTop = typeof props.offsetTop === 'number' && props.offsetTop <= 0 ? 0 : Number.isNaN(+props.offsetTop / +props.offsetTop) ? 64 : props.offsetTop || 64;
  props.duration = typeof props.duration === 'number' && props.duration <= 0 ? 0 : Number.isNaN(+props.duration / +props.duration) ? 250 : props.duration || 250;
  props.reverse = !!props.reverse;
  props.disabled = !!props.disabled;

  const data = {
    a: null, // leave (from)
    b: null, // enter (to)

    aStyleVars: '',
    bStyleVars: '',
  };

  const computed = {
    direction: props.reverse ? 'backward' : 'forward',
    isDisabled: props.disabled || props.duration <= 0,
  };

  const methods = {
    beforeEnter,
    beforeLeave,
    leave,
    enter,
    afterEnter,
    afterLeave,
    enterCancelled,
    leaveCancelled,
  };
  function beforeEnter(b) {
    if (computed.isDisabled) return;

    data.b = b;
    const bStyle = getComputedStyle(b);
    data.bStyleVars = '';
    data.bStyleVars += `--md-transition-opacity-b: ${bStyle.opacity}; `;
    data.bStyleVars += `--md-transition-transform-b: ${bStyle.transform}; `;
    data.bStyleVars += `--md-transition-transform: translate3d(0, ${props.offsetTop}px, 0);`;
    data.bStyleVars += `--md-transition-duration: ${props.duration}ms; `;
    b.style.cssText += data.bStyleVars;
    b.classList.add('md-transition-hidden'); // hide b before a's width, height, margin, etc., are computed
  }
  function beforeLeave(a) {
    if (computed.isDisabled) return;

    data.a = a;
    const aStyle = getComputedStyle(a);
    data.aStyleVars = '';
    data.aStyleVars += `--md-transition-width-a: ${aStyle.width}; `;
    data.aStyleVars += `--md-transition-height-a: ${aStyle.height}; `;
    data.aStyleVars += `--md-transition-margin-a: ${aStyle.marginTop} ${aStyle.marginRight} ${aStyle.marginBottom} ${aStyle.marginLeft}; `;
    data.aStyleVars += `--md-transition-opacity-a: ${aStyle.opacity}; `;
    data.aStyleVars += `--md-transition-transform-a: ${aStyle.transform}; `;
    data.aStyleVars += `--md-transition-transform: translate3d(0, ${props.offsetTop}px, 0);`;
    data.aStyleVars += `--md-transition-duration: ${props.duration}ms; `;
    a.style.cssText += data.aStyleVars;
    if (data.b) data.b.classList.remove('md-transition-hidden'); // unhide b after a's width, height, margin, etc., are computed
  }
  function leave(a, done) {
    if (computed.isDisabled) return done();

    a.addEventListener('animationend', function () {
      done();
      afterLeave(a);
    }, { once: true });
    a.setAttribute('data-v-md-transition', '');
    a.classList.add(`md-transition-${computed.direction}-leave-active`);
  }
  function enter(b, done) {
    if (computed.isDisabled) return done();

    b.addEventListener('animationend', function () {
      done();
      afterEnter(b);
    }, { once: true });
    b.setAttribute('data-v-md-transition', '');
    b.classList.add(`md-transition-${computed.direction}-enter-active`);
  }
  function afterEnter(b) {
    if (computed.isDisabled) return;

    b.classList.remove(`md-transition-${computed.direction}-enter-active`);
    b.setAttribute('style', b.style.cssText.replace(data.bStyleVars, '').trim());
    if (!b.getAttribute('style')) b.removeAttribute('style');
    b.removeAttribute('data-v-md-transition');
  }
  function afterLeave(a) {
    if (computed.isDisabled) return;

    a.classList.remove(`md-transition-${computed.direction}-leave-active`);
    a.setAttribute('style', a.style.cssText.replace(data.aStyleVars, '').trim());
    if (!a.getAttribute('style')) a.removeAttribute('style');
    a.removeAttribute('data-v-md-transition');
  }
  function enterCancelled(b) {
    if (computed.isDisabled) return;

    b.classList.remove('md-transition-forward-enter-active');
    b.classList.remove('md-transition-backward-enter-active');
    afterEnter(b);
    // clearTimeout(window.__VUE_MD_TRANSITION_SCROLL_TIMEOUT__);
  }
  function leaveCancelled(a) {
    if (computed.isDisabled) return;

    a.classList.remove('md-transition-forward-enter-active');
    a.classList.remove('md-transition-backward-enter-active');
    afterLeave(a);
    // clearTimeout(window.__VUE_MD_TRANSITION_SCROLL_TIMEOUT__);
  }

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
}
