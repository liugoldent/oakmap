<template>
  <div id="homeContanier">
    <MapCompVue
      :casePlace="place"
      :detailList="allDetailList"
      v-if="place.length > 0"
      @clickPositionS="clickPositionF"
    />
    <li v-for="data in allDetailList" :key="data.id">
      {{ data.stop_name }} {{ data.distance }}
    </li>
  </div>
</template>

<script>
// @ is an alias to /src
import MapCompVue from '@/components/MapComp.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    MapCompVue,
  },
  data() {
    return {
      apiURL: 'https://asia-east2-botfat.cloudfunctions.net/project_controller',
      allPlace: [], // 打api取得的所有土城都更資料
      place: [], // 傳給map的polygon資料
      allDetailList: [], // 打api取得的所有list資料
    }
  },
  async mounted() {
    this.allPlace = await this.getAllPlace()
    this.place = this.devideEachPlace(this.allPlace)
  },
  methods: {
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
            // 'Authorization': `Bearer ${this.token}`
          },
        })
        .then((response) => {
          console.log('getPlace 成功')
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
              // 'Authorization': `Bearer ${this.token}`
            },
          }
        )
        .then((response) => {
          console.log('getDetail 成功', response)
          return response.data.result
        })
        .catch((e) => console.log('getDetail 失敗', e))
    },
    /**
     * @description 用點到的位置去打api，看距離多少
     * @param {*} e
     */
    async clickPositionF(e) {
      const { lat, lng } = e.latlng
      this.allDetailList = await this.getDetail(lat, lng)
    },
    /**
     * @description 把容積變成陣列
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
  },
}
</script>

<style scoped>
</style>
