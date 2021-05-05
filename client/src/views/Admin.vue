<template>
  <b-container class="p-5">
    <h1>ADMIN Panel</h1>
    <hr />
    <b-container class="p-3">
      <h3>Add a Playlist</h3>
      <br />
      <b-form @submit.prevent="addPlaylist">
        <b-form-group>
          <b-form-input
            v-model="url"
            placeholder="Enter Playlist URL"
            required
            name=""
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-button type="submit" variant="light" v-if="!isLoading">
            Add
          </b-button>
          <b-button variant="light" disabled v-else>
            <b-spinner small></b-spinner>
            <span class="sr-only">Adding...</span>
          </b-button>
        </b-form-group>
      </b-form>
    </b-container>
    <hr />
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      isLoading: false,
    };
  },
  methods: {
    addPlaylist() {
      this.isLoading = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          url: this.url,
        }),
      };
      fetch(`${process.env.VUE_APP_CODEFLIX_API}/addPlaylist`, requestOptions)
        .then(() => {
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
