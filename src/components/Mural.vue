<template>
  <div v-for="(topAlbum, i) in topAlbumInfo.value" :key="topAlbum.name" class="albums"> 
    <Album :info="topAlbum" :width="layoutConfig[i].width"/>
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
  setup(props, {emit}){
    const topAlbumInfo = reactive({value: []});
    const layoutConfig = layout;
    watchEffect(() => {
      topAlbumInfo.value = props.topAlbumData.value;
      if (topAlbumInfo.value.length == 51){
        emit ('showDownloadButton');
      }
    } );
    return {
      topAlbumInfo,
      layoutConfig,
    }
  }
}
</script>