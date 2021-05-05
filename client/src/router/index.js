import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Video from "../views/Video.vue";
import Search from "../views/Search.vue";
import Admin from "../views/Admin"
import store from "../store";
import Playlist from "../views/Playlist";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/video/:id/:pid",
    name: "Video",
    component: Video,
    props: true,
  },
  {
    path: "/search/:q",
    name: "Search",
    component: Search,
    props: true,
  },
  {
    path: "/playlist/:id",
    name: "Playlist",
    component: Playlist,
    props: true,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/register", "/login"];
  const needAuth = !publicPages.includes(to.path);
  const isLoggedIn = store.getters.loggedIn;
  // console.log(isLoggedIn);
  if (needAuth && !isLoggedIn) {
    next({ path: "/login" });
  } else if (!needAuth && isLoggedIn) {
    next({ path: "/" });
  }
  next();
});
export default router;
