<template>
  <div>
    <div class="searchBar">
      <label for="username">Your Username</label> 
      <input id="username" v-model="userName" @keydown.enter="searchInApi" type="text" />
    </div>
    <div>
      <button @click="downloadMural"> Download </button>
    </div>
    <div class="muralBox" ref="muralPic">
        <Mural :topAlbumData="topAlbumData"/>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import Mural from './components/Mural.vue'
import getUserTopAlbums from './request.js'
import html2canvas from 'html2canvas'

export default {
  name: 'App',
    components: {
    Mural
  }, 
  setup(){
    const muralPic = ref ('');
    const userName = ref ('srrlism');
    const topAlbumData = reactive({value: []});
    const searchInApi = () => {
      getUserTopAlbums(userName.value).then (res =>  topAlbumData.value = res);
    }
    function downloadMural() {
      var link = document.createElement('a');
      link.download = 'favalbums.png';
       html2canvas (muralPic.value, {allowTaint: false, useCORS: true }).then((canvas) => {
          link.href = canvas.toDataURL();
          link.click();
        });
    }
    return {
      searchInApi,
      muralPic,
      userName,
      topAlbumData,
      downloadMural
    }
  }
}
</script>
<style scoped>
.searchBar {
  text-align: center;
}
.muralBox {
  margin: auto;
  max-width: 600px;
}
</style>
