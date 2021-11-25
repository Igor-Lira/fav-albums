<template>
  <div>
    <div class="searchBar">
      <label for="username">Your Username</label> 
      <input id="username" v-model="userName" @keydown.enter="searchInApi" type="text" />
    </div>
    <div class="muralBox">
        <Mural :topAlbumData="topAlbumData"/>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import Mural from './components/Mural.vue'
import getUserTopAlbums from './request.js'

export default {
  name: 'App',
  components: {
    Mural
  }, 
  setup(){
    const userName = ref ('srrlism');
    const topAlbumData = reactive({value: []});
    const searchInApi = () => {
      console.log ('current search', userName.value);
      getUserTopAlbums(userName.value).then (res =>  topAlbumData.value = res);
    }
    return {
      searchInApi,
      userName,
      topAlbumData
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
  max-width: 75%;
}
</style>
