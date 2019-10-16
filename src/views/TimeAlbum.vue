<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">{{title}}</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div id="content">
         <viewer :images="images">
           <div class="imgList">
             <div class="imgBox" v-for="item in images" :style="{width:imgWidth+'px',height:imgWidth+'px'}">
               <img @load="AutoResizeImage(imgWidth,$event.target)" :src="item.url" >
             </div>
           </div>
          </viewer>
    </div> 
    
  </div> 
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import {Indicator } from 'mint-ui'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)
const axios = require('axios');

export default {
  name:'timeAlbum',
  components:{
    SideMenu
  },
  data(){
    return{
         loading:true,
         boxHeight:0,
         imgWidth:null,
         images: [require('../assets/img/timeAlbum/1.jpg'), require('../assets/img/timeAlbum/2.jpg'), require('../assets/img/timeAlbum/3.jpg'), require('../assets/img/timeAlbum/4.jpg'), require('../assets/img/timeAlbum/5.jpg')],
    }
  },
  computed:{
    type(){
        return this.$route.params.type ;
    },
    title(){
       switch(this.type){
        case 'knowless':
            return '无知时代';
            break;
        case 'primaryschool':
            return '小学时代';
            break;
        case 'middleschool':
            return '初中时代';
            break;
        case 'highschool':
            return '高中时代';
            break;
        case 'university':
            return '大学时代';
            break;
        case 'atwork':
            return '工作时代';
            break;
       }
    },
    host(){
        return  this.$store.state.host;
    }
  },
  methods:{
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
  },
  mounted(){
      this.imgWidth=(document.getElementById("content").clientWidth-4)/4; 
  },
  created(){
      this.$indicator.open({text: '',spinnerType: 'double-bounce'});
      const that=this;
      axios.get(that.host+'/api/time_album?type='+this.type)
      .then(function(response){
           console.log(response);
           let data=response.data;
           for (var i = 0; i < data.length; i++) {
             data[i].url=that.host+data[i].url;
           }
           that.images=data;

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
      #content{
        margin: 5px;
      }
      .imgList{
        display: flex;
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
</style>