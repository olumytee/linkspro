<template>
  <section>
    <section class='topbar'>
    </section>
    <section class="header--padding">
      <header class="navbar">
        <section class="navbar-section">
          <a href="/" class="navbar-brand text-gray">TheGram.bio</a>
        </section>
        <section class="navbar-section">
          <a href="/login" class="btn btn-cta" v-if="!$store.state.authUser">Sign in</a>
          <a href="/dashboard" class="btn btn-cta" v-else>Dashboard</a>
        </section>
      </header>
    </section>
  </section>
</template>

<script>
export default {
  name: 'CustomHeader'
};
</script>
<style>
.navbar {
  min-height: 4rem;
}
.header--padding {
  padding-left: 4rem;
  padding-right: 4rem;
}
.btn-cta {
  font-size: 16px;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 1.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  line-height: 1.5;
  padding: 0.5em, 2em;
  border: none;
  background-image: linear-gradient(-180deg, #e0d0ff 0%, #a78bde 100%);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14), 0 2px 8px 0 rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  transition: 0.5s;
}
.btn-cta:hover {
  color: #a78bde;
  text-shadow: none;
  box-shadow: 0 2px 16spx 0 rgba(0, 0, 0, 0.2);
}
.topbar {
  height: 0.5rem;
  background: linear-gradient(left, #a78bde, #ec5d59);
}
@media only screen and (max-width: 840px) {
  .navbar {
    padding-left: 3rem;
    padding-right: 1rem;
  }
}
</style>