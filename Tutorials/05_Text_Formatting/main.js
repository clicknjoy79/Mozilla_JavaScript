var s = new String('foo'); // Creates a String object
console.log(s); // Displays: {'0': 'f', '1': 'o', '2': 'o'}
console.log(typeof s); // Returns 'object'

// String object are immutable array-like object
var mystring = 'Hello, World!';
var x = mystring.length;
mystring[0] = 'L'; // This has no effect
console.log(mystring[0]); // This returns "H"

/**
 * UTF-8과 UTF-16은 유니코드를 인코딩하는 방법이다.
 * UTF-8은 한글은 3byte 영문은 1byte로 인코딩(영문이 많은 경우에 유리)
 * UTF-16은 한글과 영문 모두 2byte로 인코딩(한글이 많은 경우 유리함)
 * 구체적인 인코딩 방법은 EverNote에서 UTF-8이나 Unicode로 검색할 것.
 */

// JavaScript는 Unicode를 사용하며 Unicode code point를 utf-16 으로 인코딩한다.
// 따라서 아래의 문자는 4byte로 인코딩 됨(high surrogate/low surrogate).
// JavaScript는 2byte를 한 글자로 인식하기 때문에 2글자로 인식.
var str = '\u{1F600}';
console.log(str);   // 웃는 글자 표시됨
console.log(str.length);    // 2  (이런 글자가 포함되어 있는 경우 length 를 사용은 의미가 없음......)




















































