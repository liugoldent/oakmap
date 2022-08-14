<template>
  <div id="loginContainer">
    <div id="titleStyle"><h1>Urban Renewal</h1></div>
    <div id="loginImg" v-if="loggedInStatus">
      <img :src="imgURL" />
    </div>
    <div id="notLoginButtonList" v-else>
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
import jwtDecode from "jwt-decode";

export default {
  created() {
    window.handleCredentialResponse = function (response) {
      const result = jwtDecode(response.credential);
      window.sessionStorage.setItem("googleLoggedInToken", response.credential);
      window.sessionStorage.setItem("googleUserImg", result.picture);
      window.location.reload(true);
    };
  },
  data() {
    return {
      imgURL: "",
    };
  },
  computed: {
    /**
     * @description 登入了嗎？如果登入了，那就顯示圖像吧。如果沒登入那就顯示登入按鈕
     */
    loggedInStatus() {
      if (
        window.sessionStorage.getItem("googleLoggedInToken") ||
        window.sessionStorage.getItem("fbssls_744433083484271")
      ) {
        this.$emit("loginStatus", true);
        return true;
      } else {
        this.$emit("loginStatus", false);
        return false;
      }
    },
  },
  mounted() {
    this.loggedInProfile();
  },
  methods: {
    loggedInProfile() {
      if (window.sessionStorage.getItem("googleLoggedInToken")) {
        const result = jwtDecode(
          window.sessionStorage.getItem("googleLoggedInToken")
        );
        this.imgURL = result.picture;
      } else if (window.sessionStorage.getItem("fbUserImg")) {
        this.imgURL = window.sessionStorage.getItem("fbUserImg");
      }
    },
  },
};
</script>

<style scoped lang="scss">
#loginContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100vw;
  #titleStyle {
    padding-left: 20px;
    h1 {
      color: black;
      font-size: 35px;
      text-shadow: 0 0 5px red;
      font-weight: bold;
      &::after {
        content: "Urban Renewal";
        position: absolute;
        top: 18px;
        left: 18px;
        opacity: 0.2;
      }
      &::before {
        content: "Urban Renewal";
        position: absolute;
        top: 16px;
        left: 16px;
        opacity: 0.2;
      }
    }
  }
  #loginImg {
    margin: auto 8px;
    img {
      border-radius: 50%;
      width: 60px;
      box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.7);
    }
  }
  #notLoginButtonList {
    z-index: 100;
    margin-right: 6px;
    .loginButton {
      margin: 6px 0;
    }
  }
}

@media (max-width: 620px) {
  #loginContainer {
    #notLoginButtonList {
      position: fixed;
      top: 80px;
      right: 10px;
      margin-top: 2px;
      z-index: 100;
      .loginButton {
        margin: 6px 0;
      }
    }
  }
}
</style>

