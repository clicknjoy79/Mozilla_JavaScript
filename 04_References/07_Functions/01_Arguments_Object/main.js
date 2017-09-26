// The arguments object is a local variable available within all (non-arrow) functions.
// Array와 유사하지만 실제 Array는 아니기 때문에 length를 제외한 property는 쓸 수 없다.
// pop 과 같은 메서드는 없다. 그러나 아래와 같이 하면 실제 Array로 전환은 가능하다.
// 아래 2 개의 방법은 좋은 사용법은 아니다.(최적화의 문제가 생김)
// var args = Array.prototype.slice.call(arguments);
// var args = [].slice.call(arguments);

// ES2015
// var args = Array.from(arguments);

// 이런식으로 Array 전환도 가능하다.
// var args = (arguments.length === 1) ? [arguments[0]] : Array.apply(null, arguments);

// Using the Spread Syntax with Arguments
// var args = Array.from(arguments);
// var args = [...arguments];

// Defining a function that concatenates several strings
function myConcat(separator) {
    var args = Array.prototype.slice.call(arguments, 1);
    return args.join(separator);
}

console.log(myConcat(', ', 'red', 'orange', 'blue'));
console.log(myConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah'));
console.log(myConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley'));
// red, orange, blue
// elephant; giraffe; lion; cheetah
// sage. basil. oregano. pepper. parsley


// Defining a function that creates HTML lists
function list(type) {
    var result = '<' + type + 'l><li>';
    var args = Array.prototype.slice.call(arguments, 1);
    result += args.join('</li><li>');
    result += '</li></' + type + 'l>';

    return result;
}

var listHTML = list('u', 'One', 'Two', 'Three');
console.log(listHTML);  // <ul><li>One</li><li>Two</li><li>Three</li></ul>


// subtle problem in non-strict mode
// arguments와 파라미터가 서로 영향을 준다.
// When a non-strict function does not contain rest, default, or destructured parameters,
// then the values in the arguments object do track the values of the arguments (and vice versa). See the code below:
function func(a) {
    arguments[0] = 99;
    console.log(a);
}
func(10);       // logs 99

function func1(a) {
    a = 99;
    console.log(arguments[0]);
}
func1(10);       // 99

// When a non-strict function does contain rest, default, or destructured parameters,
// then the values in the arguments object do not track the values of the arguments (and vice versa).
// Instead, they reflect the arguments provided at the time of invocation:
function func2(a = 55) {
    arguments[0] = 99;  // updating arguments[0] does not also update a
    console.log(a);
}
func2(10);      // 10

function func3(a = 55) {
    a = 99;   // updating a does not also update arguments[0]
    console.log(arguments[0]);
}
func3(10);      // 10

function func4(a = 55) {
    console.log(arguments[0]);
}
func4();        // undefined






















































