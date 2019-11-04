<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;margin:0 auto;">详情</h3>
    </div> 
    <SideMenu :color="color"></SideMenu>
    <div id="container" @touchmove="changeColor">
         <div v-for="item in Data.article" v-bind:class="item.class">{{item.content}}</div>
         <div style="border-bottom:1px solid #aaa"></div>
         <div>
             <div v-for="commentItem in Data.commentList">
                <span class="name">{{commentItem.name}}：</span>
                <span class="comment">{{commentItem.content}}</span>
             </div>
         </div>
    </div> 

    <div>
       <i id="comment" @click="addComment"><font-awesome-icon icon="comment-dots" /></i>
    </div>
    <CommentDialog :popupVisible="popupVisible" :itemId="item_id" type="article" @hideDialog="hideDialog" @successSubmit="successSubmit"></CommentDialog>
  </div> 
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import CommentDialog from '../components/CommentDialog.vue'
import {Indicator,Toast } from 'mint-ui'
const axios = require('axios');

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
         Data:[],
         item_id:null,
         scroolHeight:null,
         color:'#fff',
        }
  },
  computed:{
    id(){
        return this.$route.params.id ;
    },
    host(){
      return this.$store.state.host;
    },
    person_name(){
      return this.$store.state.person_name
    }
  },
  methods:{
    addComment(){
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
        this.item_id=this.id;
        this.popupVisible=true;
      }
    },
    hideDialog(){
       this.popupVisible=false;
    },
    successSubmit(data){
       this.Data.commentList.push(data);
    },
    sectionOffset(){
             return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    },
    changeColor(){
       console.log(this.sectionOffset());
       if(this.sectionOffset()>this.scroolHeight){
            this.color='#000'
       }else{
            this.color='#fff'
       }
    }
  },
  mounted(){
        this.scroolHeight=document.getElementById("header").clientHeight;
  },
  created(){
      this.$indicator.open({text: '',spinnerType: 'double-bounce'});
      const that=this;
      axios.get(that.host+'/api/article_detail?id='+this.id)
      .then(function(response){
           console.log(response);
           let data=response.data;
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
      .name{
        font-size: 0.6em;
        color: #8470FF;
      }
      .comment{
        font-size: 0.6em;
      }
</style>