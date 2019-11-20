<template>

	<section id="post" class="postdetail">
		<div class="page">
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
							<div class="top-area">
								<router-link to="/">&lt; Back</router-link>
							</div>

							<div class="saint-card">
								<div class="saint-card-header">
									<div class="container">
										<div class="row">
											<div class="col-sm-1">
												<img :src="allNewsFeeds[currentPostDetailID]['saintImage']" class="saint-avatar" @click="toProfile(allNewsFeeds[currentPostDetailID]['saintId'])">
											</div>
											<div class="col-sm-10">
												<p class="name">{{allNewsFeeds[currentPostDetailID]['saintName']}}</p>
												<p class="time">{{timeDistance(allNewsFeeds[currentPostDetailID]['time'])}}</p>
											</div>
											<div class="col-sm-1 text-right">
												<img src="@/assets/images/profile-left-arrow.png" alt="arrow right image" style="cursor: pointer;">
											</div>
										</div>
									</div>
								</div>
								<hr>
								<div class="saint-card-body">
									<div v-if="!getPostType(currentPostDetailID)" v-html="getPost(currentPostDetailID)"></div>
									<div v-if="getPostType(currentPostDetailID)">
										<div v-for="item in getPost(currentPostDetailID)" :key="item">
										
										<!-- Right Chat Text = ME -->
										<div v-if="item['saintId'] == allNewsFeeds[currentPostDetailID]['saintId']" class="row">
											<div class="col-sm-9 offset-sm-3">
												<p class="chat-right-text" v-html="item['saintMessage']"></p>
											</div>
										</div>

										<!-- Left Chat Text = ME -->
										<div v-if="item['saintId'] != allNewsFeeds[currentPostDetailID]['saintId']" class="row chat-left-section">
											<div class="col-sm-1">
												<div class="chat-image-position">
													<img :src="item['saintImage']" class="avatar">
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
								<div v-if="allNewsFeeds[currentPostDetailID]['postImage']" class="saind-card-img">
									<img :src="allNewsFeeds[currentPostDetailID]['postImage'].url" alt="image on card" class="img-fluid">
								</div>
								<div class="saint-card-footer">
									<button type="button" class="btn quotes-red" disabled="">Quotes</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import LeftNav from '@/components/LeftNav'

	import { mapGetters } from 'vuex'
	import { ACTION_PROFILE_CURRENT } from '../store/actions/action_profilecurrent'

	import moment from 'moment'

	export default {
		name: 'PostDetail',
		components: { LeftNav },
		methods: {
			toProfile: function(saint_id){
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
						content = content.replace(/\"/g, '"');
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
		},
		computed: {
			...mapGetters(['allNewsFeeds', 'currentPostDetailID', 'isAuthenticated', 'allSaints']),
		},
		data () {
			return {
			}
		}
	}
</script>