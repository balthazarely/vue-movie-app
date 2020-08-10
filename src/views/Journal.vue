<template>
  <div class="container is-fullhd">
    <div class="movie-list" v-for="movie in journaledMovies" :key="movie.id">
      {{ movie.title }}
      <router-link
        class="secondary-content"
        v-bind:to="{
          name: 'journal-edit',
          params: { id: movie.id },
        }"
      >
        <button>Edit</button></router-link
      >
      {{ movie.rating }}
      <button @click="removeMovieFromJournal(movie.id)">x</button>
      <div class="my-comments">{{ movie.myComments }}</div>
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import axios from "axios";
import db from "@/firebase/init";
import StarRating from "vue-star-rating";

export default {
  name: "about",
  components: {
    StarRating,
  },
  data() {
    return {
      journaledMovies: [],
      apiKey: process.env.VUE_APP_API_KEY,
      rating: null,
    };
  },
  created() {
    this.getAllJournalMovies();
    console.log(this.journaledMovies);
  },

  methods: {
    getAllJournalMovies() {
      db.collection("movieJournal")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const movie = {
              title: doc.data().title,
              id: doc.id,
              poster_path: doc.data().poster_path,
              movieId: doc.data().movieId,
              rating: doc.data().rating,
              myComments: doc.data().myComments,
              // dateWatched: doc.data().dateWatched,
            };

            this.journaledMovies.push(movie);
          });
        });
    },
    removeMovieFromJournal(id) {
      this.journaledMovies = this.journaledMovies.filter((movie) => {
        return movie.movieId != id;
      });
      db.collection("movieJournal")
        .doc(id)
        .delete()
        .then(() => {
          this.journaledMovies = this.journaledMovies.filter((movie) => {
            return movie.id != id;
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

.rating-wrapper
    border: 2px solid red
</style>
