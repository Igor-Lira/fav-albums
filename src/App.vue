<template>
  <div id="app">
    <span>
      <p>Top Albums Generator for <a href="https://www.last.fm/user/IgorLirap">Last.fm</a> users</p>
    </span>
    <div class="frame">
      <Search @user-search="searchInApi" />
    </div>
    <div class="errorMessage">
      <span> {{ errorMessage }} </span>
    </div>
    <div v-if="showMural">
      <span class="mural-text"> Your top albums in 2021 </span>
      <div class="muralBox" ref="muralPic">
        <div class="wrapper">
          <Mural
            :topAlbumData="topAlbumData"
            @showDownloadButton="showDownloadButton.value = true"
          />
        </div>
      </div>
      <Download @download="downloadMural" />
    </div>
  </div>
  <div class="footer">
    <a href="https://www.linkedin.com/in/igor-lira-passos-5b4aa5192/"><i class="fa fa-linkedin-square" style="font-size: 24px"></i></a>
    &nbsp;
    <a href="https://github.com/Igor-Lira/fav-albums"><i class="fa fa-github" aria-hidden="true"></i></a>
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import Mural from "./components/Mural.vue";
import Search from "./components/Search.vue";
import Download from "./components/DownloadButton.vue";
import getUserTopAlbums from "./request.js";
import html2canvas from "html2canvas";

export default {
  name: "App",
  components: {
    Mural,
    Search,
    Download,
  },
  setup() {
    const muralPic = ref("");
    const errorMessage = ref("");
    const topAlbumData = reactive({ value: [] });
    const searchInApi = (userName) => {
      getUserTopAlbums(userName)
        .then((res) => {
          topAlbumData.value = res;
          errorMessage.value = "";
          document.activeElement.blur();
        })
        .catch(() => {
          errorMessage.value = "Profile not found";
        });
    };
    function downloadMural() {
      var link = document.createElement("a");
      link.download = "favalbums.png";
      html2canvas(muralPic.value, { allowTaint: false, useCORS: true })
        .then((canvas) => {
          link.href = canvas.toDataURL();
          link.click();
        })
        .catch((err) => console.log("Download error", err.message));
    }
    const showMural = computed(() => {
      return !errorMessage.value && topAlbumData.value.length;
    });
    return {
      searchInApi,
      muralPic,
      topAlbumData,
      showMural,
      downloadMural,
      errorMessage,
    };
  },
};
</script>
<style>
* {
  text-align: center;
}

.muralBox {
  margin: auto;
  max-width: 400px;
  min-width: 400px;
}
.wrapper {
  background: #1f1c2c;
  display: flex;
  flex-wrap: wrap;
}
.download-btn {
  text-align: center;
}
.errorMessage {
  margin: auto;
  text-align: center;
}
.mural-text {
  font-size: 15px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #000020;
  color: white;
  text-align: center;
}
</style>
