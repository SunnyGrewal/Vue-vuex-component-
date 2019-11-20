/*
** Created by scent0330 on 7/2/2019.
** Last updated by scent0330 on 7/2/2019.
*/

import { ACTION_LANGUAGE, ACTION_LANGUAGE_LIST } from '../actions/action_language'
import axios from 'axios'

const state = {
  hasLoadedOnce: false,
  language: 0,
  languages: ['en'],
}

const getters = {
  currentLanguageID: state => state.language,
  allLanguages: state => state.languages,
}

const actions = {
  [ACTION_LANGUAGE]: ({commit, dispatch}, lang_id) => {
    commit(ACTION_LANGUAGE, lang_id)
  },
  [ACTION_LANGUAGE_LIST]: ({commit, dispatch}) => {
    let apiURL = 'https://tws.eruptiv.eu/api/v1/languages'
    axios({
      url: apiURL,
      method: 'GET',
    })
    .then(res => {
      // success
      commit(ACTION_LANGUAGE_LIST, res.data);
    })
    .catch(err => {
      // failed
    })
  }
}

const mutations = {
  [ACTION_LANGUAGE]: (state, lang_id) => {
    state.language = lang_id
  },
  [ACTION_LANGUAGE_LIST]: (state, list) => {
    state.languages = list
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
