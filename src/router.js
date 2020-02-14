import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import QuestionPageView from "./views/QuestionPageView.vue";
import QuestionPrintList from "./views/QuestionPrintList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/list",
      name: "list",
      component: QuestionPrintList,
    },
    {
      name: "question",
      path: "/category/:category/value/:value",
      component: QuestionPageView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
  ],
});
