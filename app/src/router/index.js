import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/LoginComponent.vue'
import Register from '@/components/RegisterComponent.vue'
import ShoppingList from '@/views/ShoppingList.vue'
import { auth } from '@/firebaseConfig'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/home', name: 'Home', component: ShoppingList, meta: { requiresAuth: true } }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated || auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

store.dispatch('checkAuthentication');

export default router
