<template>
  <div v-for="(topAlbum, i) in topAlbumInfo.value" :key="topAlbum.name"> 
    <Album :info="topAlbum" :width="layoutConfig[i].width" :tag="i == 2"/>
  </div>
</template>

<script>
import { reactive, watchEffect } from '@vue/runtime-core'
import Album from './Album.vue'
import layout from '../layout.js'

export default {
  components: {Album: Album},
  props: {
    topAlbumData: {
      type: Object, 
      required: false, 
      default: ()=> {}
    },
  },
  setup(props){
    const topAlbumInfo = reactive({value: []});
    const layoutConfig = layout;
    watchEffect(() => {
      topAlbumInfo.value = props.topAlbumData.value;
    } );
    return {
      topAlbumInfo,
      layoutConfig,
    }
  }
}
</script>