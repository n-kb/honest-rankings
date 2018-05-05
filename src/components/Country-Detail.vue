<template>
	
	<div>
		<div v-bind:style="{ 'background-color': color }" class="country" @click="detailsShow == true ? detailsShow = false : detailsShow = true">
			{{ rank }}. {{ name }}
		</div>
		<div v-if="detailsShow">
			<div class="score">
				{{ score }} points
			</div>
			<div class="components">
				<span class="components-strong">Components</span> of the score
			</div>
			<ul  v-for="component in indicatorValues" class="component-detail">
				<li>{{ indicatorsNames[indicatorValues.indexOf(component)].name }}: 
					<span v-if="component.score == 'NaN'">
						no data
					</span>
					<span v-else>
						<span class="score-detail">{{ (component.score * 1.0).toFixed(2) }}</span>
						{{ indicatorsNames[indicatorValues.indexOf(component)].unit }}
					</span>
				</li>
			</ul>
		</div>
	</div>

</template>
<script>
	
	export default{
		name: "country-detail",
		props: [ 
			"name", "indicatorsNames", "indicatorValues", "color", "rank", "score"
		],
		data () {
			return {
				detailsShow: false
			}
		}
	}
</script>

<style lang="sass">

@import "../assets/scss/variables.scss"

.country
	padding: 0.2em .4em

.score
	font-weight: bold
	text-align: center
	margin: 1em 0

.components
	font-size: 0.8em
	&-strong
		border-bottom: 2px solid $main-lighter

.component-detail
	list-style-type: none !important
	font-size: 0.8em
	color: #777
	margin-bottom: 2em

.score-detail
	font-size: 0.9em
	color: #333
	font-weight: bold
</style>