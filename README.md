
Test-Over
======================

run useful tests on your arrays or hashes of arrays or hashes

```js
var test = require('testover');

test.max('length').over(someArray); //run your tests inline

var samelength = test.equals('length'); //or set up a testing function to call later
samelength(someArray);
```
## Iterate over whatever property

```js
triplets: [
    {name: 'Joe', age: 20}
 ,  {name: 'Josie', age: 20}
 ,  {name: 'Johnny', age: 20}
]

test.consistent('age').over(triplets);
test.equals('age', 20).over(triplets);
```
## and over associative arrays

```js
assoc_triplets: {
    first: {name: 'Joe', age: 20}
 ,  second: {name: 'Josie', age: 20}
 ,  third: {name: 'Johnny', age: 20}
}

test.consistent('age').over(assoc_triplets);
test.equals('age', 20).over(assoc_triplets);
```
## Included tests

- **max**: biggest numerical value
- **min**: smallest numerical value
- **equals**: if all values equal a specified value
- **consistent**: if all values equal an unspecified value
- **exists**: if a property exists (but might be null)
- **assigned**: if a property *actually* exists
- **unique**: if all values are unique

## Add your own tests
The underlying process is essentially a fancy *reduce* function. With this in mind you can add your own reductions to do **even more testing**.

#### Usage
tests.add(* *<*field name>*, * *<*reduction function>*, * *<*options object>*)

#### Reduction functions
Reductions take the form `r(property, row, reduced, opts)` where
`property` is the property passed to the new test
`row` is the object or array currently being tested
`reduced` is the variable being reduced (the variable that will be returned)
`opts` is an object with extra goodies you can pass between iterations of your reduction

You can assign an initial value by assigning `opts.init` when you add the new reduction, otherwise `opts.init` and `opts.first` are assigned to the first list item's value.
#### Example
```js
test.add('noConsecutiveRepeats', function(prop, row, repeats, opts) {
	var current = row[prop];
	if (current === opts.previous) {
		return false
	} else {
		opts.previous = current;
		return repeats;
	}
}, {init: true, previous: null});

test.noConsecutiveRepeats('property').over(array);
```

## License
MIT