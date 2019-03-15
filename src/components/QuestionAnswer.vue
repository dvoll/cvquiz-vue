<template>
  <div class="answer" :class="{ showAccepted: showAccepted }">
    <span class="answer__label">
      <slot name="label">{{ label }}</slot>
    </span>
    <span class="answer__value">{{ value }}</span>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: "-"
    },
    showAccepted: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped>
.answer {
  padding: 10px 20px;
  font-size: 1.3rem;
}
.answer.showAccepted {
  border: 1px solid green;
}
.answer__label {
  display: inline-block;
  padding: 0 20px 0 0;
  opacity: 0.8;
  /* min-width: 40px; */
}
</style>
