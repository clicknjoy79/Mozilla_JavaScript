var x = 1;
{
    var x = 2;
}
console.log(x); // outputs 2

/**
 * The following values evaluate to false (also known as Falsy values):
     false
     undefined
     null
     0
     NaN
     the empty string ("")
 위를 제외한 나머지는 모두 true

 Boolean 객체와 boolean literal을 구별해야 한다.
 */

var b = new Boolean(false);

if(b) {             // b == true
    console.log('b equals true');
} else {
    console.log('b equals false');
}
console.log(b == false); //  true
console.log(b === false); // false

/*********************************************************************************/

function checkData() {
    if (document.form1.threeChar.value.length === 3) {       // name 속성으로 찾아 들어간다.
        return true;
    } else {
        alert('Enter exactly three characters. ' +
            document.form1.threeChar.value + ' is not valid.');
        return false;
    }
}
console.log(checkData());       // true

/*********************************************************************************/

// create an object type UserException
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}

UserException.prototype.toString = function () {
    console.log(this.name + ':"' + this.message + '"');

}

try {
    throw new UserException('exception occured')
} catch (e) {
    e.toString();   // UserException:"exception occured"
} finally {
    console.log('we are in final block.'); // we are in final block.
}

/*********************************************************************************/

function getMonthName(mo) {
    mo = mo - 1;    // Adjust month number for array index (1 = Jan, 12 = Dec)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if(months[mo]) {
        return months[mo];
    } else {   // months[mo] === undefined
        throw 'InvalidMonthNo';
    }
}
var monthName;
try {
    monthName = getMonthName(1);
} catch (e) {
    monthName = 'unknown';
    console.log(e);  // or logMyErrors(e); using your own function.....
}
console.log(monthName);     // Jan

try {
    monthName = getMonthName(13);
} catch (e) {
    monthName = 'unknown';
    console.log(e);  // InvalidMonthNo
}
console.log(monthName); // unkown

/*********************************************************************************/
// finally 구문의 return 은 모든 try {} catch{} 구문의 return 값이 된다.
function f() {
    try {
        console.log(0);
        throw 'bogus';
    } catch(e) {
        console.log(1);
        return true; // this return statement is suspended
                     // until finally block has completed
        console.log(2); // not reachable
    } finally {
        console.log(3);
        return false; // overwrites the previous "return"
        console.log(4); // not reachable
    }
    // "return false" is executed now
    console.log(5); // not reachable
}
console.log(f()); // console 0, 1, 3; returns false

// finally 구문의 return 은 try {} catch{} 구문의 throw 값도 overwrite 한다.
function func() {
    try {
        throw 'bogus';
    } catch(e) {
        console.log('caught inner "bogus"');
        throw e; // this throw statement is suspended until
                 // finally block has completed
    } finally {
        return false; // overwrites the previous "throw"
    }
    // "return false" is executed now
}

try {
    console.log(func());    // caught inner "bogus"   // false
} catch(e) {
    // this is never reached because the throw inside
    // the catch is overwritten
    // by the return in finally
    console.log('caught outer "bogus"');
}

/*********************************************************************************/
/**
 *  innerHTML()보다 훨씬 빠른 insertAdjacentHTML()

 파이어폭스가 8.0으로 업그레이드되면서 새로운 DOM Node 함수로 insertAdjacentHTML()가 추가되었다고 한다.

 간단히 설명하자면...

 이름 그대로 인접(Adjacent) 위치에 HTML tag를 삽입해주는 함수이다.

 기존의 innerHTML() 함수와 비교해보자면...

 어떤 HTML element의 기존 하위 Node들의 앞 또는 뒤에 새로운 HTML 태그를 삽입하려면, 예전 방식으로는 innerHTML() 함수를 사용하여 아래와 같이 하는 경우가 많았다.

 element.innerHTML += "<div> 한날당 <span> FTA </span> 날치기 </div>";


 그러나 이런 방식은 DOM Parsing 과정에서, 기존 하위 Node들의 Node Tree가 삭제되고 재구성되는 과정이 추가되므로, 실행 시간 낭비는 필연적이었다.

 이런 폐단을 방지하기위해, 어떤 HTML element에 대한 상대적인 삽입 위치를 지정하도록 하여, 기존 하위 Node는 건드리지 않는 HTML tag 삽입 함수가 필요하게 되었는데, 이 함수가 바로 insertAdjacentHTML()이다.

 사용 형태)

 insertAdjacentHTML(position, markup)

 position에 사용 가능한 값들:
 "beforebegin", "afterbegin", "beforeend", "afterend"

 사용 예)

 <p> foo </p>

 위 <p> 노드를 기준으로 삽입 위치들:

 <!-- beforebegin --> <p> <!-- afterbegin --> foo <!-- beforeend --> </p> <!-- afterend -->
 */

// Promise 구문은 익스플로러에서 지원되지 않는다......학습 목적으로만 익혀둘 것.....
// Simple Promise Example
let myFirstPromise = new Promise((resolve, reject) => {
    // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
    // In this example, we use setTimeout(...) to simulate async code.
    // In reality, you will probably be using something like XHR or an HTML5 API.
    setTimeout(function(){
        resolve("Success!"); // Yay! Everything went well!
    }, 5000);
});

myFirstPromise.then((successMessage) => {
    // successMessage is whatever we passed in the resolve(...) function above.
    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
    console.log("Yay! " + successMessage);
});

// Advanced Example
var promiseCount = 0;

function testPromise() {
    let thisPromiseCount = ++promiseCount;

    let log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Started (<small>Sync code started</small>)<br/>');

    // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 5s)
    let p1 = new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        (resolve, reject) => {  // 비동기적으로 실행되는 코드
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise started (<small>Async code started</small>)<br/>');
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(thisPromiseCount);
                }, 5000);
        }
    );

    // We define what to do when the promise is resolved/rejected with the then() call,
    // and the catch() method defines what to do if the promise is rejected.
    p1.then(
        // Log the fulfillment value      // resolve 에 넘긴 파라미터를 받아서 실행
        function(val) {
            log.insertAdjacentHTML('beforeend', val +
                ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
        })
        .catch(
            // Log the rejection reason
            (reason) => {
                console.log('Handle rejected promise ('+reason+') here.');
            });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>Sync code terminated</small>)<br/>');
}
// 무슨 메세지가 어떤 순서로 출력될 지 예상해 볼 것.....
testPromise();
testPromise();

// Example
new Promise((resolve, reject) => {
    console.log('Initial');     // Initial

    // resolve();           // 아래의 then 구문부터 시작한다.
    reject(Error('error occured!!!'));      // 아래의 catch 구문으로 넘어간다.....
})
    .then(() => {
        throw new Error('Something failed');

        console.log('Do this');     // do not reach here!!
    })
    .catch((e) => {
        console.log(e.message);     // Something failed
        console.log('Do that');     // Do that
    })
    .then(() => {
        console.log('Do this whatever happened before');    // Do this whatever happened before
    });

// Promise 를 이용한 이미지 로드 예제
function imgLoad(url) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function(resolve, reject) {
        // Standard XHR to load an image
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'blob';
        // When the request loads, check whether it was successful
        request.onload = function () {
            if(request.status === 200) {
                // If successful, resolve the promise by passing back the request response
                resolve(request.response);
            } else {
                // If it fails, reject the promise with a error message
                reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
            }
        };
        
        request.onerror = function () {
            // Also deal with the case when the entire request fails to begin with
            // This is probably a network error, so reject the promise with an appropriate message
            reject(Error('There was a network error.'));
        };

        request.send();
    });
}

// Get a reference to the body element, and create a new image object
var body = document.querySelector('body');
var myImage = new Image();
// Call the function with the URL we want to load, but then chain the
// promise then() method on to the end of it. This contains two callbacks
imgLoad('myLittleVader.jpg').then(function(response) {
    // The first runs when the promise resolves, with the request.reponse
    // specified within the resolve() method.
    var imageURL = window.URL.createObjectURL(response);
    console.log(imageURL);
    myImage.src = imageURL;
    body.appendChild(myImage);
    // The second runs when the promise
    // is rejected, and logs the Error specified with the reject() method.
}, function(Error) {
    console.log(Error);
});












