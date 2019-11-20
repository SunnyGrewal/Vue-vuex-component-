import { ACTION_POST_DETAIL_CURRENT } from '../actions/action_postdetailcurrent'

const state = {
  hasLoadedOnce: false,
  status: '',
  saint_id: 0,
}

const getters = {
  postdetailStatus: state => state.status,
  currentPostDetailID: state => state.saint_id,
}

const actions = {
  [ACTION_POST_DETAIL_CURRENT]: ({commit, dispatch}, saint_id) => {
    return new Promise((resolve, reject) => {
      commit(ACTION_POST_DETAIL_CURRENT, saint_id);
      resolve()
    })
  }
}

const mutations = {
  [ACTION_POST_DETAIL_CURRENT]: (state, saint_id) => {
    state.status = 'success'
    state.hasLoadedOnce = true
    state.saint_id = saint_id
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
