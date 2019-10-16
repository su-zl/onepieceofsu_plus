<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">时光里</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div id="content">
        <div v-for="item in Data" :key="item.id" @click="enterAlbum(item.type)">
           <div class="imgBox" :style="{height:boxHeight+'px'}">
             <img @load="AutoResizeImage(boxHeight,$event.target)" :src="item.url">
           </div>
            <h4>{{item.content}}</h4>
            <p>{{item.count}}</p>
        </div>
    </div> 
    
  </div> 
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import {Indicator } from 'mint-ui'
const axios = require('axios');

export default {
  name:'timeTravel',
  components:{
    SideMenu
  },
  data(){
    return{
         loading:true,
         boxHeight:0,
         Data:[]
    }
  },
  computed:{
      host(){
        return  this.$store.state.host;
      }
  },
  methods:{
    enterAlbum:function(type){
            this.$router.push({name:'timeAlbum',params:{type:type}});
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
    }
  },
  mounted(){
        this.boxHeight=(document.getElementById("content").clientWidth-34)/2; 
  },
  created(){
      this.$indicator.open({text: '',spinnerType: 'double-bounce'});
      const that=this;
      axios.get(that.host+'/api/time_travel')
      .then(function(response){
           console.log(response);
           let data=response.data;
           for (var i = 0; i < data.length; i++) {
              data[i].url=that.host+data[i].url;
              if(data[i].type=='knowless'){
                  data[i].content='无知时代'   
              }else if(data[i].type=='primaryschool'){
                  data[i].content='小学时代'
              }else if(data[i].type=='middleschool'){
                  data[i].content='初中时代'
              }else if(data[i].type=='highschool'){
                  data[i].content='高中时代'
              }else if(data[i].type=='university'){
                  data[i].content='大学时代'
              }else if(data[i].type=='atwork'){
                  data[i].content='工作时代'
              }
           }
           that.Data=data;    
           // setTimeout(()=>{
           //   that.boxHeight=document.getElementsByClassName('imgBox')[0].clientWidth;
           // })
      })
      .catch(function(error){
          console.log(error);
      })
      .finally(function(){
        that.$indicator.close();
      })
  },
  
}
</script>
<style lang='stylus' scoped>
      #header{
        color:#fff;
        background-color: rgba(50,50,50,1);      
      }
      #content{
        margin: 30px 10px 30px 10px;
        display: flex;
        flex-wrap:wrap ;
        justify-content:space-around;

      }
      #content>div{
         width: 45%;
         margin-bottom: 20px;
         overflow: hidden;
      }
      #content p,#content h4{
        text-align: center;
      }
      #content p{
        font-size: 0.8em;
      }
      .imgBox{
        border: 1px solid #eee;
        margin-bottom: 5px;
        overflow:hidden;
      }
      .imgBox img{
         width: 100%;
      }
</style>