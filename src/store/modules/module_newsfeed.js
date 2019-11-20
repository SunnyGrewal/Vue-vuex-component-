/*
** Created by scent0330 on 7/2/2019.
** Last updated by scent0330 on 7/2/2019.
*/

import { ACTION_GET_NEWSFEEDS } from '../actions/action_newsfeed'
import axios from 'axios'

const state = {
  hasLoadedOnce: false,
  status: '',
  newsFeeds:[[]],
}

const getters = {
  isNewsFeedsLoaded: state => state.hasLoadedOnce,
  feedStatus: state => state.status,
  allNewsFeeds: state => state.newsFeeds
}

const actions = {
  [ACTION_GET_NEWSFEEDS]: ({commit, dispatch}, languagePrefix) => {
    return new Promise((resolve, reject) => {
      
      commit(ACTION_GET_NEWSFEEDS)

      axios({
	      url: `https://tws.eruptiv.eu/api/v1/${languagePrefix}/newsfeed`,
	      method: 'GET'
      })
      .then(resp => {
        commit(ACTION_GET_NEWSFEEDS, resp.data);
        resolve("success")
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

const mutations = {
  [ACTION_GET_NEWSFEEDS]: (state, feeds) => {
  	state.status = 'success'
    state.hasLoadedOnce = true
    state.newsFeeds = feeds
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
