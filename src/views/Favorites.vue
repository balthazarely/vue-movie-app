<template>
  <div class="container is-fullhd">
    <div class="notification">
      <div class="columns">
        <div class="columns is-multiline is-variable is-3">
          <div
            class="column is-one-fifth-desktop  movie-card"
            v-for="movie in favoriteMovies"
            :key="movie.id"
          >
            <button @click="removeMovieFromFavorites(movie.id)">
              X
            </button>
            <button
              @click="
                addToJournal(
                  movie.id,
                  movie.title,
                  movie.poster_path,
                  movie.dateAdded
                )
              "
            >
              Watched
            </button>

            <figure class="image movie-image is-2-by-3">
              <img
                class="movie-cover"
                v-bind:src="
                  'https://image.tmdb.org/t/p/w200/' + movie.poster_path
                "
              />
              <div class="movie-rating">{{ movie.vote_average }}</div>
            </figure>
            <div class="title is-6 is-size-4-mobile movie-title">
              <router-link
                :to="{
                  name: 'Movie',
                  params: { movie_id: movie.movieId },
                }"
              >
                {{ movie.title }}
              </router-link>
            </div>
            <div class="subtitle is-6 movie-subtitle">
              {{ movie.release_date }}
            </div>
          </div>
        </div>
      </div>
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
      favoriteMovies: [],
      selectedGenre: null,
      apiKey: process.env.VUE_APP_API_KEY,
    };
  },
  created() {
    this.getAllFavoriteMovies();
  },
  methods: {
    removeMovieFromFavorites(id) {
      this.favoriteMovies = this.favoriteMovies.filter((movie) => {
        return movie.movieId != id;
      });
      db.collection("favoriteMovies")
        .doc(id)
        .delete()
        .then(() => {
          this.favoriteMovies = this.favoriteMovies.filter((movie) => {
            return movie.id != id;
          });
        });
    },
    addToJournal(newId, newTitle, poster_path, date_added) {
      db.collection("movieJournal").add({
        title: newTitle,
        movieId: newId,
        poster_path: poster_path,
        date_added: date_added,
      });
      // this.removeMovieFromFavorites(newId);
    },
    getAllFavoriteMovies() {
      db.collection("favoriteMovies")
        .orderBy("dateAdded")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const movie = {
              title: doc.data().title,
              id: doc.id,
              poster_path: doc.data().poster_path,
              movieId: doc.data().movieId,
              genre: doc.data().genre,
              dateAdded: doc.data().dateAdded,
            };

            this.favoriteMovies.push(movie);
          });
        });
      console.log(this.favoriteMovies);
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
