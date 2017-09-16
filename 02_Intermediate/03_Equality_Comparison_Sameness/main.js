console.log(+0 === -0);     // true
console.log(NaN === NaN);   // false

// 기본적으로 === 동일하나 다음에서만 차이가 있다.
console.log(Object.is(+0, -0));     // false
console.log(Object.is(NaN, NaN));   // true

// // Add an immutable NEGATIVE_ZERO property to the Number constructor.
Object.defineProperty(Number, 'NEGATIVE_ZERO', { value: -0, writable: false, configurable: false, enumerable: false });

function attemptMutation(v) {
    Object.defineProperty(Number, 'NEGATIVE_ZERO', { value: v });
}
console.log(Number.NEGATIVE_ZERO);      // -0
attemptMutation(-0);    // 실제로 변경 작업을 시도해야 에러가 발생한다.(실제로 변경작업 X)
// attemptMutation(0); // Cannot redefine property: NEGATIVE_ZERO

console.log(Object.is(new String('foo'), 'foo'));   // false