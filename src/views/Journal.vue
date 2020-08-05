<template>
  <div class="container is-fullhd">
    <div class="movie-list" v-for="movie in journaledMovies" :key="movie.id">
      {{ movie.title }}
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import axios from "axios";
import db from "@/firebase/init";
export default {
  name: "about",
  data() {
    return {
      journaledMovies: [],
      apiKey: process.env.VUE_APP_API_KEY,
    };
  },
  created() {
    this.getAllJournalovies();
  },

  methods: {
    getAllJournalovies() {
      db.collection("movieJournal")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const movie = {
              title: doc.data().title,
              id: doc.id,
              poster_path: doc.data().poster_path,
              movieId: doc.data().movieId,
            };

            this.journaledMovies.push(movie);
          });
        });
    },
  },
};
</script>

<style lang="sass">
.movie-cover
  border-radius: 10px

.movie-title
  text-align: left
  margin-top: 10px

.movie-subtitle
  text-align: left
  margin-top: 2px

.fav-movie-cover
  height: 60px
  width: 40px
  img
    width: 100%
    height: 100%

.movie-card
  position: relative
  &:hover
    .add-movie-btn
       opacity: 1

.add-movie-btn
  position: absolute
  top: 22px
  right: 22px
  z-index: 10
  opacity: 0

.movie-rating
  border: 2px solid red
  background: red
  width: 40px
  height: 40px
  display: flex
  justify-content: center
  align-items: center
  color: white
  position: absolute
  z-index: 10
  right: 0px
  bottom: 0px
</style>
