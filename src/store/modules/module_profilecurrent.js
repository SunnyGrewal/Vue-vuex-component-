import { ACTION_PROFILE_CURRENT } from '../actions/action_profilecurrent'
//import axios from 'axios'

const state = {
  hasLoadedOnce: false,
  status: '',
  id: 0,
}

const getters = {
  currentSaintStatus: state => state.status,
  currentProfileID: state => state.id, // index of allSaints array
}

const actions = {
  [ACTION_PROFILE_CURRENT]: ({commit, dispatch}, profileID) => {
    return new Promise((resolve, reject) => {
      //console.log(profileID);
      //let token_item = localStorage.getItem('my-token-info');
      commit(ACTION_PROFILE_CURRENT, profileID);
      resolve()
    })
  }
}

const mutations = {
  [ACTION_PROFILE_CURRENT]: (state, id) => {
    state.status = 'success'
    state.hasLoadedOnce = true
    state.id = id
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
