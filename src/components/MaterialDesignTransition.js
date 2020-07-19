import MaterialDesignTransition from '@/assets/MaterialDesignTransition.js';
import '@/assets/MaterialDesignTransition.css';

export default {
  functional: true,
  name: 'MaterialDesignTransition',
  props: ['offsetTop', 'duration', 'reverse', 'disabled'],
  render(h, { props, children }) {
    const { offsetTop, duration, reverse, disabled } = props;
    const md = MaterialDesignTransition({ offsetTop, duration, reverse, disabled });
    return h('transition', {
      props: {
        name: md.name,
        mode: md.mode,
        duration: md.duration,
        css: md.css,
        leaveActiveClass: md.leaveActiveClass,
        leaveToClass: md.leaveToClass,
        enterActiveClass: md.enterActiveClass,
        enterToClass: md.enterToClass,
      },
      on: {
        beforeEnter: md.beforeEnter,
        beforeLeave: md.beforeLeave,
        leave: md.leave,
        enter: md.enter,
        afterEnter: md.afterEnter,
        afterLeave: md.afterLeave,
        enterCancelled: md.enterCancelled,
        leaveCancelled: md.leaveCancelled,
      },
    }, children);
  },
};
