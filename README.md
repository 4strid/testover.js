
TestOver
========

run useful tests on your arrays of arrays or objects


```js
var test = require('testover');

//Run your tests inline
test.max('length').over(someArray);

//or set up a testing function to call later
var samelength = test.equals('length');
samelength(someArray);
```
## Iterate over any property you want

```js
triplets: [
    {name: 'Joe', age: 20}
 ,  {name: 'Josie', age: 20}
 ,  {name: 'Johnny', age: 20}
]

test.consistent('age').over(triplets);
```

## Included tests

- max
- min
- equals
- consistent
- exists
- assigned

## License