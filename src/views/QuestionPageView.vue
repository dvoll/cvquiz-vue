<template>
    <div>
        <!-- <div>{{$route.params}}</div>
    <div>{{question}}</div>-->
        <QuestionPageLayout>
            <template slot="header">
                <div class="qpage-header">
                    {{ category + ' / ' + value }}
                </div>
            </template>
            <template slot="body">
                <div v-if="question.isJoker">
                    <h1>Joker</h1>
                </div>
                <template v-else-if="question.type === 'image-reveal'">
                    <div class="imagerevealtest"></div>
                    <transition name="fade">
                        <image-reveal
                            v-if="showQuestion"
                            :progressState="questionProgressState"
                            :question="question"
                            @finished="imageRevealFinished"
                        />
                    </transition>
                    <template>
                        <span v-show="showSolution" class="question__solution">{{ question.solution }}</span>
                    </template>
                </template>
                <template v-else>
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
            </template>
            <template slot="footer">
                <BuzzerBar />
                <div class="qpage__controls">
                    <button
                        class="qpage-control qpage-control--active qpage-control--playpause"
                        @click="playPause"
                        v-show="showPlayButton"
                    >
                        {{ questionProgressState === 'running' ? 'Pause' : 'Play' }}
                    </button>
                    <button
                        class="qpage-control qpage-control--next-step"
                        :class="{ 'qpage-control--active': !showSolution && questionProgressState !== 'finished' }"
                        @click="nextStep"
                    >
                        Weiter
                    </button>
                    <button
                        class="qpage-control qpage-control--solve"
                        :class="{ 'qpage-control--active': showQuestion && !showSolution }"
                        @click="solve"
                    >
                        Lösen
                    </button>
                </div>
            </template>
        </QuestionPageLayout>
    </div>
</template>

<script>
import Vue from 'vue';
import QuestionPageLayout from '../components/QuestionPageLayout.vue';
import QuestionAnswer from '../components/QuestionAnswer.vue';
import QuestionContainer from '../components/QuestionContainer.vue';
import BuzzerBar from '../components/BuzzerBar.vue';
import ImageReveal from '../components/ImageReveal.vue';
import { questionTypes, questionProgressStates } from '../store';

import VueConfetti from 'vue-confetti';

Vue.use(VueConfetti);

export default Vue.extend({
    components: {
        QuestionPageLayout,
        QuestionAnswer,
        QuestionContainer,
        BuzzerBar,
        ImageReveal,
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
        const questionType = this.question.type || null;
        this.$store.dispatch('enterQuestionPage', { questionType });

        // TODO: Dispatch image reveal if necessary
        if (this.question.isJoker) {
            this.$confetti.start();
        }
        // this.$route.params.value
    },
    destroyed() {
        this.$store.dispatch('leaveQuestionPage');
        this.$emit('');
        this.$confetti.stop();
    },
    computed: {
        question() {
            return this.$store.getters.getQuestion(this.category, this.value);
        },
        questionProgressState() {
            return this.$store.state.questionProgressState;
        },
        showQuestion() {
            return this.$store.state.showQuestion;
        },
        showSolution() {
            return this.$store.state.showSolution;
        },
        showPlayButton() {
            return (
                this.question.type === questionTypes.IMAGE_REVEAL &&
                this.showQuestion &&
                this.questionProgressState !== questionProgressStates.FINISHED
            );
        },
    },
    methods: {
        getLetter(index) {
            return String.fromCharCode('A'.charCodeAt(0) + index);
        },
        imageRevealFinished() {
            this.$store.dispatch('finishedImageReveal');
        },
        solve() {
            this.$store.dispatch('enterPress');
        },
        nextStep() {
            this.$store.dispatch('spacePress');
        },
        playPause() {
            this.$store.dispatch('spacePress');
        },
    },
});
</script>

<style scoped>
.question__solution {
    font-size: 1.3rem;
}

/* .fade {
    opacity: 0;
  } */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
    opacity: 1;
}

.fade-enter /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.qpage__controls {
    position: absolute;
    right: 2rem;
    bottom: 1rem;
    display: flex;
    /* margin-left: -0.25rem;
    margin-right: -0.25rem; */
}

.qpage__controls > * {
    /* padding-left: 0.25rem;
    padding-right: 0.25rem; */
}

.qpage-control {
    font-size: 1rem;
    background: none;
    border: none;
    outline: none;
    color: rgb(146, 146, 146);
    padding: 0.5rem;
    opacity: 0.2;
    transition: opacity 0.2s ease-in-out;
}

.qpage-control:hover {
    color: rgb(214, 214, 214);
}

.qpage-control--active {
    cursor: pointer;
    opacity: 1;
}
</style>
