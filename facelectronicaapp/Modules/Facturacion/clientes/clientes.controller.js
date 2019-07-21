(() => {
	angular.module("Facturacion").controller("clientesController", clientesController);

	clientesController.$inject = ["$scope", "$location", "utilsServices", "routeConfigService"];

	/**
	 * @description
	 * Controlador de la vista de clientes
	 * 
	 * @param {any} $scope
	 * @param {service} utilsServices Servicio con utilidades para el consumo de servicios del API
	 * @param {service} routeConfigService Servicio de configuración de las rutas del API
	 */
	function clientesController($scope, $location, utilsServices, routeConfigService) {
		var vm = this;

		vm.clientes = [];

		/**
		 * @description
		 * Invoca el servicio del API de facturación para obtener los clientes de base de datos
		 * */
		vm.obtenerTodos = function () {
			try {
				// Consume el servicio del Api de facturación
				utilsServices.consumeServicePromise(routeConfigService.clientes.obtenerTodos)
					.then(function (response) {

						// Valida la respuesta del servidor
						if (utilsServices.isValidResponse(response)) {
							vm.clientes = response.data.data;
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
		 * Muestra la ventana de edición de clientes para agregar
		 * */
		vm.crear = function () {
			try {
				$location.path("/clientes/agregar");
			} catch (error) {
				utilsServices.showMessage(error, utilsServices.typeMessage.error);
			}
		}


		// Desde el inicio se consultan todas los clientes
		vm.obtenerTodos();
	}
})();