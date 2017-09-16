function makeIterator(array) {
    var nextIndex = 0;

    return {
        hasMore: function() {
            return nextIndex < array.length ? true : false;
        },
        next: function() {
            return nextIndex < array.length ?
                array[nextIndex++] : undefined;
        }
    };
}

var iterator = makeIterator([1, 2, 3, 4]);
while (iterator.hasMore()) {
    console.log(iterator.next());   // 1, 2, 3, 4
}
console.log(iterator.next());   // undefined

var arr = ['w', 'y', 'k', 'o', 'p'];
var eArr = arr[Symbol.iterator]();
// your browser must support for..of loop
// and let-scoped variables in for loops
for (let letter of eArr) {
    console.log(letter);    // w, y, k, o, p
}

// user-defined iterables
// 배열과 유사하게 동작한다고 생각
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

for (let value of myIterable) {
    console.log(value);     // 1, 2, 3
}

console.log([...myIterable]);   // Array: 1, 2, 3

// function* 의 사용례
function* g3() {
    yield* [1, 2];
    yield* '34';
    yield* Array.from(arguments);
}

var iterator = g3(5, 6);

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: "3", done: false}
console.log(iterator.next()); // {value: "4", done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: 6, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

// yield* is an expression, not a statement, so it evaluates to a value.
function* g4() {
    yield* [1, 2, 3];
    return 'foo';
}

var result;

function* g5() {
    result = yield* g4();
}

var iterator = g5();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true},
                              // g4() returned {value: 'foo', done: true} at this point

console.log(result);          // "foo"

// 내부적으로 반복하는 작업을 하는 경우(Iterable에 대해서)
// 1. for-of
// 2. spread syntax
// 3. yield*
// 4. destructuring assignment

// for-of
for (let value of ['a', 'b', 'c']) {
    console.log(value);     // a, b, c
}

// spread syntax
console.log([...'abc']);    // Array: a, b, c

// yield*
function* gen() {
    yield* ['a', 'b', 'c'];
}

console.log(gen().next()); // { value: 'a', done: false }
console.log(gen().next()); // { value: 'a', done: false }

// destructuring assignment
var [x, y, z] = new Set(['a', 'b', 'c']);
console.log(x);     // a
console.log(y);     // b
console.log(z);     // c

// Advanced Generator
// next()를 실행하면 yield expression 까지 실행하고 값을 반환하나 ; 을 넘지는 않는다.
// 다음 next()를 실행하면 ; 부터 실행한다.
// generator의 next() 메소드에 값을 넘겨주면 해당 값이 마지막 yield expression을 대체한다.
function* fibonacci() {
    var fn1 = 0;
    var fn2 = 1;
    while (true) {
        var current = fn1;
        fn1 = fn2;
        fn2 = current + fn1;
        var reset = yield current;
        if (reset) {
            fn1 = 0;
            fn2 = 1;
        }
    }
}

var sequence = fibonacci();
console.log(sequence.next().value);     // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
console.log(sequence.next().value);     // 3
console.log(sequence.next().value);     // 5
console.log(sequence.next().value);     // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
console.log(sequence.next().value);     // 3


































