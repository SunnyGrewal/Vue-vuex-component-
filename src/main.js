/*
** Created by scent0330 on 6/21/2019.
** Last updated by scent0330 on 7/1/2019.
*/

import Vue from 'vue'
import App from '@/App.vue'
import { createRouter } from '@/router'
import { createStore } from '@/store'
import { sync } from 'vuex-router-sync'

import axios from 'axios'

import Loading from '@/components/lib/loading'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/style/main.scss';

import GoogleAuth from 'vue-google-oauth2'
Vue.use(GoogleAuth, { client_id: '833706975830-5s0vot6n0mjpr93vmjhvq4056a55de3q.apps.googleusercontent.com' })

const token = localStorage.getItem('my-token-info')

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

Vue.component('loading', Loading)

export function createApp () {
  // create router and store instances
  const router = createRouter()
  const store = createStore()

  // sync so that route state is available as part of the store
  sync(store, router)

  // create the app instance, injecting both the router and the store
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  return { app, router, store }
}

