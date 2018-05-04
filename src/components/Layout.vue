 <template>
  	<div>
  		<nav class="navbar" role="navigation" aria-label="main navigation">
		  <div class="navbar-brand">
		    <router-link to="/">
		    	<span class="logo"><strong class="logo-underlined">Honest</strong> Rankings</span>
		    	<span class="logo-small"> | The Proper Way To Compare Countries</span>
		    </router-link>
		  </div>
		</nav>
	    <router-view></router-view>
	    <footer class="footer">
	    	<div class="footer-logo">
	    		&copy; <span class="logo-underlined">Honest</span> Rankings 2018
	    	</div>
	    	<div class="footer-links">
	    		<ul>
	    			<li>
	    				<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs">Privacy Policy</a>
	    			</li>
	    			<li>
	    				<a href="mailto:hi@nkb.fr">Contact</a>
	    			</li>
	    		</ul>
	    	</div>
	    </footer>
	</div>
</template>

<script>
	export default {

        name: "layout"
    }

</script>
<style lang="sass">

@import "~bulma/sass/utilities/initial-variables"

@import "../assets/scss/variables.scss"

@import "~bulma/sass/utilities/_all"
@import "~bulma/sass/base/_all"
@import "~bulma/sass/elements/_all"
@import "~bulma/sass/components/_all"
@import "~bulma/sass/grid/_all"
@import "~bulma/sass/layout/_all"

.navbar 
	padding: 1em 1em 0;
	border-bottom: 1px $color-minor-2 solid;

.logo
	font-size: 1.2em;
	text-decoration: none;
	color: #333;

.logo-small
	font-size: .8em;
	text-decoration: none;
	color: #aaa;

.logo-underlined
	font-weight: bold
	border-bottom: 2px solid $main-lighter

.footer
	margin-top: 5em
	background-color: #333
	color: $color-minor-2
	font-size: .7em

.footer-links
	margin-top: 1em
	a	
		color: $main-lighter !important
</style>