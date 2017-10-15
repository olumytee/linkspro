<template>
  <div>
    <custom-header></custom-header>
    <div class="container">
      <div class="columns text-center">
        <div class="column hero">
          <h1>Links, but on steroids</h1>
        </div>
      </div>
      <div class="columns col-gapless">
        <div class="column col-6">col-6</div>
        <div class="column col-6">col-6</div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/header'

export default {
  head() {
    return {
      title: 'Link in bio',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  components: {
    CustomHeader
  },
}
</script>

<style scoped>
.container {
  padding-left: 4rem;
  padding-right: 4rem;
}
</style>
