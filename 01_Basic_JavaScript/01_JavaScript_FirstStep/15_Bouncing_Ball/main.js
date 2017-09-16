// setup canvas

var canvas = document.querySelector('canvas');
//The resulting variable (ctx) is the object that directly represents the drawing area of the canvas
// and allows us to draw 2D shapes on it.
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// returns a random number in the range between the two(min, max).
function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

/*
x, y: 볼이 시작하는 지점
velX, velY 볼이 움직이는 속도(한 프레임마다 x, y에 더해짐)
 */
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    // x, y: arc(원, 원호)의 중심
    // radius: 호의 반지름
    // 0: 호의 시작 각도
    // 2 * Math.PI : 360도를 의미
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // finish drawing the path we started with beginPath(),
    // and fill the area it takes up with the color
    ctx.fill();
}

Ball.prototype.update = function () {
    if((this.x + this.size) >= width && this.velX > 0) {  // 공이 오른쪽벽에 부딪친 경우
        this.velX = -(this.velX);
    }

    if((this.x - this.size) <= 0 && this.velX < 0) { // 공이 왼쪽벽에 부딪친 경우
        this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height && this.velY > 0) {// 공이 하단벽에 부딪친 경우
        this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0 && this.velY < 0) {// 공이 상단벽에 부딪친 경우
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
    for(var j = 0; j < balls.length; j++) {
        if(this !== balls[j]) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
}

var balls = [];

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    while(balls.length < 50) {
        var rad = random(10, 20);

        var ball = new Ball(
          random(rad, width - rad),
          random(rad, height -rad),
            random(-7, 7),
            random(-7, 7),
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
            rad
        );
        balls.push(ball);
    }

    for(var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();     // 이 로직이 정확한 것은 아니지만 그냥 넘어갈 것....
    }

    requestAnimationFrame(loop); // loop를 하나의 프레임으로 보고 프레임 사이에 애니메이션 효과를 부여한다. loop가 무한 반복한다.
}

loop();

































