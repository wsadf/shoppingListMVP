<template>
  <div class="register">
    <div class="register__container">
      <TitleComponent text="Crie sua conta" />
      <form @submit.prevent="register" class="register__form">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="register__input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          required
          class="register__input"
        />
        <button type="submit" class="register__button">Cadastrar</button>
      </form>
      <p class="register__text">
        Já tem uma conta?
        <router-link to="/login" class="register__link">Entre aqui</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password)
        this.$router.push('/login')
      } catch (error) {
        console.log('Erro ao se cadastrar: ' + error.message)
      }
    },
  },
}
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eef2f7;
  padding: 20px;
}

.register__container {
  background-color: #ffffff;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.register__title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.register__form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.register__input {
  padding: 14px;
  margin-bottom: 20px;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  font-size: 1rem;
  color: #2c3e50;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.register__input:focus {
  border-color: #3498db;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

.register__button {
  padding: 14px;
  font-size: 1.1rem;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.register__button:hover {
  background-color: #2980b9;
  transform: scale(1.04);
}

.register__text {
  text-align: center;
  margin-top: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.register__link {
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
}

.register__link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .register__container {
    padding: 25px;
  }

  .register__input {
    font-size: 0.95rem;
    padding: 12px;
  }

  .register__button {
    font-size: 1rem;
    padding: 12px;
  }
}
</style>
