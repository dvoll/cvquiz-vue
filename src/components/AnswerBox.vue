<template>
  <div class="answer-box">
    <slot class="answer-box__answer" />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
.answer-box {
  display: grid;
  grid-template-columns: auto auto;
}
</style>
