<template>
  <div class="question-box">
    <span class="question-box__header">
      <slot name="header"></slot>
    </span>
    <span class="question-box__question">
      <slot name="question"></slot>
    </span>
    <div class="question-box__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped>
.question-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.question-box__question {
  font-size: 2rem;
  padding: 30px 5px;
}
</style>
