// SimpleExample
function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => resolve(x),
            2000);
    });
}

async function add1(x) {
    var a = await resolveAfter2Seconds(20);     // 2초 후 a 세팅
    var b = await resolveAfter2Seconds(30);     // 2초 후 b 세팅
    return x + a + b;       // 4초후 리턴
}

add1(10).then(v => {
    console.log(v);     // prints 60 after 4 seconds
});

async function add2(x) {
    var p_a = resolveAfter2Seconds(20);     // 대기하지 않음
    var p_b = resolveAfter2Seconds(30);
    return x + await p_a + await p_b;   // 2초 후에 리턴
}

add2(10).then(v => {
    console.log(v);     // prints 60 after 2 seconds
})

// const는 block scope를 가지고 있다
// 선언과 동시에 값을 할당해야 한다.
// 오브젝트를 할당한 경우 오브젝트 자체를 변경할 수는 없으나 내부의 property는 변경가능하다.
// 관례상 이름은 모두 대문자로 선언한다.
const MY_FAV = 7;
if (MY_FAV === 7) {
    let MY_FAV = 20;
    console.log(MY_FAV);        // 20
}
console.log(MY_FAV);        // 7

// throws an error, missing initializer in const declaration
// const FOO;

const MY_OBJECT = { 'key': 'value' };
// Attempting to overwrite the object throws an error
// MY_OBJECT = { 'OTHER_KEY': 'value' };

// However, object keys are not protected,
// so the following statement is executed without problem
MY_OBJECT.key = 'other_value';

// The same applies to arrays
const MY_ARRAY = [];
// It's possible to push items into the array
MY_ARRAY.push('A');
// However, assigning a new array to the variable throws an error
// MY_ARRAY = ['B'];

// debugger
function potentiallyBuggyCode() {
    debugger;       // 디버거를 돌리면(개발자 모드를 연 상태에서 실행을 시키면) 여기서 멈춘다.
    // do potentially buggy stuff to examine, step through, etc.
    var x = 10;
    console.log('x: ' + x);
    var y = 10;
    console.log('y: ' + y);
    var z = 10;
    console.log('z: ' + z);
}
potentiallyBuggyCode();

// Empty Statement( ; )
// Example
var arr = [1, 2, 3];
// Assign all array value to 0
for (i = 0; i < arr.length; arr[i++] = 0) ;
console.log(arr);


















































