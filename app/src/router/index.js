import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/LoginComponent.vue'
import Register from '@/components/RegisterComponent.vue'
import ShoppingList from '@/views/ShoppingList.vue'
import { auth } from '@/firebaseConfig'
import store from '@/store'  // Importando o Vuex store

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
  const isAuthenticated = store.getters.isAuthenticated || auth.currentUser;  // Verificando o estado de login no Vuex

  if (requiresAuth && !isAuthenticated) {
    next('/login');  // Se precisar de autenticação e o usuário não estiver autenticado
  } else {
    next();
  }
});

// Verificar o estado de autenticação no início da aplicação
store.dispatch('checkAuthentication');  // Chama a ação que verifica o estado do usuário

export default router
