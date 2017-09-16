var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for(var i = 0; i < 5; i++) {
    var newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic' + (i + 1) + '.jpg');
    thumbBar.appendChild(newImage);
}

/* Add EventListener to thumb-images */
thumbBar.addEventListener('click', showFullImage);
function showFullImage(event) {
  if (event.target && event.target.nodeName === 'IMG') {
      var src = event.target.getAttribute('src');
      displayImage(src);
  }
}

function displayImage(src) {
    displayedImage.src = src;
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function() {
   var className = btn.getAttribute('class');
   if(className === 'dark') {
       btn.setAttribute('class', 'light');
       btn.textContent = 'Lighten'
       overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
   } else {
       btn.setAttribute('class', 'dark');
       btn.textContent = 'Darken'
       overlay.style.backgroundColor = 'rgba(0,0,0,0)';
   }
});















