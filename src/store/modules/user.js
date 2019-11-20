import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import apiCall from '../../utils/api'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'

const state = { 
  status: '', 
  profile: {},
}

const getters = {
  getUserProfile: state => state.profile,
  getProfileStatus: state => state.status,
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {

    commit(USER_REQUEST) // step 1

    let token = localStorage.getItem('my-token-info');
    //console.log(`Bearer ${token}`);
    let header = { 
      'Authorization': `Bearer ${token}`,
    };
    apiCall({url: 'https://tws.eruptiv.eu/api/v1/userprofile?_format=json', method: 'get', header: header})
      .then(resp => {
        commit(USER_SUCCESS, resp.data) // step 2 : if success, save user data to profile
      })
      .catch(err => {
        //console.log("user err", err);
        commit(USER_ERROR) // step 2 : if failed
        
        dispatch(AUTH_LOGOUT) // if resp is unauthorized, logout
      })
  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, user) => {
    Vue.set(state, 'status', 'success')
    //state.status = 'success'
    Vue.set(state, 'profile', user)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
