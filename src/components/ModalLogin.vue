<template id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header text-center">
            <slot name="header">
              <!--default header-->
              <div class="col-sm-11 header-title">

                <p v-if="authType=='login'">For pin Saint you need to Log In</p>

                <p v-if="authType=='register'">Register</p>

              </div>
              <div class="col-sm-1 icon-close text-right">
                <img src="@/assets/images/ico-close.png" alt="close icon" @click="$emit('close')" style="cursor: pointer;">
              </div>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <!--default body-->
              <div class="text-center">
                <p>Via social networks</p>
                <div class="social-buttons">
                  <!--<button type="button" class="btn btn-facebook text-center" @click="login('facebook')">Facebook</button>553492875078849
                  <v-facebook-login app-id="553492875078849"></v-facebook-login>
                  <facebook-login class="button"
                    appId="553492875078849"
                    @login="onLogin"
                    @logout="onLogout"
                    @sdk-loaded="sdkLoaded" />-->

                    <VFBLoginScope appId="553492875078849"
                      @login="onLogin"
                      @logout="onLogout"
                      @connect="isConned"
                      @sdk-init="sdkLoaded"
                      >
                      <button slot-scope="scope" type="button" class="btn btn-facebook text-center"  @click="myfunc(scope)">Facebook</button>
                    </VFBLoginScope>

                  <button type="button" class="btn btn-google text-center" @click="login('google')">Google+</button>
                </div>
                <p>Or use email</p>

                <div v-if="authType=='login'">
                <form @submit.prevent="login('email')">
                  <div class="login-form">
                    <input required v-model="email" type="email" name="email" placeholder="Email" class="text-center">
                    <input required v-model="password" type="password" name="password" placeholder="Password" class="text-center">
                  </div>
                  <p class="forgot-password"><span @click="changeAuthType('forgotpassword')" class="my-a-tag">Forgot password?</span></p>
                  <button type="submit" class="btn btn-login text-center">Log In</button>
                </form>
                <p>Do not have an account? <span @click="changeAuthType('register')" class="my-a-tag">Register</span></p>
                </div>

                <div v-if="authType=='register'">
                <form @submit.prevent="register">
                  <div class="login-form">
                    <input required v-model="email" type="email" name="email" placeholder="Email" class="text-center">
                    <input required v-model="password" type="password" name="password" placeholder="Password" class="text-center">
                    <input required v-model="firstname" type="text" name="firstname" placeholder="First Name" class="name-input text-center">
                    <input required v-model="lastname" type="text" name="lastname" placeholder="Last Name" class="name-input text-center">
                  </div>
                  <button type="submit" class="btn btn-login text-center">Register</button>
                </form>
                <p>Do have an account? <span class="my-a-tag" @click="changeAuthType('login')">Log In</span></p>
                </div>

                <div v-if="authType=='forgotpassword'">
                <form @submit.prevent="iForgotPassword">
                  <div class="login-form">
                    <input required v-model="email" type="email" name="email" placeholder="Email" class="text-center"><br/>
                    <button v-if="!isoldpasswordCode" class="btn btn-login text-center" @click="iForgotPassword">Confirm Code</button>
                    <input v-if="isoldpasswordCode" required v-model="oldpassword" type="password" name="oldpassword" placeholder="Confirm Code" class="text-center">
                    <input v-if="isoldpasswordCode" required v-model="newpassword" type="password" name="newpassword" placeholder="New Password" class="text-center">
                  </div>
                  <button type="submit" v-if="isoldpasswordCode" class="btn btn-login text-center">Change Password</button>
                  <p v-if="isChangePasswordSuccess">Your New Password has been saved. Please <span class="my-a-tag" @click="changeAuthType('login')">Log In</span>.</p>
                </form>
                </div>

              </div>
            </slot>
          </div>
<!--
          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
-->
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
  import Vue from 'vue'
  import { mapGetters, mapState } from 'vuex'

  import { AUTH_REQUEST } from '../store/actions/auth'
  import { ACTION_LANGUAGE } from '../store/actions/action_language'
  import { ACTION_CHANGE_PASSWORD } from '../store/actions/action_changepassword'

  //import facebookLogin from 'facebook-login-vuejs';
  //import { VFacebookLogin, VFBLoginScope } from 'vue-facebook-login-component'
  import { VFBLoginScope } from 'vue-facebook-login-component'
  
  export default {
    name: 'login',
    components: { VFBLoginScope },
    props: {
      authType: String,
    },
    data () {
      return {
        logintype: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        isoldpasswordCode: false,
        isChangePasswordSuccess: false,

        isConnected: false,
        name: '',
        //email: '',
        personalID: '',
        FB: '',
      }
    },
    methods: {
      login: function (loginType) {
        if (loginType == 'google')
        {
          this.$gAuth.signIn()
          .then(GoogleUser => {

            var authResp = GoogleUser.getAuthResponse().access_token;
            this.$store.dispatch(AUTH_REQUEST, {logintype: 'google', authToken: authResp, currentLanguageID: this.allLanguages[this.currentLanguageID]})
            //this.isSignIn = this.$gAuth.isAuthorized
          })
          .catch(error  => {
            //console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
          })
        }
        else if (loginType == 'facebook')
        {
          this.$store.dispatch(AUTH_REQUEST, { logintype: 'facebook'}).then(() => {})
        }
        else
        {
          if (this.isChangePasswordSuccess)
          {
            this.isChangePasswordSuccess = false;
          }
          this.logintype = loginType;
          const { logintype, email, password, currentLanguageID } = this
          this.$store.dispatch(AUTH_REQUEST, { logintype, email, password, currentLanguageID }).then(() => {})
        }
      },
      register: function () {
        const { email, password, firstname, lastname, currentLanguageID } = this
        this.$store.dispatch(AUTH_REQUEST, { logintype: 'register', email, password, firstname, lastname, currentLanguageID }).then(() => {
        })
      },
      iForgotPassword: function () {
        if (!this.isoldpasswordCode) {
          // confirm code
          const { email, isoldpasswordCode } = this;
          this.$store.dispatch(ACTION_CHANGE_PASSWORD, { email, isoldpasswordCode }).then((resp) => {
            this.isoldpasswordCode = true;
          })
        }
        else {
          const { email, oldpassword, newpassword, isoldpasswordCode } = this
          this.$store.dispatch(ACTION_CHANGE_PASSWORD, { email, oldpassword, newpassword, isoldpasswordCode }).then((resp) => {
            console.log("resp", resp);
            this.isoldpasswordCode = false;
            this.isChangePasswordSuccess = true;
          })
        }
      },
      changeAuthType: function (type) {
        this.authType = type;
      },

      loginWithFB() {
        /*this.FB.api('/me', 'GET', { fields: 'id,name,email' },
          userInformation => {
            console.warn("data api",userInformation)
            this.personalID = userInformation.id;
            this.email = userInformation.email;
            this.name = userInformation.name;
          }
        )*/
        this.$store.dispatch(AUTH_REQUEST, { logintype: 'facebook', authToken: this.FB.getAccessToken(), currentLanguageID: this.allLanguages[this.currentLanguageID] }).then(() => {})
        //console.log("token", this.FB.getAccessToken());
      },
      sdkLoaded(payload) {
        console.log("sdk init");
        this.FB = payload.FB
        if (this.isConnected) this.loginWithFB()
      },
      onLogin() {
        console.log("login");
        this.isConnected = true
        this.loginWithFB()
      },
      onLogout() {
        console.log("logout");
        this.isConnected = false;
      },
      isConned() {
        console.log("connected");
        this.isConnected = true;
      },
      myfunc(scope){
        if (!this.isConnected)
        {
          scope.toggleLogin();
        }
        else{
          scope.login();
        }
      }
    },
    computed: {
      ...mapGetters(['currentLanguageID', 'allLanguages']),
    }
  }
</script>
