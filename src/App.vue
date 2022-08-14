<template>
  <div id="app">
    <Header @loginStatus="loginStatusF" />
    <router-view v-if="loginValue" />
    <Error v-else />
    <div id="notLogin" v-if="!loginValue"></div>
    <LoadingStatus v-if="loadingStatusCompu" />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Error from "./views/Error.vue";
import LoadingStatus from "./components/LoadingStatus.vue";
export default {
  name: "App",
  components: {
    Header,
    Error,
    LoadingStatus,
  },
  data() {
    return {
      loginValue: false,
      loadingStatus: true,
    };
  },
  computed: {
    loadingStatusCompu() {
      return this.$store.state.loadingStatus;
    },
  },
  methods: {
    /**
     * @description 若登入則為true，若沒登入為false
     * @param {*} status
     */
    loginStatusF(status) {
      this.loginValue = status;
    },
  },
};
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
#notLogin {
  background-color: black;
  height: 100vh;
  width: 100vw;
  opacity: 0.8;
  z-index: 10;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:after {
    content: "Please Login";
    font-family: serif;
    font-size: 64px;
    color: white;
  }
}
</style>
