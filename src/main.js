import MaterialDesignTransition from '@/components/MaterialDesignTransition.js';

const Vue = typeof window !== 'undefined' && window.Vue;
if (Vue) {
  Vue.component('md-transition', MaterialDesignTransition);
}

export default MaterialDesignTransition;
