import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Start from '../views/Start.vue'
import History from '../views/History.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Start
  },
  {
    path: '/board',
    name: 'Board',
    component: Home
  },
  {
    path: '/historial',
    name: 'History',
    component: History
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/board') {
    const turns = store.state.user.turns;
    console.log(turns)
    if (turns) {
      return next();
    }

    next('/');
  }

  next();
});

export default router;
