<template>
  <b-container class="p-5" v-if="!isLoading">
    <b-row style="justify-content:center">
      <b-col style="text-align:center; ">
        <img
          :src="playlist.thumbnail"
          style="border: 5px solid black; border-radius:10px; height: inherit; width: inherit; padding:2px"
        />
      </b-col>
      <b-col style="text-align:center">
        <h1>{{ playlist.name }}</h1>
        <hr />
        <h4>
          <font-awesome-icon icon="calendar-day" />
          {{ playlist.releaseDatePlaylist }}
        </h4>
        <h4>
          <font-awesome-icon icon="clock" />
          {{ Math.round(playlist.durationPlaylist / (60 * 60)) }} hours
        </h4>
      </b-col>
    </b-row>
    <br />
    <br />
    <h2>Videos</h2>
    <hr />
    <b-row style="justify-content:center">
      <VideoCard
        v-for="(V, index) in playlist.Video"
        :key="V._id"
        :Name="V.title"
        :ImageURL="V.thumbnail"
        :videoID="V.video_id"
        :playlistID="playlist.playlist_id"
        :onPlaylist="true"
        :i="index + 1"
      />
    </b-row>
  </b-container>
  <div v-else>
    <b-container class="p-5" style="text-align:center;">
      <b-spinner
        style="width: 5rem; height: 5rem;"
        label="Large Spinner"
        type="grow"
      ></b-spinner>
    </b-container>
  </div>
</template>

<script>
import VideoCard from "../components/VideoCard";
export default {
  data() {
    return {
      playlistID: String,
      playlist: Array,
      isLoading: Boolean,
    };
  },
  components: {
    VideoCard,
  },
  methods: {
    getPlaylistData() {
      this.isLoading = true;
      const requestOptions = {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      fetch(
        `${process.env.VUE_APP_CODEFLIX_API}/getPlaylist/${this.playlistID}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          this.playlist = jsonResponse[0];
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function() {
    this.playlistID = this.$route.params.id;
    this.getPlaylistData();
  },
};
</script>

<style></style>
