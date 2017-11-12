<template>
  <div class="container bottomDiv">
    <div class="columns">
      <div class="column is-3">
        &copy; 2017, All Rights Reserved.
      </div>
      <div class="column is-4">
        
      </div>
      <div class="column is-5">
        
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
  margin-top: 2rem;
  padding: 4rem;
  height: 4rem;
  background: #ECE9E6;
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);
  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
}

@media only screen and (max-width: 840px) {
  .container {
    margin-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>