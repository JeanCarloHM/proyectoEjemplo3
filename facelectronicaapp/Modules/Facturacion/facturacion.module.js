(() => {
	angular.module("Facturacion", ["ngRoute", "Utils"]);

	angular.module("Facturacion").config(configApp);

	configApp.$inject = ['$routeProvider'];

	/**
	 * @description
	 * Configuración de las rutas de la aplicación
	 * 
	 * @param {any} $routeProvider
	 */
	function configApp($routeProvider) {

		$routeProvider
		.when("/", {
			redirectTo: "/clientes"
		})
		.when("/404", {
			templateUrl: "../../templates/404.template.html"
		})
		.when("/clientes", {
			controller: "clientesController",
			controllerAs: "vm",
			templateUrl: "clientes/clientes.view.html"
		})
		.when("/clientes/agregar", {
			controller: "edicionClientesController",
			controllerAs: "vm",
			templateUrl: "clientes/clientes.edit.view.html",
			resolve: {
				modoEdicion: function () {
					return 0;
				}
			}
		})
		.when("/clientes/editar", {
			controller: "edicionClientesController",
			controllerAs: "vm",
			templateUrl: "clientes/clientes.edit.view.html",
			resolve: {
				modoEdicion: function () {
					return 1;
				}
			}
		})
		.otherwise({
			redirectTo: "/404"
		});
	}
})();