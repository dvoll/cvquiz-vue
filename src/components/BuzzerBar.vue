<template>
  <div class="container-parent" :class="{ isActive: barIsActive }" style>
    <div class="container items-end" style>
      <Buzzer :active="activeBuzzer == 1" @click="setActive(1)">1</Buzzer>
      <!-- <Buzzer :active="activeBuzzer == 2" @click="setActive(2)">2</Buzzer> -->
    </div>
    <!-- <span class="timer" :class="{ inactive: time < 0 }">{{ time }}</span> -->
    <div class="container" style>
      <Buzzer :active="activeBuzzer == 2" @click="setActive(2)">2</Buzzer>
      <!-- <Buzzer :active="activeBuzzer == 3" @click="setActive(3)">3</Buzzer> -->
      <!-- <Buzzer :active="activeBuzzer == 4" @click="setActive(4)">4</Buzzer> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Buzzer from "./Buzzer.vue";

export default Vue.extend({
  components: {
    Buzzer
  },
  //   props: {
  //     time: {
  //       type: Number,
  //       default: -1
  //     }
  //   },
  //   data() {
  //     return {
  //       active: -1
  //     };
  //   },
  methods: {
    setActive(n) {
      //   this.active = n;
      this.$store.dispatch({
        type: "buzzerPress",
        index: n
      });
    }

    // isActive(n) {
    //   return this.active === n;
    // }
  },
  computed: {
    activeBuzzer() {
      return this.$store.state.activeBuzzer;
    },
    time() {
      return this.$store.state.timer;
    },
    barIsActive() {
      return (
        this.$store.state.buzzersCanBuzz || this.$store.state.activeBuzzer > 0
      );
    }
  }
});
</script>

<style scoped>
.container-parent,
.container {
  display: flex;
  align-items: flex-end;
}
.container-parent {
  opacity: 0.2;
  transition: opacity 1s;
}

.container-parent.isActive {
  opacity: 1;
  transition: none;
}
.container-parent > .container {
  flex-basis: 50px;
  flex-grow: 1;
}
.items-end {
  justify-content: end;
}
.container-parent > .container > * {
  margin: 0 10px;
}
.timer {
  height: 120px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
}
.inactive {
  visibility: hidden;
}
</style>
