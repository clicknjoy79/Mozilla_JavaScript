var re = /ab+c/;    // 정규 표현식이 변하지 않을 때

/**
 * 정규표현식이 runtime 시 compile 된다.
 * 정규표현식이 runtime 시 변할 가능성이 있는 경우 사용
 * 특정 소스로부터 표현식을 추출해서 사용하는 경우. 사용자가 표현식을 입력하는 경우
 */
var reg = new RegExp('ab+c');

/**
 * backslash + non-special character => special character
 * \b => word boundary character
 *
 * backslash + special character => non-special character
 * a\* => character a + character *  ('a*')
 *
 *  ? 의미:
 * If used immediately after any of the quantifiers *, +, ?, or {},
 * makes the quantifier non-greedy (matching the fewest possible characters),
 * as opposed to the default, which is greedy (matching as many characters as possible).
 * 일반적으로 수량자는 greedy 하지만 수량자 뒤에 ? 가 붙으면 non-greedy match 를 의미.
 * For example, applying /\d+/ to "123abc" matches "123".
 * But applying /\d+?/ to that same string matches only the "1".
 *
 * (?:x)
 * Matches 'x' but does not remember the match.
 * The parentheses are called non-capturing parentheses,
 * and let you define subexpressions for regular expression operators to work with.
 * Consider the sample expression /(?:foo){1,2}/.
 * If the expression was /foo{1,2}/, the {1,2} characters would apply only to the last 'o' in 'foo'.
 * With the non-capturing parentheses, the {1,2} applies to the entire word 'foo'.
 *
 *
 * Matches 'x' only if 'x' is followed by 'y'. This is called a lookahead.

 x(?=y)
 For example, /Jack(?=Sprat)/ matches 'Jack' only if it is followed by 'Sprat'.
 /Jack(?=Sprat|Frost)/ matches 'Jack' only if it is followed by 'Sprat' or 'Frost'.
 However, neither 'Sprat' nor 'Frost' is part of the match results.

 x(?!y)
 Matches 'x' only if 'x' is not followed by 'y'. This is called a negated lookahead.
 For example, /\d+(?!\.)/ matches a number only if it is not followed by a decimal point.
 The regular expression /\d+(?!\.)/.exec("3.141") matches '141' but not '3.141'.

 x|y
 Matches either 'x' or 'y'.
 For example, /green|red/ matches 'green' in "green apple" and 'red' in "red apple."

 [xyz]
 Character set.
 This pattern type matches any one of the characters in the brackets, including escape sequences.
 Special characters like the dot(.) and asterisk (*) are not special inside a character set, so they don't need to be escaped.
 그러나 \는 여전히 특수 문자로 인식하므로 \를 표시하려면 \\를 넣어야 한다.
 다른 특수문자의 경우는 \를 삽입해도 되고 안해도 된다.
 You can specify a range of characters by using a hyphen, as the following examples illustrate.
 The pattern [a-d], which performs the same match as [abcd], matches the 'b' in "brisket" and the 'c' in "city".
 The patterns /[a-z.]+/ and /[\w.]+/ match the entire string "test.i.ng".

 [^xyz]
 A negated or complemented character set. That is, it matches anything that is not enclosed in the brackets. You can specify a range of characters by using a hyphen. Everything that works in the normal character set also works here.
 For example, [^abc] is the same as [^a-c]. They initially match 'r' in "brisket" and 'h' in "chop."

 /b
 Matches a word boundary.
 A word boundary matches the position where a word character is not followed or preceded by another word-character.
 Note that a matched word boundary is not included in the match.

 \B
 Matches a non-word boundary.
 This matches a position where the previous and next character are of the same type:
 Either both must be words, or both must be non-words. // 앞 뒤로 둘다 글자이든지, 둘다 글자가 아니든지
 The beginning and end of a string are considered non-words.

 \cX
 Where X is a character ranging from A to Z. Matches a control character in a string.
 For example, /\cM/ matches control-M (U+000D) in a string.

 \s
 Matches a single white space character, including space, tab, form feed, line feed.
 Equivalent to [ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff].
 For example, \s\w* matches ' bar' in "foo bar."

 \S
 Matches a single character other than white space.
 Equivalent to [^ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff].
 For example, \S* matches 'foo' in "foo bar."

 \w
 Matches any alphanumeric character including the underscore. Equivalent to [A-Za-z0-9_].
 For example, /\w/ matches 'a' in "apple," '5' in "$5.28," and '3' in "3D."

\W
 Matches any non-word character. Equivalent to [^A-Za-z0-9_].
 For example, /\W/ or /[^A-Za-z0-9_]/ matches '%' in "50%."

 \n
 Where n is a positive integer, a back reference to the last substring matching the n parenthetical in the regular expression (counting left parentheses).
 For example, /apple(,)\sorange\1/ matches 'apple, orange,' in "apple, orange, cherry, peach."
*/

function escapeRegExp(string) {
    // \] 백슬래쉬를 삽입한 이유는 삽입하지 않으면 ] 를 정규표현식의 닫는 기호로 인식하므로
    // 특별히 ] 의 경우에는 앞에 \를 삽입해야 한다. \\ 의 경우에도 \를 반드시 삽입해야 한다.
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

console.log(escapeRegExp('.*+^${}()|[]\\'));

var myRe = /d(b+)d/g;
var myArray = myRe.exec('cdbbdbsbz');
console.log(myArray);
console.log(myArray[0]); // 가장 마지막 매칭 문자열: dbbd
console.log(myArray.index); // 매칭 문자열의 시작 인덱스: 1
console.log(myArray.input); // 오리지널 문자열: cdbbdbsbz
console.log(myRe.lastIndex);  // 매칭 문자열의 다음 인덱스: 5 /g 설정된 경우에만 존재
console.log(myRe.source);     // 정규표현식 패턴: d(b+)d

var re1 = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re1, '$2, $1');
console.log(newstr);    // Smith, John

// var re2 = /\w+\s/g;
var re2 = new RegExp('\\w+\\s', 'g');
var str1 = 'fee fi fo fum';
var myArray1 = str1.match(re2);
console.log(myArray1);  // fee fi fo

var xArray;
xArray = re2.exec(str1);
console.log(re2.lastIndex); // 4
console.log(xArray);

xArray = re2.exec(str1);
console.log(re2.lastIndex); // 7
console.log(xArray);

xArray = re2.exec(str1);
console.log(re2.lastIndex); //10
console.log(xArray);

xArray = re2.exec(str1);
console.log(re2.lastIndex); // 0
console.log(xArray);    // null

var names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ; Chris Hand ';
var output = ['---------- Original String\n', names + '\n'];

var pattern = /\s*;\s*/;
var nameList = names.split(pattern);

pattern = /(\w+)\s+(\w+)/;
var bySurnameList = [];

output.push('---------- After Split by Regular Expression');

var i, len;
for (i = 0, len = nameList.length; i < len; i++) {
    output.push(nameList[i]);
    bySurnameList[i] = nameList[i].replace(pattern, '$2, $1');
}
output.push('---------- Names Reversed');
for (i = 0, len = bySurnameList.length; i < len; i++) {
    output.push(bySurnameList[i]);
}
bySurnameList.sort();
output.push('---------- Sorted');
for (i = 0, len = bySurnameList.length; i < len; i++) {
    output.push(bySurnameList[i]);
}

output.push('----------  End');
console.log(output.join('\n'));

var re2 = /(?:\d{3}|\(\d{3}\))([-\/.])\d{3}\1\d{4}/;
function testInfo(phoneInput) {
    var OK = re2.exec(phoneInput.value);
    if(!OK) {
        window.alert(phoneInput.value + ' isn\'t a phone number with area code!');
    } else {
        window.alert('Thanks, your phone number is ' + OK[0]);
    }
}






























































