<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">随想</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div class="page-loadmore-wrapper" :style="{height:wrapHeight+'px'}">
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange">
          <ul id="container"> 
               <li class="section" v-for="item in Data" v-bind:key="item.id">  
                 <div class="content">
                  <p>{{item.content}}</p>
                 </div>
                 <div class="time">
                   <span>{{item.time}}</span>
                 </div>
                 <viewer :images="item.imgList">
                    <div class="imgList">
                       <div class="imgBox" v-for="imgSrc in item.imgList" :style="{width:imgWidth+'px',height:imgWidth+'px'}" :key="imgSrc">
                         <img @load="AutoResizeImage(imgWidth,$event.target)" :src="imgSrc" >
                       </div>
                    </div>
                 </viewer>
                 <div style="text-align:right;padding-top:5px;">
                   <i id="comment" @click="addComment(item.id)"><font-awesome-icon icon="comment-dots" /></i>
                 </div>
                 <div style="border-bottom:1px solid #aaa"></div>
                 <div>
                     <div v-for="commentItem in item.commentList">
                        <span class="name">{{commentItem.name}}:</span>
                        <span class="comment">{{commentItem.comment}}</span>
                     </div>
                 </div>
              </li>
          </ul> 
          <div slot="bottom" class="mint-loadmore-bottom">
            <span id="animate" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'pull' }">↑</span>
            <span v-show="bottomStatus == 'loading'">加载中</span>
          </div>
        </mt-loadmore>
    </div>

    <CommentDialog :popupVisible="popupVisible" :id="item_id" type="article" @hideDialog="hideDialog"></CommentDialog>
    
  </div> 
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import CommentDialog from '../components/CommentDialog.vue'
import {Indicator,Toast,Loadmore  } from 'mint-ui'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.component(Loadmore.name, Loadmore);
Vue.use(Viewer)

export default {
  name:'timeAlbum',
  components:{
    SideMenu,
    CommentDialog
  },
  data(){
    return{
         popupVisible:false,
         loading:'visible',
         imgWidth:null,
         item_id:null,
         allLoaded:false,
         wrapHeight:300,
         bottomStatus:'pull',
         Data:[
         {
            id:'1',
            content:'天上一只鹅，地上一只鹅，天上那只肥鹅鹅爱上地上那只瘦鹅鹅，鹅飞鹅打鹅碰鹅。',
            time:'2018-10-21 10:21',
            imgList:[require('../assets/img/timeAlbum/1.jpg'),require('../assets/img/timeAlbum/2.jpg'),require('../assets/img/timeAlbum/3.jpg'),require('../assets/img/timeAlbum/4.jpg'),require('../assets/img/timeAlbum/5.jpg')],
            commentList:[
            {
              name:'一名不愿透露姓名的网友',
              comment:'红红火火恍恍惚惚'
            },
            {
              name:'一名不愿透露姓名的网友2',
              comment:'红红火火恍恍惚惚'
            }
            ]

         },
         {
            id:'2',
            content:'天上一只鹅，地上一只鹅，天上那只肥鹅鹅爱上地上那只瘦鹅鹅，鹅飞鹅打鹅碰鹅。',
            time:'2018-10-21 10:21',
            imgList:[require('../assets/img/timeAlbum/6.jpg'),require('../assets/img/timeAlbum/7.jpg'),require('../assets/img/timeAlbum/8.jpg'),require('../assets/img/timeAlbum/9.jpg'),require('../assets/img/timeAlbum/10.jpg')],
            commentList:[
            {
              name:'一名不愿透露姓名的网友',
              comment:'红红火火恍恍惚惚'
            },
            {
              name:'一名不愿透露姓名的网友2',
              comment:'红红火火恍恍惚惚'
            }
            ]

         },{
            id:'3',
            content:'天上一只鹅，地上一只鹅，天上那只肥鹅鹅爱上地上那只瘦鹅鹅，鹅飞鹅打鹅碰鹅。',
            time:'2018-10-21 10:21',
            imgList:[require('../assets/img/timeAlbum/11.jpg'),require('../assets/img/timeAlbum/12.jpg'),require('../assets/img/timeAlbum/13.jpg'),require('../assets/img/timeAlbum/14.jpg'),require('../assets/img/timeAlbum/15.jpg')],
            commentList:[
            {
              name:'一名不愿透露姓名的网友',
              comment:'红红火火恍恍惚惚'
            },
            {
              name:'一名不愿透露姓名的网友2',
              comment:'红红火火恍恍惚惚'
            }
            ]
         },
         ]
    }
  },
  computed:{

  },
  methods:{
    handleBottomChange(status){
       console.log("status "+status);
       this.bottomStatus = status;
    },
    addComment(id){
       this.item_id=id;
       this.popupVisible=true;
    },
    hideDialog(){
      this.popupVisible=false;
    },
    AutoResizeImage(minWidth,objImg){
            var img = new Image();
            img.src = objImg.src;

            var wRatio;
            var Ratio = 1;
            var w = img.width;
            var h = img.height;
            if(w>h){
               Ratio=minWidth / h;
            }else{
               Ratio=minWidth / w;  
            }

            w = w * Ratio;
            h = h * Ratio;
            
            objImg.height = h;
            objImg.width = w;
    },
    loadBottom(){
        console.log('loadBottom');
        // this.allLoaded = true;// 若数据已全部获取完毕
        const count=this.Data.length;
        for (var i = 0; i < count; i++) {
          this.Data.push(this.Data[i]);
        }
        this.$refs.loadmore.onBottomLoaded();
    }
  },
  mounted(){
      this.imgWidth=(document.getElementsByClassName("section")[0].clientWidth-24)/3;
      this.wrapHeight=document.documentElement.clientHeight-document.getElementById('header').clientHeight;
      Indicator.open('加载中...')
      setTimeout(()=>{
        Indicator.close(); 
      },500) 
  }
}
</script>
<style lang='stylus' scoped>
      #header{
        color:#fff;
        background-color: rgba(50,50,50,1);      
      }
      #container{
        padding:10px 10px;
        background-color: #fff;
      }

      .section{
         padding: 10px;
         background-color: #f0f0f0;
         line-height: 2em;
         text-align: left;
         margin-bottom: 10px;
      }
      .content{
         padding-bottom: 10px;
         font-weight: bold;
      }
      .time{
         color: #aaa;
         font-size: 0.8em;
      }
      .name{
        font-size: 0.6em;
        color: #8470FF;
      }
      .comment{
        font-size: 0.6em;
      }
      .imgList{
        display: flex;
        justify-content: flex-start;
        flex-wrap:wrap;
      }
      .imgBox{
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        align-items:center; ;
        overflow: hidden;
        margin:0px 1px 1px 0px;
      }
      #comment{
        color:#aaa;
        font-size:1.5em;
        margin-right: 10px;
      }
      .page-loadmore-wrapper {
          overflow: scroll;
      }
      #animate{
         display:inline-block;
         transition:transform  0.5s;
      }
      .rotate{
          transform:rotate(540deg);
      }
</style>