<template>
  <div>
    <div style="text-align:center;">
      <span style="font-size:120px">
        <b>register</b>
      </span>
    </div>
    <b-container class="p-5">
      <b-alert v-model="show" variant="danger" dismissible>
        Something went wrong
      </b-alert>
      <b-form @submit.prevent="getToken" class="formPad">
        <b-form-group>
          <b-form-input v-model="name" placeholder="Enter Name" required>
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="email"
            placeholder="Enter Email"
            type="email"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="age"
            placeholder="Enter Age"
            type="number"
            required
            min="10"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="username"
            placeholder="Enter Username"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            type="password"
            v-model="password"
            placeholder="Enter Password"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="dark">register</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "",
      email: "",
      age: "",
      username: "",
      password: "",
      show: false,
    };
  },
  methods: {
    getToken() {
      console.log(this.username, this.password);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          age: this.age,
          username: this.username,
          password: this.password,
        }),
      };
      fetch(`${process.env.VUE_APP_CODEFLIX_API}/register`, requestOptions)
        .then((response) => {
          if (response.status == 200) {
            this.$router.push("/login");
          } else {
            console.log("F");
          }
        })
        .catch((error) => {
          this.show = true;
          this.console.log(error);
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
