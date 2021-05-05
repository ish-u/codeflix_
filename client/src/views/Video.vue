<template>
  <iframe
    :width="getWidth"
    :height="getHeight"
    frameborder="0"
    :src="getSRC"
    allowFullScreen
    allow="autoplay"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      videoID: String,
      playlistID: String,
    };
  },
  computed: {
    getSRC() {
      return `https://www.youtube.com/embed/${this.videoID}?list=${this.playlistID};autoplay=1`;
    },
    getHeight() {
      return window.innerHeight;
    },
    getWidth() {
      return window.innerWidth;
    },
  },
  created() {
    this.videoID = this.$route.params.id;
    this.playlistID = this.$route.params.pid;
  },
};
</script>

<style></style>
