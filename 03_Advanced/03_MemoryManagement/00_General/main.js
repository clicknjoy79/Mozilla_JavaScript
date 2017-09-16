// reference counting 방식의 garbage collection 문제점: cycling
// 오브젝트가 서로 참조해서 cycling이 구성되면 garbage collection에서 제외된다. ==> memory leak issue
// since each of the two objects is referenced at least once, neither can be garbage-collected.
function f() {
    var o = {};
    var o2 = {};
    o.a = o2; // o references o2
    o2.a = o; // o2 references o

    return 'azerty';
}

f();

// Real-life example
// Internet Explorer 6 and 7 are known to have reference-counting garbage collectors for DOM objects.
// Cycles are a common mistake that can generate memory leaks:
var div;
window.onload = function() {
    div = document.getElementById('myDivElement');
    div.circularReference = div;        // circular reference to itself
    div.lotsOfData = new Array(10000).join('*');    // 연관 데이터가 많다고 가정
};
// If the property is not explicitly removed or nulled,
// a reference-counting garbage collector will always have at least one reference intact and
// will keep the DOM element in memory even if it was removed from the DOM tree.


// Mark-and-sweep algorithm
// This algorithm reduces the definition of "an object is not needed anymore" to "an object is unreachable".
// This algorithm assumes the knowledge of a set of objects called roots (In JavaScript, the root is the global object).
// Periodically, the garbage-collector will start from these roots,
// find all objects that are referenced from these roots, then all objects referenced from these, etc.
// Starting from the roots, the garbage collector will thus find all reachable objects and collect all non-reachable objects.
// As of 2012, all modern browsers ship a mark-and-sweep garbage-collector
// 따라서 위의 cycling 문제는 해결됌...


































































