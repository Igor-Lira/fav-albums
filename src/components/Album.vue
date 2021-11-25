<template>
      <img :src="img" alt="">
</template>

<script>
import { ref, watch } from 'vue';
export default {
    props: {
        info: {
            type: Object, 
            require: false, 
            default: ()=> {}
        }
    },
    setup(props){
        const img = ref('');
        const name = ref(0);
        const count = ref(0);
        watch(() =>{
            img.value = props.info.img;
            name.value = props.info.name;
            count.value = props.info.playcount;
        })
        return {
            img,
            name, 
            count
        }
    } 
}
</script>

<style>

</style>