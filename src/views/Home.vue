<template>
  <div id="homeContanier">
    <div id="map">
      <MapCompVue
        ref="mapSelf"
        v-if="place.length > 0"
        :casePlace="place"
        :detailList="allDetailList"
        @clickPositionS="clickPositionF"
      />
    </div>
    <div id="searchGeo">
      <GeoSearchBtnVue @userClick="userClick" />
    </div>
    <div id="buttonOrder" v-if="Object.keys(distanceDataOnView).length > 0">
      <button @click="orderBy('toClose')">由近至遠</button>
      <button @click="orderBy('toFar')">由遠至近</button>
    </div>
    <div id="list">
      <List :distanceDataOnView="distanceDataOnView" />
    </div>
  </div>
</template>

<script>
import MapCompVue from '@/components/MapComp.vue'
import GeoSearchBtnVue from '../components/GeoSearchBtn.vue'
import List from '@/components/List.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    MapCompVue,
    List,
    GeoSearchBtnVue,
  },
  computed: {
    /**
     * @description 將各位置的最小距離取出，顯示在畫面上
     */
    distanceDataOnView() {
      let rawResult = {}
      let sortable = []
      for (let i = 0, len = this.allDetailList.length; i < len; i++) {
        const { stop_name, distance } = this.allDetailList[i]
        if (!rawResult[`${stop_name}`]) {
          rawResult[`${stop_name}`] = distance
        } else {
          rawResult[`${stop_name}`] =
            distance > rawResult[`${stop_name}`]
              ? rawResult[`${stop_name}`]
              : distance
        }
      }
      for (let distanceData in rawResult) {
        sortable.push([distanceData, rawResult[distanceData]])
      }
      this.orderByStatus > 0
        ? sortable.sort((a, b) => a[1] - b[1])
        : sortable.sort((a, b) => b[1] - a[1])
      return sortable
    },
  },
  data() {
    return {
      apiURL: 'https://asia-east2-botfat.cloudfunctions.net/project_controller',
      allPlace: [], // 打api取得的所有土城都更資料
      place: [], // 傳給map的polygon資料
      allDetailList: [], // 打api取得的所有list資料
      orderByStatus: -1, // 正序 or 反序
      searchResult: [], // 使用者輸入然後搜尋出來的結果
    }
  },
  async mounted() {
    this.$store.dispatch('loadingStart')
    this.allPlace = await this.getAllPlace()
    this.place = this.devideEachPlace(this.allPlace)
    this.$store.dispatch('loadingEnd')
  },
  methods: {
    /**
     * @description 顯示list怎麼去排序
     * @param {*} status
     */
    orderBy(status) {
      this.orderByStatus = status === 'toFar' ? -1 : 1
    },
    /**
     * @description 取得所有地點的API
     */
    async getAllPlace() {
      let bodyData = {
        directory: 'tucheng.json',
        function: 'xinbei_json',
      }
      return await axios
        .post(this.apiURL, bodyData, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((response) => {
          return response.data.result.features
        })
        .catch((e) => alert(e))
    },
    /**
     * @description 取得所有細節的api
     */
    async getDetail(lat, lng) {
      let bodyData = {
        lng,
        lat,
        function: 'xinbei_distance',
      }
      return await axios
        .post(
          'https://asia-east2-botfat.cloudfunctions.net/project_controller',
          bodyData,
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        .then((response) => {
          return response.data.result
        })
        .catch((e) => console.log('getDetail 失敗', e))
    },
    /**
     * @description 用點到的位置去打api，看距離多少
     * @param {*} e
     */
    async clickPositionF(latlngObj) {
      this.$store.dispatch('loadingStart')
      const { lat, lng } = latlngObj
      this.allDetailList = await this.getDetail(lat, lng)
      this.$store.dispatch('loadingEnd')
    },
    /**
     * @description 把容積變成要給map的陣列
     * @param {Array} allPlace
     */
    devideEachPlace(allPlace) {
      return allPlace.reduce(function (accumulator, currentValue) {
        const { coordinates } = currentValue.geometry
        const eachCoordinate = coordinates[0].map((data) => [data[1], data[0]])
        accumulator.push(eachCoordinate)
        return accumulator
      }, [])
    },
    /**
     * @description 得到點選結果 -> 要送給map組件
     * @param {Array} searchResult
     */
    async userClick(e) {
      this.$store.dispatch('loadingStart')
      const { x: lng, y: lat } = e
      this.$refs.mapSelf.changePan({lng, lat})
      this.allDetailList = await this.getDetail(lat, lng)
      this.$store.dispatch('loadingEnd')
    },
  },
}
</script>

<style scoped lang="scss">
%margin-style {
  margin-top: 5px;
  margin-bottom: 5px;
}
#homeContanier {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #buttonOrder {
    margin-top: 15px;
    margin-bottom: 5px;
    width: 90vw;
    button {
      border: 2px solid #7a1b41;
      border-radius: 30px;
      box-shadow: #7a1b41 4px 4px 0 0;
      margin-right: 10px;
      &:hover{
        cursor: pointer;
      }
    }
  }
  #searchGeo {
    margin-top: 15px;
    margin-bottom: 5px;
    width: 90vw;
    position: relative;
  }
  #list {
    margin-top: 10px;
    margin-bottom: 10px;
    @extend %margin-style;
  }
}
</style>
