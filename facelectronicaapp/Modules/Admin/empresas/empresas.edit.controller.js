(() => {
	angular.module("Facturacion").controller("edicionEmpresasController", edicionEmpresas);

	edicionEmpresas.$inject = ["$scope", "$location", "utilsServices", "routeConfigService", "modoEdicion"];

	/**
	 * @description
	 * Controlador de la edición de empresas
	 * 
	 * @param {any} $scope
	 * @param {service} utilsServices Servicio con utilidades para el consumo de servicios del API
	 * @param {service} routeConfigService Servicio de configuración de las rutas del API
	 */
	function edicionEmpresas($scope, $location, utilsServices, routeConfigService, modoEdicion) {
		var vm = this;

		vm.empresa = {};

		/**
		 * @description
		 * Invoca el servicio del API de facturación para agregar o modificar una empresa en la base de datos
		 * 
		 * */
		vm.guardar = function () {
			try {
				var config = null;

				switch (modoEdicion) {
					// Agregar
					case 0:
						config = routeConfigService.empresas.agregar;
						break;

					// Modificar
					case 1:
						config = routeConfigService.empresas.modificar;
						break
				}

				// Consume el servicio del Api de facturación
				utilsServices.consumeServicePromise(config, vm.empresa)
					.then(function (response) {

						// Valida la respuesta del servidor
						if (utilsServices.isValidResponse(response)) {
							utilsServices.showMessage(response.data.message, utilsServices.typeMessage.info);
							$location.path("/empresas");
						}
					})
					.catch(function (error) {
						utilsServices.showMessage(error, utilsServices.typeMessage.error);
					});
			} catch (e) {
				utilsServices.showMessage(error, utilsServices.typeMessage.error);
			}
		};
	}
})();