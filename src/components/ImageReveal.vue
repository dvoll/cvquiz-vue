<template>
    <div class="image-reveal">
        <!-- <div class="image-reveal__wrapper"> -->
        <img
            ref="image"
            :src="question.imageUrl"
            class="image-reveal__image"
            :class="{ 'image-reveal__image--contain': question.imgContain, 'image-reveal__image--active': ready }"
        />
        <!-- <div ref class="image-reveal__image image-reveal__image--contain" :class="{'image-reveal__image--cover': question.imgCover}" :style="{backgroundImage: 'url('+question.imageUrl+')'}" /> -->
        <div ref="overlay" class="image-reveal__overlay" />

        <!-- </div> -->
        <!-- <button class="image-reveal__control">{{buttonLabel}}</button> -->
        <!-- <p class="image-reveal__control">
            {{progressLabel}}
        </p> -->
    </div>
</template>

<script>
import { questionProgressStates } from '../store';

const multiplierDefault = 1;
const pointSize = 16;

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export default {
    props: {
        question: {
            type: Object,
        },
        progressState: {
            type: String,
            default: questionProgressStates.INITIAL,
        },
    },
    data() {
        return {
            revealInterval: null,
            multiplier: multiplierDefault,
            count: 0,
            pointsArray: 0,
            ready: false,
        };
    },
    watch: {
        progressState(newState, oldValue) {
            console.log('Progress state changed', newState);
            switch (this.progressState) {
                case questionProgressStates.INITIAL:
                    this.multiplier = multiplierDefault;
                    break;
                case questionProgressStates.RUNNING:
                    this.startReveal();
                    break;
                case questionProgressStates.PAUSED:
                    clearInterval(this.revealInterval);
                    break;
                case questionProgressStates.FINISHED:
                    this.startReveal();
                    this.multiplier = 10;
                    break;
            }
        },
    },
    computed: {
        progressLabel() {
            switch (this.progressState) {
                case questionProgressStates.INITIAL:
                    return '';
                case questionProgressStates.RUNNING:
                    return 'läuft...';
                case questionProgressStates.PAUSED:
                    return 'angehalten';
                case questionProgressStates.FINISHED:
                    return 'fertig';
            }
            return '';
        },
    },
    methods: {
        startReveal() {
            const children = this.$refs.overlay.children;
            this.revealInterval = setInterval(() => {
                if (children.length === 0) {
                    clearInterval(this.revealInterval);
                    this.$emit('finished');
                }
                const amount = (children.length / 100 + 5) * this.multiplier;
                let index;
                for (let i = 0; i < amount; i++) {
                    index = Math.floor(Math.random() * children.length);
                    if (children[index]) {
                        children[index].remove();
                    }
                }
            }, 100);
        },
    },
    mounted() {
        const { image, overlay } = this.$refs;
        const colors = ['gray', 'red', 'white', '#ddd', 'white', 'white', '#7c5337', '#f5ceb7'];
        image.onload = () => {
            const { width, height } = image.getBoundingClientRect();
            overlay.style.width = width + 'px';
            // overlay.style.transform = `translateX(-${(width % pointSize) / 2}px)`
            // overlay.style.height = height + 'px';
            // console.log('width', width);
            // const width2 = image.offsetWidth;
            // console.log('width2', width2);
            // console.log('width', width);
            // const height = image.offsetHeight;
            let defaultPoint, point;
            defaultPoint = document.createElement('div');
            defaultPoint.classList.add('reveal-point');
            let colorIndex = 0;
            for (let j = 0; j <= height + pointSize; j = j + (pointSize - 2)) {
                for (let i = 0; i <= width + pointSize; i = i + (pointSize - 2)) {
                    point = defaultPoint.cloneNode();
                    point.style.top = j + 'px';
                    point.style.left = i + 'px';
                    colorIndex = Math.floor(Math.random() * colors.length);
                    point.style.backgroundColor = colors[colorIndex];
                    overlay.appendChild(point);
                }
            }
            this.ready = true;
            // this.count = count;
            // let points = Array.from(Array(count).keys());
            // points = shuffle(points)
            // this.pointsArray = points;
            // this.count = count;
            // console.log('count', count);
        };
    },
};
</script>

<style>
.image-reveal {
    flex: 1 0 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-self: stretch;
    align-items: center;
    overflow: hidden;
}

/* .image-reveal__wrapper { */
/* width: 100%; */
/* min-height: 200px; */
/* background-size: contain; */
/* background-repeat: no-repeat; */
/* background-position: center center; */
/* position: absolute; */
/* top: 0; */
/* height: 100%; */
/* } */

.image-reveal__image {
    height: 100%;
    position: relative;
    opacity: 0;
}

.image-reveal__image--active {
    opacity: 1;
}


.image-reveal__overlay {
    height: 100%;
    position: absolute;
    overflow: hidden;
}

.image-reveal__image--cover {
    /* background-size: cover; */
}

.image-reveal__control {
    position: absolute;
    right: 5px;
    bottom: -5px;
    transform: translateY(-100%);
}

.reveal-point {
    position: absolute;
    --point-size: 18px;
    width: var(--point-size);
    height: var(--point-size);
    background: gray;
    border-radius: 50%;
    transform: translate3d(-50%, -50%, 0);
}
</style>
