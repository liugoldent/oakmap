<template>
  <div></div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      apiURL: 'https://asia-east2-botfat.cloudfunctions.net/project_controller',
      allPlace: {},
    }
  },
  mounted() {},
  methods: {
    async getPlace() {
      let bodyData = {
        directory: 'tucheng.json',
        function: 'xinbei_json',
      }
      await axios
        .post(this.apiURL, bodyData, {
          headers: {
            'content-type': 'application/json',
            // 'Authorization': `Bearer ${this.token}`
          },
        })
        .then((response) => console.log('getPlace 成功', response))
        .catch((e) => console.log('getPlace 失敗', e))
    },
    async getDetail() {
      let bodyData = {
        lng: 121.504603,
        lat: 24.993955,
        function: 'xinbei_distance',
      }
      await axios
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
        .then((response) =>
          console.log('getDetail 成功', response.data.result.feature)
        )
        .catch((e) => console.log('getDetail 失敗', e))
    },
  },
}
</script>


<style scoped>
/* .mapContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}
#mapid {
  height: 500px;
  width: 500px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
} */
</style>
