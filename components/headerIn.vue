<template>
<section>
      <section class='topbar'>
    </section>
    <section class="header--padding">
      <header class="navbar">
        <h3>{{title}}</h3>
      </header>
    </section>
  </section>
</template>

<script>
export default {
  name: 'CustomHeader',
  props: ['title']
};
</script>
<style>
.topbar {
  height: 0.5rem;
  background: linear-gradient(left, #a78bde, #ec5d59);
}
.header--padding {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px;
  border-bottom-color: rgba(178, 132, 202, 0.22);
  border-bottom-style: solid;
}
</style>