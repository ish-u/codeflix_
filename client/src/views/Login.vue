<template>
  <div>
    <div style="text-align:center;">
      <span style="font-size:120px">
        <b>login</b>
      </span>
    </div>
    <b-container class="p-3">
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        Somethin went wrong or the Credentials were incorrect
      </b-alert>
      <b-form @submit.prevent="getToken" class="formPad">
        <b-form-group>
          <b-form-input
            v-model="Username"
            placeholder="Enter Username"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            v-model="Password"
            placeholder="Enter Password"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="dark">Login</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      Username: "",
      Password: "",
      showDismissibleAlert: false,
    };
  },
  methods: {
    getToken() {
      this.$store
        .dispatch("getToken", {
          username: this.Username,
          password: this.Password,
        })
        .then((res) => {
          if (res == 200) {
            this.$router.push("/");
          }
        })
        .catch(() => {
          this.showDismissibleAlert = true;
        });
    },
  },
};
</script>

<style>
.formPad {
  text-align: center;
  padding-left: 15%;
  padding-right: 15%;
}
</style>
