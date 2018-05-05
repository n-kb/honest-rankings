<template>
    <div>
    	<div class="columns is-centered lede">
            <div class="column is-half">
              <p>
                Many organizations produce country rankings. But they very often put the same countries on top! This is boring.
            </p>
            <p>
                For more ranking diversity, the data scientists of Honest Rankings provide you with a variety of indexes. Either find the one that suits your agenda or create your own!
            </p>
            <a @click="newRanking()" class="button is-primary btn-new-ranking">
              	Make a new ranking
            </a>
            <div class="modal is-active" v-if="modalActive">
			  <div class="modal-background"></div>
			  <div class="modal-content">
			    <article class="message">
				  <div class="message-body">
				  	Your ranking will be made of the following indicators:
				  	<ul class="new-ranking-indicators">
				  		<li v-for="indicator in indicators_display" class="new-ranking-indicator" > {{ indicator.name }} 
				  			<span v-if="indicator.is_reverse == 1" class="tag is-light">(reversed)</span>
				  		</li>
				  	</ul>
				  	<p>Give a name to your ranking:</p>
				    <p>
				    	<input class="input" placeholder="Name" v-bind:value="newRanking_name" v-on:input="newRanking_name = $event.target.value">
				    </p>
				    <p class="suggestions">Or pick a suggestion: 
				    	<span v-for="suggestion in suggestions"><a @click="newRanking_name = suggestion">{{ suggestion }}</a>&nbsp;&nbsp;</span>
				    </p>
					<a @click="submitName()" class="button view-ranking is-primary" :class="{'is-loading': isLoading }" :disabled="hasName">
						View my ranking
					</a>
				  </div>
				</article>
			  </div>
			  <button class="modal-close is-large" aria-label="close" @click="modalActive = false"></button>
			</div>
            </div>
        </div>

        <section class="container">
        	<h2 class="latest-rankings">Discover the latest rankings created by our data scientists</h2>
        	<rankings-list :rankings="rankings"></rankings-list>
    	</section>

    	<section class="container columns is-centered">
    		<div class="column is-half">
	        	<h2 class="latest-rankings">About <span class="logo-underlined">Honest</span> Rankings</h2>
	        	<div class="content">
	        		<p>
	        			Rankings are produced by prestigious institutions, which are large and powerful enough to create the indexes they need to push their respective agendas. And when the outcome does not fit, they <a href="https://web.archive.org/web/20180217174235/https://www.bloomberg.com/news/articles/2018-01-13/chile-demands-answers-in-world-bank-business-ranking-controversy">sometimes change their methodology</a>. No one ever notices these methodological wrongdoings because indexes are like sausages: Everyone likes them but no one knows what's in them.
	        		</p>
	        		<p>
	        			At Honest Rankings, we believe that everyone should have the right to create his or her own global index. Click on "Make a new ranking" and watch the magic unfold! If the right country comes on top, simply write a press release from your data, spread the word and enjoy your country of choice being touted as the best in the world.
	        		</p>
	        	</div>
        	</div>
    	</section>

    </div>

</template>

<script>

    import RankingsList from './Rankings-List.vue';
    import axios from 'axios'
    import indicators_list from '../assets/indicators_list.json'
    window.axios = axios

    if (process.env.NODE_ENV == "dev") {
    	window.instance = axios.create({
		  baseURL: 'http://127.0.0.1:33507'
		});
    } else {
    	window.instance = axios.create({
		  baseURL: 'https://honest-rankings-api.herokuapp.com'
		});
    }

    export default {

        name: "home",

        components: { RankingsList },

        data () {
            return {
            	modalActive: false,
            	rankings : [],
            	indicators: [],
            	indicators_display: [],
            	suggestions: [],
            	isLoading: true,
            	newRanking_id: "",
            	newRanking_name: ""
            }
        },
        computed: {
        	hasName () {
        		if (this.newRanking_name != "") {
        			return false
        		} else {
        			return true
        		}
        	}
        },
        created () {
        	window.instance.get("rankings").then(response => {
		      // JSON responses are automatically parsed.
		      this.rankings = response.data.result
		    });
        },
        methods: {
        	submitName () {
        		window.instance.post("name_ranking", {name: this.newRanking_name, ranking_id: this.newRanking_id}).then(response => {
		      		this.$router.push({ name: 'ranking', params: { ranking_id: this.newRanking_id }})
		    	});
        	},
        	onlyUnique(value, index, self) { 
    			return self.indexOf(value) === index;
			},
			randomFromArray(array) {
				return array[Math.floor(Math.random() * array.length)]
			},
        	newRanking() {

        		this.indicators = []
        		this.indicators_display = []

        		// Selects indicators at random
        		for (var i = 0; i<7; i++) {
					this.indicators.push(this.randomFromArray(indicators_list));
        		}

        		// indicators for display
        		this.indicators.forEach((indicator, index) => {
        			var self = this;
        			setTimeout(function(){
		                self.indicators_display.push(indicator)
		            }, 600 * index);
        		})

        		// Makes suggestions
        		var emptyWords = [
        			["Global", "World", "International"],
        			["Index", "Ranking"]
        		]
        		// List unique categories
        		var categories = []
        		this.indicators.forEach(indicator => {
        			categories.push(indicator.category)
        		});
        		categories = categories.filter(this.onlyUnique)
        		// Creates dummy names
        		for (var j=0; j<=2; j++){
        			var word1 = ""
        			var word2 = ""
        			while (word1 == word2){
        				word1 = this.randomFromArray(categories)
        				word2 = this.randomFromArray(categories)
        			}
        			var suggestion_name = this.randomFromArray(emptyWords[0]) + " " + word1 + " and " + word2 + " " + this.randomFromArray(emptyWords[1]);
        			this.suggestions.push(suggestion_name)
        		}

        		this.modalActive = true;

        		window.instance.post("new_ranking", {indicators: this.indicators}).then(response => {
		      		this.newRanking_id = response.data.ranking_id;
		      		this.isLoading = false;
		    	});
        	}
        }

    }

</script>

<style lang="sass">

@import "../assets/scss/variables.scss"

.container
	padding: 0 1em

.lede
	line-height: 1.8em
	background-color: #efefef
	padding: 3em
	margin: 0

	p
		margin-bottom: 1em


.btn-new-ranking
	margin: 1.6em auto 0
	display: block
	width: 50%
	min-width: 200px
	font-size: 1.2em

.latest-rankings
	font-size: 1.5em
	margin: 2em 0 1.5em

.view-ranking
	display: block
	margin: 1em auto
	width: 50%

.new-ranking-indicators
	margin-bottom: 1em
	min-height: 12em

.new-ranking-indicator
	border-bottom: 1px solid #eee
	font-size: .7em

.suggestions
	font-size: .7em

.logo-underlined
	font-weight: bold
	border-bottom: 3px solid $main-lighter
</style>
