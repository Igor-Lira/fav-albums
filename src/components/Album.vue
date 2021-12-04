<template>
<div class="container">
    <img :src="img" :width="coverWidth" :height="coverWidth" alt="" class="myimg"/>
    <div v-if="tag" class="top-left">@favalbums.space</div>
</div>
</template>

<script>
import { ref, watchEffect } from 'vue';
export default {
    props: {
        info: {
            type: Object, 
            require: true, 
            default: ()=> {}
        }, 
        width: {
            type: Number, 
            require: true,  
        },
        tag: {
            type: Boolean, 
            required: true,
        }
    },
    setup(props){
        const img = ref('');
        const name = ref(0);
        const count = ref(0);
        const tag = ref (false)
        let coverWidth = 0;
        watchEffect(() =>{
            img.value = props.info.img;
            name.value = props.info.name;
            count.value = props.info.playcount;
            tag.value = props.tag;
            coverWidth = props.width;
        })
        return {
            img,
            name, 
            count,
            coverWidth
        }
    } 
}
</script>
<style scoped>
.myimg {
  vertical-align: bottom;
}
.container {
  position: relative;
  text-align: center;
  color: white;
}
/* Top left text */
.top-left {
  position: absolute;
  top: 1px;
  right: 1px;
  font: sans-serif;
  font-size: 10px;
  font-style: oblique;
}
</style>