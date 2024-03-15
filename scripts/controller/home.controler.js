
(function() {

	'use strict';

	angular
		.module('app')
		.controller('homeController', homeController);

	function homeController($scope, $location, assetss, Notification, $timeout, $sce, $cookies ) {

		$cookies.put('myFavorite', 'oatmeal');

		$scope.mostrarSlider=true;
		angular.extend($scope, {
			goTop:goTop,
			crearOrder:crearOrder,
			verProd:verProd,
			goTienda: goTienda,
			goTiendaIconos: goTiendaIconos,
			goContacto: goContacto,
			goCarrito: goCarrito,
			goNosotros: goNosotros,
			goFundacion: goFundacion,
			goBlog: goBlog,
			goCategorias: goCategorias,
			goAbout: goAbout,
			goAboutStory:goAboutStory,
			goAboutValues:goAboutValues,
			goAboutTeam:goAboutTeam,
			goAboutClients:goAboutClients,
			goAcreditaciones: goAcreditaciones,
			goResources: goResources,
			goDownloads: goDownloads,
			goArticles: goArticles,
			goGuides: goGuides, 
			goServices: goServices,
			goFinances: goFinances,
			goCorporate: goCorporate,
			goTax: goTax,
			goBusinessSupport: goBusinessSupport,
			verDownload:verDownload,
			verDowloandSingle:verDowloandSingle,
			verArticle:verArticle,
			verGuide:verGuide,
			enviarContacto: enviarContacto, 
			goHome: goHome,
			registerCliente: registerCliente,
			limpiar: limpiar,
			salirOut:salirOut,
			register:register,
			registerModal: registerModal,
			login:login,
			pedir: pedir,
			pedirModal:pedirModal,
			getVentasUser:getVentasUser,
			detalleVentasUser:detalleVentasUser,
			carritoMovil: carritoMovil,
			userMovil: userMovil,
			loginModal:loginModal,
			salirOutModal:salirOutModal
		});		

	 	console.log($location.path())  

		 

		if($location.path() === "/"){
			console.log("estas en el home")
			$scope.home = true;
			$scope.footer = false;
			getHome();
		}
		else{
			console.log("No es el home")
			$scope.home = false;
			$scope.footer = true;
		}

		if($location.path() === ""){
			console.log("estas en el home")
			$scope.home = true;
			$scope.footer = false;
			getHome();
		}

		if($location.path() === "/articlesDetail"){
			console.log($scope.article)
			if($scope.article === undefined){
				goArticles();
			}
		}

		if($location.path() === "/downloadsDetail"){
			console.log($scope.download)
			if($scope.download === undefined){
				goDownloads();
			}
		}

		if($location.path() === "/guidesDetail"){
			console.log($scope.guide)
			if($scope.guide === undefined){
				goGuides();
			}
		}

		if($location.path() === "/downloads"){
			//Se esta en downloads, hay que pedirlas al api
			
			getDownloads();
			
		
		}

		if($location.path() === "/articles"){
			//Se esta en downloads, hay que pedirlas al api
			
			
			assetss.getArticles().then(function(res)
			{
				$scope.articles = res.data;
				for(var i = 0; i < $scope.articles.length; i++) {
					
					var ano = $scope.articles[i].acf.date.substring(0, 4)
					var mes = $scope.articles[i].acf.date.substring(4, 6)
					var dia =  $scope.articles[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.articles[i].acf.date = fecha;
			}
			})
		
		}

		if($location.path() === "/guides"){
			//Se esta en downloads, hay que pedirlas al api
			
			assetss.getGuides().then(function(res)
			{
				$scope.guides = res.data;
				for(var i = 0; i < $scope.downloads.length; i++) {
					
					var ano = $scope.guides[i].acf.date.substring(0, 4)
					var mes = $scope.guides[i].acf.date.substring(4, 6)
					var dia =  $scope.guides[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.guides[i].acf.date = fecha;
			}
			})
		
		}

		if($location.path() === "/resources"){
			//Se esta en downloads, hay que pedirlas al api
			console.log("entr")
			assetss.getArticles().then(function(res)
			{
				$scope.articles = res.data;
				for(var i = 0; i < $scope.articles.length; i++) {
					
					var ano = $scope.articles[i].acf.date.substring(0, 4)
					var mes = $scope.articles[i].acf.date.substring(4, 6)
					var dia =  $scope.articles[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.articles[i].acf.date = fecha;
			}
			})

			assetss.getDownloads().then(function(res)
			{
				console.log(res.data)
				$scope.downloads = res.data;
				for(var i = 0; i < $scope.downloads.length; i++) {
					
					var ano = $scope.downloads[i].acf.date.substring(0, 4)
					var mes = $scope.downloads[i].acf.date.substring(4, 6)
					var dia =  $scope.downloads[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.downloads[i].acf.date = fecha;
			}
				console.log($scope.downloads)
			})

			assetss.getGuides().then(function(res)
			{
				$scope.guides = res.data;
				for(var i = 0; i < $scope.downloads.length; i++) {
					
					var ano = $scope.guides[i].acf.date.substring(0, 4)
					var mes = $scope.guides[i].acf.date.substring(4, 6)
					var dia =  $scope.guides[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.guides[i].acf.date = fecha;
			}
			})
		
		}
		
		

		$scope.mostrarSlider = true;
		$scope.prodsCart = [];
		$scope.imagenUrl = 'https://worldfurniturepanama.com/tiendaBackPana/Prods/'

		if (localStorage.getItem("prodsCart")) {
			$scope.prodsCart = JSON.parse(localStorage.getItem("prodsCart"));
		}else{
			$scope.prodsCart = [];
		}

		$scope.visible = false;

		$scope.$watch(function(scope) {
			window.onscroll = function() {
				var y = window.scrollY;
				if(y >50){
					$scope.visible = true;
				}else{
					$scope.visible = false;
				}
			};
			return scope.visible;
		})

		function init(){			
			
			
		}

		function getHome(){

			$scope.primerNote = false;
			$scope.segundoNote = false;
			$scope.terceroNote = false;
			$scope.cuartoNote = false;
			var a = 0
			
			assetss.getArticles().then(function(res)
			{
				console.log(res)
				$scope.articles = res.data;
				console.log($scope.articles)
				
				for(var i = 0; i < $scope.articles.length; i++) {
					if($scope.articles[i].acf.show_home_site.length !== 0){
						a = a + 1;
						if(a ===  1){
							$scope.primerNote = $scope.articles[i];
						}
						if(a ===  2){
							$scope.segundoNote = $scope.articles[i];
						}
						if(a ===  3){
							$scope.terceroNote = $scope.articles[i];
						}
						if(a ===  4){
							$scope.cuartoNote = $scope.articles[i];
						}

					}
				
				}
				

			})

			assetss.getDownloads().then(function(res)
			{
				$scope.downloads = res.data;
				console.log($scope.downloads)
				
				for(var i = 0; i < $scope.downloads.length; i++) {
					if($scope.downloads[i].acf.show_home_site.length !== 0){
						a = a + 1;
						console.log(a)		

						if(a ===  1){
							$scope.primerNote = $scope.downloads[i];
						}
						if(a ===  2){
							$scope.segundoNote = $scope.downloads[i];
						}
						if(a ===  3){
							$scope.terceroNote = $scope.downloads[i];
						}
						if(a ===  4){
							$scope.cuartoNote = $scope.downloads[i];
						}

					}
				
				}
			})

			console.log($scope.primerNote)
				console.log($scope.segundoNote)
				console.log($scope.terceroNote)
				console.log($scope.cuartoNote)

			assetss.getGuides().then(function(res)
			{
				$scope.guides = res.data;
				console.log($scope.guides)
			})
			
		}


		function crearOrder(order){
			
			assetss.crearOrden(order).then(function(res)
			{
				console.log(res);
				Notification.error("Se ha creado su orden, nos pondremos en contacto con usted");
				salirOut();
				
			}, function(res){
				console.log(res.data);
				Notification.error(res.data.data.params.billing);
				
			});
		}

		function registerCliente(command){
			
			assetss.registerCliente(command).then(function(res)
			{
				if (res.data.code == 200) {
					$scope.mensajeRegistroGood=true;
				}else{
					$scope.mensajeRegistroFail=true;
				}

				console.log(res.data);
			})
			
		}
		function getBank(){
			
			assetss.getBank().then(function(res)
			{
				if (res.data.code == 200) {
					console.log(res.data.response.productos);
					$scope.bancos = res.data.response.productos;
				}else{
					console.log(res.data);
				}

				console.log(res.data);
			})
			
		}

		function getPorductoDestacados(){
			
			assetss.getPorductoDestacados().then(function(res)
			{
				if (res.data.code == 200) {
					$scope.prodDesta = res.data.response.productosDestacados;
				}else{
					console.log(res.data);
				}
			})
			
		}
		function getVentasUser(){
			localStorage.removeItem("prodsCart");

			$scope.mostrarSlider=false;
			assetss.getVentasUser().then(function(res)
			{
				if (res.data.code == 200) {
					$scope.ventas = res.data.response.ventas;
				}else{
					console.log(res.data);
				}
			})
			
		}
		function detalleVentasUser (reference){
			
			
			
			assetss.getDetalleVentasUser(reference).then(function(res)
			{
				if (res.data.code == 200) {
					$scope.detalles = res.data.response.detalles;
					$('#detalleModal').modal();
				}else{
					console.log(res.data);
				}
			})
			
		}
		



		

		function goBlog(){
			$scope.mostrarSlider=false;
	
			assetss.getPost().then(function(res)
			{
				console.log(res.data)
				$scope.posts = res.data.filter((articulo) => articulo.id !== 1);
				$location.url('/blog');
				console.log($scope.posts)
			})	
		}

		function goCategorias(categorias){
			console.log(categorias)
			$scope.mostrarSlider=false;
			$scope.categorias = categorias;	
			$location.url('/categorias');		
		}

		function goContacto(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/contacto');	
			$('#botonCerrarMenu').trigger('click')
			//setInterval(clickCerrarMenu, 1000);
		}
		
		function goAbout(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/about');	
			angular.element(document.getElementById('botonCerrarMenu')).triggerHandler('click')
			//setInterval(clickCerrarMenu, 1000);
		}
		
		function goAboutStory(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/about');		
			setTimeout(irStory, 500);
		}

		function irStory(){
			console.log($("#Story").offset());
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#Story").offset().top
				}, 2000);
			});
		}

		function goAboutValues(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/about');		
			setTimeout(irValues, 500);
		}
		
		function irValues(){
			console.log($("#values").offset());
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#values").offset().top
				}, 2000);
			});
		}

		function goAboutTeam(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/about');		
			setTimeout(irOurs, 500);
		}
		
		function irOurs(){
			console.log($("#ours").offset());
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#ours").offset().top
				}, 2000);
			});
		}

		function goAboutClients(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/about');		
			setTimeout(irTestimonials, 500);
		}
		
		function irTestimonials(){
			console.log($("#testimonials").offset());
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#testimonials").offset().top
				}, 2000);
			});
		}

		function goAcreditaciones(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/acreditaciones');	
			angular.element(document.getElementById('botonCerrarMenu')).triggerHandler('click')
			//setInterval(clickCerrarMenu, 1000);
		}

		function goServices(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/services');	
			
			setTimeout(clickCerrarMenu, 500);
		}

		function goTop(){
			$('html, body').animate({
				scrollTop: $("#menuHeader").offset().top
			}, 2000);
		}

		function goFinances(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/FinancesAccounting');
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#pagetitle").offset().top
				}, 2000); 
			});	
		}
		function goCorporate(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/CorporateSecretarial');	
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#pagetitle").offset().top
				}, 2000);
			});	
		}
		function goTax(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/TaxGST');	
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#pagetitle").offset().top
				}, 2000);
			});	
		}
		function goBusinessSupport(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/BusinessSupport');	
			$(document).ready(function (){
				$('html, body').animate({
					scrollTop: $("#pagetitle").offset().top
				}, 2000);
			});	
		}

		function goResources(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/resources');	
			
			console.log("entr")
			assetss.getArticles().then(function(res)
			{
				$scope.articles = res.data;
				for(var i = 0; i < $scope.articles.length; i++) {
					
					var ano = $scope.articles[i].acf.date.substring(0, 4)
					var mes = $scope.articles[i].acf.date.substring(4, 6)
					var dia =  $scope.articles[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.articles[i].acf.date = fecha;
			}
			})

			assetss.getDownloads().then(function(res)
			{
				console.log(res.data)
				$scope.downloads = res.data;
				for(var i = 0; i < $scope.downloads.length; i++) {
					
					var ano = $scope.downloads[i].acf.date.substring(0, 4)
					var mes = $scope.downloads[i].acf.date.substring(4, 6)
					var dia =  $scope.downloads[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.downloads[i].acf.date = fecha;
			}
				console.log($scope.downloads)
			})

			assetss.getGuides().then(function(res)
			{
				$scope.guides = res.data;
				for(var i = 0; i < $scope.downloads.length; i++) {
					
					var ano = $scope.guides[i].acf.date.substring(0, 4)
					var mes = $scope.guides[i].acf.date.substring(4, 6)
					var dia =  $scope.guides[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.guides[i].acf.date = fecha;
			}
			})
			
			setTimeout(clickCerrarMenu, 500);
		}

		function goDownloads(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/downloads');	
			
			assetss.getDownloads().then(function(res)
			{
				$scope.downloads = res.data;
				for(var i = 0; i < $scope.downloads.length; i++) {
					
						var ano = $scope.downloads[i].acf.date.substring(0, 4)
						var mes = $scope.downloads[i].acf.date.substring(4, 6)
						var dia =  $scope.downloads[i].acf.date.substring(6, 8)
						var fecha = ano +"-"+ mes +"-"+ dia;
						$scope.downloads[i].acf.date = fecha;
				}
				console.log($scope.downloads)
			})
			
			setTimeout(clickCerrarMenu, 500);
		}

		function goArticles(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/articles');	
			
			assetss.getArticles().then(function(res)
			{
				console.log(res.data)
				$scope.articles = res.data;
				for(var a = 0; a < $scope.articles.length; a++) {
						var ano = $scope.articles[a].acf.date.substring(0, 4)
						var mes = $scope.articles[a].acf.date.substring(4, 6)
						var dia =  $scope.articles[a].acf.date.substring(6, 8)
						var fecha = ano +"-"+ mes +"-"+ dia;
						$scope.articles[a].acf.date = fecha;
				}
				
				console.log($scope.articles)
				
			})
			
			setTimeout(clickCerrarMenu, 500);
		}

		function goGuides(){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/guides');	
			
			assetss.getGuides().then(function(res)
			{
				console.log(res.data)
				$scope.guides = res.data;
				console.log($scope.guides)
			})
			
			setTimeout(clickCerrarMenu, 500);
		}

		

		function clickCerrarMenu() {
			angular.element(document.getElementById('botonCerrarMenu')).triggerHandler('click')
			
		}

		function verDownload(download, downloads){
			$location.url('/downloadsDetail');
			$scope.download = download;
			$scope.downloadsFil = downloads.filter((articulo) => articulo.id !== download.id)
			console.log($scope.downloadsFil);	
		}

		function verDowloandSingle(download){
			$scope.home = false;
			$scope.footer = true;
			$location.url('/downloadsDetail');
			$scope.download = download;
			console.log($scope.downloadsFil);	
		}

		

		function verArticle(article, articles){
			$location.url('/articlesDetail');
			$scope.article = article;
			$scope.articlesFil = articles.filter((articulo) => articulo.id !== article.id)
			console.log($scope.articlesFil);	
			console.log(isNaN(Date.parse(article.acf.date)))
			console.log(article.acf.date.substring(0, 4))
			console.log(article.acf.date.substring(4, 6))
			console.log(article.acf.date.substring(6, 8))
			var ano = article.acf.date.substring(0, 4)
			var mes = article.acf.date.substring(4, 6)
			var dia = article.acf.date.substring(6, 8)
			var fecha = ano +"-"+ mes +"-"+ dia;
			console.log(fecha);
			fecha = Date(fecha)
			console.log(fecha);
			//console.log( fecha.toDateString());
			const fechaActual = new Date(fecha);
			console.log( fechaActual.toDateString());
		}


		function verGuide(guide, guides){
			$location.url('/guidesDetail');
			$scope.guide = guide;
			$scope.guide.acf.archive_link = $sce.trustAsResourceUrl(guide.acf.archive_link);
			$scope.guidesFil = guides.filter((articulo) => articulo.id !== guide.id)
			console.log($scope.guidesFil);	
		}

		function goCarrito(){
			$scope.mostrarSlider=false;		
			$location.url('/carrito');	
		}

		function goFundacion(){
			$scope.mostrarSlider=false;		
			$location.url('/fundacion');	
		}

		function goNosotros(){
			$scope.mostrarSlider=false;		
			$location.url('/nosotros');	
		}

		function enviarContacto (command){
			var form = new FormData();

			form.append("your-name", command.nombre);
			form.append("tel-340", command.telefono);
			form.append("your-email",  command.email);
			form.append("your-subject",  command.asunto);
			form.append("your-message",  command.mensaje);

			var settings = {
				"url": "https://advenz.co/wordpress/index.php/wp-json/contact-form-7/v1/contact-forms/57/feedback",
				"method": "POST",
				"timeout": 0,
				"processData": false,
				"mimeType": "multipart/form-data",
				"contentType": false,
				"data": form
			};

				$.ajax(settings).done(function (res) {
				res = JSON.parse(res);	
				console.log(res);
				
				if(res.status === "validation_failed"){
					Notification.error(res.message);
					}
				if(res.status === "mail_sent"){
					Notification.error(res.message);
					goHome();
					$scope.command = {};
				}

			});

			//https://htmldemo.net/robin/robin/contact-us.html

		}
		

		function goHome(){
			$scope.home = true;
			$scope.footer = false;
			$location.url('/');
			getHome()
			setTimeout(clickCerrarMenu, 500);
		}

		function salirOut (){
			localStorage.clear();
			$scope.mostrarSlider=true;
			$location.url('/');
			$scope.prodsCart = [];
			$scope.countCart = 0;
			/*FALTA REFRESCAR PAGINA */
			limpiar();
		}

		function salirOutModal (){
			$('#userMobil').modal('toggle');
			localStorage.clear();
			$location.url('/');
			/*FALTA REFRESCAR PAGINA */
			limpiar();
			Notification.error("Se ha cerrado su sesión");
		}

		function register (){
			$('.register-area').fadeIn();
		}

		function registerModal (){
			$('#userMobil').modal('toggle');
			$('.register-area').fadeIn();
		}

		function login (){
			$('.login-area').fadeIn();
		}
		function loginModal (){
			$('#userMobil').modal('toggle');
			$('.login-area').fadeIn();
		}

	
		
		function userMovil() {

			$('#userMobil').modal();
		
		}

		function carritoMovil() {

			$('#carritoMobil').modal();
		
		}

		function pedir() {
			if (!localStorage.getItem("user")) {
				$scope.mostrarSlider=false;
				$scope.logueoMsj = true;
				$location.url('/checkout');		
			}else{
				getBank();
				$('#exampleModal').modal();
			}
		}

		function pedirModal() {

			if (!localStorage.getItem("user")) {
				$scope.logueoMsj = true;
				//$location.url('/checkout');		
			}else{
				$('#carritoMobil').modal('toggle');
				getBank();
				$('#exampleModal').modal();
			}
		}




		function limpiar(){
			$scope.command={};
			$scope.mensajeRegistroGood=false;
			$scope.mensajeRegistroFail=false;
			$scope.mensajeLogueoGood=false;
			$scope.mensajeLogueoFail=false;
			$scope.logueoMsj = false;	
			$scope.userSystem = localStorage.getItem("user");
			console.log($scope.userSystem);
		}


		function getDownloads(){
			console.log("llega");
			var settings = {
				"url": "https://advenz.co/wordpress/index.php/wp-json/wp/v2/articles",
				"method": "GET",
				"timeout": 0,
				"headers": {
					"Cache-Control": "no-cache, must-revalidate, max-age=0, no-store, private",
					"Cookie": "wordpress_test_cookie=WP%20Cookie%20check; wp_lang=en_US; wordpress_logged_in_104ccddcc1e18462c7343aa5547ad902=admin_advenz%7C1697040578%7CBXlvHhu0iE8yCirz0kONAzZnvyiRdq9ZrXk1I8ZfRlO%7Cc321d5c6e780828e6ca6e24360e1ef00b7627bdcec5b5f9ee75691f9b84ff4f0; wp-settings-1=libraryContent%3Dbrowse%26editor%3Dtinymce; wp-settings-time-1=1696867779"
				},
				"processData": false,
				"mimeType": "multipart/form-data",
				"contentType": false,
			};
			console.log("pasa");
			 $.ajax(settings).done(function (response) {
				console.log(response);
				console.log(response.data)
				$scope.downloads = res.data;
				for(var i = 0; i < $scope.downloads.length; i++) {
					
					var ano = $scope.downloads[i].acf.date.substring(0, 4)
					var mes = $scope.downloads[i].acf.date.substring(4, 6)
					var dia =  $scope.downloads[i].acf.date.substring(6, 8)
					var fecha = ano +"-"+ mes +"-"+ dia;
					$scope.downloads[i].acf.date = fecha;
				}
				console.log($scope.downloads)
			});
			console.log("sale");

		}



		limpiar();
		//getPorductoDestacados();
		init();


	}

})();

