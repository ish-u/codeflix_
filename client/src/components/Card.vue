<template>
  <div class="card col-3" v-on:click="displayDetails">
    <img class="url" :src="ImageURL" />
    <span class="name">{{ Name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    Name: String,
    ImageURL: String,
    isVideo: Boolean,
    playlistID: String,
  },
  methods: {
    displayDetails() {
      if (this.$route.name == "Search") {
        this.$router.push(`/playlist/${this.playlistID}`);
      }
      // console.log("EMITTING", this.playlistID);
      this.$emit("showDetails", this.playlistID);
    },
  },
};
</script>

<style>
.card {
  margin: 12.5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.url {
  padding: 5px;
  margin: 5px;
  border: 2.5px black solid;
  border-radius: 2.5px;
}
.name {
  text-align: center;
  font-size: 20px;
}
</style>
