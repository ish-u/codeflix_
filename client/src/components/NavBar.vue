<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
    style="justify-content:center;"
  >
    <b-navbar-brand v-on:click="goHome()">
      <span><b>codeflix</b></span>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto" v-if="isLoggedIn">
      <b-nav-form
        style="padding-right:20px;"
        id="form"
        @submit.prevent="search"
      >
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Search"
          v-model="searchQuery"
        ></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
      <b-nav-item v-if="getRole()" @click="goToAdmin">ADMIN</b-nav-item>
      <b-nav-item @click="logOut">Log Out</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" v-else>
      <b-nav-item @click="gotoLogin">Login</b-nav-item>
      <b-nav-item @click="gotoRegister">Register</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    data() {
      return {
        searchQuery: "",
        token: "",
      };
    },
    goHome() {
      if (this.$route.name != "Home") {
        this.$router.push({ name: "Home" });
      }
    },
    gotoLogin() {
      this.$router.push({ name: "Login" });
    },
    gotoRegister() {
      this.$router.push({ name: "Register" });
    },
    logOut() {
      this.$store.dispatch("destroyToken").then(() => {
        this.$router.push("/login");
      });
    },
    search() {
      if (!(this.$route.params.q == this.searchQuery)) {
        if (this.$route.name != "Search") {
          this.$router.push(`/search/${this.searchQuery}`);
        } else {
          this.$router.replace(`/search/${this.searchQuery}`);
        }
      }
    },
    getRole() {
      return localStorage.getItem("role") != "USER";
    },
    goToAdmin() {
      this.$router.push("/admin");
    },
  },
  created() {
    this.searchQuery = "";
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
  },

  mounted() {
    this.searchQuery = "";
  },
};
</script>

<style></style>
