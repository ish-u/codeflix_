<template>
  <div>
    <div>
      <h1 style="font-size:50px;padding-left:10px ">
         {{ name }} 
      </h1>
      <div class="Slider">
        <Card
          v-for="V in CardEle"
          :key="V._id"
          :Name="V.name"
          :ImageURL="V.thumbnail"
          :playlistID="V.playlist_id"
          @showDetails="showDetails"
        />
      </div>
      <div v-if="display">
        <Details :playlistInfo="this.playlistInfo" @closeDetails="close" />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import Details from "../components/DetailsComponent";
export default {
  name: "Slider",
  props: {
    CardEle: Array,
    isVideo: Boolean,
    name: String,
  },
  data() {
    return {
      playlistInfo: Object,
      display: false,
    };
  },
  components: {
    Card,
    Details,
  },
  methods: {
    showDetails(value) {
      const requestOptions = {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      fetch(
        `${process.env.VUE_APP_CODEFLIX_API}/getPlaylist/${value}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          // console.log(jsonResponse);
          this.display = true;
          this.playlistInfo = jsonResponse[0];
        })
        .catch((error) => {
          return error
        });
    },
    close() {
      this.display = false;
    },
  },
};
</script>

<style>
.Slider {
  height: 50vh;
  max-height: 50vh;
  max-width: 100%;
  width: 100%;
  padding: 10px;
  margin-left: -15px;
  margin-right: -15px;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  display: flex;
}
</style>
