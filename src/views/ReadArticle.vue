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
         Data:[]
        }
  },
  computed:{
    id(){
        return this.$route.params.id ;
    },
    host(){
      return this.$store.state.host;
    }
  },
  methods:{
    addComment(){
       this.popupVisible=true;
    },
    hideDialog(){
       this.popupVisible=false;
    } 
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
</style>