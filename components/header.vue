<template>
  <header class="navbar">
    <section class="navbar-section">
      <a href="/" class="navbar-brand text-gray">TheGram.bio</a>
    </section>
    <section class="navbar-section">
      <a href="/login" class="btn btn-cta" v-if="!$store.state.authUser">Log in/Sign up</a>
      <a href="/dashboard" class="btn btn-cta" v-else>Dashboard</a>
    </section>
  </header>
</template>

<script>
export default {
  name: 'CustomHeader'
}
</script>
<style>
.navbar {
  padding-left: 1rem;
  min-height: 4rem;
  background: #ECE9E6;
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);
  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
}

.btn-cta {
  border-radius: 8px;
  border-color: #acb3c2;
}

@media only screen and (max-width: 840px) {
  .navbar {
    padding-left: 3rem;
    padding-right: 1rem;
  }
}
</style>