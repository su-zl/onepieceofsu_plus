<template>
  <div style="visibility:hidden; " v-bind:style="{visibility:loading}">
     <div id="header">
        <h3>书·影·音</h3>
    </div> 
    <SideMenu color="#fff"></SideMenu>
    <div class="container" @click="chooseBook" v-bind:style="{padding:container}">
        <div class="icon">    
           <i ref="book"><font-awesome-icon icon="book"/></i>          
        </div>
        <div class="content">
            <!-- <h4>书籍是人类进步的阶梯.</h4> -->
            <p>读书最多的时候应该是在大学,现在大部分也和书本一起还回了老图书馆。回顾看来,一本书潜移默化的影响是很大的,安静的琢磨中形成的思维通道,就像水流冲刷平原,虽然水流走,但河道已经成型。</p>
        </div>
    </div> 
    <div class="container" @click="chooseFilm" v-bind:style="{padding:container}">
      <div class="icon">
        <i ref="film"><font-awesome-icon icon="film" /></i>
      </div>
      <div class="content">
        <!-- <h4>电影是人类进步的阶梯.</h4> -->
        <p>在电视时代成长,还能想起胆战心惊、风声鹤唳偷看电视的场景,是匮乏且统一的娱乐。现在长成了不可思议的不看电视的成年人,我标记,分类,评论不同的人生。</p>
      </div>  
    </div>
    <div class="container" @click="chooseMusic" v-bind:style="{padding:container}">
      <div class="icon">
        <i ref="music"><font-awesome-icon icon="music" /></i>
      </div>
      <div class="content">
        <!-- <h4>俺也一样.</h4> -->
        <p>在高三毕业买了第一个手机后,我保持睡前听歌的习惯有多几个月,歌声顺着耳机线流入心脏,泵入每一个细胞,不用再用被子结界阻拦黑夜的恶魔。</p>
      </div> 
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'

export default {
  name:'book-movie-music',
  components:{
    SideMenu
  },
  data(){
    return{
      container:'',
      loading:'visible'
    }
  },
  methods:{
    chooseBook(){
       this.$refs.book.style.color='#000';
       setTimeout(()=>{
          this.$router.push('tenBooks')
       },1200)
    },
    chooseFilm(){
      this.$refs.film.style.color='#000';
       setTimeout(()=>{
          this.$router.push('tenMovies')
       },1200)
    },
    chooseMusic(){
      this.$refs.music.style.color='#000';
       setTimeout(()=>{
          this.$router.push('tenSongs')
       },1200)
    }
  },
  mounted(){
      this.container=((window.screen.height-document.getElementById('header').offsetHeight-120)/3-document.getElementsByClassName('content')[0].offsetHeight)/2+'px'+' 0px';
          // console.log(this.container);
  }
}
</script>
<style lang='stylus' scoped>
      #header{
        color:#fff;
        background-color: rgba(50,50,50,1);      
      }
      .container{
        margin: 30px 10px 30px 10px;
        background-color: #eee;
        display: flex;
        justify-content:space-between;
      }
      .icon{        
        margin:20px; 
        color: #ddd;
      }
      .icon i{
          transition:color 1.2s;  
          font-size: 70px; 
      }
      .content{
         padding:20px;
         text-align: left;
         p{
          font-style:italic;font-size:0.7em;color:#aaa;
          line-height:1.6em;
         }
      }
</style>