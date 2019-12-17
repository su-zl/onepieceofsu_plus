<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3 style="text-align: center;width:150px;margin:0 auto;">文字记</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>

    <div class="page-loadmore-wrapper" :style="{height:wrapHeight+'px'}" >
        <mt-loadmore :autoFill=false :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange">
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
                 <li style="display:block;" v-if="pullLoad">
                    <p style="text-align: center;font-size:0.8em;color:#333;">End</p>
                 </li>
               </ul>
          </div> 
          <div slot="bottom" class="mint-loadmore-bottom">
            <span id="animate" v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'pull' }">↑</span>
            <span v-show="bottomStatus == 'loading'">加载中</span>
          </div>
          <div v-if="isPc && !allLoaded && firstLoaded" style="text-align:right;margin-right:13px;">
              <mt-button  plain icon="more" type="default" size="normal"  @click="nextPage
              " ></mt-button>
          </div>
        </mt-loadmore>
    </div>

    
    
  </div> 
</template>

<script>
import { Button } from 'mint-ui'
import SideMenu from '../components/SideMenu.vue'
import {Indicator,Loadmore } from 'mint-ui'
import Vue from 'vue'
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);

const axios = require('axios');

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
         allLoaded:false,
         wrapHeight:1000,
         bottomStatus:'pull',
         Data:[],
         pageIndex:1,
         firstLoaded:false,
         pullLoad:false,
    }
  },
  computed:{
    host(){
      return this.$store.state.host;
    },
    isPc(){
      return this.$store.state.isPc;
    }
  },
  methods:{
    handleBottomChange(status){
         console.log("status "+status);
         this.bottomStatus = status;
    },
    loadBottom(){
        console.log('loadBottom');
        this.$indicator.open({text: '',spinnerType: 'double-bounce'});
        this.pageIndex++;
        const that=this;
        axios.get(that.host+'/api/article?pageIndex='+this.pageIndex)
        .then(function(response){
             console.log(response);
             let data=response.data;
             if(data.rows.length>0){
                for (var i = 0; i < data.rows.length; i++) {
                  that.Data.push(data.rows[i]);
                }
             }
             if(data.rows.length<10){
                  that.allLoaded=true;
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
        
        
    },
    readArtile(id){
         this.$router.push({name:'readArticle',params:{id}});
    },
    nextPage(){
        this.loadBottom();
    }
  },
  mounted(){
    this.wrapHeight=document.documentElement.clientHeight-document.getElementById('header').clientHeight;
  },
  created(){
      this.$indicator.open({text: '',spinnerType: 'double-bounce'});
      const that=this;
      axios.get(that.host+'/api/article?pageIndex='+that.pageIndex)
      .then(function(response){
           console.log(response);
           let data=response.data;
           that.Data=data.rows;
           if(data.rows.length<10){
            that.allLoaded=true;
           }
           //首次加载完成
           that.firstLoaded=true
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
        width:80%;
        background-color: #f6f6f6;
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
      #animate{
         display:inline-block;
         transition:transform  0.5s;
      }
      .rotate{
          transform:rotate(540deg);
      }
      .page-loadmore-wrapper {
          overflow: scroll;
      } /*loadmore需添加样式 */
</style>