<template>
  <div class="question-page">
    <!-- <div class="question-page__header">
      <slot name="header">{{title}}</slot>
    </div>-->
    <div class="question-page__header">
      <slot name="header"/>
    </div>
    <div class="question-page__body">
      <slot name="body" />
    </div>
    <div class="question-page__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "QuestionPageLayout",
  props: {
    title: {
      type: String,
      default: "title"
    }
  }
});
</script>

<style scoped>
.question-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

/* .question-page__header {
  width: 100%;
  height: 60px;
  background: #234;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.question-page__body {
  padding: 20px 5px;
  flex-grow: 1;
  flex-basis: 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
}

.question-page__footer {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
