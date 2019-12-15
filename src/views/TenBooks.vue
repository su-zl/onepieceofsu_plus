<template>
  <div  style="visibility:hidden;" v-bind:style="{visibility:loading}"  >
     <div id="header">
        <div v-if="currentPageData">
          <span>{{currentPageData.id+1}}</span><span>/{{Data.length}}</span>
        </div>
        <h3 style="text-align: center;width:150px;margin:0 auto;">读书</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div id="library" v-bind:style="{marginTop:libraryOffsetTop+'px'}">
        <div>
           <div v-for="(item,index) in Data"  :class="{list:true,selected:selectBookId==item.id}" @click="chooseBook(index)"><img @load="imgLoad" :src="item.img_src"></div>
        </div>
    </div>
    <div v-if="currentPageData" class="section"
     @touchmove="isShowLibrary" @touchend="hideLibrary" >
           <div style="display: flex;padding:20px 10px 0px 10px;justify-content:space-between;" class="title">
              <div>
                <h2>{{currentPageData.title}}</h2>
                <p style="font-size:0.8em;color:#666;">{{currentPageData.message}}</p>
              </div>
               <div >
                <img style="width: 100px;" :src="currentPageData.img_src">
              </div>
           </div>
           <div class="divider"></div>
           <div class="passages">
               <h4>摘抄：</h4>
               <p v-for="item in currentPageData.excerpt" style="font-size:0.9em;color:#222;">{{item}}</p>
           </div>
           <div class="divider"></div>
           <div class="comment">
              <h4>我读：</h4>
              <p v-for="item in currentPageData.comment" style="font-size:0.9em;color:#222;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item}}<br>
            </p>
           </div>
           <div class="divider"></div>
           <div style="padding:5px 10px;color: #aaa;">
              <i style="font-size: 2em;" @click="chooseBook(currentPageData.id-1)"><font-awesome-icon prefix="far"  icon="hand-point-left" /></i>
              <i style="float: right;font-size: 2em;" @click="chooseBook(currentPageData.id+1)"><font-awesome-icon icon="hand-point-right"  /></i>
           </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';
const axios = require('axios');

export default {
  name:'tenBooks',
  components:{
    SideMenu
  },
  data(){
    return{
         container:'',
         loading:'visible',
         preMove:null,
         Data:null,
         libraryOffsetTop:-83,
         currentPageData:null,
         priTop:null,
         priBottom:null
    }
  },
  computed:{
    selectBookId(){
          return  this.currentPageData.id;
    },
    host(){
         return  this.$store.state.host;
    }
  },
  methods:{
        chooseBook(index){
          if(index!=this.Data.length && index>=0){
            this.currentPageData=this.Data[index]; 
          }else if(index==this.Data.length && index>=0){
            this.currentPageData=this.Data[0];
          }else if(index<0){
            this.currentPageData=this.Data[this.Data.length-1];
          }

          document.documentElement.scrollTop=0;
          document.body.scrollTop=0;
          this.libraryOffsetTop=this.priTop;
          this.preMove=null;

        },
        sectionOffset(){
           return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        },
        isShowLibrary(event){
            if(this.sectionOffset()==0){
              if(!this.preMove){
                  this.preMove=event.changedTouches[0].clientY;
              }else{
                  if(event.changedTouches[0].clientY-this.preMove>0){
                       if(this.libraryOffsetTop<-60){
                          this.libraryOffsetTop+=1;
                          this.preMove=event.changedTouches[0].clientY
                       }else{
                           this.libraryOffsetTop=this.priBottom+this.priTop;
                           this.preMove=null;
                       }
                  }
              }
          }else if(this.sectionOffset()>0 && this.libraryOffsetTop>this.priTop){
                   this.preMove=null;
          }
        },
        hideLibrary(){
          if(this.sectionOffset()>0 && this.libraryOffsetTop>this.priTop){
              const that=this;
              const t=setInterval(()=>{
                   if(that.libraryOffsetTop>that.priTop){
                    if(that.libraryOffsetTop-that.priTop>2){
                         that.libraryOffsetTop-=(that.libraryOffsetTop-that.priTop)/10;
                    }else{
                         that.libraryOffsetTop-=1;
                    }
                   }else{
                      clearInterval(t);
                      this.preMove=null;
                   }
              },10)
          }
        },
        imgLoad(){
          this.priTop=document.getElementById('header').clientHeight-document.getElementById('library').clientHeight;
          this.priBottom=document.getElementById('library').clientHeight;
          this.libraryOffsetTop=this.priTop;
        }
  },
  created(){
    this.$indicator.open({text: '',spinnerType: 'double-bounce'});
    const that=this;
    axios.get(that.host+'/api/book_movie_music?type=book')
    .then(function(response){
         console.log(response);
         let data=response.data;
         for (var i = 0; i < data.length; i++) {
           data[i].id=data[i].index;
           data[i].excerpt=response.data[i].excerpt.split('&');
           data[i].comment=response.data[i].comment.split('&');
           data[i].img_src=that.host+response.data[i].img_src;
         }
         that.Data=data;
         that.currentPageData=data[0];
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
        padding: 5px 0px;
        color:#fff;
        background-color: rgba(50,50,50,1);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 25px;
      }
      #header div{
          float: left;
          font-weight: bolder;
          margin-left: 10px;
      }
      .divider{
        border-bottom: 1px solid #eee;
      }
      .passages{
         margin:20px 10px 20px 10px;
      }
      p{
         margin: 5px 0px;
         line-height: 1.7em;
      }
      .comment{
         margin:20px 10px 20px 10px;
      }
      #library{
        overflow-x: scroll;
        /*margin-top: -83px;*/
        background-color: #FFE4C4;
     }
     /*隐藏滚动条*/
     #library::-webkit-scrollbar{
       display: none;
     }
      #library>div{
          display: flex;
          flex-wrap: nowrap;
          padding: 15px 10px;
          align-items:center;
      }
      .list{
         margin-right: 10px;
      }
      .list img{
          width: 50px;
          height:70px;
      }
      .selected img{
          border: 3px solid rgba(135,206,235,1);  
          width: 55px;
          height:77px;
      }  
      #library{
        animation:jump 1.5s;
      }
      @keyframes jump{
         0%{margin-top: -83px;}
         25%{margin-top: -73px;}
         50%{margin-top: -80px;}
         75%{margin-top: -76px;}
         100%{margin-top: -83px;}
      }
</style>