var myCar = new Object();
myCar.make = 'Ford';
myCar.model = 'Mustang';
myCar.year = 1969;

console.log(myCar.color); // undefined  not null

// Objects are sometimes called associative arrays
console.log(myCar['make']);     // Ford
console.log(myCar['model']);    // Mustang
console.log(myCar['year']);     // 1969

/**
 * Property 이름이 identifier 형식을 따른다면 . [] 모두 사용 가능하나, 형식을 따르지 않는 경우에는 [] 만 사용가능하다.
 */
var myObj = new Object(),
    str = 'myString',
    rand = Math.random(),
    obj = new Object();

myObj.type                  = 'Dot syntax';
myObj['data created']       = 'String with space';
myObj[str]                  = 'String value';
myObj[rand]                 = 'Random Number';
myObj[obj]                  = 'Object';     // obj.toString() 을 property로 사용
myObj['']                   = 'Even an empty string';

console.log(myObj);

function showProps(obj, objName) {
    var result = '';
    for (var i in obj) {
        // prototype chain에 있는 properties 들은 제외한다.
        if (obj.hasOwnProperty(i)) {
            result += objName + '.' + i + ' = ' + obj[i] + '\n';
        }
    }
    return result;
}

console.log(showProps(myCar, 'myCar'));
// myCar.make = Ford
// myCar.model = Mustang
// myCar.year = 1969

/**
 * Enumerate the properties of an object
 *
 * 1. for...in loops
 * 모든 properties를 검색(prototype chain 포함)
 *
 * 2. Object.keys(o)
 * 프로토 타입 체인을 제외한 own property 배열을 리턴한다.(enumerable)
 *
 * 3. Object.getOwnPropertyNames(o)
 * 프로토 타입 체인을 제외한 own property 배열을 리턴한다.(enumerable or not)
 */

// ECMAScript 5 이전에는 오브젝트의 모든 프로퍼티를 검색할 수 있는 방법이 없었다.
// 지금은 아래와 같이 하면 접근 가능하다.
// This can be useful to reveal "hidden" properties
// (properties in the prototype chain which are not accessible through the object,
// because another property has the same name earlier in the prototype chain).

function listAllProperties(o) {
    var objectToInspect;
    var result = [];

    for (objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)) {
        result = result.concat(Object.getOwnPropertyNames(objectToInspect))
    }
    return result;
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Teacher(name, age, subject) {
    Person.call(this, name, age);
    this.subject = subject;
}
Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;

var teacher = new Teacher('Chris', 34, 'Math');
console.log(listAllProperties(teacher));

// Using the Object.create method
var Animal = {
    type: 'Invertebrates',
    displayType: function () {
        console.log(this.type);
    }
}

var animal1 = Object.create(Animal);
animal1.displayType();  // Invertebrates

var fish = Object.create(Animal);
fish.type = 'Fishes';
fish.displayType(); // Fishes

// 폼 태그 내부 태그에서 this.form은 폼 태그를 의미한다.

/**
 * getter, setter 설정 방법
 * 1. Object literal 사용
 * 2. Object.defineProperty[ies] 사용
 */
// Object literal 사용
var o = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2;
    }
};

console.log(o.a);   // 7
console.log(o.b);   // 8
o.c = 50;
console.log(o.a);   // 25

// Object.defineProperty(obj, property_name, descriptor) 사용
// Date 에 year property 설정하기
var d = Date.prototype;
Object.defineProperty(d, 'year', {
    get: function() { return this.getFullYear(); },
    set: function(y) { this.setFullYear(y); }
});

var now = new Date();
console.log(now.year);  // 2017
now.year = 2019;
console.log(now);   // ex> Thu Sep 12 2019 12:19:40 GMT+0900 (대한민국 표준시)

var o = { a: 0 };

Object.defineProperties(o, {
    'b': { get: function() { return this.a + 1; }},
    'c': { set: function(x) { this.a = x / 2; }}
});

o.c = 10;   // Runs the setter, which assigns 10 / 2(5) to the 'a' property
console.log(o.b) // Run the getter, which yields  a + 1(6)






















