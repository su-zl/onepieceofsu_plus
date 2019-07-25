<template>
   <tr>
      <td v-for="(item,index) in items">
        <transition  name="bounce">
            <div v-show="item.isPre" @click="bombClick(item.order)">
               <img :src="item.imgSrc" :style="{height:tableHeight+'px',width:tableWidth+'px',margin:getImgMargin(item.order)}" />
            </div>
        </transition>
        <transition  name="bounce">
            <div v-show="!item.isPre">
              <div>
                <img :src="item.backImgSrc" :style="{width:backImgWidth+'px'}" >
                <span v-if="!item.isBomb && item.aroundBomb">{{item.aroundBomb}}</span>
              </div> 
            </div>
        </transition>  
      </td>
    </tr>
</template>

<script>
export default {
  name:'OverturnBox',
  props:['items','tableHeight','tableWidth'],
  methods:{
       bombClick(order){
           var col=order%3;
           var row=Math.floor(order/3); 
           if(!this.items[col].isEnd){
             this.items[col].isPre=false;
             var param={order:order,isBomb:this.items[col].isBomb,aroundBomb:this.items[col].aroundBomb};
             this.$emit('bomb-check',param);
           }
       },
       getImgMargin(order){               
           var col=order%3;
           var row=Math.floor((order)/3);
           return row*(this.tableHeight/5)*-1+'px 0px 0px '+col*(this.tableWidth/3)*-1+'px';
       }
   },
   computed:{
      backImgWidth:function(){
         if(this.tableWidth/3>this.tableHeight/5){
            return this.tableHeight/5
         }else{
            return this.tableWidth/3
         }
      }
   },
   created(){
    
    
   }
}
</script>
<style lang='stylus' scoped>
      tr{
        border-style: none;
      }
       td{
           text-align: center;  
           background-color: #fff;
           padding: 1px;
           position: relative;
           overflow: hidden;
           border-style: none;
       }
       td>div:first-child{
          width: 100%;
          height: 100%;
          /*background-color: #fff;*/
          color: #000;
          position: absolute;
          top:0px;
          left: 0px;
          z-index: 1;
          overflow: hidden;
          backface-visibility:hidden;
       }
       td>div:last-child{
          width: 100%;
          height: 100%;
          background-color: #fff;
          position: absolute;
          top:0px;
          left: 0px;
          z-index: 0;
          backface-visibility:hidden;
          display: flex;
          justify-content: center;
          align-items:center;
       }
       td>div:last-child span{
          position:absolute;
          display: inline-block;
          width: 15px;
          height: 15px;
          font-size: 15px;
          line-height: 15px;
          bottom:1px;
          right:0px;
          font-weight: bolder;
          background-color: red;
          color: white;
       }
</style>