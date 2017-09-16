parseInt('123', 10); // 123
parseInt('010', 10); // 10
console.log(parseInt('010'));    // 10
console.log(parseInt('010', 8));    // 8
parseInt('11', 2); // 3

// + '42';   // 42
// + '010';  // 10
// + '0x10'; // 16

// isNaN(NaN); // true

// 1 / 0; //  Infinity
// -1 / 0; // -Infinity

console.log(parseInt('10.2abc'));   // 10
console.log(parseFloat('10.2abc'));   // 10.2

// 자바스크립트에서 String 은 유니코드로 매핑한 뒤 이를 다시 UTF-16 으로 변환해서 메모리에 저장한다.
// console.log(a);     // Reference Error
let a;
console.log(a);     // undefined

// false, 0, empty strings (""), NaN, null, and undefined all become false.
// All other values become true.

// myLetVariable is *not* visible out here
for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
    // myLetVariable is only visible in here
}
// myLetVariable is *not* visible out here

// myVarVariable *is* visible out here
for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) {
    // myVarVariable is visible to the whole function
}
// myVarVariable *is* visible out here

// An important difference between JavaScript and other languages like Java is
// that in JavaScript, blocks do not have scope; only functions have scope.

// short-circuit logic
// var o;
// var name = o && o.getName();
console.log(name);      // undefined
var cachedName;
var name = cachedName || (cachedName = 'Chris');
console.log(name);      // Chris

// forEach() : ECMAScript 5 추가됨
['dog', 'cat', 'hen'].forEach(function(currentValue, index, array) {
    console.log(currentValue, index, array[index]);     // dog 0 dog
});                                                     // cat 1 cat
                                                        // hen 2 hen

function add(x, y) {
    var total = x + y;
    return total;
}

console.log(add());     // undefined + undefined ==> NaN
console.log(add(2, 3, 4));  // 5

function addNum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
console.log(addNum(2, 3, 4, 5)); // 14

// Using Rest parameter
function avg(...args) {
    var sum = 0;
    for (let value of args) {
        sum += value;
    }
    return sum / args.length;
}
console.log(avg(2, 3, 4 ,5));       // 3.5

// Function.prototype.apply 적용
console.log(avg.apply(null, [2, 3, 4, 5]));     // 3.5

// Fuction call recursively
// 노드에 있는 텍스트 수를 모두 계산
function countChars(elm) {
    if (elm.nodeType === Node.TEXT_NODE) {
        return elm.nodeValue.length;
    }
    var count = 0;
    for (var i = 0, child; child = elm.childNodes[i]; i++) {
        count += countChars(child);
    }
    return count;
}
// 왜 25가 나오는 지 디버거로 한번 따라가 보면 족하다.
console.log(countChars(document.body));     // 25: body 에 있는 텍스트 숫자

// 바디에 있는 텍스트 숫자
var charsInBody = (function counter(elm) {
    if (elm.nodeType === Node.TEXT_NODE) {
        return elm.nodeValue.length;
    }
    var count = 0;
    for (var i = 0, child; child = elm.childNodes[i]; i++) {
        count += counter(child);
    }
    return count;
})(document.body);
console.log(charsInBody);   //  25

// JavaScript uses functions as classes
// If you called function using dot notation or bracket notation on an object,
// that object becomes this.
// If dot notation wasn't used for the call, this refers to the global object.
function makePerson(first, last) {
    return {
        first: first,
        last: last,
        fullName: function() {      // 메서드
            return this.first + ' ' + this.last;
        },
        fullNameReversed: function () {     // 메서드
            return this.last + ', ' + this.first;

        }
    };
}

s = makePerson('Simon', 'Willison');
console.log(s.fullName());           // Simon Willison
console.log(s.fullNameReversed());   // Willison, Simon

s = makePerson('Simon', 'Willison');
var fullName = s.fullName;
// When we call fullName() alone, without using s.fullName(),
// this is bound to the global object.
// Since there are no global variables called first or last we get undefined for each one.
console.log(fullName()); // this.first(undefined), this.last(undefined)

// new is strongly related to this. It creates a brand new empty object,        // new 키워드는 this 키워드와 매우 관계가 깊다. new 는 새로운 빈 객체를 생성하며
// and then calls the function specified, with this set to that new object.     // 이어서 함수를 호출하는 데 이때 생성된 빈 객체를 this로 함수에 넘겨준다.
// Notice though that the function specified with this does not return a value  // 함수 자체는 객체를 세팅하지만 특별한 값을 리턴하지는 않는다.
// but merely modifies the this object.
// It's new that returns the this object to the calling site.                   // 세팅된 객체는 new 가 최종적으로 리턴한다.
// Functions that are designed to be called by new are called constructor functions.    // new 에 의해 호출되는 함수를 생성자 함수라고 한다.

// 아래 생성자 함수의 문제는 객체를 생성할 때마다
// 함수 역시 새로 생성되어 세팅된다. 객체마다 함수 reference가 다르다. 문제가 있음
function Person(first, last) {
    this.first = first;
    this.last = last;
    this.fullName = function() {
        return this.first + ' ' + this.last;
    };
    this.fullNameReversed = function() {
        return this.last + ', ' + this.first;
    };
}

// 이렇게 바꾸어 보자. 약간은 낫다.
// 함수를 한번만 생성해서 reference를 할당하기 때문...
// 좀 더 나은 방법은 없을까?
function personFullName() {
    return this.first + ' ' + this.last;
}
function personFullNameReversed() {
    return this.last + ' ' + this.first;
}
function Person(first, last) {
    this.first = first;
    this.last = last;
    this.fullName = personFullName;
    this.fullNameReversed = personFullNameReversed;
}

// 이 방법이 가장 낫다.
// Person.prototype 은 모든 Person 인스턴스가 공유하는 객체이므로 한번의 정의로 족하다.
function Person(first, last) {
    this.first = first;
    this.last = last;
}
Person.prototype.fullName = function() {
    return this.first + ' ' + this.last;
}
Person.prototype.fullNameReversed = function() {
    return this.last + ', ' + this.first;
}
// This is an incredibly powerful tool.
// JavaScript lets you modify something's prototype at any time in your program,
// which means you can add extra methods to existing objects at runtime:
s = new Person('Simon', 'Willison');
// s.firstNameCaps(); // TypeError on line 1: s.firstNameCaps is not a function

Person.prototype.firstNameCaps = function firstNameCaps() {
    return this.first.toUpperCase();
};
console.log(s.firstNameCaps()); // "SIMON"

var s = 'Simon';
// s.reversed();   // TypeError on line 1: s.reversed is not a function

String.prototype.reversed = function reversed() {
    var r = '';
    for (var i = this.length - 1; i >=0; i--) {
        r += this[i];
    }
    return r;
};
console.log(s.reversed());      // nomiS
console.log('This can now be reversed'.reversed()); // desrever eb won nac sihT

// 프로토 타입 체인의 끝에는 Object.prototype 이 존재한다.
// 여기에 toString 메서드가 존재한다.
var s = new Person('Simon', 'Willison');
console.log(s);     // [object Object]

// Override
Person.prototype.toString = function () {
    return '<Person: ' + this.fullName() + '>';
}

console.log(s.toString());

// here's a trivial implementation of new:
// This isn't an exact replica of new
// as it doesn't set up the prototype chain
function trivialNew(constructor, ...args) {
    var o = {};
    constructor.apply(o, args);
    return o;
}

// 따라서 아래의 두 개는 서로 완전히 동일하지는 않지만 유사하다.
var bill = trivialNew(Person, 'William', 'Orange');
var bill = new Person('William', 'Orange');

// apply는 call과 유사하며 둘의 차이는 args를 배열로 받는가 아닌가에 있다.
function lastNameCaps() {
    return this.last.toUpperCase();
}
var s = new Person('Simon', 'Willison');
console.log(lastNameCaps.call(s));       // WILLISON
// Is the same as:
s.lastNameCaps = lastNameCaps;
console.log(s.lastNameCaps());          // WILLISON

// Inner functions:
// 자바 스크립트는 함수 내부에서 함수를 선언할 수 있다.
// An important detail of nested functions in JavaScript is
// that they can access variables in their parent function's scope:
// This keeps the number of functions that are in the global scope down,
// which is always a good thing.    글로벌 함수를 줄여준다는 말말

// Closures:
function makeAdder(a) {
    return function(b) {
        return a + b;
    };
}
var x = makeAdder(5);
var y = makeAdder(20);
console.log(x(6));   // 11
console.log(y(7));   // 27
// the outer function has returned, and
// hence common sense would seem to dictate that its local variables(a) no longer exist.
// But they do still exist
// Whenever JavaScript executes a function, a 'scope' object is created
// to hold the local variables created within that function.
// firstly, a brand new scope object is created every time
// a function starts executing, and
// secondly, unlike the global object (which is accessible as this and in browsers as window)
// these scope objects cannot be directly accessed from your JavaScript code.
// 함수는 실행될 때마다 서로 다른 Scope Object(Closure)를 생성한다.
// So when makeAdder() is called, a scope object(closure) is created with one property: a,
// which is the argument passed to the makeAdder() function.
// Normally JavaScript's garbage collector would clean up the scope object created for makeAdder() at this point,
// but the returned function maintains a reference back to that scope object.
// As a result, the scope object(closure) will not be garbage-collected
// until there are no more references to the function object that makeAdder() returned.

// Example 1
var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
    // Local variable that ends up within closure
    var num = 42;
    // Store some references to functions as global variables
    gLogNumber = function() { console.log(num); }
    gIncreaseNumber = function() { num++; }
    gSetNumber = function(x) { num = x; }
}

setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();
gLogNumber(); // 42

oldLog() // 5
// The three functions have shared access to the same closure —
// the local variables of setupSomeGlobals() when the three functions were defined.
// if you call setupSomeGlobals() again, then a new closure (stack-frame!) is created.


// Example 2
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        result.push(function() { console.log(item + ' ' + list[i]); });
    }
    return result;
}
function testList() {
    var fnlist = buildList([1, 2, 3]);
    // Using j only to help prevent confusion -- could use i.
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}
testList(); // logs 'item2 undefined' three times
// there is only one closure for the local variables for buildList.
// 세 개의 익명 함수는 하나의 클로저를 공유한다.(reference to one closure)
// 클로저 내부에는 i, item 에 대한 reference가 저장되어 있다.

// Final Example
function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1, 2, 3];
    var ref = someRef;
    return function(x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
        '; anArray: ' + anArray.toString() +
        '; ref.someVar: ' + ref.someVar + ';');
    };
}
obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1);     // num: 5;  anArray: 1, 2, 3, 5; ref.someVar: 4;
fn2(1);     // num: 6;  anArray: 1, 2, 3, 6; ref.someVar: 4;
obj.someVar++;
fn1(2);     // num: 7;  anArray: 1, 2, 3, 5, 7; ref.someVar: 5;
fn2(2);     // num: 8;  anArray: 1, 2, 3, 6, 8; ref.someVar: 5;

// Final Points
// 1.
// When you use new Function(…) (the Function constructor)
// inside a function, it does not create a closure.
// (The new function cannot reference the local variables of the outer function.)
// 2.
// It is probably best to think that a closure is always created
// just an entry to a function, and the local variables are added to that closure.




