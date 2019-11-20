<template>
	<section id="newsfeed" class="profile">
		<div class="page topPos">
			<div class="row">
				<!-- Left Nav Component -->
				<div class="offset-md-2 col-md-3">
					<LeftNav />
				</div>
				<!-- Main -->
				<div class="col-md-7">
					<div class="row">
						<!-- Main Body -->

						<div class="col-md-8">
							<simplebar id="main-content" class="right-scrollbar" data-simplebar-auto-hide="true">
							<div class="top-area">
								<router-link to="/"><span> &lt; Back </span></router-link>
								<div class="container">
									<div class="row">
										<div class="left-img">

											<img :src="allSaints[currentProfileID]['avatar']" alt="left image" class="img-fluid img-left">

										</div>
										<div class="right-img">

											<img :src="allSaints[currentProfileID]['video']['image']" alt="right image" class="img-fluid img-right">

										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-7">
										<p class="name">{{allSaints[currentProfileID]['name']}}</p>
										<p class="profession">{{allSaints[currentProfileID]['description']}}</p>
									</div>
									<div class="col-sm-5 text-right">
										<button type="button" class="btn" @click="pinSaintToSpace">{{addPinButtonText[isPinned]}}</button>
										<img src="@/assets/images/profile-left-arrow.png" alt="left arrow image" class="arrow-with-cicle">
									</div>
								</div>
								<hr>
								<ul>
									<li><a @click="rightNav(0)" :class="rightNaveActiveClass[0]">SummaRy</a></li>
									<li><a @click="rightNav(1)" :class="rightNaveActiveClass[1]">BIOGRAPHY</a></li>
									<li><a @click="rightNav(2)" :class="rightNaveActiveClass[2]">patronage/depiction</a></li>
									<li><a @click="rightNav(3)" :class="rightNaveActiveClass[3]">Gallery</a></li>
								</ul>
							</div>

							<!--
							<div v-for="n in 5" :key="n">

							<div class="saint-card n">
								<div class="saint-card-header">
									<div class="container">
										<div class="row">
											<div class="col-sm-1">
												<img src="@/assets/images/saint-avatar.png">
											</div>
											<div class="col-sm-10">
												<p class="name">Saint John Bosco</p>
												<p class="time">3 hours ago</p>
											</div>
											<div class="col-sm-1 text-right">
												<img src="@/assets/images/ico-arrow-right-round.png" alt="arrow right image">
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="saint-card-body">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id tellus at risus pulvinar interdum. Curabitur ut sem tellus. Donec bibendum, dui sed mattis lobortis, risus velit tempor lorem, ut interdum metus massa vel erat.
								</div>
								<div class="saint-card-footer">
									<button type="button" class="btn quotes-red">Quotes</button>
								</div>
							</div>

							</div>-->

							<!-- new card -->
							

							<div v-if="allSaints[currentProfileID]['quotes']">

							<div v-for="id in allSaints[currentProfileID]['quotes'].length" :key="id">

							<div class="saint-card">
								<div class="saint-card-header">
									<div class="container">
										<div class="row">
											<div class="col-sm-1">

												<img :src="allSaints[currentProfileID]['avatar']" class="avatar">

											</div>
											<div class="col-sm-10">
												<p class="name">{{allSaints[currentProfileID]['name']}}</p>
												<p class="time">{{timeDistance(allSaints[currentProfileID]['quotes'][id-1]['date'])}}</p>
											</div>
											<div class="col-sm-1 text-right">
												<img src="@/assets/images/ico-arrow-right-round.png" alt="arrow right image">
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="saint-card-body">
									{{allSaints[currentProfileID]['quotes'][id-1]['text']}}
								</div>
								<div class="saind-card-img">
									<img :src="allSaints[currentProfileID]['quotes'][id-1]['image']['url']" alt="image on card" class="img-fluid">
								</div>
								<div class="saint-card-footer">
									<button type="button" class="btn quotes-red" disabled>Quotes</button>
								</div>
							</div>

							</div>

							</div>

							<!-- new card 

							<div class="saint-card">
								<div class="saint-card-header">
									<div class="container">
										<div class="row">
											<div class="col-sm-1">
												<img src="@/assets/images/saint-avatar.png">
											</div>
											<div class="col-sm-10">
												<p class="name">Saint John Bosco</p>
												<p class="time">3 hours ago</p>
											</div>
											<div class="col-sm-1 text-right">
												<img src="@/assets/images/ico-arrow-right-round.png" alt="arrow right image">
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="saint-card-body has-sub-card">
									<div class="container">
										<div class="row">
											<div class="col-sm-6 pr-2 pt-1">
												<div class="sub-card text-right">
													<div class="title">donate</div>
													<div class="text">
														Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor.
													</div>
													<div class="more-btn">
														<button type="button" class="btn">More</button>
													</div>
												</div>
											</div>
											<div class="col-sm-6 pt-1">
												<div class="sub-card text-right">
													<div class="title">become a volunteer</div>
													<div class="text">
														Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor.
													</div>
													<div class="more-btn">
														<button type="button" class="btn">More</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>-->
							
							<div class="more-btn text-center">
								<button type="button" class="btn main-content-more-btn">More</button>
							</div>

							</simplebar>
						</div>
						
						<!-- RightNav Section -->
						
						<div ref="toGetTPos" class="col-md-4">
							<simplebar id="right-side" class="right-scrollbar" data-simplebar-auto-hide="true">
								<ProfileSummary v-if="getProfileDetailStatus && getProfileDetailID == 0" />
								<ProfileBiography v-if="getProfileDetailStatus && getProfileDetailID == 1" />
								<ProfilePatronage v-if="getProfileDetailStatus && getProfileDetailID == 2" />
								<ProfileGallery v-if="getProfileDetailStatus && getProfileDetailID == 3" />
							</simplebar>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

</template>

<script>
	import LeftNav from '@/components/LeftNav'
	import ProfileSummary from '@/components/ProfileSummary'
	import ProfileBiography from '@/components/ProfileBiography'
	import ProfilePatronage from '@/components/ProfilePatronage'
	import ProfileGallery from '@/components/ProfileGallery'

	import { mapGetters, mapState } from 'vuex'
	import { ACTION_PROFILE_DETAIL } from '../store/actions/action_profiledetail'
	import { USER_REQUEST } from '../store/actions/user'
	import axios from 'axios'
	import moment from 'moment'
	import simplebar from 'simplebar-vue';
	import 'simplebar/dist/simplebar.min.css';

	export default {
		name: 'Profile',
		components: { LeftNav, ProfileSummary, ProfileBiography, ProfilePatronage, ProfileGallery, simplebar },
		mounted: function () {
			//this.getTPos();
	    },
		methods: {
			rightNav: function(id){
				this.rightNaveActiveClass[this.getProfileDetailID] = 'right-nav-menuitem';

				this.$store.dispatch(ACTION_PROFILE_DETAIL, id)

				this.rightNaveActiveClass[id] = 'right-nav-menuitem right-nav-menuitem-active';
			},
			pinSaintToSpace: function() {
				let apiURL;
				if (this.isPinned) {	// remove
					apiURL = `https://tws.eruptiv.eu/api/v1/removesaintfromspace/${this.currentSaintID}`
				}
				else	// add
				{
					apiURL = `https://tws.eruptiv.eu/api/v1/addsainttospace/${this.currentSaintID}`
				}
					
				let token = localStorage.getItem('my-token-info');
				let header = { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				};
				//console.log("header", header);
				axios({
					url: apiURL,
					data: '',
					headers: header,
					method: 'PUT',
				})
				.then(res => {
					// success
					this.isPinned = !this.isPinned;
					this.$store.dispatch(USER_REQUEST)
				})
				.catch(err => {
					// failed
				})
			},
			/*isPinnedSaint: function(){
				let pinnedSaints = this.getUserProfile['pinnedOn'];
				let numberOfPinnedSaints = pinnedSaints.length;

				for (let i = 0; i < numberOfPinnedSaints; i++) {
					if (this.allSaints[this.currentProfileID]['id'] == pinnedSaints[i]['id']) {
						return true;
					}
				}
				return false;
			},*/
			timeDistance: function(newsDateTime){
				return moment(newsDateTime, "YYYYMMDD").fromNow();
			},
			/*getTPos(){
				if (this.isAuthenticated) {
					this.topPosScroll = "height: " + (window.innerHeight - this.$refs.toGetTPos.getBoundingClientRect().top) + "px;"
				}
			},*/
		},
		computed: {
			...mapGetters(['isAuthenticated', 'allSaints', 'currentProfileID', 'getProfileDetailStatus', 'getProfileDetailID', 'getUserProfile']),
			...mapState({
				isPinned: state => {
					if (!state.user.profile['pinnedOn']) {
						return 0;
					}
					let pinnedSaints = state.user.profile['pinnedOn'];
					let numberOfPinnedSaints = pinnedSaints.length;

					let allSnts = state.module_allsaints.all_saints;
					let currentProID = state.module_profilecurrent.id;
					for (let i = 0; i < numberOfPinnedSaints; i++) {
						if (allSnts[currentProID]['id'] == pinnedSaints[i]['id']) {
							return 1;
						}
					}
					return 0;
				},
				currentSaintID: state => state.module_allsaints.all_saints[state.module_profilecurrent.id]['id']
			}),
		},
		data () {
			return {
				//rightNavID: 0,
				rightNaveActiveClass: ['right-nav-menuitem right-nav-menuitem-active', 'right-nav-menuitem','right-nav-menuitem','right-nav-menuitem'],
				addPinButtonText: ["Pin to My Space", "Unpin from My Space"],
				//topPosScroll: "",
			}
		}
	}
</script>
