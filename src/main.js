import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import { routes } from './routes';

Vue.config.productionTip = false

// Enable routing
Vue.use(VueRouter);

const router = new VueRouter({
  // Key & value routes
  routes: routes,
  
  // History mode enables a 'no-hashtag' URL that is normally generated with Vue routing
  mode: 'history',
});

new Vue({
  // Use router in our Vue instance
  router,
  // Render the actual app
  render: function (createElement) {
    return createElement(App);
  },
}).$mount('#app')
