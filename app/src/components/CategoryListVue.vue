<template>
  <div class="shopping-list__category">
    <h3 class="shopping-list__category-title">
      <i :class="category.icon" class="shopping-list__category-icon"></i>
      {{ category.name }}
    </h3>
    <div
      v-for="(group, index) in category.groups"
      :key="index"
      class="shopping-list__group"
    >
      <GroupList
        :group="group"
        @add-to-list="handleAddToList"
        @update-list="handleUpdateList"
      />
    </div>
  </div>
</template>

<script>
import GroupList from '@/components/GroupList.vue'

export default {
  components: { GroupList },
  props: {
    category: Object,
  },
  methods: {
    handleAddToList(product) {
      this.$emit('add-to-list', product)
    },
    handleUpdateList(category, group, product) {
      this.$emit('update-list', category, group, product)
    },
  },
}
</script>
