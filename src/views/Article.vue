<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">文字记</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div>
         <ul class="container" >
           <li v-for="item in Data">
              <div>
                <div class="day">{{item.day}}</div>
                <div class="month">{{item.month}}</div>
              </div>
              <div @click="readArtile(item.id)">
                 <h4 class="title">{{item.title}}</h4>
                 <p class="content">{{item.content}}</p>
              </div>
           </li>
         </ul>
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
         container:'',
         loading:'visible',
         testshow1:true,
         Data:[
         {    
             id:'0',
             day:'14',
             month:'三月',
             title:'瘦毛猴的爱情？',
             content:'一只鱼言于郑表达方式打飞机收到货福建省倒海翻江'
         },
         {
             id:'1',
             day:'14',
             month:'三月',
             title:'瘦毛猴的爱情？',
             content:'一只鱼言于郑表达方式打飞机收到货福建省倒海翻江'
         },
         {
             id:'2',
             day:'14',
             month:'三月',
             title:'瘦毛猴的爱情？',
             content:'一只鱼言于郑表达方式打飞机收到货福建省倒海翻江'
         }
         ]
    }
  },
  methods:{
    readArtile(id){
         this.$router.push({name:'readArticle',params:{id}});
    }
  },
  mounted(){
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
      .container{
        padding:10px 5px 0px 0px; 
      }  
      .container>li{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;

      }
      .container>li>div:first-child{
          width: 20%;
          text-align: center;

      }
      .day{
        font-size: 1.5em;
        font-weight: bolder;
        border-left: 2px #ffa000 solid;
      }
      .month{
        font-size: 0.7em;
        border-left: 2px #ffa000 solid;
      }
      .container>li>div:last-child{
        background-color: #fff;
        padding: 5px 8px;
        border-radius: 5px;
      }
      .title{
        margin-bottom: 5px;
      }
      .content{
        color: #aaa;
        font-size: 0.7em;
      }
</style>