var Tests = require('./testeth');
var colors = require('colors');

function assert (expect, actually) {
	var text = 'expected ' + expect + ', actually ' + actually;
	if (expect === actually)
		console.log(text.green);
	else
		console.log(text.red);
}
// using created Test object
function test_ (expect, func, property, arg) {
	console.log('testing function "' + func + '" using ' + arg);
	var Test = Tests[func](property);
	var	result = Test(Args[arg]);
	var	text = 'Expected ' + expect + ', actually ' + result;
	if (expect === result)
		console.log(text.green);
	else
		console.log(text.red);
}
// using inline .over() functionality
function test (expect, func, property, arg) {
	console.log('testing function "' + func + '" using ' + arg);
	var result = Tests[func](property).over(Args[arg])
	var	text = 'Expected ' + expect + ', actually ' + result;
	if (expect === result)
		console.log(text.green);
	else
		console.log(text.red);
}

var Args = {
	identical_arrays: [[1,2,3],[1,2,3],[1,2,3]]
 ,	arrays_of_increasing_length: [[1],[2,3],[4,5,6],[7,8,9,0]]
 ,	arrays_of_decreasing_length: [[1,1,1,1],[1,1,1],[1,1],[1]]
 ,	arrays_no_particular_order: ['hello','foo','fubar','foobaz']
 ,	array_of_people: [
 		{name: 'Joe', age: 20, sex: 'Male'}
 	 ,	{name: 'Sally', age: 18, sex: 'Female'}
 	 ,	{name: 'Teddy R.', age: 155, sex: 'Male'}
 	 ,	{name: 'Macklemore', age: 30, sex: 'Male'}
	]
 ,	array_of_girls: [
 		{name: 'Sally', age: 18, sex: 'Female'}
 	 ,	{name: 'Georgia', age: 50, sex: 'Female'}
 	 ,	{name: 'Astrid', age: 14, sex: 'Female'}
 	]
 ,	array_of_triplets: [
 		{name: 'Joe', age: 20, sex: 'Male'}
 	 ,	{name: 'Josie', age: 20, sex: 'Female'}
 	 ,	{name: 'Johnny', age: 20, sex: 'Male'}
	]	
}

test(3, 'max', 'length', 'identical_arrays');
test(4, 'max', 'length', 'arrays_of_increasing_length');
test(4, 'max', 'length', 'arrays_of_decreasing_length');
test(6, 'max', 'length', 'arrays_no_particular_order');
console.log();
test(3, 'min', 'length', 'identical_arrays');
test(1, 'min', 'length', 'arrays_of_increasing_length');
test(1, 'min', 'length', 'arrays_of_decreasing_length');
test(3, 'min', 'length', 'arrays_no_particular_order');
console.log();
test(true, 'consistent', 'length', 'identical_arrays');
test(false, 'consistent', 'length', 'arrays_of_decreasing_length');
test(false, 'consistent', 'length', 'arrays_of_increasing_length');
test(false, 'consistent', 'length', 'arrays_no_particular_order');
console.log('\nGonna try equals now, but it takes 2 arguments so we\'re doing some "manual overriding"');
assert(true, Tests.equals('length', 3).over(Args.identical_arrays));
assert(false, Tests.equals('length', 3).over(Args.arrays_no_particular_order));
console.log(); //let's do some objects
test(155, 'max','age','array_of_people');
test(18, 'min', 'age','array_of_people');
test(false, 'consistent', 'age', 'array_of_people');
console.log('testing Equals(20) over array_of_triplets')
assert(true, Tests.equals('age', 20).over(Args.array_of_triplets));
test(true, 'consistent', 'sex', 'array_of_girls');