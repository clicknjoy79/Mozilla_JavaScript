var xMas95 = new Date('December 25, 1995 23:59:59');
console.log(xMas95);
var xMas98 = new Date(1998, 11, 25);    // 0: January ~~~~  11: December
console.log(xMas98);

var xMas99 = new Date('December 25, 1999');
console.log(xMas99.getMonth()); // 11
console.log(xMas99.getFullYear()); // 1999

var today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999);
endYear.setFullYear(today.getFullYear());   // Set year to this year
var msPerDay = 24 * 60 * 60 * 1000;
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
var daysLeft = Math.round(daysLeft);
console.log(daysLeft);

var IPOdate = new Date();
IPOdate.setTime(Date.parse('Aug 9, 1995')); // parse: string to miliiseconds Date.
console.log(IPOdate);
