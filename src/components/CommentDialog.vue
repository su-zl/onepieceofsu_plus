<template>
   <mt-popup  v-model="popupVisible" :closeOnClickModal="false" position="top" >
      <div>
         <div style="display: flex;justify-content: space-between;padding: 5px 15px;">
           <span style="color:#1E90FF;font-size:0.9em" @click="$emit('hideDialog')">取消</span>
           <h4 style="text-align: center;font-size:1.1em">{{title}}</h4>
           <span style="color:#1E90FF;font-weight: bold;font-size:0.9em" @click="submit">发表</span>
         </div>
         <div style="display: flex;justify-content: center;border:none;">
           <div style="width: 95%;min-height: 100px;font-size: 0.9em;" contenteditable="true" @blur="showPlaceholder($event)" ref="content" @focus="hidePlaceholder($event)">
            <p style="font-size:0.9em;color:#aaa;">我也说一句......</p>
           </div>
         </div>
         <div style="padding: 5px 15px;">
           <i class="fa fa-smile-o" style="font-size: 1.5em;"></i>
           <span style="font-size: 0.7em;color: #aaa;float: right;"></span>
         </div>
         <div id='emojstext'></div>
      </div>
    </mt-popup>
</template>

<script>
import {Popup,Toast} from 'mint-ui'
import Vue from 'vue'
Vue.component(Popup.name, Popup)
export default {
  name:'CommentDialog',
  props:['popupVisible','type'],
  methods:{
    addComment(){
       this.$emit('hideDialog')
    },
    submit(){
         if(this.$refs.content.innerHTML=='' || this.$refs.content.children.length>0){
            Toast({
              message: '首先,你得写点东西',
              position: 'middle',
              duration: 2000
            });
         }else{
           this.$emit('hideDialog')
           console.log(this.$refs.content.innerHTML)
         }
    },
    showPlaceholder(event){
       if(event.target.innerHTML==''){
        console.log(event);
         event.target.innerHTML='<p style="font-size:0.9em;color:#aaa;">我也说一句......</p>'
       }
    },
    hidePlaceholder(event){
        if(event.target.children.length>0){
            event.target.innerHTML='';
        }
    }  
   },
   computed:{
      title(){
        switch(this.type){
        case 'article':
            return '评论';
            break;
        case 'whimsy':
            return '评论';
            break;
        case 'message':
            return '留言';
            break;
      }
    }
   },
   created(){
    
    
   }
}
</script>
<style lang='stylus' scoped>
      #comment{
        color:#aaa;
        font-size:1.5em;
        float: right;
        margin-right: 20px;
      }
      .mint-popup-top{
        top: 10%;
        width: 90%;
        border-radius: 5px;
      }
</style>