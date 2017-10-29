<template>
  <div>
        <section class='topbar'>
    </section>
    <ul class="menu">
      <li class="menu-item centeerr">
        <a class="text-center" href="/" >MyCoolLink</a>
      </li>
      <li class="menu-item centeerr">
        <div class="centeerr text-center" :data-letters="$store.state.authUser.email.substr(0, 1).toUpperCase()">
        </div>
        <p class="centeerr text-center">{{$store.state.authUser.email}}</p>
      </li>
      <li class="divider" data-content="MENU">
      </li>
      <li class="menu-item">
        <a href="/dashboard">
          Dashboard
        </a>
      </li>
      <li class="divider" data-content="ADD">
      </li>
      <li class="menu-item">
        <a href="/dashboard/add-collection">
          Add collection
        </a>
      </li>
      <li class="menu-item">
        <a href="/dashboard/add-link">
          Add link
        </a>
      </li>
      <!-- menu divider -->
      <li class="divider"></li>
      <!-- menu item with badge -->
      <li class="menu-item">
        <a href="#">
          Settings
        </a>
      </li>
      <li class="divider"></li>
      <li class="menu-item">
        <a @click="logout" class="btn btn-cta" v-if="$store.state.authUser">Sign out</a>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/');
        })
        .catch(e => {
          this.$router.push('/');
        });
    }
  }
};
</script>
<style >
[data-letters]:before {
  content: attr(data-letters);
  display: inline-block;
  font-size: 1rem;
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  border-radius: 50%;
  background: plum;
  vertical-align: middle;
  color: white;
}
.menu {
  min-height: 800px !important;
}
.btn-cta {
  font-size: 16px;
  text-transform: uppercase;
  color: #ffffff !important;
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
  color: #a78bde !important;
  text-shadow: none;
  box-shadow: 0 2px 16spx 0 rgba(0, 0, 0, 0.2);
}
.topbar {
  height: 0.5rem;
  background: linear-gradient(left, #a78bde, #a78bde);
}
.centeerr {
  margin-right: auto;
  margin-left: auto;
}
</style>