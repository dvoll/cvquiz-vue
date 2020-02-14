<template>
  <div class="quiz-list-container">
    <!-- {{ lists }} -->
    <category-value-list v-for="(list, category) in lists" :key="category" :name="category">
      <category-value-list-item v-for="value in list" :key="category + value" :category="category" :value="value" />
    </category-value-list>
  </div>
</template>

<script>
import CategoryValueList from "../components/CategoryValueList.vue";
import CategoryValueListItem from "../components/CategoryValueListItem.vue";
export default {
  name: "home",
  components: {
    CategoryValueList,
    CategoryValueListItem,
  },
  computed: {
    lists() {
      return this.$store.getters.getQuestionsPerCategory;
    },
  },
};
</script>

<style>
  .quiz-list-container {
    display: flex;
    justify-content: stretch;
  }
  .quiz-list-container > * {
    margin: 0 10px;
    width: 100%;
  }
</style>
