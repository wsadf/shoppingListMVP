<template>
  <ul class="shopping-list__shopping-list">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="shopping-list__shopping-item"
    >
      <span class="shopping-list__item-name">
        {{ item.name }} - {{ item.quantity }}
      </span>
      <button class="shopping-list__remove-button" @click="removeItem(index)">
        <i class="fas fa-trash"></i> Remover
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  methods: {
    removeItem(index) {
      this.$emit('remove', index)
    },
  },
}
</script>
