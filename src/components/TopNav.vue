<template>
	<section id="header">
	<div id="top-bar">
		<div class="text-center">
			<span>Get Our Book and App follow to this links</span>
			<button type="button" class="btn btn-white-stroke">Buy the Book and get App</button>
		</div>
	</div>
	<div id="nav-bar">
		<nav class="navbar navbar-expand-lg navbar-light">
				<router-link to="/" class="navbar-brand">
				<img src="@/assets/logo.png" alt="saint logo image">
				</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item first-item">
						<router-link to="/" class="nav-link">
							NEWSFEED
						</router-link>
					</li>
					<li v-if="loading"><loading /></li>
					<li v-if="!isAuthenticated && authStatus !== 'loading'" class="nav-item first-item">
						<!-- template for the modal component -->
						<div id="login-modal">
							<a class="nav-link" id="show-modal" @click="showLoginModal = true" style="cursor: pointer;">SIGN IN</a>
							<!-- use the modal component, pass in the prop -->
							<ModalLogin v-if="showLoginModal" @close="showLoginModal = false" authType="login">
								<!--
								custom content
								-->
							</ModalLogin>
						</div>
					</li>

					<li v-if="!isAuthenticated && authStatus !== 'loading'" class="nav-item first-item">
						<!-- template for the modal component -->
						<div id="register-modal">
							<a class="nav-link" id="show-modal" @click="showRegisterModal = true" style="cursor: pointer;">REGISTER</a>
							<!-- use the modal component, pass in the prop -->
							<ModalLogin v-if="showRegisterModal" @close="showRegisterModal = false" authType="register">
								<!--
								custom content
								-->
							</ModalLogin>
						</div>
					</li>

					<li v-if="isAuthenticated" class="nav-item border-none">
						<div class="dropdown">
							<button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								MY PROFILE
							</button>
							<div class="dropdown-menu dropdown-menu-right mt-4" aria-labelledby="dropdownMenuButton">
								
								<router-link to="/space" class="dropdown-item">
									<img src="@/assets/images/ico-user-avatar.png" alt="user avatar"> My Space
								</router-link>
								
								<a class="dropdown-item" style="cursor: pointer;" @click="logout">
									<img src="@/assets/images/ico-logout.png" alt="log out"> Log out
								</a>
							</div>
						</div>
					</li>
					<li class="nav-item border-none">
						<div style="height:36px;"></div>
					</li>
					<li v-if="!isAuthenticated && authStatus !== 'loading'" class="nav-item border-none">
						<div style="height:36px;"></div>
					</li>
					<li class="nav-item border-none">
						<div class="dropdown">
							<button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								{{currentLanguage}}
							</button>
							<div class="dropdown-menu dropdown-menu-right mt-4" aria-labelledby="dropdownMenuButton">
								<a class="dropdown-item" v-for="id in allLanguages.length" :key="id" @click="setLanguage(id-1)">{{languageMap[allLanguages[id-1]]}}</a>
							</div>
						</div>
					</li>
					<li v-if="isAuthenticated" class="nav-item border-none">
						<img src="@/assets/images/avatar.png" alt="avatar" class="avatar" @click="linkTo('/')">
					</li>
				</ul>
			</div>
		</nav>
	</div>
	</section>
</template>

<script>
	import ModalLogin from '@/components/ModalLogin'

	import { mapGetters, mapState } from 'vuex'
	import { AUTH_LOGOUT } from '../store/actions/auth'
	import { ACTION_LANGUAGE, ACTION_LANGUAGE_LIST } from '../store/actions/action_language'
	import { ACTION_GET_NEWSFEEDS } from '../store/actions/action_newsfeed'
	import { ACTION_ALLSAINTS } from '../store/actions/action_allsaints'

	export default {
		name: 'TopNav',
		components: { ModalLogin },
		mounted: function () {
			this.$store.dispatch(ACTION_ALLSAINTS, this.allLanguages[this.currentLanguageID])
			this.getLanguageList()
		},
		methods: {
			logout: function(){
				this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/'))
			},
			linkTo: function (url){
				this.$router.push(url);
			},
			setLanguage: function (lang_id) {
				let lang = this.allLanguages[lang_id];
				this.$store.dispatch(ACTION_LANGUAGE, lang_id)
				this.$store.dispatch(ACTION_GET_NEWSFEEDS, lang)
				this.$store.dispatch(ACTION_ALLSAINTS, lang)
			},
			getLanguageList: function() {
				this.$store.dispatch(ACTION_LANGUAGE_LIST)
			}
		},
		computed: {
			...mapGetters(['isAuthenticated', 'authStatus', 'allSaints', 'currentLanguageID', 'allLanguages']),
			...mapState({
				authLoading: state => state.auth.status === 'loading',
				name: state => `${state.user.profile.title} ${state.user.profile.name}`,
				currentLanguage: state => state.module_language.languages[state.module_language.language],
			}),
			loading: function () {
				return this.authStatus === 'loading' && !this.isAuthenticated
			}
		},
		data () {
			return {
				showLoginModal: false,
				showRegisterModal: false,
				languageMap: {'en': 'English', 'fr': 'French', 'es': 'Spanish', 'pt-pt': 'Portuguese', 'it': 'Italian'},
			}
		}
	}
</script>