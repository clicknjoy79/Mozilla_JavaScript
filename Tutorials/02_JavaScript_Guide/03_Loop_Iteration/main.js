function howMany(selectObject) {
    var numberSelected = 0;
    for (var i = 0; i < selectObject.options.length; i++) {
        if (selectObject.options[i].selected) {
            numberSelected++;
        }
    }
    return numberSelected;
}

var btn = document.getElementById('btn');
btn.addEventListener('click', function() {
   alert('Number of options selected: ' + howMany(document.selectForm.musicTypes));
});

/******************************************************************/

var x = 0;
var z = 0;
labelCancelLoops: while (true) {
    console.log('Outer loops: ' + x);
    x += 1;
    z = 1;
    while (true) {
        console.log('Inner loops: ' + z);
        z += 1;
        if (z === 10 && x === 10) {
            break labelCancelLoops;
        } else if (z === 10) {
            break;
        }
    }
}

console.log('******************************************');

var i = 0;
var j = 10;
checkiandj:
while (i < 4) {
    console.log(i);
    i += 1;
    checkj:
    while (j > 4) {
        console.log(j);
        j -= 1;
        if ((j % 2) === 0) {
            continue checkj;
        }
        console.log(j + 'id odd.');
    }
    console.log('i = ' + i);
    console.log('j = ' + j);
}

console.log('******************************************');

function dump_props(obj, obj_name) {
    var result = '';
    for (var i in obj) {
        result += obj_name + '.' + i + ' = ' + obj[i] + '<br/>';
    }
    result += '<hr>';
    return result;
}

var car = { make: 'Ford', model: 'Mustang' };
var h5= document.createElement('h5');
h5.innerHTML = dump_props(car, 'car');
document.body.appendChild(h5);

/**
 * for in 루프를 사용하면 사용자가 정의한 properties 까지 모두 반복하므로
 * Array를 루핑할 때는 주의를 해야한다.
 */
var arr = [3, 5, 7];
arr.foo = 'hello';

for (var i in arr) {
    console.log(i); // logs "0", "1", "2", "foo"
}

for (var i of arr) {
    console.log(i); // logs 3, 5, 7
}



























































