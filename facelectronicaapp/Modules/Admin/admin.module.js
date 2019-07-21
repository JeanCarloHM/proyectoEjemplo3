(function () {
	angular.module("Admin", ["ngRoute", "Utils"]);

	angular.module("Admin").config(configApp);

	configApp.$inject = ['$routeProvider'];

	/**
	 * @description
	 * Configuración de las rutas del modulo Administración de la aplicación
	 * 
	 * @param {any} $routeProvider
	 */
	function configApp($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: ".dashboardEmpresa.html"
			})
			.when("/404", {
				templateUrl: "../../templates/404.template.html"
			})
			.when("/empresas", {
				controller: "empresasController",
				controllerAs: "vm",
				templateUrl: "empresas/empresas.view.html"
			})
			.when("/empresas/agregar", {
				controller: "edicionEmpresasController",
				controllerAs: "vm",
				templateUrl: "empresas/empresas.edit.view.html",
				resolve: {
					modoEdicion: function () {
						return 0;
					}
				}
			})
			.when("/empresas/editar", {
				controller: "edicionEmpresasController",
				controllerAs: "vm",
				templateUrl: "empresas/empresas.edit.view.html",
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
}) ();