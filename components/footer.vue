<template>
  <div class="container bottomDiv">
    <div class="columns">
      <div class="column">
        <h2>Booom!</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomFooter'
}
</script>
<style scoped>
.container {
  padding-left: 4rem;
  padding-right: 4rem;
  min-height: 4rem;
  background: #ECE9E6;
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);
  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
  position: fixed;
  bottom: 0
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
  }
}
</style>