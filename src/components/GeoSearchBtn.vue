<template>
  <div id="searchBtnContainer">
    <div id="searchResultStyle">
      <li
        v-for="(data, index) in searchResult"
        :key="index"
        @click="getUserWant(data)"
      >
        {{ data.label }}
      </li>
    </div>
    <input
      placeholder="請輸入您要查詢的地址"
      id="inputStyle"
      v-model="userInput"
      v-on:keyup.enter="searchGeo"
    />
    <button id="btnStyle" @click="searchGeo">
      <img src="../assets/search.png" />
    </button>
  </div>
</template>


<script>
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default {
  data() {
    return {
      userInput: "",
      searchResult: [],
    };
  },
  methods: {
    /**
     * @description 搜尋輸入的地點
     */
    async searchGeo() {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: this.userInput });
      this.searchResult = results.slice(0, 5);
    },
    /**
     * @description 使用者點選他想要的資料之後，送出去父組件
     */
    getUserWant(e) {
      this.$emit("userClick", e);
      this.searchResult = [];
    },
  },
};
</script>

<style scoped lang="scss">
#searchBtnContainer {
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  #inputStyle {
    width: 275px;
    height: 40px;
    font-size: 18px;
    line-height: 18px;
  }
  #btnStyle {
    padding: 0;
    border: none;
    background: none;
    margin: auto 20px;
    &:hover {
      cursor: pointer;
    }
  }
  #searchResultStyle {
    position: absolute;
    bottom: 50px;
    width: 350px;
    height: auto;
    li {
      background-color: #e09fb9;
      cursor: pointer;
      opacity: 0.9;
      padding: 5px;
      margin: 5px;
      margin-left: 0px;
      border-radius: 5px;
      box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
        rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }
  }
}
</style>




