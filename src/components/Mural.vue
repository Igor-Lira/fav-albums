<template>
  <span v-for="topAlbum in topAlbumInfo.value" :key="topAlbum.name" class="mural"> 
    <Album :info="topAlbum"/>
  </span>
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
    watchEffect(() => topAlbumInfo.value = props.topAlbumData.value );
    return {
      topAlbumInfo
    }
  }
}
</script>

<style>
.mural{
  max-width: 400px;
}
</style>