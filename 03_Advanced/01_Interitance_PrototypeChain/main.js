var o = {a: 1};
o;      // 구조 분석해 볼것

// The newly created object o has Object.prototype as its [[Prototype]]
// o has no own property named 'hasOwnProperty'
// hasOwnProperty is an own property of Object.prototype.
// So o inherits hasOwnProperty from Object.prototype
// Object.prototype has null as its prototype.
// o ---> Object.prototype ---> null

var b = ['yo', 'whadup', '?'];
b;      // 구조 분석해 볼것

// Arrays inherit from Array.prototype
// (which has methods indexOf, forEach, etc.)
// The prototype chain looks like:
// b ---> Array.prototype ---> Object.prototype ---> null

var obj = {
    f: function () {
        return 2;
    }
};
obj;        // 구조 분석해 볼것

// Functions inherit from Function.prototype
// (which has methods call, bind, etc.)
// f ---> Function.prototype ---> Object.prototype ---> null
// 상속은 별게 없고 기존에 봤던 prototype base 상속을 간편하게 처리한 것
// Polygon을 Square 가 상속한다면
// Square.prototype = Object.create(Polygon.prototype) 이런식으로 구현..

'use strict'

class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

class Square extends Polygon {
    constructor(sideLength) {
        super(sideLength, sideLength);
        this.name = 'Square';
    }
    get area() {
        return this.height * this.width;
    }
    set sideLength(value) {
        this.height = value;
        this.width = value;
    }
}

var square = new Square(2);
console.log(square);
console.log(square.area);   // 4

square.sideLength = 4;
console.log(square.area);   // 16

class Rectangle {}

console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); // true

Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); // false
console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); // true

// static
// 스태틱 메소드 내부에서 다른 스태틱 메소드 호출시 this 를 사용해야 한다.
// 생성자나 비-스태틱 메소드에서 스태틱 메소드를 호출할 때는
// 클래스이름.스태틱 메소드 or this.constructor.스태틱 메소드 를 이용해야 한다.
class StaticMethodCall {
    constructor() {
        console.log(StaticMethodCall.staticMethod());
        console.log(this.constructor.anotherMethod());
    }

    static staticMethod() {
        return 'Static method has been called';
    }
    static anotherMethod() {
        return this.staticMethod() + ' from another static method';
    }
}
console.log(StaticMethodCall.staticMethod());    // Static method has been called
console.log(StaticMethodCall.anotherMethod());    // Static method has been called from another static method

new StaticMethodCall();    // Static method has been called
                           // Static method has been called from another static method

// Example
class Triple {
    static triple(n) {
        if (n === undefined) {
            n = 1;
        }
        return n * 3;
    }
}

class BiggerTriple extends Triple {
    static triple(n) {
        return super.triple(n) * super.triple(n);
    }
}

console.log(Triple.triple());   // 3
console.log(Triple.triple(6));  // 18

var tp = new Triple();

console.log(BiggerTriple.triple(3));    // 81
// console.log(tp.triple());   // tp.triple is not a function

//  extends with built-in objects
class myDate extends Date {
    constructor() {
        super();
    }

    getFormattedDate() {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return this.getDate() + '-' + months[this.getMonth()] + '-' + this.getFullYear();
    }
}

console.log(new myDate().getFormattedDate());   // 일-월-년

// Performance
function Graph() {
    this.vertices = [];
    this.edges = [];
}

Graph.prototype.addVertex = function(v) {
    this.vertices.push(v);
};


var g = new Graph();

console.log(g.hasOwnProperty('vertices'));
// true

console.log(g.hasOwnProperty('nope'));
// false

console.log(g.hasOwnProperty('addVertex'));
// false

console.log(g.__proto__.hasOwnProperty('addVertex'));
// true

// Bad practice: Extension of native prototypes
// backport는 개발된지 오래된 버전의 소프트웨어 위에 새로운 버전을 올려준다는 개념
// The only good reason for extending a built-in prototype is
// to backport the features of newer JavaScript engines, like Array.forEach.

function A(a) {
    this.varA = a;
}

A.prototype = {
    varA: null,     // not good
    doSomething: function() {
        console.log('doSomething called in A.prorotype');
    }
};

function B(a, b) {
    A.call(this, a);
    this.varB = b;
}
B.prototype = Object.create(A.prototype, {
    varB: {     // not good
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    doSomething: {
        value: function() {
            A.prototype.doSomething.apply(this, arguments); // call super
        },
        enumerable: true,
        configurable: true,
        writable: true
    }
});
B.prototype.constructor = B;

var b = new B(10, 20);
console.log(b.varA, b.varB);    // 10 20
b.doSomething();    // doSomething called in A.prorotype

// new A(); 의 동작 순서
// 새로운 메모리를 할당 => 메모리의 [[prototype]] (= __proto__)에
// A.prototype을 할당 => 메모리를 this로 해서 A에 넘김 ==> A에서 세팅
// ==> new 가 세팅된 메모리를 리턴턴
















































