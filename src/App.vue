<template>
  <div id="app">
    <Header @loginStatus="loginStatusF" />
    <router-view v-if="loginValue" />
    <Error v-else />
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Error from './views/Error.vue'

export default {
  name: 'App',
  components: {
    Header,
    Error,
  },
  data() {
    return {
      loginValue: false,
    }
  },
  mounted: {},
  methods: {
    /**
     * @description 若登入則為true，若沒登入為false
     * @param {*} status
     */
    loginStatusF(status) {
      console.log(status)
      this.loginValue = status
    },
  },
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
