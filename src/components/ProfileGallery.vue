<template>
<div class="gallery-area">
	<div class="gallery">
		<div class="row">
			<div class="col-sm-6 title">gallery</div>
			<div class="col-sm-6 icon-close text-right">
				<img src="@/assets/images/ico-close.png" alt="close icon" @click="closeProfileDetail">
			</div>
		</div>
		<gallery :images="imagesGal" :index="index" @close="index = null"></gallery>
		<ul>
			<li v-for="id in currentSaint['gallery'].length" :key="id">
				<div class="gal-img" @click="index = id-1">
					<img :src="currentSaint['gallery'][id-1]['url']">
				</div>
			</li>
		</ul>
	</div>
	<hr>
	<div class="close-link"><span @click="closeProfileDetail">Close &gt;</span></div>
</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'
	import { ACTION_PROFILE_DETAIL_CANCEL } from '../store/actions/action_profiledetail'

	import VueGallery from 'vue-gallery';

	export default {
		components: {
			'gallery': VueGallery
		},
		computed: {
			...mapGetters(['allSaints', 'currentProfileID']),
			...mapState({
				currentSaint: state => state.module_allsaints.all_saints[state.module_profilecurrent.id],
				imagesGal: state => {
					let current = state.module_allsaints.all_saints[state.module_profilecurrent.id];
					let i = 0;
					let imageCount = current['gallery'].length;
					let res = [];
					while (i<imageCount){
						res[i] = current['gallery'][i]['url'];
						i++;
					}
					return res;
				}
			}),
		},
		methods: {
			closeProfileDetail: function() {
				this.$store.commit(ACTION_PROFILE_DETAIL_CANCEL)
			}
		},
		data () {
			return {
		        index: null
			}
		}
	}
</script>