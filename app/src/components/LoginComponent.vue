<template>
  <div class="login">
    <TitleComponent text="Bem-vindo de volta!" />
    <form class="login__form" @submit.prevent="login">
      <input
        v-model="email"
        type="email"
        class="login__input"
        placeholder="Email"
        required
      />
      <input
        v-model="password"
        type="password"
        class="login__input"
        placeholder="Senha"
        required
      />
      <button class="login__button" type="submit">Entrar</button>
    </form>
    <p class="login__signup-text">
      Ainda não tem uma conta?
      <router-link to="/register" class="login__signup-link"
        >Cadastre-se</router-link
      >
    </p>
  </div>
</template>

<script>
import { auth } from '@/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import TitleComponent from '@/components/TitleComponent.vue'

export default {
  components: {
    TitleComponent,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        this.$store.commit('setAuthentication', true)
        this.$router.push('/home')
      } catch (error) {
        console.log('Erro ao fazer login: ' + error.message)
      }
    },
  },
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #eef2f7;
  padding: 20px;
}

.login__title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

.login__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 25px;
  background-color: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 20px;
}

.login__input {
  margin-bottom: 1rem;
  padding: 14px;
  font-size: 1rem;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.login__input:focus {
  border-color: #3498db;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.4);
}

.login__button {
  padding: 14px;
  font-size: 1.1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login__button:hover {
  background-color: #2980b9;
  transform: scale(1.04);
}

.login__signup-text {
  margin-top: 20px;
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.login__signup-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
}

.login__signup-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .login {
    padding: 15px;
  }

  .login__form {
    padding: 20px;
  }

  .login__input {
    font-size: 1rem;
    padding: 12px;
  }

  .login__button {
    font-size: 1rem;
    padding: 12px;
  }
}
</style>
