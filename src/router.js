import Vue from 'vue'
import Router from 'vue-router'
import Default from './views/Default.vue'

Vue.use(Router) 

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/default'
    },
    {
      path: '/default',
      name: 'default',
      component: Default
    },
    {
      path:'/book-movie-music',
      name:'book-movie-music',
      component:()=>import(/* webpackChunkName:"book-movie-music"*/ './views/Book-Movie-Music.vue')
    },
    {
      path:'/tenBooks',
      name:'tenBooks',
      component:()=>import(/* webpackChunkName:"tenBooks"*/ './views/TenBooks.vue')
    },
    {
      path:'/tenMovies',
      name:'tenMovies',
      component:()=>import(/* webpackChunkName:"tenMovies"*/ './views/TenMovies.vue')
    },
    {
      path:'/tenSongs',
      name:'tenSongs',
      component:()=>import(/* webpackChunkName:"tenSongs"*/ './views/TenSongs.vue')
    },
    {
      path:'/timeTravel',
      name:'timeTravel',
      component:()=>import(/*webpackChunkName:"timeTravel"*/ './views/TimeTravel.vue')
    },
    {
      path:'/timeAlbum/:id',
      name:'timeAlbum',
      component:()=>import(/*webpackChunkName:"timeAlbum"*/ './views/TimeAlbum.vue')
    },
    {
      path:'/article',
      name:'article',
      component:()=>import(/*webpackChunkName:"article"*/ './views/Article.vue')
    },
    {
      path:'/readArticle/:id',
      name:'readArticle',
      component:()=>import(/*webpackChunkName:"readArticle"*/ './views/ReadArticle.vue')
    },
    {
      path:'/whimsy',
      name:'whimsy',
      component:()=>import(/*webpackChunkName:"set"*/ './views/Whimsy.vue')
    },
    {
      path:'/message',
      name:'message',
      component:()=>import(/*webpackChunkName:"set"*/ './views/Message.vue')
    }
  ]
})
