<template>
  <xIcon
    v-if="unit === 'x'"
    class="text-indigo-600"
    v-bind="{...$props, ...$attrs}"
  />
  <oIcon
    v-if="unit === 'o'"
    class="text-pink-600"
    v-bind="{...$props, ...$attrs}"
  />
</template>

<script>
import xIcon from '@/assets/x.svg';
import oIcon from '@/assets/o.svg';

const components = {
  xIcon,
  oIcon,
};

const props = {
  unit: String,
};

export default {
  components,
  props,
};
</script>
