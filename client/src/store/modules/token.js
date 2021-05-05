const state = {
  accessToken: localStorage.getItem("accessToken") || null,
};

const getters = {
  token: (state) => state.accessToken,
  loggedIn(state) {
    return state.accessToken != null;
  },
};

const actions = {
  async getToken(context, cred) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: cred.username,
          password: cred.password,
        }),
      };
      fetch(`${process.env.VUE_APP_CODEFLIX_API}/login`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.token != null) {
            localStorage.setItem("accessToken", jsonResponse.token);
            localStorage.setItem("role", jsonResponse.role);
            context.commit("getToken", jsonResponse.token);
            resolve(200);
          } else {
            reject(201);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  destroyToken(context) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    context.commit("destroyToken");
  },
};

const mutations = {
  getToken(state, token) {
    state.accessToken = token;
  },
  destroyToken(state) {
    state.accessToken = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
