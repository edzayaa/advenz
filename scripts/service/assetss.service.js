(function() {
	
	'use strict';

	angular
		.module('app')
		.service('assetss', assetss);

	function assetss($http, $q) {

		this.getDownloads = function()
		{	
			var deferred = $q.defer();
			
			return $http.get("https://advenz.co/wordpress/index.php/wp-json/wp/v2/dowloand", {
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

		this.getArticles = function()
		{	
			var deferred = $q.defer();
			
			return $http.get("https://advenz.co/wordpress/index.php/wp-json/wp/v2/articles", {
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

		this.getGuides = function()
		{	
			var deferred = $q.defer();
			
			return $http.get("https://advenz.co/wordpress/index.php/wp-json/wp/v2/guides", {				
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}
		
		this.getCategoriasMadres = function(codCategoria)
		{	
			var deferred = $q.defer();
			
			$http.defaults.headers.common['Authorization'] = 'Basic Y2tfYjcwMDQzMDgwMTU3NmM0MTE1ZDIxMWY1OTQ0ZTkyNWJiMTE5NmJiZTpjc183ZjQzODIzZWJjYTJjMmNlZDRhMmE4ZjdmNzMyYjEyNDZlNGVlMjNj';
			return $http.get("https://proinservi.com/wordpress/wp-json/wc/v3/products/categories?parent=0&per_page=20", {				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

	

		this.getProductsMasVendidos = function()
		{	
			var masVendidos = 78;
			var deferred = $q.defer();
			var formData = new FormData();
			
			$http.defaults.headers.common['Authorization'] = 'Basic Y2tfYjcwMDQzMDgwMTU3NmM0MTE1ZDIxMWY1OTQ0ZTkyNWJiMTE5NmJiZTpjc183ZjQzODIzZWJjYTJjMmNlZDRhMmE4ZjdmNzMyYjEyNDZlNGVlMjNj';
			return $http.get("https://proinservi.com/wordpress/wp-json/wc/v3/products?category="+masVendidos+"&status=publish", {				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

		this.getSliderMenu = function(codCategoria)
		{	
			var codCategoria = 54;
			var deferred = $q.defer();
			var formData = new FormData();
			
			$http.defaults.headers.common['Authorization'] = 'Basic Y2tfNDdmY2EyZDNhODg1MGQ3M2YyZGI1OGUzOGM1M2VmMDZmMDhkOWI0NTpjc180NWNhMWE0NjIwYjAyM2Q2MGJmMjhmYWZkYjY1M2Q0ZjkxMWYzODJk';
			return $http.get("https://worldfurniturepanama.com/wordpress/wp-json/wc/v3/products?category="+codCategoria+"&status=publish", {				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

		this.getPorductoCat = function(codCategoria)
		{	
			var deferred = $q.defer();
			var formData = new FormData();
			
			$http.defaults.headers.common['Authorization'] = 'Basic Y2tfYjcwMDQzMDgwMTU3NmM0MTE1ZDIxMWY1OTQ0ZTkyNWJiMTE5NmJiZTpjc183ZjQzODIzZWJjYTJjMmNlZDRhMmE4ZjdmNzMyYjEyNDZlNGVlMjNj';
			return $http.get("https://proinservi.com/wordpress/wp-json/wc/v3/products?category="+codCategoria+"&status=publish&per_page=100", {				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}
		
		this.getPorductoDestacados = function()
		{	
			var deferred = $q.defer();
			var formData = new FormData();
			
			$http.defaults.headers.common['Authorization'] = 'Basic Y2tfNDdmY2EyZDNhODg1MGQ3M2YyZGI1OGUzOGM1M2VmMDZmMDhkOWI0NTpjc180NWNhMWE0NjIwYjAyM2Q2MGJmMjhmYWZkYjY1M2Q0ZjkxMWYzODJk';
			return $http.get("https://worldfurniturepanama.com/wordpress/wp-json/wc/v3/products?category=53&status=publish", {				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

		this.getPost = function()
		{	
			var deferred = $q.defer();
			var formData = new FormData();
			
			return $http.get("https://proinservi.com/wordpress/wp-json/wp/v2/posts?per_page=100", {				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}

		
		this.crearOrden = function(orden)
		{	
			var deferred = $q.defer();
			var formData = new FormData();
			var prodsCart = JSON.parse(localStorage.getItem("prodsCart"));
			console.log(prodsCart);
			var prodItems = {};

			for(var i = 0; i < prodsCart.length; i++) {
				prodItems[i] = {};
				prodItems[i].product_id =  prodsCart[i].id;
				prodItems[i].quantity =  1;
				prodItems[i].sku =  "0";				
			}   

			console.log(prodItems);

			var data = {
				payment_method: "bacs",
				payment_method_title: "Direct Bank Transfer",
				set_paid: true,
				customer_note: orden.mensaje,
				billing: {
				  first_name: orden.nombres,
				  last_name: orden.apellidos,
				  address_1:  orden.direccion,
				  address_2: "",
				  city: "",
				  state: "",
				  postcode: "",
				  country: "",
				  email:  orden.correo,
				  phone:  orden.telefono
				},
				shipping: {
				  first_name: orden.nombres,
				  last_name: orden.apellidos,
				  address_1: orden.direccion,
				  address_2: "",
				  city: "",
				  state: "",
				  postcode: "",
				  country: ""
				},
				line_items: 
						prodItems
				,
				shipping_lines: [
				]
			  };
			
			$http.defaults.headers.common['Authorization'] = 'Basic Y2tfYjcwMDQzMDgwMTU3NmM0MTE1ZDIxMWY1OTQ0ZTkyNWJiMTE5NmJiZTpjc183ZjQzODIzZWJjYTJjMmNlZDRhMmE4ZjdmNzMyYjEyNDZlNGVlMjNj';
			return $http.post("https://proinservi.com/wordpress/wp-json/wc/v3/orders", data, {				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})
			return deferred.promise;
		}
		

	
		this.contact = function(orden)
		{	
			var deferred = $q.defer();
			var formData = new FormData();
		

			
			
				  var formData = new FormData();
				  formData.append("your-name", "afsdfsdf");
				  formData.append("your-email", "irving1364@gmail.com");
				  formData.append("your-subject", "asunto");
				  formData.append("your-message", "mensaje");

			console.log(formData);
			
	
			$http.defaults.headers.common['Authorization'] = 'Basic Y2tfNDdmY2EyZDNhODg1MGQ3M2YyZGI1OGUzOGM1M2VmMDZmMDhkOWI0NTpjc180NWNhMWE0NjIwYjAyM2Q2MGJmMjhmYWZkYjY1M2Q0ZjkxMWYzODJk';
			return $http.post("https://worldfurniturepanama.com/wordpress/wp-json/contact-form-7/v1/contact-forms/189/feedback", formData, {				
				transformRequest: angular.identity,
				headers: {'Content-Type': 'multipart/form-data'
				},
				transformRequest: angular.identity,
   headers: {'Content-Type': undefined}
				
			})
			.success(function(res)
			{
				deferred.resolve(res);
			})
			.error(function(msg, code)
			{
				deferred.reject(msg);
			})


			


		}


	}

})();