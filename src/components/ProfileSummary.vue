<template>
<div class="summary-area">
	<div class="summary">
		<div class="row">
			<div class="col-sm-6 title">SummaRy</div>
			<div class="col-sm-6 icon-close text-right">
				<img src="@/assets/images/ico-close.png" alt="close icon" @click="closeProfileDetail">
			</div>
		</div>
		<ul>
			<li>
				<div class="subject">Full Name</div>
				<div class="body">{{currentSaint['fullNameAtBirth']}}</div>
			</li>
			<li>
				<div class="subject">Vocation</div>
				<div class="body">{{currentSaint['vacation']}}</div>
			</li>
			<li v-if="!!currentSaint['countryOfMission'][currentProfileID]">
				<div class="subject">Country of Mission</div>
				<div class="body">{{currentSaint['countryOfMission'][currentProfileID]}}</div>
			</li>
			<li v-if="!!currentSaint['birthDate'] || !!currentSaint['birthPlace']">
				<div class="subject">Birth Date and Place</div>
				<div class="body">{{currentSaint['birthDate']}} - {{currentSaint['birthPlace']}}</div>
			</li>
			<li v-if="!!currentSaint['deathDate'] || !!currentSaint['deathPlace']">
				<div class="subject">Death Date and Place</div>
				<div class="body">{{currentSaint['deathDate']}} - {{currentSaint['deathPlace']}}</div>
			</li>
			<li v-if="!!currentSaint['restingPlace']">
				<div class="subject">Resting Place</div>
				<div class="body">{{currentSaint['restingPlace']}}</div>
			</li>
			<li v-if="!!currentSaint['canonizedDate']">
				<div class="subject">Canonised</div>
				<div class="body">{{currentSaint['canonizedDate']}}</div>
			</li>
			<li v-if="!!currentSaint['beatifiedDate'] || !!currentSaint['beatifiedPlace']">
				<div class="subject">Beatified</div>
				<div class="body">{{currentSaint['beatifiedDate']}} - {{currentSaint['beatifiedPlace']}}</div>
			</li>
			<li v-if="!!currentSaint['shrine'][currentProfileID]">
				<div class="subject">Shrine</div>
				<div class="body">{{currentSaint['shrine'][currentProfileID]}}</div>
			</li>
		</ul>
	</div>
	<div class="keywords">
		<div class="title">Keywords</div>
		<ul>
			<li v-for="id in currentSaint['keywords'].length" :key="id">
				<span @click="getSaintsFromKeywords(currentSaint['keywords'][id-1]['keywordName'])">{{currentSaint['keywords'][id-1]['keywordName']}}</span>
			</li>
		</ul>
	</div>

	<div v-if="linkedSaintsList.length" class="linkedTo">
		<div class="title">Linked to</div>
		<ul>
			<li v-for="item in linkedSaintsList" :key="item['id']" @click="gotoSelectedSaintProfile(item['id'])">
				<div class="row">
					<div class="col-sm-2 ml-0 pl-0">
						<img :src="item['avatar']" class="avatar">
					</div>
					<div class="col-sm-10 ml-0 pl-0">
						<p class="name">{{item['name']}}</p>
						<p class="profession">{{item['description']}}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>

	<hr>
	<div class="close-link"><span class="profile-detail-close" @click="closeProfileDetail">Close > </span></div>
</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import { ACTION_PROFILE_DETAIL_CANCEL } from '../store/actions/action_profiledetail'
	import { ACTION_PROFILE_CURRENT } from '../store/actions/action_profilecurrent'

	export default {
		mounted: function() {
		},
		watch: {
			currentProfileID(newValue, oldValue) {
				// Do whatever makes sense now
				this.linkedSaintsList = []
			}
		},
		computed: {
			...mapGetters(['allSaints', 'currentProfileID']),
			...mapState({
				currentSaint: state => state.module_allsaints.all_saints[state.module_profilecurrent.id]
			}),
		},
		methods: {
			closeProfileDetail: function() {
				this.$store.commit(ACTION_PROFILE_DETAIL_CANCEL)
			},
			getSaintsFromKeywords: function(keyword){
				this.linkedSaintsList = [];
				let numberOfAllSaints = this.allSaints.length; // number of all saints
				for (let i = 0; i < numberOfAllSaints; i++) {
					if (i != this.currentProfileID) { // exclude current saint
						let keywords = this.allSaints[i]['keywords']; // get keywords from the saint
						let numberOfKeywords = keywords.length; // number of keywords
						for (let j = 0; j < numberOfKeywords; j++) {
							if (keywords[j]['keywordName'] == keyword) { // if two saints have the same keyword
								// add to saints list return var
								this.linkedSaintsList.push(this.allSaints[i]);
							}
						}
					}
				}
			},
			gotoSelectedSaintProfile : function (saint_id) {
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
		},
		data () {
			return {
				summaryData: [
					{subject: 'Full Name', body: 'fullNameAtBirth'},
					{subject: 'Vocation', body: 'vacation'},
					{subject: 'Country of Mission', body: 'fullNameAtBirth'},
					{subject: 'Birth Date and Place', body: 'fullNameAtBirth'},
					{subject: 'Death Date and Place', body: 'fullNameAtBirth'},
					{subject: 'Resting Place', body: 'fullNameAtBirth'},
					{subject: 'Canonised', body: 'fullNameAtBirth'},
					{subject: 'Beatified', body: 'fullNameAtBirth'},
					{subject: 'Shrine', body: 'fullNameAtBirth'},
				],
				linkedSaintsList:[],
			}
		}
	}
</script>