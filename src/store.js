import Vue from "vue";
import Vuex from "vuex";
import questions from "./questions";

Vue.use(Vuex);

export const questionProgressStates = {
  INITIAL: 'inital',
  RUNNING: 'running',
  PAUSED: 'paused',
  FINISHED: 'finished',
}

export const questionTypes = {
  IMAGE_REVEAL: 'image-reveal',
}

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
    questionType: null,
    questionProgressState: 'initial',
  },
  mutations: {
    setActiveBuzzer(state, { index }) {
      return (state.activeBuzzer = index);
    },
    setQuestiontype(state, { questionType }) {
      return (state.questionType = questionType);
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
    resetQuestionProgressState(state) {
      state.questionProgressState = questionProgressStates.INITIAL;
    },
    startQuestionProgressState(state) {
      state.questionProgressState = questionProgressStates.RUNNING;
    },
    stopQuestionProgressState(state) {
      state.questionProgressState = questionProgressStates.PAUSED;
    },
    finishQuestionProgressState(state) {
      state.questionProgressState = questionProgressStates.FINISHED;
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
    enterQuestionPage({ commit }, {questionType}) {
      commit("setQuestionPage");
      if (questionType) {
        commit({ type: 'setQuestiontype', questionType });
      }
      // commit('enableBuzzers');
    },
    leaveQuestionPage({ commit, dispatch }) {
      commit("unsetQuestionPage");
      commit("disableBuzzers");
      commit({ type: "setQuestionState", show: false });
      commit({ type: "setSolutionState", show: false });
      commit({ type: 'setQuestiontype', questionType: null });
      dispatch("startTimer", true);
      commit("resetQuestionProgressState");
    },
    enterPress({ state, commit }) {
      if (state.isQuestionPage && state.showQuestion && state.questionType === questionTypes.IMAGE_REVEAL && state.questionProgressState !== questionProgressStates.FINISHED) {
        commit('finishQuestionProgressState');
      } else if (state.isQuestionPage && state.showQuestion) {
        commit({ type: "setSolutionState", show: true });
      }
    },
    spacePress({ state, commit }) {
      if (!state.isQuestionPage ) {
        return;
      }
      if (!state.showQuestion) {
        commit({ type: "setQuestionState", show: true });
      } else if (state.questionType === questionTypes.IMAGE_REVEAL) {
        if (state.questionProgressState === questionProgressStates.RUNNING) {
          commit("stopQuestionProgressState");
        } else {
          commit("startQuestionProgressState");
        }
      }
      commit("enableBuzzers");
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
    finishedImageReveal({ commit }) {
      commit('finishQuestionProgressState');
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
