// Proxy : ECMAScript 6 에서 도입 (이미 알려진 Proxy 개념과 유사)
// syntax: var p = new Proxy(target, handler);

// simple example
var handler = {
    get: function (target, name) {
        return (name in target) ? target[name] : 37;
    }
};

var p = new Proxy({k : 10}, handler);
p.a = 1;
p.b = undefined;
console.log(p.a, p.b);   // 1, undefined
console.log('c' in p, p.c);        // false, 37
console.log(p.k);       // 10

var target = {};
var p = new Proxy(target, {});

p.a = 37;
console.log(target.a);      // 37

// Validation
let validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }
        obj[prop] = value;
        return true;
    }
};

let person = new Proxy({}, validator);

person.age = 100;
console.log(person.age);       // 100
// person.age = 'young';   // Throws an exception
// person.age = 300;       // Throws an exception


// handler.construct()  : new operator를 정의한다.
// target: 생성자 함수, args: 생성자에 넘길 파라미터 목록, newTarget: p
// 반드시 오브젝트를 리턴해야 한다.
/**
 * syntax:
 * var p = new Proxy(target, {
    construct: function(target, args[, newTarget]) {
        // TODO
    }
   });
 */
var p = new Proxy(function() {}, {
    construct: function(target, args, newTarget) {
        console.log('called: ' + args.join(','));
        return { value: args[0] * 10 };
    }
});

console.log(new p(1).value);    // called: 1
                                // 10
// Extending constructor
function extend(sup, base) {
    var descriptor = Object.getOwnPropertyDescriptor(
        base.prototype, 'constructor'
    );
    // 상속 관계를 만든다.
    base.prototype = Object.create(sup.prototype);
    // new + constructor 호출시 실행될 코드
    var handler = {
        construct: function(target, args) {
            var obj = Object.create(base.prototype);
            this.apply(target, obj, args);
            return obj;
        },
        apply: function (target, that, args) {
            sup.apply(that, args);
            base.apply(that, args);
        }
    };

    // base를 확장한 프록시 생성(프록시는 생성자)
    // 프록시로 객체 생성시 handler에 등록된 construct 가 동작한다.
    var proxy = new Proxy(base, handler);
    // 기타 설정
    descriptor.value = proxy;
    Object.defineProperty(base.prototype, 'constructor', descriptor);
    // 프록시 리턴
    return proxy;
}

var Person = function (name) {
    this.name = name;
}

var Boy = extend(Person, function(name, age) {
    this.age = age;
});

Boy.prototype.sex = 'M';

var Peter = new Boy('Peter', 13);
console.log(Peter.sex);     // 'M'
console.log(Peter.name);    // 'Peter'
console.log(Peter.age);     // 13

// Manipulating DOM nodes
// when toggle the attribute or class name of two diffent elements
// 사용하기 편하지는 않을 듯
let view = new Proxy({
    selected: null
}, {
    set: function(obj, prop, newval) {
        let oldval = obj[prop];

        if (prop === 'selected') {
            if (oldval) {   // selected 프라퍼티에 값이 존재하는 경우
                oldval.setAttribute('aria-selected', 'false');
            }
            if (newval) {
                newval.setAttribute('aria-selected', 'true');
            }
        }

        obj[prop] = newval;
        return true;
    }
});

let i1 = view.selected = document.getElementById('item-1');
console.log(i1.getAttribute('aria-selected'));      // true

let i2 = view.selected = document.getElementById('item-2');
console.log(i1.getAttribute('aria-selected'));      // false
console.log(i2.getAttribute('aria-selected'));      // true

var ul = document.querySelector('ul');
ul.addEventListener('click', function(e) {
    view.selected = e.target;
}, false);

// set 테스트
let products = new Proxy({
    browsers: ['Internet Explorer', 'Netscape']
}, {
    get: function (obj, prop) {
        // An extra property
        if (prop === 'latestBrowser') {
            return obj.browsers[obj.browsers.length - 1];
        }

        // default behavior
        return obj[prop];
    },
    set: function (obj, prop, value) {
        // An extra property
        if (prop === 'latestBrowser') {
            obj.browsers.push(value);
            return true;
        }

        // Convert the value if it is not an array
        if (typeof value === 'string') {
            value = [value];
        }

        // default behavior
        obj[prop] = value;

        return true;
    }
});

console.log(products.browsers); // Internet Explorer, Netscape
products.browsers = 'Firefox';
console.log(products.browsers); // Firefox

products.latestBrowser = 'Chrome';
console.log(products.browsers); // Firefox, Chrome
console.log(products.latestBrowser);    // Chrome

// Finding an array item object by its property
let items = new Proxy([
    { name: 'Firefox', type: 'browser' },
    { name: 'SeaMonky', type: 'browser' },
    { name: 'Thunderbird', type: 'mailer' }
], {
    get: function (obj, prop) {
        // default behavior
        if (prop in obj) {
            return obj[prop];
        }

        // Get the number of products:
        if (prop === 'number') {
            return obj.length;
        }

        let result, types = {};

        for (let item of obj) {
            if (item.name === prop) {
                result = item;
            }
            if (types[item.type]) {
                types[item.type].push(item);
            } else {
                types[item.type] = [item];
            }
        }

        // Get a product by name
        if (result) {
            return result;
        }

        // Get products by type
        if (prop in types) {
            return types[prop];
        }

        // Get product types
        if (prop === 'types') {
            return Object.keys(types);
        }

        return undefined;
    }
});

console.log(items[0]);   // { name: 'Firefox', type: 'browser' }
console.log(items['Firefox']);  // { name: 'Firefox', type: 'browser' }
console.log(items['Chrome'])    // undefined
console.log(items.browser);     // [ {name: 'Firefox', type: 'browser' }, {name: 'SeaMonkey', type: 'browswer' }]
console.log(items.types);   // ['browser', 'mailer']
console.log(items.number);  // 3

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #3 - July 13th, 2017
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|  https://github.com/madmurphy/cookies.js
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

// 접어서 볼 것
var docCookies = {
    getItem: function (sKey) {
        if (!sKey) { return null; }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    /*
                    Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
                    version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
                    the end parameter might not work as expected. A possible solution might be to convert the the
                    relative time to an absolute time. For instance, replacing the previous line with:
                    */
                    /*
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
                    */
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};

var docCookies = new Proxy(docCookies, {
    get: function (oTarget, sKey) {
        return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
    },
    set: function (oTarget, sKey, vValue) {
        if (sKey in oTarget) { return false; }
        return oTarget.setItem(sKey, vValue);
    },
    deleteProperty: function (oTarget, sKey) {
        if (sKey in oTarget) { return false; }
        return oTarget.removeItem(sKey);
    },
    enumerate: function (oTarget, sKey) {
        return oTarget.keys();
    },
    ownKeys: function (oTarget, sKey) {
        return oTarget.keys();
    },
    has: function (oTarget, sKey) {
        return sKey in oTarget || oTarget.hasItem(sKey);

    },
    defineProperty: function (oTarget, sKey, oDesc) {
        if (oDesc && 'value' in oDesc) { oTarget.setItem(sKey, oDesc.value); }
        return oTarget;
    },
    getOwnPropertyDescriptor: function (oTarget, sKey) {
        var vValue = oTarget.getItem(sKey);
        return vValue ? {
            value: vValue,
            writable: true,
            enumerable: true,
            configurable: false
        } : undefined;
    }
});

console.log(docCookies.my_cookie1 = 'First value'); // First value
console.log(docCookies.getItem('my_cookie1'));      // First value

docCookies.setItem('my_cookie1', 'Changed value');
console.log(docCookies.my_cookie1);     // Changed value

// Revocable Proxy ==> 취소할 수 있는 프록시 생성
var revocable = Proxy.revocable({}, {
    get: function (target, prop) {
        return '[[' + prop + ']]';
    }
});

var proxy = revocable.proxy;
console.log(proxy.foo);     // [[foo]]

revocable.revoke();     // switch off proxy

// console.log(proxy.foo);     // TypeError
// proxy.foo = 1;      // TypeError
// delete proxy.foo;   // TypeError
console.log(typeof proxy);    // "object"   do not trigger any trap

// 헷갈린다....
// function.apply(thisArg, [arguments]) : thisArg는 function 함수 내부에서 this 로 쓰이는 것.
// 아래에서 Math.floor 는 apply 함수 내부(함수 바디)에서 this로 쓰인다.
// apply 는 Function.prototype 객체 내부에 정의된 property 이므로 메서드 이다.
// method 내부에서 this는 해당 메서드를 호출한 객체를 의미한다 ==> 여기서는 Math.floor 객체를 의미(함수도 객체)
// 잘 생각해보면 이해가 간다....
console.log(Function.prototype.apply.call(Math.floor, undefined, [1.75]));  // 1

// 위와 같은 호출은 헷갈리므로 아래와 같이 사용하면 간편하다(그러나 익스에서 지원이 안됨)
// Syntax : Reflect.apply(target, thisArgument, argumentsList)
console.log(Reflect.apply(Math.floor, undefined, [1.75]));  // 1
console.log(Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]));   // "hello"
console.log(Reflect.apply(RegExp.prototype.exec, /ab/, ['confabulation']).index);   // 4
console.log(Reflect.apply(''.charAt, 'ponies', [3]));   // "i"


































