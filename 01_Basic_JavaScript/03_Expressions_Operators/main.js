var foo = ['one', 'two', 'three'];

// without destructuring
var one   = foo[0];
var two   = foo[1];
var three = foo[2];

// with destructuring
var [one, two, three] = foo;

console.log(one);
console.log(two);
console.log(three);

// delte operator 해당 요소를 삭제
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
delete trees[3];
if (3 in trees) {   // key in object
    console.log('this is not reachable');
}
console.log(trees);     // 'redwood', 'bay', 'cedar', empty , 'maple'
console.log(trees.length);  // 5
console.log(trees[3]);      // undefined

var colors = ['red', 'orange', 'pink', 'blue'];
colors[2] = undefined;
if (2 in colors) {
    console.log('this is reachable');
}
console.log(colors);
console.log(colors.length);  // 4
console.log(colors[2]);      // undefined

// typeof operator
var myFun = new Function('5 + 2');
var shape = 'round';
var size = 1;
var foo = ['Apple', 'Mango', 'Orange'];
var today = new Date();

typeof myFun;       // returns "function"
typeof shape;       // returns "string"
typeof size;        // returns "number"
typeof foo;         // returns "object"
typeof today;       // returns "object"
typeof doesntExist; // returns "undefined"

typeof true; // returns "boolean"
typeof null; // returns "object"

// void operator : void (expression)    expression을 실행하지만 return 하지는 않는다.
/**
 * <a href="javascript:void(0)">Click here to do nothing</a>
 * 태그 클릭시 아무것도 하지 않음
 *
 * <a href="javascript:void(document.form.submit())">Click here to submit</a>
 * 태그 클릭시 form 을 submit 한다.
 */

// in operator
/**
 * propNameOrNumber in objectName
 * object 안에 해당 프로퍼티나 index 가 존재하는 경우 true를 리턴한다.
 */
// Arrays
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
console.log(0 in trees);        // returns true
console.log(3 in trees);        // returns true
console.log(6 in trees);        // returns false
console.log('bay' in trees);    // returns false (you must specify the index number,
                   // not the value at that index)
console.log('length' in trees); // returns true (length is an Array property)

// built-in objects
'PI' in Math;          // returns true
var myString = new String('coral');
'length' in myString;  // returns true

// Custom objects
var mycar = { make: 'Honda', model: 'Accord', year: 1998 };
'make' in mycar;  // returns true
'model' in mycar; // returns true

// spread operator
var parts = ['shoulder', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
console.log(lyrics);

function f(x, y, z) { console.log(x, y, z); }
var args = [0, 1, 2];
f(...args);




















































