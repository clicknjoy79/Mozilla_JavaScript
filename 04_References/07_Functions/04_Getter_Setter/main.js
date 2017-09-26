// Defining a getter on new objects in object initializers
var obj = {
    log: ['test'],
    get lastest() {
        if (this.log.length === 0) return undefined;
        return this.log[this.log.length - 1];
    }
};
console.log(obj.lastest);   // test

// Deleting a getter using the delete operator
delete obj.lastest;
console.log(obj.lastest);   // undefined

// Defining a getter on existing objects using defineProperty
var o = {a: 0};
Object.defineProperty(o, 'b', {
    get: function() { return this.a + 1; }
});
console.log(o.b);   // 1

// Using a computed property name
var expr = 'foo';

var obj = {
    get [expr]() { return 'bar'; }
};
console.log(obj.foo); // bar

// Defining a setter on new objects in object initializers
var language = {
    set current(name) {
        this.log.push(name);
    },
    log: []
};

language.current = 'EN';
console.log(language.log);      // ["EN"]

language.current = 'FA'
console.log(language.log);      // ["EN", "FA"]

// Removing a setter with the delete operator
delete language.current;    // setter 삭제
language.current = 'KO';    // current property 할당
console.log(language.log);  // ["EN", "FA"]
console.log(language.current);  // KO


// Defining a setter on existing objects using defineProperty
var o = { a: 0};

Object.defineProperty(o, 'b', {
    set: function(x) {
        this.a = x / 2;
    }
});
o.b = 10;
console.log(o.a);       // 5

// Using a computed property name
var expr = 'foo';

var obj = {
    baz: 'bar',
    set [expr](v) {
        this.baz = v;
    }
};

console.log(obj.baz);       // bar
obj.foo = 'baz';
console.log(obj.baz);       // baz
























































