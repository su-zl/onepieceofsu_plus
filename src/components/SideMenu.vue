<template>
  <div>
      <div class="sidebar" v-bind:style="{right:sidebarRight+'px'}">
       <i class="bars" :style="{color:color?color:'#000'}"   @click="showSidebar"><font-awesome-icon icon="bars" /></i>
       <div>
           <div style="overflow:hidden;text-align:center;margin-top:20px;">
              <img :src="img_src" :style="{width:imgWidth+'px',borderRadius:'50%'}">
           </div>
           <transition-group name="flip-list"> 
              <div  style="text-align:center;" key="1">
                <mt-button type="default" style="margin-bottom:10px;" size="small" v-show="!show_Submit" @click="showSubmit">登录</mt-button>
                <p v-show="person_name">一位不愿透露名字的网友</p>
              </div>
              <div  key="2" v-show="show_Submit">
                  <input style="width:100%;border:none;height:35px;padding:0px 10px;margin-top:10px;" type="text" placeholder="一位不愿透露名字的网友?" v-model="username" ref="username">
                  <div style="margin-top:10px;text-align:center;">
                    <mt-button type="primary" size="small" style="margin-right:5px;" @click="submit">提交</mt-button>
                    <mt-button type="default" size="small" plain @click="hideSubmit">取消</mt-button>
                  </div>
              </div>
              <ul  class="sideContent" ref="contenter" key="3">
                 <li>
                  <i><font-awesome-icon icon="home" /></i>
                  <router-link to="/default">首页</router-link>
                 </li>
                 <li>
                  <i>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-douban"></use>
                      </svg>
                  </i>
                  <router-link to="/book-movie-music">书影音</router-link>
                 </li>
                 <li>
                  <i><font-awesome-icon icon="calendar" /></i>
                  <router-link to="/timeTravel">时光里</router-link>
                 </li>
                 <li>
                     <i><font-awesome-icon icon="edit" /></i>
                     <router-link to="/article">文字记</router-link>
                 </li>
                 <li>
                  <i >
                      <font-awesome-icon icon="fish" />
                  </i>
                  <router-link to="/whimsy">钓鱼记</router-link>
                  </li>   
                 <li>
                  <i><font-awesome-icon icon="comment" /></i>
                  <router-link to="/message">留言</router-link>
                 </li>   
             </ul>  
              
           </transition-group>
           <!-- <div style="text-align:center;" > 
              <transition  enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                 <mt-button type="default" style="margin-bottom:10px;" size="small" v-show="!person_name" @click="showSubmit">登录</mt-button>
              </transition>
              <transition  enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                  <p v-show="person_name">一位不愿透露名字的网友</p>
              </transition>
           </div>
           <transition :duration="1000" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
             <div v-show="show_Submit"  style="background-color:#fff;border-radius:10px;padding-bottom:5px;overflow:hidden;">
                  <input style="width:100%;border:none;height:35px;padding:0px 10px;margin-top:10px;" type="text" placeholder="一位不愿透露名字的网友?" v-model="username" ref="username">
                  <div style="margin-top:10px;text-align:center;">
                    <mt-button type="primary" size="small" style="margin-right:5px;" @click="submit">提交</mt-button>
                    <mt-button type="default" size="small" plain @click="hideSubmit">取消</mt-button>
                  </div>
              </div>
            </transition> -->
       </div>
           <!-- <ul class="sideContent" ref="contenter">
               <li>
                <i><font-awesome-icon icon="home" /></i>
                <router-link to="/default">首页</router-link>
               </li>
               <li>
                <i>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-douban"></use>
                    </svg>
                </i>
                <router-link to="/book-movie-music">书影音</router-link>
               </li>
               <li>
                <i><font-awesome-icon icon="calendar" /></i>
                <router-link to="/timeTravel">时光里</router-link>
               </li>
               <li>
                   <i><font-awesome-icon icon="edit" /></i>
                   <router-link to="/article">文字记</router-link>
               </li>
               <li>
                <i >
                    <font-awesome-icon icon="fish" />
                </i>
                <router-link to="/whimsy">钓鱼记</router-link>
                </li>   
               <li>
                <i><font-awesome-icon icon="comment" /></i>
                <router-link to="/message">留言</router-link>
               </li>   
           </ul>    -->
    </div>
    <div v-show="mid" @click="hideSideBar" style="width: 100%;height: 200%;background-color: rgba(0,0,0,0.2);position: fixed;z-index: 98;">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'mint-ui';
import { Field } from 'mint-ui';

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);

// import  Velocity from 'velocity-animate'

export default {
  name:'SideMenu',
  props:['color'],
  data(){
    return {
      sidebarRight:null,
      mid:false,
      imgWidth:null,
      show_Submit:false,
      username:''
    }
  },
  computed:{
     host(){
       return this.$store.state.host;
     },
     person_src(){
       return this.$store.state.person_src;
     },
     person_name(){
       return this.$store.state.person_name;
     },
     img_src(){
         if(!this.person_name){
            return this.host+'/person/primary/person.jpg'
         }else{
            return this.host+this.person_src;
         }
     }
  },
  methods:{
     showSubmit(){
        this.show_Submit=true;    
        setTimeout(()=>{
           this.$refs.username.focus();
        },100)    
     },
     hideSubmit(){
         this.show_Submit=false;    
     },
     submit(){

     },
     complete(){
       console.log("complete");
     },
     showSidebar(){
          this.mid=true;
          let that=this;
          const sideAnime=setInterval(function(){
              if(that.sidebarRight<0){
                  that.sidebarRight+=Math.abs(that.sidebarRight)/10;
                  if(that.sidebarRight>-1){
                      that.sidebarRight=0;
                  }
              }else{
                clearInterval(sideAnime);
              }
          },10)
      },
      hideSideBar(){
        this.mid=false;
        let that=this;
        const sideAnime=setInterval(function(){
          if(that.sidebarRight>-260){
              that.sidebarRight-=Math.abs(that.sidebarRight-260)/10;
              if(that.sidebarRight<-259){
                  that.sidebarRight=-260;
              }
          }else{
            clearInterval(sideAnime);
          }
        },20)
      },
  },
  mounted(){
      this.sidebarRight=document.getElementsByClassName('sideContent')[0].clientWidth*-1;
      this.imgWidth=document.getElementsByClassName('sideContent')[0].clientWidth/2.5;
  }
}
</script>
<style lang='stylus' scoped>
      .bars{
        width:35px;
        font-size:20px;
        text-align:center;
        position:absolute;
        top:5px;
        left:-30px;
      }
      i{
        display:inline-block;
        width:30px;
        text-align:center;
      }
      .sidebar{
        display: inline-block;
        width: 260px;
        height: 100%;
        position: fixed;
        top: 0px;
        right: -260px;
        z-index: 99;
        background-color: #eee;
      }
      .sideContent{
        color: #000;
        padding: 10px 30px 0px 30px;
        list-style: none;
        font-size: 20px;
      }
      .sideContent>li{
        margin-bottom: 20px;
      }
      .sideContent a{
         margin-left: 10px;
         font-size: 20px;
      }
      .icon {
          width: 1em;
          height: 1em;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
      }
      a{
         text-decoration: none;
         color: #000;
       }
      .flip-list-enter,flip-list-leave-to{
         opacity: 0;
         transform: translateY(100px);
      }
      .flip-list-leave-active{
         position: absolute;
         opacity: 0;
      }
      .flip-list-move {
          transition: transform 1s;
      }
      </style>