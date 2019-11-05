const cnv = document.getElementById('mineCanvas');
let ctx = cnv.getContext('2d');
let balls=[];
let longTap=false;
let mouseX;
let mouseY;

// 基础配置
let count = 1;
let innerRadius = 20;
let easing = 0.02;

// 窗口变化重置 canvas 大小
window.onresize = resize();

function resize() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
}
function addBall(){   
       let  temp_balls= getEnoughBall(count, mouseX, mouseY);
        for (var i = 0; i < temp_balls.length; i++) {
            balls.push(temp_balls[i])
       }
             
}
function update(){
    if(longTap){
        addBall();
    } 
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    // ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    // ctx.fillRect(0, 0, cnv.width, cnv.height);
    balls.forEach((item,index) => {
        item.draw('fill');
        // 缓动动画
        item.vx = (item.dx - item.x) * easing;
        item.vy = (item.dy - item.y) * easing;
        item.x += item.vx;
        item.y += item.vy;
        if(item.sx>0.01){
          item.radius-=item.radius * easing*2;
        }
        item.sx += -item.sx * easing*2;
        // item.sy += -item.sy * easing*2;
        // if(item.sx<0.001){
        //    balls.splice(index,1);
        // }
    })
    //彩蛋
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillRect(100, 100, 100, 100)
}
window.onload = function () {
    // 初始化宽高
    resize();
    //监听
    cnv.addEventListener('touchstart', (e) => {
        longTap=true;
        mouseX =e.clientX?e.clientX:e.touches[0].clientX - cnv.offsetLeft;
        mouseY = e.clientY?e.clientY:e.touches[0].clientY - cnv.offsetTop;  
        addBall()
    }, false)
    cnv.addEventListener('touchend', (e) => {
        longTap=false;
    }, false)
    cnv.addEventListener('touchmove', (e) => {
        mouseX =e.clientX?e.clientX:e.touches[0].clientX - cnv.offsetLeft;
        mouseY = e.clientY?e.clientY:e.touches[0].clientY - cnv.offsetTop;  
    }, false);

    ;(function animation() {
            update();
            requestAnimationFrame(animation);
            
    })()
}



function getEnoughBall(num, mouseX, mouseY) {
    var balls = [];

    for (let i = 0; i < num; i++) {
        var color='rgba('+255*Math.random()+','+255*Math.random()+','+0*Math.random()+')'
        var ball = new Ball(0, 0, Math.random() * (40 - 5 + 1) + 5, color);
        ball.x = mouseX + Math.random() * innerRadius*5 - Math.random() * innerRadius*5;
        ball.y = mouseY + Math.random() * innerRadius*2 - Math.random() * innerRadius*2;

        // 计算最终位置
        var x = mouseX - ball.x;

        ball.dx=ball.x;
        ball.dy = mouseY*Math.random();
        balls.push(ball);
    }

    return balls;
}

// ball class
class Ball {
    constructor(x, y, radius, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.sx = 1;
        this.sy = 1;
        this.radius = radius || 10;
        this.color = color || 'black';
    }

    draw(type) {
        if (['fill', 'stroke'].indexOf(type) == -1) {
            throw ('ball.draw need a right type');
        }
        ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.scale(this.sx, this.sy);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 360 * Math.PI / 180);
        ctx.closePath();
        type === 'fill' ? ctx.fill() : ctx.stroke();
        ctx.restore();
    }
}
