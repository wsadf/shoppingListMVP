<template>
  <button class="shopping-list__share-button" @click="share">
    <i class="fab fa-whatsapp"></i> Compartilhar via WhatsApp
  </button>
</template>

<script>
export default {
  methods: {
    share() {
      this.$emit('share')
    },
  },
}
</script>
