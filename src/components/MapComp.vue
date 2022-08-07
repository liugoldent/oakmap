<template>
  <div id="mapContainer">
    <div id="mapid"></div>
    <div id="buttonContainer">
      <button class="buttonStyle" @click="locateUser">移動至目前位置</button>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  data() {
    return {
      openStreetMap: {},
      nowMark: {},
      circleStatus: {}
    }
  },
  props: {
    casePlace: Array,
    detailList: Array,
  },
  watch: {
    detailList(nval) {
      if (nval.length > 0) {
        this.circleIt(nval)
      }
    },
  },
  mounted() {
    // 初始化map
    this.openStreetMap = L.map('mapid', {
      zoom: 18,
    })
    this.titleIt()
    this.openStreetMap.on('locationfound', this.foundHandler)
    this.openStreetMap.on('click', this.getNewLatLng)
    this.polygonIt()
  },
  methods: {
    /**
     * @description 取得使用者的新地點
     */
    getNewLatLng(e) {
      if (e.latlng.lat && e.latlng.lng) {
        this.marketIt(e)
        this.mapPanTo(e)
        this.$emit('clickPositionS', e)
      }
    },
    /**
     * @description 要放上大頭針的地方
     * @param {*} e 座標位址
     */
    marketIt(e) {
      if (this.nowMark) this.openStreetMap.removeLayer(this.nowMark)
      this.nowMark = L.marker([e.latlng.lat, e.latlng.lng]).addTo(
        this.openStreetMap
      )
      console.log(this.nowMark)
    },
    /**
     * @description 先上多邊形圖
     */
    polygonIt() {
      try {
        const polygon = L.polygon(this.casePlace, {
          color: '#00BFFF',
          fillOpacity: 0.3,
          opacity: 0.5,
        }).addTo(this.openStreetMap)
        this.openStreetMap.fitBounds(polygon.getBounds())
      } catch (e) {
        console.error(e.message)
      }
    },
    /**
     * @description 敘述版權
     */
    titleIt() {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap',
      }).addTo(this.openStreetMap)
    },
    /**
     * @description 取得使用者位置
     */
    mapLocate() {
      this.openStreetMap.locate({
        setView: false, // 是否讓地圖跟著移動中心點
        watch: true, // 是否要一直監測使用者位置
        maxZoom: 18, // 最大的縮放值
        enableHighAccuracy: true, // 是否要高精準度的抓位置
        timeout: 10000, // 觸發locationerror事件之前等待的毫秒數
      })
    },
    /**
     * @description foundHandler取得使用者位置 & 標記其座標 & 讓地圖回到使用者中心點
     * @param {*} e
     */
    foundHandler(e) {
      try {
        this.marketIt(e)
        this.mapPanTo(e)
      } catch (e) {
        console.error(e.message)
      }
    },
    /**
     * @description 將地圖移動到目標位置
     * @param {*} e
     */
    mapPanTo(e) {
      this.openStreetMap.panTo([e.latlng.lat, e.latlng.lng])
    },
    /**
     * @description 取得使用者位置
     */
    locateUser() {
      this.openStreetMap.locate({ setView: true })
    },
    /**
     * @description 將都更範圍圈起來
     */
    circleIt(allDetailList) {
      if(Object.keys(this.circleStatus).length > 0) return
      for (let i = 0, len = allDetailList.length; i < len; i++) {
        const { latitude, longitude, radius} = allDetailList[i]
        // if (distance < 1) {
          this.circleStatus = L.circle(
            { lat: latitude, lng: longitude },
            {
              radius,
              color: 'red',
              opacity: 0.2,
            }
          ).addTo(this.openStreetMap)
        // }
      }
    },
  },
}
</script>


<style scoped lang="scss">
#mapContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  #mapid {
    height: 80vh;
    width: 100vw;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 0;
  }
  #buttonContainer {
    position: absolute;
    margin-top: 4px;
    bottom: 0px;
    left: 0px;
    z-index: 100;
    .buttonStyle {
      margin-right: 8px;
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      letter-spacing: 2px;
      text-decoration: none;
      text-transform: uppercase;
      color: #000;
      cursor: pointer;
      border: 3px solid;
      padding: 0.25em 0.5em;
      box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px,
        4px 4px 0px 0px, 5px 5px 0px 0px;
    }
  }
}
</style>
