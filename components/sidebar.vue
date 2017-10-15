<template>
  <ul class="menu">
    <li class="menu-item">
      <div class="tile tile-centered">
        <div class="tile-icon">
          <img src="" class="avatar" alt="Avatar">
        </div>
        <div class="tile-content">
          {{$store.state.authUser.email}}
        </div>
      </div>
    </li>
    <!-- menu header text -->
    <li class="divider">
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
  </ul>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>
<style >

</style>