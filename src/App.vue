<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header,
  },
  mounted: {},
  methods: {},
}
</script>
<style lang="scss">
html,
body,
div,
span {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
</style>
