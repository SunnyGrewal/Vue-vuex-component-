import { ACTION_ALLSAINTS } from '../actions/action_allsaints'
import axios from 'axios'

const state = {
  hasLoadedOnce: false,
  status: '',
  all_saints:[[]],
}

const getters = {
  saintStatus: state => state.status,
  allSaints: state => state.all_saints,
  isAllSaintsLoaded: state => state.hasLoadedOnce,
}

const actions = {
  [ACTION_ALLSAINTS]: ({commit, dispatch}, languagePrefix) => {
    return new Promise((resolve, reject) => {

      let token_item = localStorage.getItem('my-token-info');

      let header = { 
        'Authorization': `Bearer ${token_item}`,
      };
      axios(
        {
          url: `https://tws.eruptiv.eu/api/v1/${languagePrefix}/allsaints`, 
          headers: header,
          method: 'GET',
        }
      )
      .then(resp => {
        commit(ACTION_ALLSAINTS, resp.data);
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })


      resolve()
    })
  }
}

const mutations = {
  [ACTION_ALLSAINTS]: (state, saints) => {
    state.status = 'success'
    state.hasLoadedOnce = true
    state.all_saints = saints
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
