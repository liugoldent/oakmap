const fs = require('fs')

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('./src/assets/localhost-key.pem'),
      cert: fs.readFileSync('./src/assets/localhost.pem'),
    },
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    host: '127.0.0.1',
    port: 8081
    // disableHostCheck: true,
    // proxy: 'https://localhost:8080/',
  },
}
