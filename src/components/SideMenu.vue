<template>
  <div>
      <div class="sidebar" v-bind:style="{right:sidebarRight+'px'}">
       <i class="bars" :style="{color:color?color:'#000'}"   @click="showSidebar"><font-awesome-icon icon="bars" /></i>
       <div>
           <div style="position:absolute;top:5px;right:5px;font-size:0.6em;font-weight:bolder;color:#666;">
             <!-- <i><font-awesome-icon icon="map-marker-alt" /></i> -->
              <i style="font-size:1.6em;">
                  <svg class="icon" aria-hidden="true" ref="weather">
                   <!--  <use xlink:href="#icon-sunny"></use> -->
                  </svg>
              </i>
             <span style="margin-left:-5px;">{{city}}</span>
           </div>
           <div v-show="!option.img" style="overflow:hidden;text-align:center;margin-top:20px;position:relative">
              <img :src="img_src"  :style="{width:imgWidth+'px',height:imgWidth+'px',borderRadius:'50%'}">
              <transition enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
                <div v-show="show_Submit" @click="showFileChoose"  style="position:absolute;width:100%;height:30%;text-align:center;bottom:0px;background-color:rgba(238,238,238,0.5);">
                  <font-awesome-icon style="color:#fff;"  icon="images" />
                </div>
              </transition>
           </div>
           <div class="cropper" v-show="option.img" :style="{position:'absolute',width:windowWidth+'px',height:windowHeight+'px',left:(260-windowWidth)+'px',zIndex:'100'}">
              <div>
                 <div style="background-color:#fff;">
                   <mt-button type="default" style="margin:5px 5px;" size="small"  @click="cropCancel">取消</mt-button>
                   <mt-button type="default" style="margin:5px 5px;float:right;" size="small"  @click="cropImg">确定</mt-button>
                 </div>
              </div>
              <vueCropper 
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :canScale="option.canScale"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
              :centerBox="option.centerBox"
              :maxImgSize="option.maxImgSize"
              @imgLoad="imgLoad"
            ></vueCropper>
           </div>
           
           <transition-group name="flip-list"> 
              <div  style="text-align:center;margin-bottom:20px;" key="1">
                <mt-button type="default" style="margin-bottom:10px;" size="small" v-show="!show_Submit&&!person_name" @click="showSubmit">登录</mt-button>
                <p v-show="person_name" style="font-size:0.9em;font-weight:bolder;padding:5px;">{{person_name}}</p>
                <form style="display:none;" :action="actionAddress" method="post" enctype="multipart/form-data">
                  <input type="file" name="file" ref="file" accept="image/*"  @change="hasChoose" />
                  <input type="text" name="username" v-model="username"   />
                  <input type="submit" ref="submit" value="提交"/>
                 </form>
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
    <div v-show="mid" @click="hideSideBar" style="width: 100%;height: 200%;margin-top:-200px;background-color: rgba(0,0,0,0.2);position: fixed;z-index: 98;">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'mint-ui';
import { Field } from 'mint-ui';
import { mapMutations } from 'vuex'
import {Toast} from 'mint-ui'
import { VueCropper }  from 'vue-cropper' 

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
const axios = require('axios');

export default {
  name:'SideMenu',
  components:{
    VueCropper
  },
  props:['color'],
  data(){
    return {
      sidebarRight:null,
      mid:false,
      imgWidth:null,
      show_Submit:false,
      username:'',
      img_src:'',
      option: {
          img:'',
          outputSize:1, //剪切后的图片质量（0.1-1）
          outputType: 'jpeg',
          canMove: true, 
          original: false, 
          canMoveBox: true, 
          canScale:true,
          autoCrop: true, 
          autoCropWidth: 100, 
          autoCropHeight: 100, 
          fixedBox: true,
          centerBox:true,
          maxImgSize:260
        },
      windowWidth:'',
      windowHeight:'',
      fileName:'',
      cropBlobData:'',
      cropBlobSrc:'',
      weatherIcon:''
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
     actionAddress(){
      return this.host+'/api/loginWithImg';
     },
     weather(){
        return this.$store.state.weather;
     },
     city(){
        return this.$store.state.city;
     }
  },
  methods:{
     ...mapMutations(['loginSuccess','whatWeather']),
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
         if(this.cropBlobData && this.username){
            const that=this;
            let formData = new FormData();
            formData.append('username',this.username);
            formData.append('file',this.cropBlobData,this.fileName);
            axios.post(this.host+'/api/loginWithImg',formData)
            .then(function(response){
                 console.log(response);
                 that.loginSuccess(response.data);
                 that.hideSubmit();
                 // that.$emit('successSubmit',{content,name});  
            })
            .catch(function(error){
                console.log(error);
                Toast({
                  message: '有点问题...',
                  position: 'bottom',
                  duration: 1000
                });
            })
            .finally(function(){

            }) 
         }else{
            if(!this.username){
                this.username='一位不愿透露名字的网友'
                this.loginSuccess({name:this.username});
            }else{
                //曾登录用户头像
                const that=this;
                axios.get(this.host+'/api/getLoginUserImg?name='+this.username)
                .then(function(response){
                     console.log(response);
                     let data=response.data;
                     if(data.rows.length>0){
                         that.loginSuccess(data.rows[0]);
                         that.img_src = that.host+that.person_src;
                     }
                })
                .catch(function(error){
                    console.log(error);
                })
                .finally(function(){
                  that.$indicator.close();
                }) 
            }  
            this.hideSubmit();
         }
     },
     showFileChoose(){
         if(!this.person_name){
             this.$refs.file.click();
         }   
     },
     hasChoose(event){
          this.fileName=event.target.files[0].name;
          // if(!this.username){
          //     this.username='一位不愿透露名字的网友'
          // }
          //读取本地文件
          const that=this;
          const reader = new FileReader(); 
          reader.readAsArrayBuffer(event.target.files[0]);
          reader.onload=(e)=>{
            if (typeof e.target.result === 'object') { 
            // 把Array Buffer转化为blob 如果是base64不需要 
              that.option.img = window.URL.createObjectURL(new Blob([e.target.result])) 
            }else{
              that.option.img=e.target.result;
            }
            //清除value使能重选
            that.$refs.file.value='';
          }
 
     },
     imgLoad(msg){
       console.log('imgLoad')
       console.log(msg) 
     },
     cropCancel(){
         this.option.img='';
     },
     cropImg(){
          // 获取截图的blob数据
          this.$refs.cropper.getCropBlob((data) => {
            this.cropBlobData = data;
            this.cropBlobSrc = window.URL.createObjectURL(data);
            this.img_src=this.cropBlobSrc;
            this.option.img='';
          })
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
        //防止快速点击
        this.sidebarRight=0;
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
        // return false;
      },
  },
  mounted(){
      this.sidebarRight=document.getElementsByClassName('sideContent')[0].clientWidth*-1;
      this.imgWidth=document.getElementsByClassName('sideContent')[0].clientWidth/2.5;
      this.windowWidth=document.documentElement.clientWidth;
      this.windowHeight=document.documentElement.clientHeight;
      this.img_src = this.host+this.person_src;
      //根据ip查询天气
      const that=this;
      axios.get('https://www.tianqiapi.com/api/?version=v6&appid=61328346&appsecret=cdcm4E8C&ip')
      .then(function(response){
           console.log(response);
           that.whatWeather(response.data);
           if(that.weather=='xue' || that.weather=='bingbao'){
              that.weatherIcon = '#icon-snow-heavy'
           }else if(that.weather=='lei'){
              that.weatherIcon = '#icon-thunder-shower'
           }else if(that.weather=='yin'){
              that.weatherIcon = '#icon-cloudy'
           }else if(that.weather=='shachen'){
              that.weatherIcon = '#icon-dust'
           }else if(that.weather=='wu'){
              that.weatherIcon = '#icon-fog'
           }else if(that.weather=='qing'){
              that.weatherIcon = '#icon-sunny'
           }else if(that.weather=='yun'){
              that.weatherIcon = '#icon-cloudy-sunny'
           }else if(that.weather=='yu'){
              that.weatherIcon = '#icon-rain-heavy'
           }
           that.$refs.weather.innerHTML=`<use xlink:href=${that.weatherIcon}></use>`;
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
      .cropper{
        width:260px;
        height:260px;
      }
      </style>