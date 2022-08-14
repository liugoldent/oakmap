<template>
  <div id="loadingContainer"></div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#loadingContainer {
  display: flex;
  flex-direction: col;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  background-color: #006266;
  position: fixed;
  top: 0;
  z-index: 1000;
  &:after {
    content: "Loading...";
    font-size: 50px;
    color: #F97F51;
    opacity: 1;
    font-family: serif;
  }
}
</style>





