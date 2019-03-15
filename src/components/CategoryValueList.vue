<template>
  <div class="container">
    <h2>{{ name }}</h2>
    <ul>
      <slot />
    </ul>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
.container {
  margin: 10px 30px;
}
.container ul {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  list-style: none;
  margin: 10px 0;
  padding: 0;
}
</style>
