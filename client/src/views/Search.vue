<template>
  <b-container class="p-5" v-if="!isLoading">
    <h2>Search : {{this.query}}</h2>
    <hr>
    <b-row style="justify-content: center;" class="showPointer">
      <Card
        v-for="P in results"
        :key="P._id"
        :Name="P.name"
        :ImageURL="P.thumbnail"
        :playlistID="P.playlist_id"
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
import Card from "../components/Card";
export default {
  data() {
    return {
      results: Array,
      query: String,
      isLoading: Boolean,
    };
  },
  components: {
    Card,
  },
  methods: {
    getSearch() {
      this.isLoading = true
      const requestOptions = {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      fetch(
        `${process.env.VUE_APP_CODEFLIX_API}/search/${this.query}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          this.results = jsonResponse;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    $route(to) {
      this.query = to.params.q;
      console.log(this.query);
      this.getSearch();
    },
  },
  created: function() {
    this.isLoading = true;
    this.query = this.$route.params.q;
    this.getSearch();
  },
};
</script>

<style></style>
