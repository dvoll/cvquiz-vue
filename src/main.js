import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

fetch('/questions.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        store.dispatch('setQuestions', { questions: json });
    })
    .catch(error => console.log(error));
