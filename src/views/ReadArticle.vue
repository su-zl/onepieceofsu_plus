<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">详情</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div id="container">
         <div v-for="item in Data" v-bind:class="item.class">{{item.content}}</div>
    </div> 
    <div>
       <i id="comment" @click="addComment"><font-awesome-icon icon="comment-dots" /></i>
    </div>
    <CommentDialog :popupVisible="popupVisible" type="article" @hideDialog="hideDialog"></CommentDialog>
  </div> 
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import CommentDialog from '../components/CommentDialog.vue'
import {Indicator } from 'mint-ui'

export default {
  name:'timeAlbum',
  components:{
    SideMenu,
    CommentDialog
  },
  data(){
    return{
         loading:'visible',
         popupVisible:false,
         Data:[
         {    
             class:'title',
             content:'开车冲进水里应该怎么自救'
         },
         {    
             class:'pagetitle',
             content:'1、大部分人都认为车辆如果掉进水里'
         },
         {    
             class:'section',
             content:'大部分人都认为车辆如果掉进水里，车门肯定打不开。其实不是的，在车辆冲进水里的几分钟之内，车辆还没有完全沉浸入水中，这个时候力气大是可以打开门的。在这个时候，我们可以迅速打开车门进行逃生。而且，在这段时间内，车辆可能还没有断电，窗户也是可以打开的。如果打不开，破窗逃生吧。'
         },
         {    
             class:'pagetitle',
             content:'2、车辆冲进水中后'
         },
         {    
             class:'section',
             content:'车辆冲进水中后，千万不要觉得不会游泳就放弃逃生了。这不对吧，毕竟冲进水的时候，肯定旁边有看到的人，如果你从车里逃出来的话，别人看到了还可以去救你呢。'
         },
         {    
             class:'pagetitle',
             content:'3、车辆在冲进水中后'
         },
         {    
             class:'section',
             content:'车辆在冲进水中后，一定要打开车灯吸引附近人的注意力。这样逃生的几率也会大一些。千万不要坐以待毙。在车里逃出来后，如果真的不会水，可以暂时先爬上车顶等待救援。因为车辆下沉还是需要一段时间的。不要慌张就好。'
         },
         ]
    }
  },
  computed:{
    id(){
        return this.$route.params.id ;
    },
  },
  methods:{
    addComment(){
       this.popupVisible=true;
    },
    hideDialog(){
       this.popupVisible=false;
    } 
  },
  mounted(){
      // this.boxHeight=document.getElementsByClassName('imgBox')[0].clientWidth;
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
        padding: 10px 10px;
        div{
          line-height: 1.8em;
        }
      }
      .title{
         font-size: 1.2em;
         font-weight: bolder;
         padding-bottom: 5px;
         text-align: center;
      }
      .pagetitle{
         font-size: 1em;
         /*font-weight: bold;*/
         padding: 3px 0px; 
      }
      .section{
         font-size: 0.9em;
         padding: 3px 0px; 
      }
      #comment{
        color:#aaa;
        font-size:1.5em;
        float: right;
        margin-right: 20px;
      }
      .mint-popup-top{
        top: 10%;
        width: 90%;
        border-radius: 5px;
      }
</style>