<template>
	
	<div class="columns">
		<div id="map" class="map column">
		</div>

	</div>

</template>

<script>
	import geojson from '../assets/map/countries.geo.json'
	import * as d3 from 'd3'

	export default{
		name: "ranking-map",
		props: { 
			ranking : {},
			colorScale : {
				default: ["e7d090", "e9ae7b", "de7062"],
				type: Array
			}
		},
		data () {
			return {
				geojson
			}
		},
		watch: {
			ranking () {
				var ranking_data = []
				var ranking_scores = []
				this.ranking.data.forEach(country => {
					ranking_data.push({
						iso: country.country_code,
						name: country.country_name,
						score: Math.round(country.scores[0] * 100)
					})
					ranking_scores.push(Math.round(country.scores[0] * 100))
				});
				
				// Normally you'd look this up. This point is in the middle of Syria
				var center = [0,0];

				var color = d3.scaleLinear()
					.domain([Math.min( ...ranking_scores ), Math.max( ...ranking_scores )])
				    .range([this.colorScale[0], this.colorScale[this.colorScale.length - 1]]);

				// Size of the canvas on which the map will be rendered
				var width = parseInt(d3.select('#map').style('width')),  
				    height = width /2.4,
				    // SVG element as a JavaScript object that we can manipulate later
				    svg = d3.select("#map").append("svg")
				      .attr("width", width)
				      .attr("height", height);

				// Instantiate the projection object
				var projection = d3.geoEquirectangular()  
				    .center(center)
				    .scale(width/7)
    				.translate([width / 2, height / 2]);

				var scores = d3.map();

				ranking_data.forEach(country => {
					scores.set(country.iso, country.score);
				})
				
				// Assign the projection to a path
				var path = d3.geoPath().projection(projection);  

				  svg.append("g")
			      	.attr("class", "countries")
			    	.selectAll("path")
			    	.data(geojson.features)
			    	.enter().append("path")
			      	.attr("fill", function(d) { 
			      		var score = scores.get(d.id); 
			      		if (score != undefined) {return color(score)}
			      		else {return "#eee" } })
			      	.attr("d", path)
			    	.append("title")
			      		.text(function(d) { 
			      			var score = scores.get(d.id);
			      			if (score == undefined) { score = "no data"} 
			      			return "Score: " + score; });

			}
		}
	}

</script>

<style lang="sass">

@import "../assets/scss/variables.scss"

.border
	border: 1px solid #000

.map
	text-align: center
	margin-bottom: -6em

.countries
	stroke: #fff;
	stroke-linejoin: round;
</style>