// this is not good
bla = 2;
var bla;

// it is recommended to always declare variables at the top of their scope
console.log(bla);  // 2

function do_something() {
    console.log(bar);   // undefined  호이스팅이 발생하는 경우에는 초기화는 이루어지지 않는다.
    var bar = 111;
    console.log(bar);   // 111
}
do_something();


var x = y, y = 'A';  // x = y 구문 실행시 y 역시 호이스팅이 적용되어 존재는 하나 'A'로 초기화 되어 있지는 않음
console.log(x + y);  // undefinedA

/***************************************************/

var x = 0;  // x is declared global, then assigned a value of 0

console.log(typeof z); // undefined, since z doesn't exist yet

function a() { // when a is called,
    var k = 2;   // y is declared local to function a, then assigned a value of 2

    console.log(x, k);   // 0 2

    function b() {       // when b is called
        x = 3;  // assigns 3 to existing global x, doesn't create a new global var
        k = 4;  // assigns 4 to existing outer k, doesn't create a new global var
        z = 5;  // creates a new global variable z and assigns a value of 5.
    }         // (Throws a ReferenceError in strict mode.)

    b();     // calling b creates z as a global variable
    console.log(x, k, z);  // 3 4 5
}

a();                   // calling a also calls b
console.log(x, z);     // 3 5
console.log(typeof k); // undefined as k is local to function a

/*************************************************************************************************/

function varTest() {
    var x = 1;
    if (true) {
        var x = 2;  // same variable!
        console.log('varTest: ' + x);  // 2
    }
    console.log('varTest: ' + x);  // 2
}
varTest();

function letTest() {
    let x = 1;
    if (true) {
        let x = 2;  // different variable
        console.log('letTest: ' + x);  // 2
    }
    console.log('letTest: ' + x);  // 1
}
letTest();

/*************************************************************************************************/

var list = document.getElementById('list');

for (let i = 1; i <= 5; i++) {      // var 로 변경하고 실행하면 제대로 동작 X
    let item = document.createElement('li');
    item.appendChild(document.createTextNode('Item: ' + i));

    item.onclick = function () {
        console.log('Item ' + i + ' clicked');
    }
    list.appendChild(item);
}

// to achieve the same effect with 'var'
// you have to create a different context
// using a closure to preserve the value
for (var i = 1; i <= 5; i++) {
    var item = document.createElement('li');
    item.appendChild(document.createTextNode('Item ' + i));

    (function(i){
        item.onclick = function(ev) {
            console.log('Item ' + i + ' is clicked.');
        };
    })(i);
    list.appendChild(item);
}
/**
 * 클로저에 대한 나름의 정리
 * 1. 함수가 선언이 되면 함수에 대한 클로저가 만들어 진다.(클로저를 컨테이너라고 생각하자)
 * 2. 해당 클로저 안에는 함수 선언 당시, 함수에서 접근할 수 있는 "var 로 선언된 '외부 변수'의 레퍼런스"들이 저장된다.
 * 3. 함수 내부에 선언된 변수(직접 접근 가능)는 클로저에 저장하지 않는다.
 * 4. 위에서 let 대신 var 를 선언하는 경우에는 이벤트 핸들러(함수)에서 클로저를 생성한 후 i의 레퍼런스를 저장한다.
 * 5. 차후에 함수가 실행되면 클로저에서 i 값을 참조하게 된다. 따라서 i 가 항상 6 이 된다
 * 6. 하지만 let 으로 선언된 외부 변수의 경우에는 지역변수처럼 사용하는 것으로 추정된다....
 * 7. 가장 중요한 점 Windows Explorer에서 let 인식 X ==> 결국 못써먹음?????
 */

/*************************************************************************************************/
/**
 * 프로그램 최상단에 var로 선언하면 글로벌 변수(window)로 등록되지만 let 으로 선언하면 글로벌로 등록되지 않는다.
 */
var a = 'global';
let b = 'global';
console.log('a: ' + this.a); // "global"  === > this 는 window를 의미한다.
console.log('b: ' + this.b); // undefined

/*************************************************************************************************/

var Thing;
{
    let privateScope = new WeakMap();       // garbage collection 문제를 해결한 Map.....
    let counter = 0;

    Thing = function (name) {
        this.someProperty = name;

        privateScope.set(this, { hidden: ++counter });
    }

    Thing.prototype.showPublic = function () {
        return this.someProperty;
    }

    Thing.prototype.showPrivate = function () {
        return privateScope.get(this);
    }
}

console.log(typeof privateScope);   // undefined

var thing1 = new Thing('foo');
console.log(thing1.showPublic());
console.log(thing1.showPrivate());

var thing2 = new Thing('bar');
console.log(thing2.showPublic());
console.log(thing2.showPrivate());

/*************************************************************************************************/

function test(){
    var foo = 33;
    if (true) {
        // let foo = (foo + 55); // ReferenceError.
    }
}
test();
/**
 *  괄호 안의 foo는 let foo를 참조한다.(var foo가 아님). 그러나 foo의 initialization이 끝나지 않았으므로
 *  참조 에러 발생...
 *  the if block's "foo" has already been created in the lexical environment,
 *  but has not yet reached (and terminated) its initialization (which is part of the statement itself):
 *  it's still in the temporal dead zone.
 */

/*************************************************************************************************/

var c = 1;
var d = 2;

if (c === 1) {
    var c = 11; // the scope is global
    let d = 22; // the scope is inside the if-block

    console.log(c);  // 11
    console.log(d);  // 22
}

console.log(c); // 11
console.log(d); // 2

















