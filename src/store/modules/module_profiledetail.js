import { ACTION_PROFILE_DETAIL, ACTION_PROFILE_DETAIL_CANCEL } from '../actions/action_profiledetail'
import { AUTH_LOGOUT } from '../actions/auth'

const state = {
  hasLoadedOnce: false,
  status: true,
  profileDetailID: 0,
}

const getters = {
  getProfileDetailStatus: state => state.status,
  getProfileDetailID: state => state.profileDetailID,
  profileDetailLoaded: state => state.hasLoadedOnce,
}

const actions = {
  [ACTION_PROFILE_DETAIL]: ({commit, dispatch}, detailId) => {
    return new Promise((resolve, reject) => {

      let token_item = localStorage.getItem('my-token-info');
      if (token_item) {
      	commit(ACTION_PROFILE_DETAIL, detailId)
      }
      else{
      	reject()
      }
      resolve()
    })
  }
}

const mutations = {
  [ACTION_PROFILE_DETAIL]: (state, detailId) => {
    state.status = true
    state.hasLoadedOnce = true
    state.profileDetailID = detailId
  },
  [ACTION_PROFILE_DETAIL_CANCEL]: (state) => {
  	state.profileDetailID = 0
  	state.status = false
  	state.hasLoadedOnce = false
  },
  [AUTH_LOGOUT]: (state) => {
    state.profileDetailID = 0
    state.status = true
    state.hasLoadedOnce = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
