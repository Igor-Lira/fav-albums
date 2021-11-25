<template>
  <div>
    <label for="username">Your Username</label>
    <input id="username" v-model="userName" @keydown.enter="searchInApi" type="text" />
    <Mural :topAlbumData="topAlbumData"/>
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
