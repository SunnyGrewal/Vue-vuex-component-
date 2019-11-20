import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT } from '../actions/auth'
import { ACTION_ALLSAINTS } from '../actions/action_allsaints'
import { USER_REQUEST } from '../actions/user'

import axios from 'axios'

const querystring = require('querystring');

const state = { 
  token: localStorage.getItem('my-token-info') || '',
  status: '',
  hasLoadedOnce: false,
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      //console.log(user);
      let header = { 
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      commit(AUTH_REQUEST);

      let sendData = {};
      if (user.logintype == 'email')
      {
        sendData = { 
          grant_type: user.logintype, 
          client_id: '19209f7b-6240-464c-b224-bd0f39017626', 
          client_secret: 'abc',
          mail: user.email, 
          password: user.password,
        };
      }
      else if (user.logintype == 'google')
      {
        sendData = { 
          grant_type: 'social', 
          client_id: '19209f7b-6240-464c-b224-bd0f39017626', 
          client_secret: 'abc',
          social_type: user.logintype,
          token: user.authToken,
        };
      }
      else if (user.logintype == 'facebook')
      {
        sendData = { 
          grant_type: 'social', 
          client_id: '19209f7b-6240-464c-b224-bd0f39017626', 
          client_secret: 'abc',
          social_type: user.logintype,
          token: user.authToken,
        };
      }
      else if (user.logintype == 'register')
      {
        sendData = { 
          grant_type: user.logintype, 
          client_id: '19209f7b-6240-464c-b224-bd0f39017626', 
          client_secret: 'abc',
          mail: user.email, 
          password: user.password,
          first_name: user.firstname,
          last_name: user.lastname
        };
      }
      axios(
        {
          url: 'https://tws.eruptiv.eu/oauth/token', 
          headers: header, 
          data: querystring.stringify(sendData), 
          method: 'POST',
        }
      )
      .then(resp => {
        /*  resp.data has these items: 
        **  token_type: Bearer
        **  expires_in: ...
        **  access_token: ...
        **  refresh_token: ...
        */
        //console.log(resp);
        localStorage.setItem('my-token-info', resp.data.access_token);

        // Set the header of your ajax library to the token value.
        axios.defaults.headers.common['Authorization'] = resp.data.access_token

        commit(AUTH_SUCCESS, resp.data.access_token);

        //dispatch(ACTION_ALLSAINTS, user.currentLanguageID)
        dispatch(USER_REQUEST)

        resolve(resp.data.access_token)
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('my-token-info')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {

      commit(AUTH_LOGOUT)
      localStorage.removeItem('my-token-info')

      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token_obj) => {
    state.status = 'success'
    state.token = token_obj
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
