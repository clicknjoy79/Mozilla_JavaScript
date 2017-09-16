// ECMA 15에서 Map 도입

var sayings = new Map();
sayings.set('dog', 'woof');
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
console.log(sayings.size);  // 3
console.log(sayings.get('fox'));     // undefined
console.log(sayings.has('bird'));    // false
sayings.delete('dog');
console.log(sayings.has('dog'));    // false

// 이전에는 Object가 string 와 value를 mapping 하는 역할을 했다.
/**
 * Map 의 장점
 *  1. Key가 String 으로 제한 되지 않는다.
 *  2. size property가 있어서 쉽게 사이즈를 구할 수...
 *  3. 맵의 iteration을 돌리면 insert한 순서대로 돈다.
 *
 *  Object 대신 Map 을 사용해야 하는 경우
 *  1. Rumtime 시 까지 key를 모르는 경우, key 의 type이 동일하며 value의 타입이 동일한 경우.
 *  2. String 이외의 Key 값을 사용해야 하는 경우. (Object는 key 값을 String 으로 간주한다.)
 *
 * 번외: WeakMap(ECMAScript 6에 도입)
 * key가 오직 Object이며 key list를 구할 수 없다.
 * Map의 경우에는 key로 Object reference가 저장되면 수동으로 제거하기 전까지는 제거되지 않는다.
 * 이는 외부에서 해당 오브젝트를 더이상 참조하지 않는 경우에도 Map에는 계속해서 남게 된다. ==> 메모리 누수의 문제가 발생
 * 그러나 WeakMap의 경우에는 외부에서 해당 오브젝트를 더 이상 참조하지 않으면 오브젝트를 제거해 버린다.
 * 오브젝트의 private 멤버나 메서드를 구현할 때 사용된다.
 *
 * 아래와 같은 형태로 사용 가능하다.
 */
const privates = new WeakMap();

function Public() {
    const me = {
        // Private data goes here
    };
    privates.set(this, me);
}

Public.prototype.method = function() {
    const me = privates.get(this);
    // Do stuff with private data in `me`...
};

var mySet = new Set();
mySet.add(1);
mySet.add('some text');
mySet.add('foo');

console.log(mySet.has(1));   // true
mySet.delete('foo');
console.log(mySet.size);     // 2

for (let item of mySet) console.log(item);  // 1, some text

// Converting between Array and Set
mySet.add('foo');
var myArr = Array.from(mySet);
console.log(myArr); // 1, some text, foo

var myArr = [...mySet];
console.log(myArr); // 1, some text, foo

var mySet2 = new Set([1, 2, 3, 4]);
console.log(mySet2);    // 1, 2, 3, 4

/**
 * WeakSet은 WeakMap와 유사. 오직 오브젝트만 value로 저장가능하며 duplicate 안됨.
 */







































