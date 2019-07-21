(() => {
	angular.module("Utils").service("utilsServices", utilsServices)

	utilsServices.$inject = ["$http", "$q"];

	/**
	 * @description
	 * Servicio de utilidades
	 * 
	 * @param {any} $http
	 * @param {any} $q
	 */
	function utilsServices($http, $q) {

		/**
		 * @description
		 * Enumeración con los tipos de mensajes a mostrar
		 * 
		 * */
		this.typeMessage = {
			info:0,
			warning: 1,
			error: 2
		};

		/**
		 * @description
		 * Muestra un mensaje de Error, Información o Warning en la pantalla
		 * 
		 * @param {string} message
		 * @param {typeMessage} type
		 * 
		 */
		this.showMessage = function (message, type = this.typeMessage.info) {
			var typeM = "";

			switch (type) {
				case this.typeMessage.info:
					console.info(message);
					typeM = "Info";
					break;

				case this.typeMessage.warning:
					console.warn(message);
					typeM = "Warning";
					break

				case this.typeMessage.error:
					console.error(message);
					typeM = "Error";
					break;
			}

			alert(typeM + " \n " + (typeof (message) == "object" ? JSON.stringify(message) : message));
		}

		/**
		 * @description
		 * Valida si una propiedad contiene algún valor valido
		 * 
		 * @param {string, object} data
		 * 
		 */
		this.isDefinedAndNotEmpty = function (data) {
			try {
				if (typeof (data) == "undefined" || data == null || data == "") {
					return false;
				}
				else {
					return true;
				}
			} catch (e) {
				this.showMessage(e, this.typeMessage.error);
			}
		};

		/**
		 * @description
		 * Ejecuta un servicio en el APi de facturación electrónica
		 *
		 * @param {object} pConfig
		 * @param {object} data
		 * @param {string} contentType
		 * 
		 * @returns {promise} 
		 * 
		 */
		this.consumeServicePromise = function (pConfig, data, contentType = "application/json") {
			try {
				if (this.isDefinedAndNotEmpty(pConfig)) {
					var defered = $q.defer();
					var promise = defered.promise;

					data = data || "";

					var config = angular.merge({}, pConfig, {
																"async": true,
																"crossDomain": true,
																"data" : "",
																"headers": {
																	'Content-Type': contentType,
																	'cache-control': 'no-cache',
																	'Access-Control-Allow-Origin': '*'
																},
																"processData": false
															});

					if (pConfig.hasParameters) {
						pConfig.url.format(data);
					}
					else {
						config.data = data;
					}

					$http(config).then(
						function (data) {
							defered.resolve(data);
						},
						function (err) {
							defered.reject(err);
						}
					);

					return promise;
				}
			} catch (e) {
				this.showMessage(e, this.typeMessage.error);
			}
		};

		/**
		 * @description
		 * Valida la respuesta del API de facturación
		 * 
		 * @param {any} response
		 * 
		 * @returns {boolean}
		 * 
		 */
		this.isValidResponse = function (response) {
			var toReturn = false;
			if (!this.isDefinedAndNotEmpty(response)) {

				this.showMessage("No se obtuvo respuesta del servidor", this.typeMessage.error);
			}
			else {
				if (response.status == "-1") {
					this.showMessage("No hay conexión al servidor", this.typeMessage.error);
				}
				else {
					if (!response.data.isValid) {
						this.showMessage(response.data.message, this.typeMessage.error);
					}
					else {
						toReturn = true;
					}
				}
			}

			return toReturn;
		};

		return this;
	}
})();