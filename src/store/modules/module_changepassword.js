/*
** Created by scent0330 on 7/11/2019.
** Last updated by scent0330 on 7/11/2019.
*/
import axios from 'axios';
import { ACTION_CHANGE_PASSWORD } from '../actions/action_changepassword'

const state = {
	needConfirm: false,
}

const getters = {
	changePasswordStatus: state => state.needConfirm,
}

const actions = {
	[ACTION_CHANGE_PASSWORD]: ({commit, dispatch}, data) => {
		return new Promise((resolve, reject) => {
			if ( !data.isoldpasswordCode ) {
				let header = { 
					'Content-Type': 'application/json',
				};
				let sendData = { 
					mail: data.email
				};
				axios({
					url: `https://tws.eruptiv.eu/user/lost-password?_format=json`, 
					headers: header,
					data: sendData, 
					method: 'POST',
				})
				.then(resp => {
					resolve(resp.data)
				})
				.catch(err => {
					reject(err)
				})
			}
			else {
				let sendData = {
					mail: data.email, 
					temp_pass: data.oldpassword,
					new_pass: data.newpassword
				};
				let header = { 
					'Content-Type': 'application/json',
				};
				axios(
					{
						url: 'https://tws.eruptiv.eu/user/lost-password-reset?_format=json', 
						headers: header,
						data: sendData, 
						method: 'POST',
					}
				)
				.then(resp => {
					resolve(resp.data)
				})
				.catch(err => {
					reject(err)
				})
			}
		//commit(ACTION_CHANGE_PASSWORD)
		})
	}
}

const mutations = {
	[ACTION_CHANGE_PASSWORD]: () => {
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
