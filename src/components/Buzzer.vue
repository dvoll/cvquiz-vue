<template>
  <Button class="buzzer" :class="{ active: active }" @click="$emit('click')">
    <slot />
  </Button>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped>
.buzzer {
  border: none;
  background: rgba(255, 255, 255, .2);
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.651);;
  font-size: 1.5rem;

  transition: height 0.2s, transform 0.2s; /*, left2 0.2s, right 0.2s;*/
  /* transition: height 0.2s; */
  width: 60px;
  height: 60px;
}
.active {
  background: rgb(173, 0, 0) !important;
  /* border-color: rgb(173, 0, 0) !important; */
  color: white; 
  transform: scale(2);
}
</style>
