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
    data.bStyleVars += `--transform-original: ${bStyle.transform}; `;
    data.bStyleVars += `--opacity-original: ${bStyle.opacity}; `;
    data.bStyleVars += `--duration: ${props.duration}ms; `;
    data.bStyleVars += `--transform: translate3d(0, ${props.offsetTop}px, 0);`;
    b.style.cssText += data.bStyleVars;
    b.classList.add('md-transition-hidden'); // hide b before a's width, height, margin, etc., are computed
  }
  function beforeLeave(a) {
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
    if (data.b) data.b.classList.remove('md-transition-hidden'); // unhide b after a's width, height, margin, etc., are computed
  }
  function leave(a, done) {
    if (computed.isDisabled) return done();

    a.addEventListener('animationend', function () {
      done();
      afterLeave(a);
    }, { once: true });
    a.classList.add(`md-transition-${computed.direction}-leave-active`);
  }
  function enter(b, done) {
    if (computed.isDisabled) return done();

    b.addEventListener('animationend', function () {
      done();
      afterEnter(b);
    }, { once: true });
    b.classList.add(`md-transition-${computed.direction}-enter-active`);
  }
  function afterEnter(b) {
    if (computed.isDisabled) return;

    b.classList.remove(`md-transition-${computed.direction}-enter-active`);
    b.setAttribute('style', b.style.cssText.replace(data.bStyleVars, '').trim());
    if (!b.getAttribute('style')) b.removeAttribute('style');
  }
  function afterLeave(a) {
    if (computed.isDisabled) return;

    a.classList.remove(`md-transition-${computed.direction}-leave-active`);
    a.setAttribute('style', a.style.cssText.replace(data.aStyleVars, '').trim());
    if (!a.getAttribute('style')) a.removeAttribute('style');
  }
  function enterCancelled(b) {
    if (computed.isDisabled) return;

    b.classList.remove('md-transition-forward-enter-active');
    b.classList.remove('md-transition-backward-enter-active');
    b.setAttribute('style', b.style.cssText.replace(data.bStyleVars, '').trim());
    if (!b.getAttribute('style')) b.removeAttribute('style');
    // clearTimeout(window.__VUE_MD_TRANSITION_SCROLL_TIMEOUT__);
  }
  function leaveCancelled(a) {
    if (computed.isDisabled) return;

    a.classList.remove('md-transition-forward-enter-active');
    a.classList.remove('md-transition-backward-enter-active');
    a.setAttribute('style', a.style.cssText.replace(data.aStyleVars, '').trim());
    if (!a.getAttribute('style')) a.removeAttribute('style');
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
