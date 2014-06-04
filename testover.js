/*TestOver 
run useful tests on your arrays of objects*/

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

	function Iterator (prop, reduce, _variable) {
		var iterator = function (rows) {
			arrayWarn(rows);
			var variable = _variable || get(rows[0], prop);
			for (var i = 0; i < rows.length; i++) {
				variable = reduce(prop, variable, rows[i]);
			}
			return variable;
		};
		iterator.over = iterator;
		return iterator;
	}

	function Iterator_with_constant (prop, reduce, init, _constant) {
		var iterator = function (rows) {
			arrayWarn(rows);
			var constant = _constant || get(rows[0], prop);
			var ret = init;
			for (var i = 0; i < rows.length; i++) {
				ret = reduce(prop, constant, rows[i], ret);
			}
			return ret;
		};
		iterator.over = iterator;
		return iterator;
	}

	function arrayWarn(maybe) {
		if (!Array.isArray(maybe))
			throw new Error('Must iterate over an array');
			//....... for now!
	}

	Tests = {
		max: function (prop) {
			return Iterator(prop, function (prop, max, row) {
				return Math.max(max, get(row, prop));
			});
		}
	  , min: function (prop) {
	  		return Iterator(prop, function (prop, min, row) {
	  			return Math.min(min, get(row, prop))
	  		});
	  	}
	  , consistent: function (prop) {
  			return Iterator_with_constant(prop, function (prop, constant, row, ret) {
  				if (constant !== get(row, prop))
  					return false;
  				else
  					return ret;
  			}, true);
	  	}
	  , equals: function (prop, value) {
	  		return Iterator_with_constant(prop, function (prop, val, row, ret) {
	  			if (val !== get(row, prop))
	  				return false;
	  			else
	  				return ret;
	  		}, true, value);
	  	}
	  ,	exists: function (prop) {
	  		return Iterator(prop, function (prop, ret, row) {
	  			if (typeof get(row, prop) === 'undefined')
	  				return false;
	  			else
	  				return ret;
	  		}, true);
	  	}
	  ,	assigned: function (prop) {
	  		return Iterator(prop, function (prop, ret, row) {
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

	// (for equivalent use server-side or client-side)
	if (typeof exports !== 'undefined') {
    	if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Tests;
		}
		// exports.Testeth = Tests; // ???
	} else {
		root['Testeth'] = Tests;
	}
}).call(this);