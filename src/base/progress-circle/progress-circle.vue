<template>
  <!--根组件-->
  <div class="progress-circle">
    <svg :width="radio" :height="radio" viewBox="0 0 100 100" version="1.1">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="progress"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    radio: {
      type: Number,
      default: 100
    },
    percent:{
      type: Number,
      default:0
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100
    };
  },
  computed: {
    progress() {
      return this.dashArray * (1-this.percent);
    }
  }
};
</script>

<style scoped lang='scss'>
.progress-circle {
  position: relative;

  circle {
    stroke-width: 8px;
    transform-origin: center;

    &.progress-background {
      transform: scale(0.9);
    }

    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $theme-color;
    }
  }
}
</style>