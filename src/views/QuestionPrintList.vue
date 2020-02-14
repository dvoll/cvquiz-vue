<template>
  <div class="print-list">
    <div v-for="(questions, index) in questionsPerCategory" :key="index">
      <h1>{{ questions[0].category }}</h1>
      <h1>{{ index }}</h1>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  computed: {
    questionsPerCategory() {
      return this.$store.getters.getQuestionsPerCategory;
    },
  },
});
</script>

<style scoped></style>
