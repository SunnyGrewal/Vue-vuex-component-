<template>
	<div class="component search-area topPos">	
		<div class="search-box">
			<span><img src="@/assets/images/ico-search.png"> Saint |</span>
			<input type="text" v-model="searchFilterText" name="search-box">
		</div>

		<div v-if="isAuthenticated && !!getUserProfile['pinnedOn']" class="pinned-saints" ref="toGetPinnedTPos">
			<div class="title">My Pinned Saints</div>
			<hr>
			<ul>
				<li v-for="item in getUserProfile['pinnedOn']" :key="item['id']">
					<!--pinned saints should be here-->
					<img :src="getUrlFromSaintID(item['id'])" class="avatar" @click="currentProfileID(item['id'])">
				</li>
			</ul>
			<div class="text-center">
				<img src="@/assets/images/ico-arrow-down.png" alt="down arrow image">
			</div>
		</div>

		<div class="browse-saints">
			<div class="title">Browse Saints</div>
			<hr>

			<simplebar class="leftnav-scrollbar" data-simplebar-auto-hide="true">
			<ul ref="toGetTPos">
				<li v-for="saint in filteredSaintsList" :key="saint.id" @click="currentProfileID(saint.id)">

					<div v-if="saint">
					<div class="container">
						<div class="row">
							<div class="col-sm-2">
								<img :src="saint['avatar']" class="avatar">
							</div>
							<div class="col-sm-10">
								<p class="name">
									{{saint['name']}}
								</p>
								<p class="profession">{{saint['description']}}</p>
							</div>
						</div>
					</div>
					</div>

				</li>
			</ul>
			</simplebar>
		</div>
	</div>
</template>


<script>
	import { mapGetters } from 'vuex'
	import { ACTION_PROFILE_CURRENT } from '../store/actions/action_profilecurrent'
	import { USER_REQUEST } from '../store/actions/user'

	import simplebar from 'simplebar-vue';
	import 'simplebar/dist/simplebar.min.css';

	export default {
		name: 'LeftNav',
		components: { simplebar },
		mounted: function () {
			this.$store.dispatch(USER_REQUEST)
			.then(res => {
				this.getTPos()
			})
			this.getTPos()
		},
		watch: {
			isAuthenticated: function (newQuestion, oldQuestion) {
				this.getTPos();
			},
			getProfileStatus: function (newQuestion, oldQuestion) {
				if (this.getProfileStatus == 'success') {
					this.getTPos();
				}
			}
		},
		created() {
			window.addEventListener('resize', this.getTPos)
			this.getTPos();
		},
		destroyed() {
			window.removeEventListener('resize', this.getTPos)
		},
		methods: {
			currentProfileID : function (saint_id) {
				// saint_id, id of saint from allNewsFeeds

				// to get the index of allSaints array ...
				let numberOfSaints = this.allSaints.length;
				let indexOfSaints = -1;
				for (var temp_num = 0; temp_num<numberOfSaints;temp_num++)
				{
					if (this.allSaints[temp_num]['id'] == saint_id) {
						indexOfSaints = temp_num;
					}
				}

				this.$store.dispatch(ACTION_PROFILE_CURRENT, indexOfSaints)
				this.$router.push('/profile')
			},
			getUrlFromSaintID : function (saint_id) {

				let numberOfSaints = this.allSaints.length;
				for (var temp_num = 0; temp_num<numberOfSaints;temp_num++)
				{
					if (this.allSaints[temp_num]['id'] == saint_id) {
						return this.allSaints[temp_num]['avatar'];
					}
				}
				return '';
			},
			/*handleResize() {
				this.window.width = window.innerWidth;
				this.window.height = window.innerHeight;
			},*/
			getTPos(){ // get top position style
				if (!this.isAuthenticated && this.isAllSaintsLoaded) {
					this.topPos = "height: " + (window.innerHeight) + "px;"
					this.topPosScroll = "height: " + (window.innerHeight - this.$refs.toGetTPos.getBoundingClientRect().top) + "px;"
					console.log("!auth, screen height", screen.height)
					console.log("!auth, window height", window.innerHeight)
					console.log("!auth", window);
					console.log("!auth, top",this.$refs.toGetTPos.getBoundingClientRect().top)
					console.log("!auth, rect",this.$refs.toGetTPos.getBoundingClientRect())
				}
				if (this.isAuthenticated && this.isAllSaintsLoaded && this.getProfileStatus == 'success') {
					this.topPos = "height: " + (window.innerHeight) + "px;"
					this.topPosScroll = "height: " + (window.innerHeight - this.$refs.toGetTPos.getBoundingClientRect().top) + "px;"
					console.log("auth, window height", window.innerHeight)
					console.log("auth, top",this.$refs.toGetTPos.getBoundingClientRect().top)
					console.log("auth, rect",this.$refs.toGetTPos.getBoundingClientRect())
				}
				return true;
			}
		},
		computed: {
			...mapGetters(['isAuthenticated', 'authStatus', 'currentLanguageID', 'allLanguages', 'allSaints', 'isAllSaintsLoaded', 'getUserProfile', 'getProfileStatus']),
			filteredSaintsList() {
				if (this.isAllSaintsLoaded) {
					return this.allSaints.filter(saint => {
						return saint.name.toLowerCase().includes(this.searchFilterText.toLowerCase())
					})
				}
				else
					return this.allSaints;
			},
		},
		/*watch: {
			km2: function(val){
				this.km2 = val;
				this.mm = val * 1000000;
			},
		}*/
		data () {
			return {
				searchFilterText: '',
				showLeftNav: false,
				imgUrlList: [],
				topPos: "",
				topPosScroll: "",
				//window: {
				//	width: 0,
				//	height: 0
				//}
			}
		}
	}
</script>