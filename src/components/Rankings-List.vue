<template>
	<div>
		<div class="columns list-ranking" v-for="ranking in rankings">
		 	<div class="column">
		 		<router-link :to="{ name: 'ranking', params: { ranking_id: ranking.id }}">
		 			{{ ranking.name }}
		 		</router-link>
		 	</div>
		 	<div class="column list-ranking-detail">
			 	Best nation:&nbsp;
			 	{{ ranking.lead_name }}
			</div>
			<div class="column list-ranking-detail is-hidden-mobile">
			 	Number of countries ranked:&nbsp;
			 	{{ ranking.countries_num }}
			</div>
			<div class="column list-ranking-detail is-hidden-mobile">
			 	Last year available:&nbsp;
			 	{{ ranking.last_year }}
			</div>
			<div class="column list-ranking-detail is-hidden-mobile">
			 	Number of years available:&nbsp;
			 	{{ ranking.years_number }}
			</div>
		</div>
	</div>

</template>

<script>
	
	export default{
		name: "rankings-list",
		props: ["rankings"]
	}

</script>

<style lang="sass">
	.list-ranking
		border-bottom: 1px #eee solid

	.list-ranking-detail
		font-size: .8em
		color: #777
</style>