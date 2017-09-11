var arr = [42];      // Creates an array with only one element:
                     // the number 42.

var arr = Array(42); // Creates an array with no elements
                     // and arr.length set to 42; this is
                     // equivalent to:
var arr = [];
arr.length = 42;

var arr = [];
arr[3.4] = 'Oranges';
console.log(arr.length);    //0
console.log(arr.hasOwnProperty(3.4));   // true

var arr = ['one', 'two', 'three'];
console.log(arr[2]);  // three
console.log(arr['length']);  // 3

var cats = ['Dusty', 'Misty', 'Twiggy'];
console.log(cats.length);   // 3

cats.length = 2;
console.log(cats);  // logs "Dusty, Misty" - Twiggy has been removed
cats.length = 0;
console.log(cats); // logs nothing; the cats array is empty
cats.length = 3;
console.log(cats); // [empty, empty, empty]

var colors = ['red', 'green', 'blue'];
colors.forEach(function(color) {
   console.log(color);
});

var array = ['first', 'second', , 'fourth'];
array.forEach(function(element) {
   console.log(element);    // first second fourth : forEach의 경우 엘리먼트의 값을 지정하지 않으면 루핑에서 제외된다.
});

if (array[2] === undefined) console.log('array[2] is undefined');

var array = ['first', 'second', undefined, 'fourth'];
array.forEach(function(elem) {
   console.log(elem);
});

// for in loop의 경우 모든 properties를 iterate 하므로 배열에서는 쓰지 말자
array.type = 'array';
for (var prop in array) console.log(array[prop]);

// pop == shift, push = unshift 서로 대칭적 의미
// slice(start_index, last_index + 1)
// splice(start_index, count_to_remove, addElement1, addElement2, ...)
var myArr = new Array('1', '2', '3', '4', '5');
console.log(myArr.splice(1, 3, 'a', 'b', 'c', 'd'));    // 2, 3, 4
console.log(myArr);     // 1, a, b, c, d, 5

var myArr = ['1', '2', '3'];
myArr.reverse();
console.log(myArr);     // 3, 2, 1

var myArr = ['Wind', 'Rain', 'Fire'];
myArr.sort();
console.log(myArr);     // Fire, Rain, Wind

var sortFn = function(a, b) {
    if (a[a.length - 1] < b[b.length - 1]) return -1;
    if (a[a.length - 1] > b[b.length - 1]) return 1;
    if (a[a.length - 1] === b[b.length - 1]) return 0;
}
myArr.sort(sortFn);
console.log(myArr);     // Wind, Fire, Rain

// indexOf(searchElement[, fromIndex])
var a = ['a', 'b', 'a', 'b', 'a'];
console.log(a.indexOf('b'));    // 1
console.log(a.indexOf('b', 2)); // 3
console.log(a.indexOf('z')); // -1

// lastIndexOf(searchElement[, fromIndex])  fromIndex: 해당 인덱스에서 뒤로 검색
var a = ['a', 'b', 'c', 'd', 'a', 'b'];
console.log(a.lastIndexOf('b')); // logs 5
// Now try again, starting from index 4 backward
console.log(a.lastIndexOf('b', 4)); // logs 1
console.log(a.lastIndexOf('z')); // logs -1

// forEach(callback[, thisObject]) executes callback on every array item. thisObject passed to callback as this
var a = ['a', 'b', 'c'];
var temp = 't';
a.forEach(function (elem) {
    console.log(elem);  // a, b, c
    console.log(this);  // t   this === temp
}, temp);

// map(callback[, thisObject]) : thisObject 위와 동일. 새로운 Array를 리턴한다.
var a = ['a', 'b', 'c'];
var a1 = a.map(function(elem) {
    return elem.toUpperCase() + this.toUpperCase();
}, temp);
console.log(a1);    // AT, BT, CT

// filter(callback[, thisObject]) : thisObject 위와 동일. 새로운 Array를 리턴한다.
var a = ['a', 10, 'b', 20, 'c', 30];
var a2 = a.filter((e) => typeof(e) === 'number');
console.log(a2);

// every(callback[, thisObject])    // 콜백이 배열의 모든 아이템에 대해 true인 경우 true를 리턴
function isNumber(value) {
    return typeof value === 'number';
}
var a1 = [1, 2, 3];
console.log(a1.every(isNumber));    // true

// some(callback[, thisObject])     // 콜백이 배열의 아이템에 대해 true인 경우가 있는 경우 true를 리턴
var a1 = [1, 2, 3];
console.log(a1.some(isNumber));     // true
var a2 = [1, '2', 3];
console.log(a2.some(isNumber));     // true
var a3 = ['1', '2', '3'];
console.log(a3.some(isNumber));     // false

// reduce(callback[, initialValue])
var a = [10, 20, 30];
var total = a.reduce((a, b) => a + b, 40);
console.log(total); // 100

/**
 * Some JavaScript objects, such as the NodeList returned by document.getElementsByTagName()
 * or the arguments object made available within the body of a function,
 * look and behave like arrays on the surface but do not share all of their methods.
 * The arguments object provides a length attribute but does not implement the forEach() method, for example.
 */
function printArguments(arguments) {
    Array.prototype.forEach.call(arguments, (a) => console.log(a));
}

function f(a, b, c) {
    printArguments(arguments);
}
f('one', 'two', 'three');   // one, two, three

Array.prototype.forEach.call('a string', function(chr) {
    console.log(chr);
});

// 간단히 볼 것....
var buffer = new ArrayBuffer(16);   // 16 byte 버퍼 생성
var int32View = new Int32Array(buffer);     // 버퍼에 있는 데이터를 Array처럼 다룰 수 있는 뷰 생성(4 byte 뷰)
for (var i = 0; i < int32View.length; i++) {
    int32View[i] = i * 2;   // 메모리에 값을 할당
}

var int16View = new Int16Array(buffer);
for (var i = 0; i < int16View.length; i++) {
    console.log('Entry ' + i + ' : ' +  int16View[i]);   // 버퍼에 있는 데이터를 16-bit integer로 반환한다.
}

int16View[0] = 32;
console.log('Entry 0 in the 32-bit array is now ' + int32View[0]);






































