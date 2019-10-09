<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3>留言板</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div id="tips" @click="leaveMessage">
      <p style="font-size:0.7em;">留个言吧......</p>
    </div>
    
    <div class="page-loadmore-wrapper" :style="{height:wrapHeight+'px'}" >
        <mt-loadmore :autoFill=false :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange">
          <div id="container">
              <div class="section" v-for="item in Data" v-bind:key="item.id">    
                 <div>
                  <p class="name">{{item.name}}</p>
                  <p class="date">{{item.date}}</p>
                 </div>
                 <div>
                   <p class="content">{{item.content}}</p>
                 </div>     
              </div>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span id="animate" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'pull' }">↑</span>
            <span v-show="bottomStatus == 'loading'">加载中</span>
          </div>
        </mt-loadmore>
    </div>

      
    <CommentDialog :popupVisible="popupVisible" type="message" @hideDialog="hideDialog"></CommentDialog>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import {Indicator } from 'mint-ui'
import CommentDialog from '../components/CommentDialog.vue'

export default {
  name:'message',
  components:{
    SideMenu,
    CommentDialog
  },
  data(){
    return{
         container:'',
         loading:'visible',
         imgWidth:null,
         popupVisible:false,
         allLoaded:false,
         wrapHeight:300,
         bottomStatus:'pull',
         Data:[
         {
            id:'0',
            content:'天上一只鹅，地上一只鹅，天上那只肥鹅鹅爱上地上那只瘦鹅鹅，鹅飞鹅打鹅碰鹅。',
            date:'2018-10-21 ',
            name:"一名不愿透露姓名的网友"
         },
         {
            id:'1',
            content:'天上一只鹅，地上一只鹅，天上那只肥鹅鹅爱上地上那只瘦鹅鹅，鹅飞鹅打鹅碰鹅。',
            date:'2018-10-21 ',
            name:"一名不愿透露姓名的网友"
         },
         {
            id:'2',
            content:'天上一只鹅，地上一只鹅，天上那只肥鹅鹅爱上地上那只瘦鹅鹅，鹅飞鹅打鹅碰鹅。',
            date:'2018-10-21 ',
            name:"一名不愿透露姓名的网友"
         },
         {
            id:'3',
            content:'天上一只鹅，地上一只鹅，天上那只肥鹅鹅爱上地上那只瘦鹅鹅，鹅飞鹅打鹅碰鹅。',
            date:'2018-10-21 ',
            name:"一名不愿透露姓名的网友"
         }
         ]
    }
  },
  methods:{
      handleBottomChange(status){
         console.log("status "+status);
         this.bottomStatus = status;
      },
      loadBottom(){
        console.log('loadBottom');
        // this.allLoaded = true;// 若数据已全部获取完毕
        const count=this.Data.length;
        for (var i = 0; i < count; i++) {
          this.Data.push(this.Data[i]);
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      leaveMessage(){
        this.popupVisible=true;
      },
      hideDialog(){
       this.popupVisible=false;
    } 
  },
  mounted(){
      this.imgWidth=(document.getElementsByClassName("section")[0].clientWidth-24)/3;
      this.wrapHeight=document.documentElement.clientHeight-document.getElementById('header').clientHeight-document.getElementById('tips').clientHeight;
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
      #tips{
        color: #aaa;
        border-bottom: 8px solid #ddd;
        padding: 5px 0px 5px 5px;
      }
      #container{ 
        background-color: #fff;
      }
      
      .section{
         padding: 10px 10px 10px 30px;
         background-color: #eee;  
         text-align: left;
         margin-bottom: 10px;
         background-image: url(../assets/img/wood.jpg);
         background-repeat: repeat-y;
      }
      .name{
         font-size: 0.9em;  
         font-weight: bold;
      }
      .date{
        color: #aaa;
        font-size: 0.7em; 
      }
      .content{
         padding-bottom: 10px;
         line-height: 1.7em;
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