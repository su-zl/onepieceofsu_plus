<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">时光里</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div id="content">
        <div v-for="item in Data" :key="item.id" @click="enterAlbum(item.id)">
           <div class="imgBox" :style="{height:boxHeight+'px'}">
             <img :src="item.imgSrc" :style="{height: boxHeight+'px'}">
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

export default {
  name:'timeTravel',
  components:{
    SideMenu
  },
  data(){
    return{
         loading:true,
         boxHeight:0,
         Data:[
               {
                  imgSrc:require("../assets/img/1.jpg"),
                  content:"无知时代",
                  count:10,
                  id:0
               },
               {
                  imgSrc:require("../assets/img/1.jpg"),
                  content:"小学时代",
                  count:10,
                  id:1
               },
               {
                  imgSrc:require("../assets/img/1.jpg"),
                  content:"初中时代",
                  count:10,
                  id:2
               },
               {
                  imgSrc:require("../assets/img/1.jpg"),
                  content:"高中时代",
                  count:10,
                  id:3
               },
               {
                  imgSrc:require("../assets/img/1.jpg"),
                  content:"大学时代",
                  count:10,
                  id:4
               },
               {
                  imgSrc:require("../assets/img/1.jpg"),
                  content:"工作时代",
                  count:10,
                  id:5
               }
              ]
    }
  },
  methods:{
    enterAlbum:function(id){
            this.$router.push({name:'timeAlbum',params:{id}});
    }
  },
  mounted(){
      this.boxHeight=document.getElementsByClassName('imgBox')[0].clientWidth;
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
      }
      .imgBox img{
         width: 100%;
      }
</style>