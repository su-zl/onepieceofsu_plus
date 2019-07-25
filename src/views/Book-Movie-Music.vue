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
            <h4>书籍是人类进步的阶梯.</h4>
            <p>--高尔基</p>
        </div>
    </div> 
    <div class="container" @click="chooseFilm" v-bind:style="{padding:container}">
      <div class="icon">
        <i ref="film"><font-awesome-icon icon="film" /></i>
      </div>
      <div class="content">
        <h4>电影是人类进步的阶梯.</h4>
        <p>--基尔高</p>
      </div>  
    </div>
    <div class="container" @click="chooseMusic" v-bind:style="{padding:container}">
      <div class="icon">
        <i ref="music"><font-awesome-icon icon="music" /></i>
      </div>
      <div class="content">
        <h4>俺也一样.</h4>
        <p></p>
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
          this.$router.push('tenFilms')
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
        
        margin: 0px 20px; 
        color: #ddd;
      }
      .icon i{
          transition:color 1.2s;  
          font-size: 70px; 
      }
      .content{
         padding:20px 40px 0px 0px;
      }
      .content{
        text-align: right;
      }
</style>