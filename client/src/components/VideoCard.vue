<template>
  <div
    class="cardV col-4"
    v-on:click="displayDetails"
    @click="goToVideo"
    v-if="!onPlaylist"
  >
    <img class="urlV" :src="ImageURL" />
    <font-awesome-icon class="play" icon="play" size="4x" />
    <div class="nameV">
      <span
        ><b>{{ Name }}</b></span
      >
    </div>
  </div>
  <div
    class="card col-3 showPointer"
    style="padding:10px"
    v-on:click="displayDetails"
    @click="goToVideo"
    v-else
  >
    <img class="url" :src="ImageURL" />
    <span style="text-align:center;">{{ i }}. {{ Name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    Name: String,
    ImageURL: String,
    playlistID: String,
    videoID: String,
    onPlaylist: Boolean,
    i: Number,
  },
  methods: {
    displayDetails() {
      this.$emit("showDetails", this.playlistID);
    },
    goToVideo() {
      this.$router.push({
        name: "Video",
        params: { id: this.videoID, pid: this.playlistID },
      });
    },
  },
};
</script>

<style>
.cardV {
  margin: 12.5px;
  padding: 5px;
  text-align: center;
  justify-content:space-evenly;
  color: black;
  display: flex;
  flex-direction: column;
}
.urlV {
  /* padding: 5px; */
  margin: 5px;
  border-radius: 10px;
}
.nameV {
  text-align: center;
  margin: 10px;
  border: 2px black solid;
  border-radius: 10px;
  padding: 5px;
  color: white;
  background: black;
  text-align: center;
  font-size: 18px;
}
.play {
  position: absolute;
  left: 45%;
  top: 33%;
  color: black;
}
.play:hover {
  cursor: pointer;
  color:azure;
}
</style>
