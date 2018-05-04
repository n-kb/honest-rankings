import VueRouter from 'vue-router';

let routes = [
	{
		path: '/',
		component: require('./components/Home.vue').default
	},
	{
		path: '/about',
		component: require('./components/About.vue').default
	},
	{
		path: '/ranking/:ranking_id',
		name: 'ranking',
		component: require('./components/Ranking.vue').default
	}
]

export default new VueRouter ({
	routes
});