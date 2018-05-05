<template>
	<div class="container content">
		<h1 class="ranking-title">
			The 
			<span class="last-year">{{ rankings.last_year }}</span>
			{{ranking_title}}
		</h1>

		<div class="columns is-centered leader">
			<div class="column is-half is-narrow">
				<p>
					In {{ rankings.last_year }}, {{rankings.top_country}} topped the {{ranking_title}},
					<span v-if="rankings.data[0].scores[rankings.data[0].scores.length-1] < rankings.data[0].scores[rankings.data[0].scores.length-2]">
						as it improved its score by {{ ((rankings.data[0].scores[rankings.data[0].scores.length-2] - rankings.data[0].scores[rankings.data[0].scores.length-1]) * 100).toPrecision(2) }} points over the {{ rankings.years[1] }} edition.
					</span>
					<span v-else>
						even if its score decreased by {{ ((rankings.data[0].scores[rankings.data[0].scores.length-1] - rankings.data[0].scores[rankings.data[0].scores.length-2]) * 100).toPrecision(2) }} points compared to the {{ rankings.years[1] }} edition.
					</span>
					{{ rankings.bottom_country }} was the last country of the {{ rankings.data.length }} in the ranking.
				</p>
				<p>
					The {{ranking_title}} uses a series of carefully selected, reliable indicators to provide a comprehensive overview of global trends on a topic of utmost importance to decision makers and stakeholders in several key industries.
				</p>
			</div>
		</div>

		<div class="columns inter-title is-centered">
			<div class="column is-4">
				<h2 class="text-title">Map</h2>
			</div>
		</div>
		
		<ranking-map :ranking="rankings" :colorScale="colorScale"></ranking-map>
		
		<div class="columns inter-title is-centered">
			<div class="column is-4">
				<h2 class="text-title">Ranking</h2>
			</div>
		</div>

		<div class="ranking-main">
			<div class="columns is-hidden-mobile rankings-headers">
				<div class="column">
					Rank
				</div>
				<div class="column">
					Country
				</div>
				<div class="column">
					Score
				</div>
				<div v-for="indicator in rankings.indicators" class="column ranking-header-component">
					{{ indicator.name }}
					<br>
					<small>
						{{ indicator.unit }}
					</small>
				</div>
			</div>
			<div v-for="country in rankings.data" class="columns country-ranked">
				<country-detail 
					class="is-hidden-tablet" 
					:color="renderRankColor(country.scores[0])"
					:rank="country.rank"
					:score="(country.scores[0] * 100).toFixed(0)"
					:name="country.country_name" 
					:indicatorsNames="rankings.indicators" 
					:indicatorValues="country.components">
				</country-detail>
				<div class="ranking-number column is-hidden-mobile" v-bind:style="{ 'background-color': renderRankColor(country.scores[0]) }">
					{{ country.rank }}
				</div>
				<div class="ranking-country_name column is-hidden-mobile">
					{{ country.country_name }}
				</div>
				<div class="ranking-score column is-hidden-mobile">
					<span class="is-hidden-tablet">Score:&nbsp;</span>
					{{ (country.scores[0] * 100).toFixed(0) }}
				</div>
				<div class="column is-hidden-tablet ranking-components is-hidden-mobile">
					Index components
				</div>
				<div class="column country-ranked-component is-hidden-mobile" v-for="component in country.components">
					<span class="is-hidden-tablet">{{ rankings.indicators[country.components.indexOf(component)].name }}:&nbsp;</span>
					{{ component.score == "NaN" ? "no data" : component.score.toFixed(1) }}
				</div>
			</div>
		</div>

		<div class="columns inter-title is-centered">
			<div class="column is-4">
				<h2 class="text-title">Methodology</h2>
			</div>
		</div>
		<div class="columns is-centered">
			<div class = "column is-half">
				<p>The {{ ranking_title }} uses data from the World Bank to provide an up-to-date, worldwide and precise overview of the situation. Each indicator 
					(<span v-for="indicator in rankings.indicators.slice(0, rankings.indicators.length-2)">{{ indicator.name.trim() }}, </span> and {{ rankings.indicators[rankings.indicators.length-1].name.trim() }}) was normalized over the {{ rankings.years.length }} years for which the index was computed. For each indicator, the maximum value over the years receives a value of 1, the lowest value receives 0. Definitive values for all countries are then computed as a proportion of the original maximum and minimum values. For indicators that are reversed, the minimum value takes the value of 1 and the maximum value takes 0. The arithmetic mean of all harmonized values is then computed and multiplied by one hundred to derive the country score. The computation can be summed up by the following formula:
				</p>
				<p class="formula">
					<img src="/src/assets/formula.latex.png" alt="Formula of the computation."/>
				</p>
				<p>
					 The formula shows how the score is computed for η indicators. To be listed in the {{ ranking_title }}, a country needs to have data for at least three of the seven indicators.
				</p>
				<p>
					If you think this methodology is a joke, you should take a look at the methodology of some famous indexes. You will be in for a good laugh.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import RankingMap from './Ranking-Map.vue';
import CountryDetail from './Country-Detail.vue';
import chroma from 'chroma-js';

export default{
		name: "ranking",
		data () {
			return {
				colorScale: ["#fae596", "#C73C29"],
				rankings: {
					data: [
						{
							scores: []
						}
					],
					indicators: [
						{name: ""}
					],
					years:[]
				},
				ranking_title: ""
			}
		},
		methods:{
			renderRankColor(score) {
				var scale = chroma.scale(this.colorScale);
				return scale(score).hex();
			}
		},
		components: { RankingMap, CountryDetail },
		created() {
			window.instance.get("ranking/" + this.$route.params.ranking_id).then(response => {
		      // JSON responses needs a tweak to be parsed
		      var jsonData = String(response.data).replace(/NaN/g, "\"NaN\"");
		      this.rankings = JSON.parse(jsonData).result.data;
		      this.ranking_title = JSON.parse(jsonData).result.name;
		    }).catch(e => {
		      console.log(e);
		    });
		}
	}

</script>

<style lang="sass">

@import "../assets/scss/variables.scss"

.container
	padding: 0 1em

.ranking-title
	text-transform: uppercase
	text-align: center
	font-weight: 400 !important
	font-size: 2.3em !important
	margin: 2em 0

.inter-title
	text-transform: uppercase
	text-align: center
	margin-top: 5em
	
.text-title
	border-bottom: 3px solid $color-minor
	font-weight: 400 !important

.last-year
	border-bottom: 4px solid $main-lighter

.leader
	margin-top: 2em

.country-ranked
	border-bottom: 1px solid $color-minor-2
	&-component
		font-size: 0.8em

.ranking-country_name
	font-weight: bold;

.rankings-headers
	font-weight: bold
	background-color: $color-minor-2

.ranking-header-component
	font-size: 0.8em

.ranking-components
	text-align: center;
	border-bottom: 1px solid $color-minor-2

.formula
	text-align: center

</style>
