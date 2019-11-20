/*
** Created by scent0330 on 6/21/2019.
** Last updated by scent0330 on 7/3/2019.
*/

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const store = () => import('@/store')
const Home = () => import('@/views/Home.vue')
const Profile = () => import('@/views/Profile.vue')
const PostDetail = () => import('@/views/PostDetail.vue')
const MySpace = () => import('@/views/MySpace.vue')
const NotFound = () => import('@/views/404.vue')

const Authenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {
        path: '/post',
        name: 'postdetail',
        component: PostDetail
      },
      {
        path: '/space',
        name: 'myspace',
        component: MySpace,
        beforeEnter: Authenticated,
      },
      {
        path: '*',
        name: '404',
        component: NotFound
      }
    ]
  })
}

/*
import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import PostDetail from '@/views/PostDetail.vue'
import MySpace from '@/views/MySpace.vue'
import NotFound from '@/views/404.vue';

import store from '@/store';

Vue.use(Router)

const Authenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/post',
      name: 'postdetail',
      component: PostDetail
    },
    {
      path: '/space',
      name: 'myspace',
      component: MySpace,
      beforeEnter: Authenticated,
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
*/