import Vue from "vue";
import Vuex from "vuex";
import questions from "./questions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // questions: [
    //   {
    //     id: 1,
    //     category: "action",
    //     value: "10",
    //     question: "Was ist die Frage?",
    //     answers: ["Answer1", "Answer2", "Answer3"],
    //     solution: 2,
    //   },
    //   {
    //     category: "action",
    //     value: "20",
    //     question: "Was ist die Frage2?",
    //     solution: "Antwort!",
    //   },
    // ],
    questions: questions,
    activeBuzzer: -1,
    buzzersCanBuzz: false,
    timer: -1,
    isQuestionPage: false,
    showQuestion: false,
    showSolution: false,
  },
  mutations: {
    setActiveBuzzer(state, { index }) {
      return (state.activeBuzzer = index);
    },
    unsetBuzzer(state) {
      state.activeBuzzer = -1;
    },
    decrementTimer(state) {
      state.timer--;
    },
    initTimer(state) {
      state.timer = 5;
    },
    disableTimer(state) {
      state.timer = -1;
    },
    enableBuzzers(state) {
      state.buzzersCanBuzz = true;
    },
    disableBuzzers(state) {
      state.buzzersCanBuzz = false;
    },
    setQuestionPage(state) {
      state.isQuestionPage = true;
    },
    unsetQuestionPage(state) {
      state.isQuestionPage = false;
    },
    setQuestionState(state, { show }) {
      state.showQuestion = show;
    },
    setSolutionState(state, { show }) {
      state.showSolution = show;
    },
    setQuestionInactive(state, { payload }) {
      state.questions = state.questions.map(q => {
        if (payload.category === q.category && payload.value === q.value) {
          q.active = false;
        }
        return q;
      });
    },
    setQuestionActive(state, { payload }) {
      state.questions = state.questions.map(q => {
        if (payload.category === q.category && payload.value === q.value) {
          q.active = true;
        }
        return q;
      });
    },
  },
  actions: {
    buzzerPress({ commit, dispatch, state }, index) {
      if (!state.buzzersCanBuzz) {
        return;
      } else {
        commit("disableBuzzers");
        commit("setActiveBuzzer", index);
        dispatch("startTimer");
      }
    },
    startTimer({ commit, state }, stopTimer) {
      commit("initTimer");
      const timerInterval = setInterval(() => {
        if (state.timer < 0 || stopTimer) {
          clearInterval(timerInterval);
          commit("unsetBuzzer");
          commit("disableTimer");
          // dispatch('setTimeIsUp');
        } else {
          commit("decrementTimer");
        }
      }, 1000);
    },
    enterQuestionPage({ commit }) {
      commit("setQuestionPage");
      // commit('enableBuzzers');
    },
    leaveQuestionPage({ commit, dispatch }) {
      commit("unsetQuestionPage");
      commit("disableBuzzers");
      commit({ type: "setQuestionState", show: false });
      commit({ type: "setSolutionState", show: false });
      dispatch("startTimer", true);
    },
    enterPress({ state, commit }) {
      if (state.isQuestionPage && state.showQuestion) {
        commit({ type: "setSolutionState", show: true });
      }
    },
    spacePress({ state, commit }) {
      if (state.isQuestionPage) {
        commit({ type: "setQuestionState", show: true });
        commit("enableBuzzers");
      }
    },
    visitQuestion({ commit }, { category, value }) {
      commit({
        type: "setQuestionInactive",
        payload: { category, value },
      });
    },
    revertQuestionState({ commit }, { category, value }) {
      commit({
        type: "setQuestionActive",
        payload: { category, value },
      });
    },
  },
  getters: {
    getQuestion: state => (category, value) => {
      return state.questions.find(q => q.category === category && q.value === value);
    },
    getQuestionsPerCategory: state => {
      return state.questions.reduce((result, { category, value }) => {
        if (!(category in result)) {
          result[category] = [];
        }
        result[category].push(value);
        return result;
      }, {});
    },
  },
});
