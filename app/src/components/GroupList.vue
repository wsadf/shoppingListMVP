<template>
  <div>
    <h4 class="shopping-list__group-title">
      <i :class="group.icon" class="shopping-list__group-icon"></i>
      {{ group.name }}
    </h4>
    <ul class="shopping-list__items">
      <li
        v-for="(product, index) in group.items"
        :key="index"
        class="shopping-list__item"
      >
        <span class="shopping-list__item-name">{{ product.name }}</span>
        <input
          type="number"
          min="1"
          v-model="product.quantity"
          class="shopping-list__input"
          @change="updateProductList(product)"
        />
        <button
          class="shopping-list__button"
          @click="addProductToShoppingList(product)"
        >
          <i class="fas fa-cart-plus"></i> Adicionar
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    group: Object,
  },
  methods: {
    addProductToShoppingList(product) {
      this.$emit('add-to-list', product)
    },
    updateProductList(product) {
      this.$emit('update-list', this.group.name, product.name, product)
    },
  },
}
</script>
