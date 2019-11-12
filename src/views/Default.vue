<template>
  <div id="container">
    <div id="header">
        <h3>OnePieceOfSu</h3>
    </div>
    <SideMenu></SideMenu>
    <div id="content">
        <table  v-bind:style="{width: '100%',height:tableHeight+'px'}">
          <tr is="OverturnBox" v-for="data in  bombData"  :items="data" :table-height="tableHeight" :table-width="tableWidth" @bomb-check="resultCheck" ></tr>
        </table>
    </div>
    
  </div>
</template>
<script>
import Vue from 'vue'
import SideMenu from '../components/SideMenu.vue'
import OverturnBox from '../components/OverturnBox.vue'
// import app from '../config/ajax.js'
import {mapState} from 'vuex'
// import {Indicator } from 'mint-ui'
// import { Swipe, SwipeItem } from 'mint-ui'
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)

export default{
  name:'default',
  components:{
    SideMenu,
    OverturnBox
  },
  data(){
    return{
        tableHeight:'',
        tableWidth:'',
        loadingWidth:'',
        loadingHeight:'',
        loading:'visible',
        Data:[
        [
        {order:0,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/1.jpg'},
        {order:1,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/2.jpg'},
        {order:2,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/3.jpg'}
        ],
        [
        {order:3,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/4.jpg'},
        {order:4,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/5.jpg'},
        {order:5,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/6.jpg'}
        ],
        [
        {order:6,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/7.jpg'},
        {order:7,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/8.jpg'},
        {order:8,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/9.jpg'}
        ],
        [
        {order:9,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/10.jpg'},
        {order:10,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/11.jpg'},
        {order:11,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/12.jpg'}
        ],
        [
        {order:12,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/13.jpg'},
        {order:13,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/14.jpg'},
        {order:14,isBomb:false,aroundBomb:0,isPre:true,isEnd:false,hasCheck:false,imgSrc:require('../assets/img/tree.jpg'),backImgSrc:'../assets/img/15.jpg'}
        ]
      ] 
    } 
  },
  computed:{
    bombData(){   
          var data=this.Data;;
          //随机分布图片
          var index1;
          var index2;
          var imgIndexArr=[];
          var temp=null;
          for (var i = 1; i < 16; i++) {
            imgIndexArr.push(i);
          }
          for (var i = 0; i < 10; i++) {
            index1=Math.floor(Math.random()*14);
            index2=Math.floor(Math.random()*14);
            temp=imgIndexArr[index1];
            imgIndexArr[index1]=imgIndexArr[index2];
            imgIndexArr[index2]=temp;
          }
          for (var i = 0; i < 15; i++) {
              data[Math.floor(i/3)][i%3].backImgSrc=require("../assets/img/"+imgIndexArr[i]+".jpg");
          }
          //随机生成两个雷
          do {
              index1=Math.floor(Math.random()*14);
              index2=Math.floor(Math.random()*14);
          }
          while(index1==index2)
          var col1=index1%3;
          var row1=Math.floor(index1/3);
          var col2=index2%3;
          var row2=Math.floor(index2/3);
          data[row1][col1].isBomb=true;
          // data[row1][col1].backImgSrc=require('../assets/img/bomb.jpg');
          data[row2][col2].isBomb=true;
          // data[row2][col2].backImgSrc=require('../assets/img/bomb.jpg');
          
          for (var i = 0; i < 15; i++) {
              data[Math.floor(i/3)][i%3].aroundBomb=this.checkAround(data,i);
          }
          return data;
    },
    ...mapState(['personname','personimgsrc'])
  },
  methods:{
    //计算周围的炸弹数量
    checkAround(data,order){
             var col=order%3;
             var row=Math.floor(order/3);
             var arr2=[]; //3,1
             var positionArr=[{row:row-1,col:col-1},
                              {row:row-1,col:col},
                              {row:row-1,col:col+1},
                              {row:row,col:col-1},
                              {row:row,col:col+1},
                              {row:row+1,col:col-1},
                              {row:row+1,col:col},
                              {row:row+1,col:col+1}
                              ];
            for (var i = 0; i < positionArr.length; i++) {
              if(positionArr[i].row>=0 && positionArr[i].row<5 &&positionArr[i].col>=0&&positionArr[i].col<3){
                if(data[positionArr[i].row][positionArr[i].col].isBomb){
                    arr2.push(positionArr[i]);
                }                 
              }
            }
            return arr2.length;
     },
      resultCheck(param){
            var that=this;
             function checkAround(order){
                 //检查周围八个
                 var col=order%3;
                 var row=Math.floor(order/3);
                 let arr2=[];
                 var positionArr=[{row:row-1,col:col-1},
                                  {row:row-1,col:col},
                                  {row:row-1,col:col+1},
                                  {row:row,col:col-1},
                                  {row:row,col:col+1},
                                  {row:row+1,col:col-1},
                                  {row:row+1,col:col},
                                  {row:row+1,col:col+1}
                                  ];
                for (var i = 0; i < positionArr.length; i++) {
                  if(positionArr[i].row>=0 && positionArr[i].row<5 &&positionArr[i].col>=0&&positionArr[i].col<3){
                    if(!that.bombData[positionArr[i].row][positionArr[i].col].hasCheck){
                        arr2.push(positionArr[i]);
                    }                 
                  }
                }
                 for (let i = 0; i < arr2.length; i++) {
                     if(that.bombData[arr2[i].row][arr2[i].col].aroundBomb<2 &&that.bombData[arr2[i].row][arr2[i].col].isBomb==false){
                         setTimeout(function(){
                           that.bombData[arr2[i].row][arr2[i].col].isPre=false;
                         },200*i);
                         that.bombData[arr2[i].row][arr2[i].col].hasCheck=true;
                         checkAround(arr2[i].row*3+arr2[i].col);
                     }
                 }
             }
             // 是炸弹,其余炸弹翻转,换为炸弹背景,全部禁用
             if(param.isBomb){
                 for (var i = 0; i < this.bombData.length; i++) {
                  for (var j = 0; j < this.bombData[i].length; j++) {
                      this.bombData[i][j].isEnd=true;
                      if(this.bombData[i][j].isBomb){
                        this.bombData[i][j].backImgSrc=require('../assets/img/bomb.jpg'); 
                        this.bombData[i][j].isPre=false;
                     }
                  }         
                 }
             }else{
                  let count=[];
                  checkAround(param.order);
                  this.bombData[Math.floor(param.order/3)][param.order%3].isPre=false;
                  for (let i = 0; i < this.bombData.length; i++) {
                    for (var j = 0; j < this.bombData[i].length; j++) {
                         if(this.bombData[i][j].isPre){
                           count.push({row:i,col:j});
                      }
                    }
                      
                  }
                  if(count.length==2){
                      for (let i = 0; i < count.length; i++) {
                          // this.bombData[count[i].row][count[i].col].backImgSrc=require("../assets/img/bombfree.jpg")
                          this.bombData[count[i].row][count[i].col].isPre=false;
                      }
                  }
             }
        }
  },
  mounted(){
        this.tableHeight=window.innerHeight-document.getElementById('content').offsetTop;
        this.tableWidth=document.getElementById('content').clientWidth;
        this.loadingWidth=window.innerWidth;
        this.loadingHeight=window.innerHeight;
    
  }
}
</script>
<style lang='stylus'>

      *{
        margin:0px;
        padding: 0px;
        font-family: Microsoft YaHei,Arial,sans-serif;
        user-select: none;
        background-color:transparent;
        background:none;
      }
      p{
        font-size:18px;
      }
      .fa{
        font-size: 1em;
      }
      body{
        font-size: 18px;
      }
      #header{
        padding: 5px 0px;
        color:#000;
        background-color: #ddd;
        h3{
          text-align: center;
          width:150px;
          margin:0 auto;
        }
        .bars{
          font-size: 1.5em;
          position: absolute;
          right: 7px;
          top: 5px;
        }
      }

        .bounce-leave-active {
          animation: bounce-in 2s;
        }
        .bounce-enter-active {
          animation: bounce2-in 2s;
        }
        @keyframes bounce-in {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }
        @keyframes bounce2-in {
          0% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
</style>

