<template>
    <canvas id="mineCanvas"></canvas>
</template>

<script>
import Ball from './BallFun';

export default {
  name:'BallAnimate',
  props:['ele','remove'],
  data(){
    return{
      cnv:null,
      ctx:null,
      balls:[],
      longTap:false,
      mouseX:null,
      mouseY:null,
      //基础配置
      count:1,
      innerRadius:20,
      easing:0.02
    }
  },
  methods:{
      resize() {
          // this.ele.style.height = window.innerHeight+'px';
          this.cnv.width = this.ele.clientWidth;
          this.cnv.height = this.ele.clientHeight;
      },
      update(){
          const that=this;
          if(this.longTap){
              this.addBall();
          } 
          if(this.remove){
            if(this.balls.length>100){
              this.balls=[];
            }
          }
          this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
          // ctx.fillStyle = 'rgba(255, 255, 255, 0)';
          // ctx.fillRect(0, 0, cnv.width, cnv.height);
          this.balls.forEach((item,index) => {
              item.draw(that.ctx,'fill');
              // 缓动动画
              item.vx = (item.dx - item.x) * that.easing;
              item.vy = (item.dy - item.y) * that.easing;
              item.x += item.vx;
              item.y += item.vy;
              item.sx += -item.sx * that.easing*2;
              if(item.sx>0.1){
                item.radius-=item.radius * that.easing*2;
              }
                          
          })
          //彩蛋
          this.ctx.fillStyle = '#f8f8f8';
          this.ctx.font  = '10px bolder';
          this.ctx.textAlign  = 'center';
          this.ctx.fillText('Designed By Su',130,this.ele.clientHeight-50)
      },
      addBall(){   
             let  temp_balls= this.getEnoughBall(this.count, this.mouseX, this.mouseY);
              for (var i = 0; i < temp_balls.length; i++) {
                  this.balls.push(temp_balls[i])
             }
                   
      },
      getEnoughBall(num, mouseX, mouseY) {
          var balls = [];

          for (let i = 0; i < num; i++) {
              var color='rgba('+255*Math.random()+','+255*Math.random()+','+0*Math.random()+')'
              var ball = new Ball(0, 0, Math.random() * (40 - 5 + 1) + 5, color);
              ball.x = mouseX + Math.random() * this.innerRadius*5 - Math.random() * this.innerRadius*5;
              ball.y = mouseY + Math.random() * this.innerRadius*2 - Math.random() * this.innerRadius*2;

              // 计算最终位置
              var x = mouseX - ball.x;

              ball.dx=ball.x;
              ball.dy = mouseY*Math.random();
              balls.push(ball);
          }

          return balls;
      },
   },
   mounted(){
    const that=this;
    this.cnv=document.getElementById('mineCanvas');
    this.ctx=this.cnv.getContext('2d');
    // 初始化宽高
    this.resize();
    //监听
    this.ele.addEventListener('touchstart', (e) => {
        that.longTap=true;
        that.mouseX = e.touches[0].clientX - that.ele.offsetLeft;
        that.mouseY = e.touches[0].clientY - that.ele.offsetTop;  
        that.addBall()
    }, false)
    this.ele.addEventListener('touchend', (e) => {
        this.longTap=false;
    }, false)
    this.ele.addEventListener('touchcancel', (e) => {
        this.longTap=false;
    }, false)
    this.ele.addEventListener('touchmove', (e) => {
        that.mouseX = e.touches[0].clientX - that.ele.offsetLeft;
        that.mouseY = e.touches[0].clientY - that.ele.offsetTop;  
    }, false);
    this.ele.addEventListener('mousedown', (e) => {
        that.longTap=true;
        that.mouseX =e.clientX - that.ele.offsetLeft;
        that.mouseY = e.clientY - that.ele.offsetTop;  
        that.addBall()
    }, false)
    this.ele.addEventListener('mouseup', (e) => {
        that.longTap=false;
    }, false)
    this.ele.addEventListener('mousemove', (e) => {
        that.mouseX =e.clientX - that.ele.offsetLeft;
        that.mouseY = e.clientY - that.ele.offsetTop;  
    }, false);
    ;(function animation() {
            that.update();
            requestAnimationFrame(animation);
    })()

   }
}
</script>
<style lang='stylus' scoped>
      #mineCanvas {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            background-color: rgba(0,0,0,0);
      }
</style>