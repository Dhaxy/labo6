<template>
	<div>
		<div class="app-header">
			Weather APP JS
		</div>
		<div>
			<div class="home-component-pre-text">
				Your current location is :
			</div>
			<div class="home-component-text">
				{{ cityName }}
			</div>
			<div class="home-component-text">
				{{ stateName }}
			</div>
		</div>
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
								alert('GeoLocation is not available for your browser or was not accepted, please enable geolocation.');
								this.cityName = '?,';
								this.stateName = '?';
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
							this.cityName = response.data.address.city + ',';
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
	@import url('https://fonts.googleapis.com/css?family=Slabo+27px');

	.app-header {
		display: inline-block;
		font-family: 'Slabo 27px', serif;
		font-size: 50px;
		font-weight: bold;
		margin: 20px 0px 40px 0px;
	}

	.home-component-pre-text {
		margin-right: 10px;
		display: inline-block;
		font-family: 'Slabo 27px', serif;
		font-size: 23px;
		font-weight: bold;
	}

	.home-component-text {
		display: inline-block;
		font-family: 'Slabo 27px', serif;
		font-size: 30px;
		font-weight: bold;
		color: #42b983;
	}
</style>
