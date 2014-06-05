/*TestOver 
run useful tests on your arrays or hashes*/

(function () {

	// polyfills, boilerplate
	if(!Array.isArray) {
	  Array.isArray = function(arg) {
	    return Object.prototype.toString.call(arg) === '[object Array]';
	  };
	}
	var root = this;

	/* by shifting property reading up into 'get()', we can use the same
	functions for arrays of Arrays and arrays of Objects, nice!*/
	function get (target, prop) {
		if (Array.isArray(target) && prop === 'length') {
			return target.length;
		} else
			return target[prop];
	}

	function Reducer (prop, reduce, _init) {
		var iterator = function (rows) {
			check(rows);
			var reduced = _init || get(rows[0], prop);
			if (Array.isArray(rows)) {
				for (var i = 0; i < rows.length; i++) {
					reduced = reduce(prop, reduced, rows[i]);
				}
			} else {
				for (var key in rows) {
					reduced = reduce(prop, reduced, rows[key]);					
				}
			}

			return reduced;
		};
		iterator.over = iterator;
		return iterator;
	}

	function Reducer_with_constant (prop, reduce, init, _constant) {
		var iterator = function (rows) {
			check(rows);
			var constant = _constant || get(rows[0], prop);
			var reduced = init;
			if (Array.isArray(rows)) {
				for (var i = 0; i < rows.length; i++) {
					reduced = reduce(prop, reduced, rows[i]);
				}
			} else {
				for (var key in rows) {
					reduced = reduce(prop, reduced, rows[key]);					
				}
			}
			return reduced;
		};
		iterator.over = iterator;
		return iterator;
	}

	function check(list) {
		if (!(Array.isArray(list) || typeof list === 'object'))
			throw new Error('Must iterate over an array or hash');
		// maybe run a schema check here too eventually
	}

	Tests = {
		// add functions of form f(prop, row, reduced, opts)
		add: function(field, reduction) {
			this[field] = 'this will be a function'
		}
	 ,	max: function (prop) {
			return Reducer(prop, function (prop, max, row) {
				return Math.max(max, get(row, prop));
			});
		}
	  , min: function (prop) {
	  		return Reducer(prop, function (prop, min, row) {
	  			return Math.min(min, get(row, prop))
	  		});
	  	}
	  , consistent: function (prop) {
  			return Reducer_with_constant(prop, function (prop, constant, row, ret) {
  				if (constant !== get(row, prop))
  					return false;
  				else
  					return ret;
  			}, true);
	  	}
	  , equals: function (prop, value) {
	  		return Reducer_with_constant(prop, function (prop, val, row, ret) {
	  			if (val !== get(row, prop))
	  				return false;
	  			else
	  				return ret;
	  		}, true, value);
	  	}
	  ,	exists: function (prop) {
	  		return Reducer(prop, function (prop, ret, row) {
	  			if (typeof get(row, prop) === 'undefined')
	  				return false;
	  			else
	  				return ret;
	  		}, true);
	  	}
	  ,	assigned: function (prop) {
	  		return Reducer(prop, function (prop, ret, row) {
	  			if (typeof get(row, prop) === 'undefined' || get(row, prop) === null)
	  				return false;
	  			else
	  				return ret;
	  		}, true);
	  	}
	  , Schema: function (schema) {
	  		if (typeof schema === 'undefined') { // implicitly use 1st object to test others
	  			this.consistent = function (list) {
	  				// check list for object consistency
	  			}
	  			return this;
	  		} else {

	  		}
	  	}
	}
/*	Tests.prototype.add = function (name, reduction) {
		this[name] = reduction;
	}*/

	// (for equivalent use server-side or client-side)
	if (typeof exports !== 'undefined') {
    	if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Tests;
		}
		// exports.Testeth = Tests; // ???
	} else {
		root['Testover'] = Tests;
	}
}).call(this);