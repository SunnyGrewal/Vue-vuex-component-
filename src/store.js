/*
** Created by scent0330 on 6/21/2019.
** Last updated by scent0330 on 7/1/2019.
*/

import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import auth from '@/store/modules/auth'
import module_newsfeed from '@/store/modules/module_newsfeed'
import module_language from '@/store/modules/module_language'
import module_allsaints from '@/store/modules/module_allsaints'
import module_profilecurrent from '@/store/modules/module_profilecurrent'
import module_postdetailcurrent from '@/store/modules/module_postdetailcurrent'
import module_changepassword from '@/store/modules/module_changepassword'
import module_profiledetail from '@/store/modules/module_profiledetail'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    auth,
    module_newsfeed,
    module_language,
    module_allsaints,
    module_profilecurrent,
    module_postdetailcurrent,
    module_changepassword,
    module_profiledetail,
  }
})
