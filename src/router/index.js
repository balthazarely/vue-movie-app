import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Movie from "../views/Movie.vue";
import Favorites from "../views/Favorites.vue";
import Genres from "../views/Genres.vue";
import Journal from "../views/Journal.vue";
import JournalEdit from "../views/JournalEdit.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
  },
  {
    path: "/genres",
    name: "Genres",
    component: Genres,
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
    path: "/journal",
    name: "Journal",
    component: Journal,
  },
  {
    path: "/journal-edit/:id",
    name: "journal-edit",
    component: JournalEdit,
  },
  {
    // adding the parameter from the specific smoothie
    path: "/movie/:movie_id",
    name: "Movie",
    component: Movie,
  },

  {
    path: "/new-releases",
    name: "new-releases",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    // mode: "history",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
