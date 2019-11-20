<template>
<div class="biography-area">
	<div class="biography">
		<div class="row">
			<div class="col-sm-6 title">biography</div>
			<div class="col-sm-6 icon-close text-right">
				<img src="@/assets/images/ico-close.png" alt="close icon" @click="closeProfileDetail">
			</div>
		</div>
		<p>{{currentSaint['biography']}}</p>
	</div>
	<div v-if="!!currentSaint['linked']" class="linkedTo">
		<div class="title">Linked to</div>
		<ul>
			<li v-for="item in currentSaint['linked']" :key="item['id']" @click="gotoSelectedSaintProfile(item['id'])">
				<div class="row">
					<div class="col-sm-2 ml-0 pl-0">
						<img :src="linkedProfile(item['id'])['avatar']" class="avatar">
					</div>
					<div class="col-sm-10 ml-0 pl-0">
						<p class="name">{{linkedProfile(item['id'])['name']}}</p>
						<p class="profession">{{linkedProfile(item['id'])['description']}}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<hr>
	<div class="close-link"><span @click="closeProfileDetail">Close &gt; </span></div>
</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import { ACTION_PROFILE_DETAIL_CANCEL } from '../store/actions/action_profiledetail'
	import { ACTION_PROFILE_CURRENT } from '../store/actions/action_profilecurrent'

	export default {
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
			linkedProfile : function (saint_id) {
				let numberOfSaints = this.allSaints.length;
				for (var temp_num = 0; temp_num<numberOfSaints;temp_num++)
				{
					if (this.allSaints[temp_num]['id'] == saint_id) {
						return this.allSaints[temp_num]
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
			return {}
		}
	}
</script>