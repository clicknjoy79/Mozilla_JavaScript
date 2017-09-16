a1 = true  && true       // t && t returns true
a2 = true  && false      // t && f returns false
a3 = false && true       // f && t returns false
a4 = false && (3 == 4)   // f && f returns false
a5 = 'Cat' && 'Dog'      // t && t returns "Dog"
a6 = false && 'Cat'      // f && t returns false
a7 = 'Cat' && false      // t && f returns false
a8 = ''    && false      // f && f returns ""
a9 = false && ''         // f && f returns false

// // Computed property names (ES2015)
var i = 0;
var a = {
    ['foo' + ++i]: i,
    ['foo' + ++i]: i,
    ['foo' + ++i]: i
};
console.log(a.foo1, a.foo2, a.foo3);    // 1  2  3

var param = 'size';
var config = {
    [param] : 12,
    ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};
console.log(config);       // {size: 12, mobileSize: 4}

// Spread properties(It copies own enumerable properties from a provided object onto a new object.)
var obj1 = {foo: 'bar', x: 42 };
var obj2 = {foo: 'baz', y: 43 };

var clonedObj = {...obj1};
console.log(clonedObj);     // {foo: 'bar', x: 42 }

var mergedObj = {...obj1, ...obj2};
console.log(mergedObj);     // {foo: "baz", x: 42, y: 43 }

// Prototype mutation(__proto__ 가 정의 되면 기존의 __proto__ 는 가려진다.)
var obj1 = {};
console.assert(Object.getPrototypeOf(obj1) === Object.prototype);

var obj2 = { __proto__: null };
console.assert(Object.getPrototypeOf(obj2) === null);
console.log(obj2.__proto__);    // undefined

var protoObj = {};
var obj3 = { __proto__ : protoObj };
console.assert(Object.getPrototypeOf(obj3) === protoObj);
console.log(obj3.__proto__);

var obj4 = { __proto__ : 'this is not an object or null' };  // 아무런 동작도 하지 않음
console.assert(Object.getPrototypeOf(obj4) === Object.prototype);
console.assert(!obj4.hasOwnProperty('__proto__'));

var __proto__ = 'variable';

var obj1 = {__proto__};
console.assert(Object.getPrototypeOf(obj1) === Object.prototype);
console.assert(obj1.hasOwnProperty('__proto__'));
console.assert(obj1.__proto__ === 'variable');

var obj2 = { __proto__() { return 'hello'; }};
console.assert(obj2.__proto__() === 'hello');
console.log(obj2.__proto__);

var obj3 = { ['__prot' + 'o__']: 17 };
console.assert(obj3.__proto__ === 17);



















































