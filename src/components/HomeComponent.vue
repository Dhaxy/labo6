<template>
	<div>
		{{ cityName }}, {{ stateName }}
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'HomeComponent',
		data: function() {
			return {
				lat: localStorage.getItem('userLatitude'),
				long: localStorage.getItem('userLongitude'),
				cityName: '',
				stateName: ''
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
								alert('GeoLocation is not available for your browser or was not accepted.');
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
							this.cityName = response.data.address.city;
							this.stateName = response.data.address.state;
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
