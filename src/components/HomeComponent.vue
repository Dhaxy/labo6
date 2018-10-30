<template>
	<div>
		{{ lat }} | {{ long }}
	</div>
</template>

<script>
	import axios from 'axios';
	import cors from 'cors';
	import data from '../data/data';

	export default {
		name: 'HomeComponent',
		data: function() {
			return {
				lat: localStorage.getItem('userLatitude'),
				long: localStorage.getItem('userLongitude')
			}
		},
		methods: {
			getGeoLocation() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(position =>  {
								localStorage.setItem('userLatitude', position.coords.latitude);
								localStorage.setItem('userLongitude', position.coords.longitude);
							},
							function () {
								alert('GeoLocation is not available for your browser.');
							});
				}
			},

			getCity() {

				axios.get('https://nominatim.openstreetmap.org/reverse?format=json&lat='+localStorage.getItem('userLatitude')+'&lon='+localStorage.getItem('userLongitude')+'',
						{
							headers: {
								'Content-Type': 'application/json'
							}
						})
						.then(response => {
							console.log(response.data.address.city);
						})
			}
		},
		mounted() {
			this.getGeoLocation();
			this.getCity();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
