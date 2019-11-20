<template>
<div class="patronage-area">
	<div class="patronage">
		<div class="row">
			<div class="col-sm-6 title">patronage</div>
			<div class="col-sm-6 icon-close text-right">
				<img src="@/assets/images/ico-close.png" alt="close icon" @click="closeProfileDetail">
			</div>
		</div>
		<ul>
			<li v-for="id in currentSaint['roles']['patronage'].length" :key="id" @click="goPatronage(currentSaint['roles']['patronage'][id-1]['id'])">
				<div class="m-icon text-center"><img :src="currentSaint['roles']['patronage'][id-1]['image']"></div>
				<div class="sub-text">{{currentSaint['roles']['patronage'][id-1]['name']}}</div>
			</li>
		</ul>
	</div>
	<div class="depiction">
		<div class="title">depiction</div>
		<ul>
			<li v-for="id in currentSaint['roles']['depiction'].length" :key="id" @click="goDepiction(currentSaint['roles']['depiction'][id-1]['id'])">
				<div class="m-icon text-center"><img :src="currentSaint['roles']['depiction'][id-1]['image']"></div>
				<div class="sub-text">{{currentSaint['roles']['depiction'][id-1]['name']}}</div>
			</li>
		</ul>
	</div>
	<div class="depiction">
		<div class="title">attributes</div>
		<ul>
			<li v-for="id in currentSaint['roles']['attribute'].length" :key="id" @click="goAttributes(currentSaint['roles']['attribute'][id-1]['id'])">
				<div class="m-icon text-center"><img :src="currentSaint['roles']['attribute'][id-1]['image']"></div>
				<div class="sub-text">{{currentSaint['roles']['attribute'][id-1]['name']}}</div>
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
	<div class="close-link"><span @click="closeProfileDetail">Close > </span></div>
</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import { ACTION_PROFILE_DETAIL_CANCEL } from '../store/actions/action_profiledetail'
	import { ACTION_PROFILE_CURRENT } from '../store/actions/action_profilecurrent'

	export default {
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
			goPatronage: function(patronage_id){
				this.linkedSaintsList = [];
				let numberOfAllSaints = this.allSaints.length;
				for (let i = 0; i < numberOfAllSaints; i++) {
					if (i != this.currentProfileID) {
						let patronage = this.allSaints[i]['roles']['patronage'];
						let numberOfpatronage = patronage.length;
						for (let j = 0; j < numberOfpatronage; j++) {
							if (patronage[j]['id'] == patronage_id) {
								this.linkedSaintsList.push(this.allSaints[i]);
							}
						}
					}
				}
			},
			goDepiction: function(depiction_id){
				this.linkedSaintsList = [];
				let numberOfAllSaints = this.allSaints.length;
				for (let i = 0; i < numberOfAllSaints; i++) {
					if (i != this.currentProfileID) {
						let depiction = this.allSaints[i]['roles']['depiction'];
						let numberOfpatronage = depiction.length;
						for (let j = 0; j < numberOfpatronage; j++) {
							if (depiction[j]['id'] == depiction_id) {
								this.linkedSaintsList.push(this.allSaints[i]);
							}
						}
					}
				}
			},
			goAttributes: function(attribute_id){
				this.linkedSaintsList = [];
				let numberOfAllSaints = this.allSaints.length;
				for (let i = 0; i < numberOfAllSaints; i++) {
					if (i != this.currentProfileID) {
						let attribute = this.allSaints[i]['roles']['attribute'];
						let numberOfpatronage = attribute.length;
						for (let j = 0; j < numberOfpatronage; j++) {
							if (attribute[j]['id'] == attribute_id) {
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
				linkedSaintsList:[],
			}
		}
	}
</script>