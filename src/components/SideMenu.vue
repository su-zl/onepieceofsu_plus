<template>
  <div>
      <div class="sidebar" v-bind:style="{right:sidebarRight+'px'}">
       <i class="bars" :style="{color:color?color:'#000'}"   @click="showSidebar"><font-awesome-icon icon="bars" /></i>
       <ul class="sideContent">
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
    </div>
    <div v-show="mid" @click="hideSideBar" style="width: 100%;height: 200%;background-color: rgba(0,0,0,0.2);position: fixed;z-index: 98;">
    </div>
  </div>
</template>

<script>
export default {
  name:'SideMenu',
  props:['color'],
  data(){
    return {
      sidebarRight:-260,
      mid:false
    }
  },
  computed:{

  },
  methods:{
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
  created(){
    
    
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
        padding: 30px;
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
</style>