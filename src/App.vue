<template>
  <div>
    <span>
      <Search @user-search="searchInApi" />
      <Download v-show="showDownloadButton.value" @download="downloadMural" />
    </span>
    <div class="errorMessage">
      <span> {{ errorMessage }} </span>
    </div>
    <div class="muralBox" ref="muralPic" v-if="!errorMessage">
      <div class="wrapper">
        <Mural
          :topAlbumData="topAlbumData"
          @showDownloadButton="showDownloadButton.value = true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
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
    const showDownloadButton = reactive({ value: false });
    const searchInApi = (userName) => {

      getUserTopAlbums(userName)
        .then((res) => {
          topAlbumData.value = res;
          errorMessage.value = "";
        })
        .catch(() => {
          errorMessage.value = "Profile not found";
          showDownloadButton.value = false;
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
        .catch((err) => console.log("erro no download", err.message));
    }
    return {
      searchInApi,
      muralPic,
      topAlbumData,
      downloadMural,
      showDownloadButton,
      errorMessage,
    };
  },
};
</script>
<style scoped>
.muralBox {
  margin: auto;
  max-width: 600px;
  min-width: 600px;
  display: flex;
  flex-wrap: wrap;
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
</style>
