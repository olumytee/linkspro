<template>
  <div>
    <ul class="menu">
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
        <a href="/dashboard/add-account">
          Add account
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
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
        .catch((e) => {
          this.$router.push('/')
        })
    }
  }
}
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
  margin-top: 2rem;
  color: white;
}

.menu {
  min-height: 800px !important;
}

.centeerr {
  margin-right: auto;
  margin-left: auto;
}
</style>