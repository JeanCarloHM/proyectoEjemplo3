(() => {
	angular
		.module("Utils")
        .service("tmpDataService", tmpData);

	tmpData.$inject = ['$cookieStore'];

	function tmpData($cookieStore) {
		var globals = $cookieStore.get('globals') || {};

		var token = globals.token ? globals.token : 'pruebaToken';

		var data = new DataTmp(token);

		data.get();

		return data;
	}

	/**
	 * @description
	 * Clase que permite administrar el tmpData 'Service' a traves del localStorage
	 * 
	 */
	class DataTmp {
		/**
		 * @description
		 * Crea una instancia de la clase
		 * 
		 * @param {string} token 
		 */
		constructor(pToken) {
			DataTmp.prototype.token = pToken;
		}
	}

	DataTmp.prototype.get = Get;
	DataTmp.prototype.save = Save;
	DataTmp.prototype.clear = Clear;
	DataTmp.prototype.remove = Remove;

	/**
	 * @description
	 * Obtiene la información almacenada en el localStorage (utilizando el token) y la carga en el objeto
	 * 
	 */
	function Get() {
		try {
			if (IsDefinedAndNotEmpty(this.token)) {
				var obj = localStorage.getItem(this.token);

				if (obj) {
					obj = JSON.parse(obj);
					angular.merge(this, obj);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * @description
	 * Guarda la inforamción actual del objeto en el localStorage (utilizando el token)
	 * 
	 */
	function Save() {
		try {
			if (IsDefinedAndNotEmpty(this.token)) {
				var obj = JSON.stringify(this);
				localStorage.setItem(this.token, obj);
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	/**
	 * @description
	 * Limpia el objeto actual
	 * 
	 */
	function Clear() {
		try {
			for (var property in this) {
				if (this.hasOwnProperty(property)) {
					delete this[property];
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * @description
	 * Elimina el tmpData del localStorage
	 * 
	 */
	function Remove() {
		try {
			if (IsDefinedAndNotEmpty(this.token)) {
				localStorage.removeItem(this.token);
				this.clear();
			}
		} catch (error) {
			console.log(error);
		}
	}
})();