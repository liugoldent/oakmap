<template>
  <div class="loginContainer">
    <div class="titleStyle"><h1>Urban Renewal</h1></div>
    <div class="loginButtonList">
      <div class="loginButton">
        <div
          id="g_id_onload"
          class="g_id_signin"
          data-client_id="919860225297-70h2c8371ph8mt18mo7m6vof3tlvbp89.apps.googleusercontent.com"
          data-auto_prompt="false"
          data-shape="circle"
          data-width="250"
          data-type="standard"
          data-callback="handleCredentialResponse"
        ></div>
      </div>
      <div class="loginButton">
        <fb:login-button
          scope="public_profile,email"
          onlogin="checkLoginState"
          class="fb-login-button"
          data-width="250"
          data-size="large"
          data-button-type="continue_with"
          data-layout="rounded"
          data-use-continue-as="false"
        >
        </fb:login-button>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  created() {
    window.handleCredentialResponse = function (response) {
      console.log(response)
      const result = jwtDecode(response.credential)
      console.log(result)
      console.log('Encoded JWT ID token: ' + response.credential)
      window.sessionStorage.setItem('googleLogin', response.credential)
    }
  },
}
</script>

<style scoped lang="scss">
.loginContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100vw;
  .titleStyle {
    color: blue;
    margin-left: 6px;
  }
  .loginButtonList {
    margin-right: 6px;
    .loginButton {
      margin: 6px 0;
    }
  }
}

@media (max-width:620px){
    .loginContainer{
        flex-direction: column;
    }
}
</style>

