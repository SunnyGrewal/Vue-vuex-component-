<template>
  <div id="app">
    <TopNav />

    <!--<transition name="router-animation"> enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">-->
      <router-view/>
    <!--</transition>-->
    <Footer />
  </div>
</template>

<script>
  import TopNav from '@/components/TopNav'
  import Footer from '@/components/Footer'

  import { AUTH_LOGOUT } from '@/store/actions/auth'
  import axios from 'axios'

  export default {
    name: 'App',
    components: { TopNav, Footer },
    created: function () {
      axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
            this.$store.dispatch(AUTH_LOGOUT)
          // you can also redirect to /login if needed !
          }
          throw err;
        });
      });
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss">

@import url("https://cdn.jsdelivr.net/npm/animate.css@3.5.1");

.page {
  width: inherit;
}

.router-animation-enter-active {
  animation: coming 1s;
  animation-delay: .5s;
  opacity: 0;
}
.router-animation-leave-active {
  animation: going 1s;
}
@keyframes going {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>