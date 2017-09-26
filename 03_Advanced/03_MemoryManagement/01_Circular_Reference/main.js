// Unfortunately, closures are excellent at hiding circular references betweenJavaScript objects and DOM objects.
document.write("Program to illustrate memory leak via closure");

window.onload = function() {
    var obj = document.getElementById("element");   // obj have a reference to 00_DOM Element
    // 돔 객체의 onclick property ==> 함수 객체 ==> obj
    obj.onclick = function innerFunction() { alert("Hi! I will leak"); }; // inner function have a reference to obj; 여기서 순환
    obj.bigString=new Array(1000).join(new Array(2000).join("XXXXX")); // This is used to make the leak significant };
    // obj = null; //This breaks the circular reference
};







































































