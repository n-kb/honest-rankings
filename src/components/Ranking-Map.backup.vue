<template>
	
	<div class="columns">
		<v-map 
		  class = "column ranking-map"
		  :center="center" 
		  :zoom="2" 
		  style="height: 500px;" 
		  :options="mapOptions">
		    <v-choropleth-layer 
		      :data="ranking_data" 
		      titleKey="name" 
		      idKey="iso" 
		      :value="value" 
		      geojsonIdKey="iso" 
		      :geojson="geojson" 
		      :colorScale="colorScale">
		        <template slot-scope="props">
		          <v-info-control 
		            :item="props.currentItem" 
		            :unit="props.unit" 
		            title="Country" 
		            placeholder="Hover over a country"/>
		          <v-reference-chart 
		            title="Index score" 
		            :colorScale="colorScale" 
		            :min="props.min" 
		            :max="props.max" 
		            position="topright"/>
		        </template>
		    </v-choropleth-layer>
		</v-map>
	</div>

</template>

<script>
	import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth';
	import geojson from '../assets/map/countries.geo.json'
	import Vue2Leaflet from 'vue2-leaflet';

	export default{
		name: "ranking-map",
		props: { 
			ranking : {
				data: {
					type: Array,
					default: []
				}
			},
			colorScale : {
				default: ["e7d090", "e9ae7b", "de7062"],
				type: Array
			}
		},
		components: { 
			'v-map': Vue2Leaflet.Map,
		    'v-info-control': InfoControl, 
		    'v-reference-chart': ReferenceChart, 
		    'v-choropleth-layer': ChoroplethLayer  
		},
		data () {
			return {
				geojson,
				value: {
					key: "score",
        			metric: "% girls"
				},
				center: [20,0],
				mapOptions: {
					attributionControl: false,
					scrollWheelZoom: false
				}
			}
		},

		computed: {
			ranking_data () {
				var ranking_data = []
				this.ranking.data.forEach(country => {
					ranking_data.push({
						iso: country.country_code,
						name: country.country_name,
						score: Math.round(country.scores[0] * 100)
					})
				});
				return ranking_data
			}
		}
	}

</script>

<style lang="scss">

	@import "~leaflet/dist/leaflet.css";

	.ranking-map {
		width: 100%;
		margin-bottom: 3em;
	}

</style>