(() => {
	angular.module("Utils").service("routeConfigService", routeConfigService);

	/**
	 * @description
	 * 
	 * Configuración de las rutas de los servicios del APi de Facturación electrónica
	 * */
	function routeConfigService() {
		var urlBase = "http://localhost:49346/";
		return {
			empresas: {
				obtenerTodas: {
					url: urlBase + "api/empresas/obtener",
					method: "Get"
				},
				obtener: {
					url: urlBase + "api/empresas/obtener/{0}",
					method: "Get",
					hasParameters: true
				},
				agregar: {
					url: urlBase + "api/empresas/agregar",
					method: "Post"
				},
				modificar: {
					url: urlBase + "api/empresas/modificar",
					method: "Put"
				},
				eliminar: {
					url: urlBase + "api/empresas/eliminar/{0}",
					method: "Delete",
					hasParameters: true
				}
			},
			clientes: {

			}
		};
	}
})();