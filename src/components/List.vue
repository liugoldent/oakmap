<template>
  <div id="listContainer">
    <div
      class="eachDataStyle"
      v-for="data in distanceDataOnView"
      :key="data.id"
    >
      <p id="dataName" class="innerData">{{ data[0] }}</p>
      <p id="dataDistance" class="innerData">{{ data[1] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    distanceDataOnView: Array,
  },
  computed: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="scss">
%flex-base {
  display: flex;
}
#listContainer {
  width: 90vw;
  .eachDataStyle {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .innerData {
      margin: 0px 10px;
      padding: 10px;
    }
    #dataName {
      font-size: 20px;
      margin: auto 10px;
    }
    #dataDistance {
      color: rgb(90, 124, 194);
      font-size: 40px;
      &::after {
        content: ' km';
        font-size: 20px;
      }
    }
  }
}
</style>
