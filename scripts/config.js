(function() {

	'use strict';

	angular
		.module('app')
		.config(function ($routeProvider, NotificationProvider, $httpProvider ){

			$httpProvider.defaults.withCredentials = true;
			

			$routeProvider				
				.when('/',{
					templateUrl :'vista/home.html'
				})
				.when('/tienda',{
					templateUrl :'vista/tienda.html'
				})
				.when('/prod',{
					templateUrl :'vista/prod.html'
				})
				.when('/carrito',{
					templateUrl :'vista/carrito.html'
				})
				.when('/contacto',{
					templateUrl :'vista/contacto.html'
				})
				.when('/nosotros',{
					templateUrl :'vista/nosotros.html'
				})
				.when('/fundacion',{
					templateUrl :'vista/fundacion.html'
				})
				.when('/blog',{
					templateUrl :'vista/blog.html'
				})
				.when('/articulo',{
					templateUrl :'vista/articulo.html'
				})
				.when('/categorias',{
					templateUrl :'vista/categorias.html'
				})

				.when('/about',{
					templateUrl :'vista/about.html'
				})
				.when('/acreditaciones',{
					templateUrl :'vista/acreditaciones.html'
				})
				.when('/services',{
					templateUrl :'vista/services.html'
				})
				.when('/resources',{
					templateUrl :'vista/resources.html'
				})
				.when('/downloads',{
					templateUrl :'vista/downloads.html'
				})
				.when('/downloadsDetail',{
					templateUrl :'vista/download-detail.html'
				})
				.when('/articles',{
					templateUrl :'vista/articles.html'
				})
				.when('/articlesDetail',{
					templateUrl :'vista/articles-detail.html'
				})
				.when('/guides',{
					templateUrl :'vista/guides.html'
				})
				.when('/guidesDetail',{
					templateUrl :'vista/guides-detail.html'
				})

				.when('/FinancesAccounting',{
					templateUrl :'vista/finances.html'
				})
				.when('/CorporateSecretarial',{
					templateUrl :'vista/corporate.html'
				})
				.when('/TaxGST',{
					templateUrl :'vista/Tax.html'
				})
				.when('/BusinessSupport',{
					templateUrl :'vista/business.html'
				})
				


				


				.otherwise({
					redirectTo:'/errr'
				});

			NotificationProvider.setOptions({
				delay: 10000,// Después de cuántos milisegundos se oculta. Si no se le pasa un int, se muestra hasta que se le hace click
				startTop: 20,// Posición inicial con respecto a arriba
				startRight: 10,// Posición inicial con respecto a la derecha
				verticalSpacing: 20,
				horizontalSpacing: 20,
				positionX: 'right',//En X, mostrarla a la derecha (puede ser left o right)
				positionY: 'top'// En Y, mostrarla arriba (Puede ser bottom o top)
			});

		});

})();