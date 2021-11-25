<template>
  <div v-for="topAlbum in topAlbumInfo.value" :key="topAlbum.name"> 
    <Album :info="topAlbum"/>
  </div>
</template>

<script>
import { reactive, watchEffect } from '@vue/runtime-core'
import Album from './Album.vue'

export default {
  components: {Album: Album},
  props: {
    topAlbumData: {
      type: Object, 
      required: false, 
      default: ()=> {}
    }
  },
  setup(props){
    const topAlbumInfo = reactive({value: []});
    watchEffect(() => {topAlbumInfo.value = props.topAlbumData.value; console.log ('no mural', topAlbumInfo.value )});
    return {
      topAlbumInfo
    }
  }
}
</script>

<style>

</style>