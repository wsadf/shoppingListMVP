<template>
  <button class="shopping-list__logout-button" @click="logout">
    <i class="fas fa-sign-out-alt"></i> Sair
  </button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$emit('logout')
    },
  },
}
</script>
