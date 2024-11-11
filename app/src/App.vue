<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.checkAuthentication()
  },
  methods: {
    ...mapActions(['checkAuthentication']),
  },
}
</script>
