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

	// pass an initial value or an options object your reduction function will have access to
	// you can also pass the inital value as opts.init
	// i set opts.first to the first item's 'prop'

	function Reducer (prop, reduction, _opts) {
		var reducer = function (rows) {
			check(rows);
			var first = get(rows[0], prop);
			console.log('first is ' + first);
			if (typeof _opts === 'undefined') {
				opts = {first: first, init: first};
			} else if (typeof _opts !== 'object') {
				opts = {first: first, init: _opts};
			} else if (typeof _opts.init === 'undefined' ) {
				opts = _opts;
				opts.first = first;
			}
			var reduced = opts.init;
			if (Array.isArray(rows)) {
				for (var i = 0; i < rows.length; i++) {
					reduced = reduction(prop, rows[i], reduced, opts);
				}
			} else {
				for (var key in rows) {
					reduced = reduction(prop, rows[key], reduced, opts);					
				}
			}
			return reduced;
		};
		reducer.over = reducer;
		return reducer;
	}

	function check(list) {
		if (!(Array.isArray(list) || typeof list === 'object'))
			throw new Error('Must iterate over an array or hash');
		// maybe run a schema check here too eventually
	}

	Tests = {
		// reductions take the form r(prop, row, reduced, opts)
		add: function(field, reduction, opts) {
			this[field] = function (prop) {
				return Reducer(prop, reduction, opts);
			}
		}
	 ,	max: function (prop) {
			return Reducer(prop, function (prop, row, max) {
				return Math.max(max, get(row, prop));
			});
		}
	  , min: function (prop) {
	  		return Reducer(prop, function (prop, row, min) {
	  			return Math.min(min, get(row, prop))
	  		});
	  	}
	  , consistent: function (prop) {
  			return Reducer(prop, function (prop, row, consistent, opts) {
  				if (opts.first !== get(row, prop))
  					return false;
  				else
  					return consistent;
  			}, true);
	  	}
	  , equals: function (prop, expect) {
	  		return Reducer(prop, function (prop, row, equal, opts) {
	  			if (opts.expect !== get(row, prop))
	  				return false;
	  			else
	  				return equal;
	  		}, {init: true, expect: expect});
	  	}
	  ,	exists: function (prop) {
	  		return Reducer(prop, function (prop, row, exists) {
	  			if (typeof get(row, prop) === 'undefined')
	  				return false;
	  			else
	  				return exists;
	  		}, true);
	  	}
	  ,	assigned: function (prop) {
	  		return Reducer(prop, function (prop, row, assigned) {
	  			if (typeof get(row, prop) === 'undefined' || get(row, prop) === null)
	  				return false;
	  			else
	  				return assigned;
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
		root['Testover'] = Tests;
	}
}).call(this);