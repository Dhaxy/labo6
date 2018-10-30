<template>
	<div>
		{{ lat }} | {{ long }}
	</div>
</template>

<script>
	export default {
		name: "WeeklyComponent",
		data: function() {
			return {
				lat: localStorage.getItem('userLatitude'),
				long: localStorage.getItem('userLongitude')
			}
		}
	}

</script>

<style scoped>

</style>