<template>
  <div id="app">
    <Header />
    <Search @user-search="searchInApi" />
    <div class="errorMessage">
      <span> {{ errorMessage }} </span>
    </div>
    <div v-if="showMural">
      <div class="mural-text">Your top albums in 2021</div>
      <div class="mural-box" ref="muralRef">
        <div class="wrapper">
          <Mural
            :topAlbumData="topAlbumData"
            @showDownloadButton="showDownloadButton.value = true"
          />
        </div>
      </div>
      <Download @download="downloadMural" />
    </div>
    <Footer />
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import Header from "./components/Header.vue";
import Mural from "./components/Mural.vue";
import Search from "./components/Search.vue";
import Footer from "./components/Footer.vue";
import Download from "./components/DownloadButton.vue";
import getUserTopAlbums from "./request.js";
import html2canvas from "html2canvas";

export default {
  name: "App",
  components: {
    Header,
    Search,
    Mural,
    Download,
    Footer,
  },
  setup() {
    const muralRef = ref("");
    const errorMessage = ref("");
    const topAlbumData = reactive({ value: [] });
    const searchInApi = (userName) => {
      getUserTopAlbums(userName)
        .then((res) => {
          topAlbumData.value = res;
          console.log (topAlbumData.value);
          if (!topAlbumData || topAlbumData.value.length < 51){
            errorMessage.value = "No enough scrobles this year :("
          } else {
            errorMessage.value = "";
            document.activeElement.blur();
          }
        })
        .catch(() => {
          errorMessage.value = "User not found";
        });
    };
    function downloadMural() {
      var link = document.createElement("a");
      link.download = "favalbums.png";
      html2canvas(muralRef.value, { allowTaint: false, useCORS: true })
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
      muralRef,
      topAlbumData,
      showMural,
      downloadMural,
      errorMessage,
    };
  },
};
</script>
<style>
.mural-box {
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
  text-align: center;
  font-size: 15px;
}
</style>
