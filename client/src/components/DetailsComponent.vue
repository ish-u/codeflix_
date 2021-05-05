<template>
  <div
    class="details"
    :style="{ backgroundImage: `url(${playlistInfo.thumbnail})` }"
  >
    <div v-if="d">
      <div class="closeBtn">
        <b-button variant="outline-light" @click="closeDetails">esc</b-button>
      </div>
      <div class="SliderX" style="overflow-x: hidden;">
        <b-col class="title">
          <span style="font-size:50px;"> {{ playlistInfo.name }}</span>
          <br />
          <h1>
            <font-awesome-icon icon="calendar-day" />
            {{ playlistInfo.releaseDatePlaylist }}
          </h1>
          <h2>
            <font-awesome-icon icon="clock" />
            {{ Math.round(playlistInfo.durationPlaylist / (60 * 60)) }} hours
          </h2>
          <h5 @click="goToPlaylist" class="showPointer">Go To Course</h5>
        </b-col>
      </div>
    </div>
    <div v-else>
      <b-col>
        <div
          class="SliderX"
          style="  background: linear-gradient(to right, black, rgba(0, 0, 0, 0));"
        >
          <VideoCard
            v-for="V in playlistInfo.Video"
            :key="V._id"
            :Name="V.title"
            :ImageURL="V.thumbnail"
            :videoID="V.video_id"
            :playlistID="playlistInfo.playlist_id"
          />
        </div>
      </b-col>
    </div>
    <div class="options">
      <b-button-group>
        <b-button @click="showDetails">Details</b-button>
        <b-button @click="showVideos">Videos</b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
// import Slider from "../components/Slider";
import VideoCard from "../components/VideoCard";
export default {
  name: "Details",
  props: {
    playlistInfo: Object,
  },
  components: {
    VideoCard,
  },
  data() {
    return {
      d: true,
    };
  },
  methods: {
    closeDetails() {
      this.$emit("closeDetails");
    },
    showDetails() {
      this.d = true;
    },
    showVideos() {
      this.d = false;
    },
    goToPlaylist() {
      this.$router.push(`/playlist/${this.playlistInfo.playlist_id}`);
    },
  },
};
</script>

<style>
.details {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.SliderX {
  height: 60vh;
  max-height: 60vh;
  max-width: 100%;
  width: 100%;
  margin-left: -15px;
  margin-right: -15px;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* background: linear-gradient(to right, black, rgba(0, 0, 0, 0)); */
}
.title {
  color: white;
  padding-left: 10% !important;
  background: linear-gradient(to right, black, rgba(0, 0, 0, 0));
  vertical-align: sub;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
}
.thumbnail {
  object-fit: contain;
  height: inherit;
  width: inherit;
}
.closeBtn {
  position: absolute;
  left: 90%;
  margin: 10px;
  z-index: 100;
}
.options {
  background: linear-gradient(to right, black, rgba(0, 0, 0, 0));
  width: 100%;
  text-align: center;
  padding-bottom: 2vh;
}
.showPointer:hover{
  cursor: pointer;
}
</style>
