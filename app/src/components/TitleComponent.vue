<template>
  <h2 class="title" :class="customClass">{{ text }}</h2>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}
</style>
