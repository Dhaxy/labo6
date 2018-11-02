<template>
	<div>
		<ul class="week-list-style-class">
			<li v-for="day in this.days" class="week-list-item-style-class">
				<div>
					{{ day.day }}
				</div>
				<img :src="getIcon(day.icon)">
				<div>
					{{ day.summary }}
				</div>
				<div>
					{{ day.avgTemp }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';
	import data from '../data/data.json';

	export default {
		name: "WeeklyComponent",
		data: function() {
			return {
				lat: localStorage.getItem('userLatitude'),
				long: localStorage.getItem('userLongitude'),
				days: []
			}
		},
		methods: {
			getWeatherData() {
				this.lat = localStorage.getItem('userLatitude').split(".")[0];
				this.long = localStorage.getItem('userLongitude').split(".")[0];

				/**
				 * NOTE SUR L'API UTILISEE : Les professeurs m'ont autorisé à utiliser une api météo différente de weathermap
				 * car je n'arrive pas à faire de call à l'api (401 bad api key), malgré le fait que toutes les autres api fonctionnent bien.
				 * Je laisse ma clé dans le .json pour que vous puissiez utiliser l'API sans avoir à créer un nouveau compte.
				 * Cordialement
				 * Amaury FLAMENT
				 */

				axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/'+data.data.api_key_weatherAPI+'/'+this.lat+','+this.long+'?units=si&exclude=currently,minutely,hourly,alerts')
						.then(response => {
							var data;
							var i = 0;

							data = response.data.daily.data;
							data.forEach(element => {
								var day = this.fromUnixTimeToDay(element.time);
								var icon = element.icon;
								var summary = element.summary;
								var avgTemp = this.getAvgTemperature(element.temperatureMax, element.temperatureMin);
								this.days.push({'day' : day, 'icon' : icon, 'summary' : summary, 'avgTemp' : avgTemp});
								i++;
							})
						});
			},

			fromUnixTimeToDay(value) {
				var day = new Date(value * 1000);
				var weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
				return (weekDays[day.getDay()]);
			},

			getAvgTemperature(max, min) {
				return Math.trunc(max / min);
			},

			getIcon(filename) {
				var images = require.context('../assets/', false, /\.png$/);
				return images('./' + filename + ".png");
			}
		},
		mounted() {
			this.getWeatherData();
		}
	}

</script>

<style scoped>
	.week-list-style-class {
		list-style: none;
		margin-left: 0;
		padding-left: 0;
	}

	.week-list-item-style-class {
		display: flex;
		width: 100vw;
		border-bottom: black 1px solid;
		border-top: black 1px solid;
		margin-bottom: 50px;
	}

</style>