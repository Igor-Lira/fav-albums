<template>
      <img :src="img" :width="coverWidth" :height="coverWidth" alt="">
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
        }
    },
    setup(props){
        const img = ref('');
        const name = ref(0);
        const count = ref(0);
        let coverWidth = 0;
        watchEffect(() =>{
            img.value = props.info.img;
            name.value = props.info.name;
            count.value = props.info.playcount;
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