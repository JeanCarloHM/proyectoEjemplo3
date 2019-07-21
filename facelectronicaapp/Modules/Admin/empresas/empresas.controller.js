(() => {
	angular.module("Facturacion").controller("empresasController", empresasController);

	empresasController.$inject = ["$scope", "$location", "utilsServices", "routeConfigService"];

	/**
	 * @description
	 * Controlador de la vista de empresas
	 * 
	 * @param {any} $scope
	 * @param {service} utilsServices Servicio con utilidades para el consumo de servicios del API
	 * @param {service} routeConfigService Servicio de configuración de las rutas del API
	 */
	function empresasController($scope, $location, utilsServices, routeConfigService) {
		var vm = this;

		vm.empresas = [];

		/**
		 * @description
		 * Invoca el servicio del API de facturación para obtener las empresas de base de datos
		 * */
		vm.obtenerTodas = function () {
			try {
				// Consume el servicio del Api de facturación
				utilsServices.consumeServicePromise(routeConfigService.empresas.obtenerTodas)
					.then(function (response) {

						// Valida la respuesta del servidor
						if (utilsServices.isValidResponse(response)) {
							vm.empresas = response.data.data;
						}
					})
					.catch(function (error) {
						utilsServices.showMessage(error, utilsServices.typeMessage.error);
					});
			} catch (e) {
				utilsServices.showMessage(error, utilsServices.typeMessage.error);
			}
		};

		/**
		 * @description
		 * Muestra la ventana de edición de empresas para agregar
		 * */
		vm.crear = function () {
			try {
				$location.path("/empresas/agregar");
			} catch (error) {
				utilsServices.showMessage(error, utilsServices.typeMessage.error);
			}
		}


		// Desde el inicio se consultan todas las empresas
		vm.obtenerTodas();
	}
})();