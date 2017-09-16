// Spread in function calls
function myFunction(x, y, z) {}
var args = [0, 1, 2];
myFunction(...args);

function myFunction2(v, w, x, y, z) {
    console.log(...arguments);
    console.log(arguments);
}
var args = [0, 1];
myFunction2(-1, ...args, 2, ...[3]);

// use new with an array of parameters with spread syntax,
var dateFields = [1970, 0, 1];
var d = new Date(...dateFields);
console.log(d);

// use new with an array of parameters without spread syntax
function applyAndNew(constructor, args) {
    function partial() {
        return constructor.apply(this, args);
    }
    if (typeof constructor.prototype === 'object') {
        partial.prototype = Object.create(constructor.prototype);
    }
    return partial;
}

function myConstructor() {
    console.log("arguments.length: " + arguments.length);
    console.log(arguments);
    this.prop1 = 'val1';
    this.prop2 = 'val2';
}

var myArguments = ["hi", "how", "are", "you", "mr", null];
var myConstructorWithArguments = applyAndNew(myConstructor, myArguments);

console.log(new myConstructorWithArguments);
// (internal log of myConstructor):           arguments.length: 6
// (internal log of myConstructor):           ["hi", "how", "are", "you", "mr", null]
// (log of "new myConstructorWithArguments"): {prop1: "val1", prop2: "val2"}

// A more powerful array literal
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
console.log(lyrics);    // ["head", "shoulders", "knees", "and", "toes"]

// Copy an array
var arr = [1, 2, 3];
var arr2 = [...arr];
arr2.push(4);
console.log(arr2);      // [1, 2, 3, 4]
console.log(arr);       // [1, 2, 3]

// Spread syntax effectively goes one level deep while copying an array
// deep copy를 하지 않는다는 의미
var a = [[1], [2], [3]];        // Array는 Object이며 a는 참조값의 배열이다.
var b = [...a];                 // b는 a배열의 참조값을 그대로 받는다.

b.shift().shift();
console.log(b);         // [[2], [3]]
console.log(a);         // [[], [2], [3]]

// A better way to concatenate arrays
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
console.log(arr1.concat(arr2));     // [0, 1, 2, 3, 4, 5]
console.log(arr1);      // [0, 1, 2]

// With spread syntax this becomes:
console.log([...arr1, ...arr2]);    // [0, 1, 2, 3, 4, 5]

// Array.unshift
Array.prototype.unshift.apply(arr1, arr2);
console.log(arr1);     // [3, 4, 5, 0, 1, 2]

// With spread syntax this becomes:
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr2, ...arr1];
console.log(arr1);

// Spread in object literals(Rest/Spread Properties for ECMAScript proposal (stage 3))
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 43 };

var clonedObj = {...obj1};
console.log(clonedObj);     // {foo: "bar", x: 42}
var mergedObj = {...obj1, ...obj2 };
console.log(mergedObj);     // {foo: "baz", x: 42, y: 43}

// Spread syntax (other than in the case of spread properties)
// can be applied only to iterable objects:
var obj = {'key1': 'value1'};
// var array = [...obj]; // TypeError: obj is not iterable








































