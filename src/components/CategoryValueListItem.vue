<template>
  <li class="item" :class="{ inactive }">
    <!-- <a :href="link">{{ value }}</a> -->
    <!-- <router-link :to="{ name: 'question', params: { category, value } }">{{ value }}</router-link> -->
    <a @click="click">{{ value }}</a>
  </li>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    category: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: -1,
    },
    // inactive: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  methods: {
    click(event) {
      event.preventDefault();
      if (event.shiftKey) {
        this.$store.dispatch("revertQuestionState", { category: this.category, value: this.value });
        return;
      }
      this.$store.dispatch("visitQuestion", { category: this.category, value: this.value });
      this.$router.push({ name: "question", params: { category: this.category, value: this.value } });
    },
  },
  computed: {
    link() {
      return `category/${this.category}/value/${this.value}`;
    },
    inactive() {
      return (
        this.$store.state.questions.find(q => this.category === q.category && this.value === q.value).active === false
      );
    },
  },
});
</script>

<style>
.item > * {
  display: block;
  padding: 20px;
  margin: 10px 0;
  background-color: var(--background-accent);
  text-align: center;
  -moz-user-select: -moz-none;
  user-select: none;
  font-size: 1.3rem;
}

.item.inactive > * {
  opacity: 0.3;
}
</style>
