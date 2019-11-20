<template>

	<section id="newsfeed">
		<div class="container page topPos">
			<h1 class="newsfeed-title">Newsfeeds</h1>
			<div class="row">
				<div v-if="isAllSaintsLoaded" class="col-md-4">
					<LeftNav />
				</div>
				<div v-if="isNewsFeedsLoaded" class="col-md-8 ">
					<!-- new card with no image
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
						<div class="saint-card-body">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id tellus at risus pulvinar interdum. Curabitur ut sem tellus. Donec bibendum, dui sed mattis lobortis, risus velit tempor lorem, ut interdum metus massa vel erat.
						</div>
						<div class="saint-card-footer">
							<button type="button" class="btn quotes-red">Quotes</button>
						</div>
					</div>
					-->
					<simplebar class="main-scrollbar" data-simplebar-auto-hide="true">
					<div ref="toGetTPos">

					<div v-for="id in 10 * bundle_id" :key="id">
					<div v-if="!!allNewsFeeds[id-1]">
					
					<!-- new card -->
					<div class="saint-card">
						<div class="saint-card-header">
							<div class="container">
								<div class="row">
									<div class="col-sm-1">
										<img :src="allNewsFeeds[id-1]['saintImage']" alt="saint profile image" class="saint-avatar" @click="toProfile(allNewsFeeds[id-1]['saintId'])">
									</div>
									<div class="col-sm-10">
										<p class="name">{{allNewsFeeds[id-1]['saintName']}}</p>
										<p class="time">{{timeDistance(allNewsFeeds[id-1]['time'])}}</p>
									</div>
									<div class="col-sm-1 text-right">
										<img src="@/assets/images/ico-arrow-right-round.png" alt="arrow right image" style="cursor: pointer;">
									</div>
								</div>
							</div>
						</div>
						<hr>
						<div class="saint-card-body">

							<div v-if="!getPostType(id-1)" v-html="getPost(id-1)"></div>
							<div v-if="getPostType(id-1)">
								<div v-for="item in getPost(id-1)" :key="item">
								
								<!-- Right Chat Text = ME -->
								<div v-if="item['saintId'] == allNewsFeeds[id-1]['saintId']" class="row">
									<div class="col-sm-10 offset-sm-2">
										<p class="chat-right-text" v-html="item['saintMessage']"></p>
									</div>
								</div>

								<!-- Left Chat Text = ME -->
								<div v-if="item['saintId'] != allNewsFeeds[id-1]['saintId']" class="row chat-left-section">
									<div class="col-sm-1">
										<div class="chat-image-position">
											<img :src="item['saintImage']" class="avatar" alt="saint profile image">
										</div>
									</div>
									<div class="col-sm-9">
										<p class="chat-left-text" v-html="item['saintMessage']"></p>
										<p class="chat-saint-name">{{item['saintName']}}</p>
									</div>
								</div>

								</div>
							</div>
						</div>
						<div class="text-right">
							<span class="seemore-text-btn" @click="postDetail(id-1)">See more</span>
						</div>
						<div v-if="allNewsFeeds[id-1]['postImage']" class="saind-card-img">
							<img :src="allNewsFeeds[id-1]['postImage'].url" alt="image on card in each newsfeed" class="img-fluid">
						</div>
						<div class="saint-card-footer">
							<span class="btn quotes-red">{{allNewsFeeds[id-1]['postType']}}</span>
						</div>
					</div>

					<!-- new card with 2 separated image sections -->

					<div v-if="id % 5 == 4" class="saint-card">
						<div class="saint-card-header">
							<div class="container">
								<div class="row">
									<div class="col-sm-1">
										<img src="@/assets/images/online-saint.png" alt="online-saint logo image">
									</div>
									<div class="col-sm-10">
										<p class="name">Online With Saints</p>
										<p class="time">Advertainment</p>
									</div>
								</div>
							</div>
						</div>
						<hr>
						<div class="saint-card-body has-sub-card">
							<div class="container">
								<div class="row">
									<div class="col-sm-6 pr-2 pt-1">
										<div class="sub-card text-right donate-back">
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
										<div class="sub-card text-right volunteer-back">
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
					</div>

					</div>
					</div>
					<div class="more-btn text-center">
						<button type="button" class="btn newsfeedmore-btn" @click="plusBundle">More</button>
					</div>

					</div> <!-- class="scroll-wrapper">-->

					</simplebar>
				</div>
			</div>
		</div>
	</section>

</template>

<script>
  import LeftNav from '@/components/LeftNav'
  import { mapGetters } from 'vuex'

  import { ACTION_GET_NEWSFEEDS } from '../store/actions/action_newsfeed'
  import { ACTION_POST_DETAIL_CURRENT } from '../store/actions/action_postdetailcurrent'
  import { ACTION_PROFILE_CURRENT } from '../store/actions/action_profilecurrent'

  import simplebar from 'simplebar-vue';
  import 'simplebar/dist/simplebar.min.css';
  import moment from 'moment'

  export default {
    name: 'Home',
    components: { LeftNav, simplebar },
    mounted: function () {
		this.$store.dispatch(ACTION_GET_NEWSFEEDS, this.allLanguages[this.currentLanguageID])
		//.then(res => {
			//if (res=="success") {
				//this.getTPos();
			//}
		//})
    },
    methods: {
		plusBundle: function(){ // when you click "more" button on newsfeeds area
			if (this.bundle_id * 10 < this.allNewsFeeds.length) {
				this.bundle_id++;
			}
		},
		postDetail: function(id){ // when you click "see more" button on each newsfeed
			this.$store.dispatch(ACTION_POST_DETAIL_CURRENT, id)
			this.$router.push('/post')
		},
		toProfile: function(saint_id){ // when you click avatar on each newsfeed
			if (this.isAuthenticated)
			{
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
			}
			else
			{
				// You are not logged in user.
			}
		},
		timeDistance: function(newsDateTime){
			return moment(newsDateTime, "YYYYMMDD").fromNow();
		},
		getPost: function(id){
			let postType = this.allNewsFeeds[id]['postType']
			let content="";
			switch (postType) {
				case 'story':
					content = this.allNewsFeeds[id]['post'];
					content = content.replace(/\n/g, '<br />');
					break;
				case 'quote':
					content = this.allNewsFeeds[id]['post'];
					content = content.replace(/\n/g, '<br />');
					content = content.replace(/"/g, '"');
					break;
				case 'conversation':
					content = this.allNewsFeeds[id]['conversation'];
					break;
				default:
					content = this.allNewsFeeds[id]['post'];
					break;
			}
			return content
		},
		getPostType: function(id){
			if (this.allNewsFeeds[id]['postType'] == 'conversation') {
				return true
			}
			return false
		},
		/*getTPos(){
			if (this.isNewsFeedsLoaded) {
				this.topPos = "height: calc(100vh - 207px);"
				this.topPosScroll = "height: " + (window.innerHeight - this.$refs.toGetTPos.getBoundingClientRect().top) + "px;"
				return true;
			}
		},*/
	},
	computed: {
		...mapGetters(['allNewsFeeds', 'currentLanguageID', 'allLanguages', 'isAuthenticated', 'allSaints', 'isNewsFeedsLoaded', 'isAllSaintsLoaded']),
	},
    data () {
      return {
		bundle_id: 1,
		//topPos: "",
		//topPosScroll: "",
      }
    }
  }
</script>