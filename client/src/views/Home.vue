<template>
  <div class="home" v-if="!isLoading">
    <b-container fluid class="p-5">
      <Slider
        :name="getName('CS50')"
        :CardEle="Recommended['CS50']"
        :isVideo="false"
      />
    </b-container>
    <b-container fluid class="p-5">
      <Slider
        :name="getName('MIT_6')"
        :CardEle="Recommended['MIT_6']"
        :isVideo="false"
      />
    </b-container>
    <b-container fluid class="p-5">
      <Slider
        :name="getName('MIT_18')"
        :CardEle="Recommended['MIT_18']"
        :isVideo="false"
      />
    </b-container>
  </div>
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
import Slider from "../components/Slider.vue";
export default {
  name: "Home",
  data() {
    return {
      Recommended: Array,
      isLoading: Boolean,
    };
  },
  components: {
    Slider,
  },
  methods: {
    getRecommened() {
      this.isLoading = true;
      // console.log(process.env.VUE_APP_CODEFLIX_API);
      const requestOptions = {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      fetch(`${process.env.VUE_APP_CODEFLIX_API}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          this.Recommended = jsonResponse[0];
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getName(n) {
      return n;
    },
  },
  created: function() {
    this.getRecommened();
    this.$emit("changeNavBar", "LOL");
  },
};
</script>

<style>
.home{
  padding: 25px;
}
</style>
