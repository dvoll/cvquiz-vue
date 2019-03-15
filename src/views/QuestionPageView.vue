<template>
  <div>
    <!-- <div>{{$route.params}}</div>
    <div>{{question}}</div>-->
    <QuestionPageLayout>
      <template slot="header">{{ category + " / " + value }}</template>
      <template slot="body">
        <template v-if="!question.isJoker">
          <QuestionContainer v-show="showQuestion">
            <template slot="question">{{ question.question }}</template>
            <template v-if="question.answers">
              <QuestionAnswer
                v-for="(answer, index) in question.answers"
                v-bind:key="answer"
                :value="answer"
                :showAccepted="showSolution && question.solution === index"
                :label="getLetter(index)"
              ></QuestionAnswer>
            </template>
            <template v-else>
              <span v-show="showSolution" class="question__solution">{{ question.solution }}</span>
            </template>
          </QuestionContainer>
        </template>
        <div v-else>
          <h1>Joker</h1>
        </div>
      </template>
      <template slot="footer">
        <BuzzerBar />
      </template>
    </QuestionPageLayout>
  </div>
</template>

<script>
import Vue from "vue";
import QuestionPageLayout from "../components/QuestionPageLayout.vue";
import QuestionAnswer from "../components/QuestionAnswer.vue";
import QuestionContainer from "../components/QuestionContainer.vue";
import BuzzerBar from "../components/BuzzerBar.vue";

import VueConfetti from 'vue-confetti';

Vue.use(VueConfetti);

export default Vue.extend({
  components: {
    QuestionPageLayout,
    QuestionAnswer,
    QuestionContainer,
    BuzzerBar,
  },
  data() {
    return {
      category: undefined,
      value: undefined,
    };
  },
  created() {
    this.category = this.$route.params.category;
    this.value = +this.$route.params.value;
    this.$store.dispatch("enterQuestionPage");
    if (this.question.isJoker) {
      this.$confetti.start();
    }
    // this.$route.params.value
  },
  destroyed() {
    this.$store.dispatch("leaveQuestionPage");
    this.$emit("");
    this.$confetti.stop();
  },
  computed: {
    question() {
      return this.$store.getters.getQuestion(this.category, this.value);
    },
    showQuestion() {
      return this.$store.state.showQuestion;
    },
    showSolution() {
      return this.$store.state.showSolution;
    },
  },
  methods: {
    getLetter(index) {
      return String.fromCharCode("A".charCodeAt(0) + index);
    },
  },
});
</script>

<style scoped>
  .question__solution {
    font-size: 1.3rem;
  }
</style>
