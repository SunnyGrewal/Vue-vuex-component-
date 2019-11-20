<template>

	<section id="myspace">
		<div class="container page ">
			<div class="row pt-5 pb-5">
				<div class="col-md-6 text-left">
					<h1 class="myspace-title">my space</h1>
				</div>
				<div class="col-md-6 text-right">
					<span class="myspace-title">{{getUserProfile["firstName"]}} {{getUserProfile["lastName"]}}</span>
				</div>
			</div>
			<div class="row topPos">
				<div class="col-md-4">
					<LeftNav />
				</div>
				<div class="col-md-8">
					<simplebar class="main-scrollbar" data-simplebar-auto-hide="true">
					<div ref="toGetTPos">

					<div v-if="!!getUserProfile['saintOfMonth']" class="saint-card">
						<div class="saint-card-header">
							<div class="title">Saint of the month</div>
						</div>
						<hr>
						<div class="saint-card-body">
							<div class="container">
								<div class="row">
									<div class="col-sm-1">
										<img :src="getMonthSaintImg(getUserProfile['saintOfMonth']['saintId'])" class="avatar" @click="currentProfileID(getUserProfile['saintOfMonth']['saintId'])">
									</div>
									<div class="col-sm-10">
										<p class="name">{{getMonthSaintName(getUserProfile['saintOfMonth']['saintId'])}}</p>
										<p class="profession">{{getMonthSaintDescription(getUserProfile['saintOfMonth']['saintId'])}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div v-if="!getUserProfile['saintOfMonth']" class="saint-card no-saint">
						<div class="saint-card-header">
							<div class="title">Saint of the month</div>
						</div>
						<hr>
						<div class="saint-card-body">
							<div class="no-saint-text text-center">
								<p>You dont have Saint of the Month</p>
							</div>
							<div class="text-center">
								<button type="button" class="btn no-saint-btn" @click="addSaintOfMonth">Pick your Saint of the Month</button>
							</div>
						</div>
					</div>

					<div class="saint-card">
						<div class="saint-card-header">
							<div class="title">My Selfie</div>
						</div>
						<hr>
						<div class="saint-card-body">
							<VueGallery :images="imagesGal" :index="index" @close="index = null"></VueGallery>
							<ul>
								<li v-for="id in imagesGal.length" :key="id">
									<div class="gal-img" @click="index = id-1">
										<img :src="imagesGal[id-1]" class="selfie-photo">
									</div>
								</li>
							</ul>	
						</div>
					</div>

					</div>
					</simplebar>
					
				</div>
			</div>
		</div>
	</section>

</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import { ACTION_PROFILE_CURRENT } from '../store/actions/action_profilecurrent'
	import { USER_REQUEST } from '../store/actions/user'
	
	import LeftNav from '@/components/LeftNav'

	import VueGallery from 'vue-gallery';
	import simplebar from 'simplebar-vue';
	import 'simplebar/dist/simplebar.min.css';

	import axios from 'axios'

	export default {
		name: 'MySpace',
		components: { LeftNav, VueGallery, simplebar },
		data () {
			return {
				index: null,
				//topPos: "",
				//topPosScroll: "",
			}
		},
		/*mounted: function(){
			//this.getTPos();
		},
		watch: {
			getProfileStatus: function (newQuestion, oldQuestion) {
				this.getTPos();
			}
		},*/
		methods: {
			currentProfileID : function (saint_id) {
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
			getMonthSaintImg : function (saint_id) {
				// saint_id, id of saint from user's info

				// to get the index of allSaints array ...
				let numberOfSaints = this.allSaints.length;
				for (var temp_num = 0; temp_num<numberOfSaints;temp_num++)
				{
					if (this.allSaints[temp_num]['id'] == saint_id) {
						return this.allSaints[temp_num]['avatar'];
					}
				}
				return false;
			},
			getMonthSaintName : function (saint_id) {
				// saint_id, id of saint from user's info

				// to get the index of allSaints array ...
				let numberOfSaints = this.allSaints.length;
				for (var temp_num = 0; temp_num<numberOfSaints;temp_num++)
				{
					if (this.allSaints[temp_num]['id'] == saint_id) {
						return this.allSaints[temp_num]['name'];
					}
				}
				return false;
			},
			getMonthSaintDescription : function (saint_id) {
				// saint_id, id of saint from user's info

				// to get the index of allSaints array ...
				let numberOfSaints = this.allSaints.length;
				for (var temp_num = 0; temp_num<numberOfSaints;temp_num++)
				{
					if (this.allSaints[temp_num]['id'] == saint_id) {
						return this.allSaints[temp_num]['description'];
					}
				}
				return false;
			},
			addSaintOfMonth : function() { // get random saint for month
				let arrayOfAllSaintsID = [];
				for (let i = 0; i < this.allSaints.length; i++) {
					arrayOfAllSaintsID[i] = this.allSaints[i]['id'];
				}
				let maxRandNum = arrayOfAllSaintsID.length;
				let randomNum = Math.floor(Math.random()*maxRandNum);

				let apiURL = `https://tws.eruptiv.eu/api/v1/addsaintofmonth/${this.allSaints[randomNum]['id']}`
				let token = localStorage.getItem('my-token-info');
				let header = { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				};
				axios({
					url: apiURL,
					data: '',
					headers: header,
					method: 'PUT',
				})
				.then(res => {
					// success
					//console.log("success", res);
					if (res.data != "Saint of the month already exist") {
						this.$store.dispatch(USER_REQUEST)
					}
					else
					{
						// already exist
					}
				})
				.catch(err => {
					// failed
					//console.log("error", err);
					return err
				})
			},
			/*getTPos(){
				if (this.getProfileStatus == 'success') {
					this.topPos = "height: " + (window.innerHeight) + "px;"
					this.topPosScroll = "height: " + (window.innerHeight - this.$refs.toGetTPos.getBoundingClientRect().top) + "px;"
				}
			},*/
		},
		computed: {
			...mapGetters(['allSaints', 'getUserProfile', 'getProfileStatus']),
			...mapState({
				imagesGal: state => {
					if (state.user.status == 'success')
					{
						let current = state.user.profile['selfies'];
						let i = 0;
						let imageCount = current.length;
						let res = [];
						while (i<imageCount){
							res[i] = current[i]['image'];
							i++;
						}
						return res;
					}
				}
			}),
		}
	}
</script>