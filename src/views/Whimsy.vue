<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">随想</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div class="page-loadmore-wrapper" :style="{height:wrapHeight+'px'}">
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill=false ref="loadmore" @bottom-status-change="handleBottomChange">
          <ul id="container"> 
               <li class="section" v-for="(item,index) in Data" v-bind:key="item.id">  
                 <div class="content">
                  <p>{{item.content}}</p>
                 </div>
                 <div class="date">
                   <span>{{item.date}}</span>
                 </div>
                 <viewer :images="item.img_src">
                    <div class="imgList">
                       <div class="imgBox" v-for="imgSrc in item.img_src" :style="{width:imgWidth+'px',height:imgWidth+'px'}" :key="imgSrc">
                         <img @load="AutoResizeImage(imgWidth,$event.target)" :src="imgSrc" >
                       </div>
                    </div>
                 </viewer>
                 <div style="text-align:right;padding-top:5px;">
                   <i id="comment" @click="addComment(item.id,index)"><font-awesome-icon icon="comment-dots" /></i>
                 </div>
                 <div style="border-bottom:1px solid #aaa"></div>
                 <div>
                     <div v-for="commentItem in item.commentList">
                        <span class="name">{{commentItem.name}}：</span>
                        <span class="comment">{{commentItem.content}}</span>
                     </div>
                 </div>
              </li>
              <li v-if="pullLoad">
                <div style="border:1px solid #aaa;"></div>
                <p style="text-align:center">End</p>
              </li>
          </ul> 
          <div slot="bottom" class="mint-loadmore-bottom">
            <span id="animate" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'pull' }">↑</span>
            <span v-show="bottomStatus == 'loading'">加载中</span>
          </div>
        </mt-loadmore>
    </div>

    <CommentDialog :popupVisible="popupVisible" :itemId="item_id" type="whimsy" @successSubmit="successSubmit" @hideDialog="hideDialog"></CommentDialog>
    
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
const axios = require('axios');

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
         pullLoad:false,
         wrapHeight:1000,
         bottomStatus:'pull',
         pageIndex:1,
         Data:[],
         commentIndex:null,
         commentContent:{}
    }
  },
  computed:{
    host(){
      return this.$store.state.host;
    },
    person_name(){
      return this.$store.state.person_name
    }
  },
  methods:{
    handleBottomChange(status){
       console.log("status "+status);
       this.bottomStatus = status;
    },
    addComment(id,index){
      if(!this.person_name){
          Toast({
            message: '需要先登录哦',
            position: 'bottom',
            duration: 500
          });
          setTimeout(()=>{
             document.getElementsByClassName('bars')[0].click();
          },250)
          
      }else{
        this.item_id=id;
        this.popupVisible=true;
        this.commentIndex=index;
      }
    },
    successSubmit(data){
      this.Data[this.commentIndex].commentList.push(data);
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
        this.$indicator.open({text: '',spinnerType: 'double-bounce'});
        this.pageIndex++;
        const that=this;
        axios.get(this.host+'/api/whimsy?pageIndex='+this.pageIndex)
        .then(function(response){
             console.log(response);
             let data=response.data.rows;
             for (var i = 0; i < data.length; i++) {
               data[i].img_src=data[i].img_src.split('&')
               for (var j = 0; j <  data[i].img_src.length; j++) {
                  data[i].img_src[j]=that.host+data[i].img_src[j]
               }
             }
             if(data.length>0){
                for (var i = 0; i < data.length; i++) {
                  that.Data.push(data[i])
                }
             }
             if(data.length<10){
                  that.allLoaded = true;// 若数据已全部获取完毕
                  that.pullLoad=true;
             }
             that.$refs.loadmore.onBottomLoaded();
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){
          that.$indicator.close();
        })
        
    }
  },
  mounted(){
      this.imgWidth=(document.getElementById("container").clientWidth-44)/3;
      this.wrapHeight=document.documentElement.clientHeight-document.getElementById('header').clientHeight; 
  },
  created(){
      this.$indicator.open({text: '',spinnerType: 'double-bounce'});
      const that=this;
      axios.get(this.host+'/api/whimsy?pageIndex='+this.pageIndex)
      .then(function(response){
           console.log(response);
           let data=response.data.rows;
           for (var i = 0; i < data.length; i++) {
             data[i].img_src=data[i].img_src.split('&')
             for (var j = 0; j <  data[i].img_src.length; j++) {
                data[i].img_src[j]=that.host+data[i].img_src[j]
             }
           }
           if(data.length<10){
              that.allLoaded = true;// 若数据已全部获取完毕
           }
           that.Data=data;
      })
      .catch(function(error){
          console.log(error);
      })
      .finally(function(){
        that.$indicator.close();
      }) 
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