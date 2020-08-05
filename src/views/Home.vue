<template>
  <div class="container is-fullhd">
    <div class="notification">
      <div class="columns">
        <div class="column is-narrow">
          <div class="box">
            <p class="title is-5">Search</p>
            <input
              class="input"
              type="text"
              placeholder="Text input"
              v-on:keyup.enter="getMovieByTitle"
              v-model="movieSearch"
              label="Standard"
            />
            <label class="checkbox" style="margin-top: 10px">
              <input v-model="includeAdult" type="checkbox" />
              Include Adult
            </label>
          </div>
        </div>

        <div class="columns is-multiline is-variable is-3">
          <div
            class="column  is-one-quarter-widescreen is-one-third-desktop is-half-tablet  movie-card"
            v-for="movie in movieData.results"
            :key="movie.id"
          >
            <button
              class="button is-success add-movie-btn"
              @click="
                addMovieToFavorites(movie.id, movie.title, movie.poster_path)
              "
            >
              <span class="icon is-small">
                <i class="fas fa-check"></i>
              </span>
              <span>Save</span>
            </button>

            <figure class="image movie-image is-2-by-3">
              <router-link
                :to="{
                  name: 'Movie',
                  params: { movie_id: movie.id },
                }"
              >
                <img
                  class="movie-cover"
                  v-bind:src="
                    'https://image.tmdb.org/t/p/w200/' + movie.poster_path
                  "
                />
              </router-link>

              <div class="movie-rating">{{ movie.vote_average }}</div>
            </figure>
            <div class="title is-6 is-size-4-mobile movie-title">
              <router-link
                :to="{
                  name: 'Movie',
                  params: { movie_id: movie.id },
                }"
              >
                {{ movie.title }}
              </router-link>
            </div>
            <div class="subtitle is-6 movie-subtitle">
              {{ movie.release_date }}
            </div>
            <div class="tags">
              <span class="tag">One</span>
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
  name: "Home",
  data() {
    return {
      movieSearch: "",
      includeAdult: false,
      movieData: [],
      topMovieData: [],
      errFeedback: null,
      apiKey: process.env.VUE_APP_API_KEY,
    };
  },
  methods: {
    getMovieByTitle() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=${this.includeAdult}&query=${this.movieSearch}`
        )
        .then((response) => {
          if (response.data.Error) {
            this.movieData = null;
            this.errFeedback = "Your search didn't yeild any results";
          } else {
            this.movieData = response.data;
            this.errFeedback = "";
            console.log(response.data);
          }
        });
    },
    addMovieToFavorites(newId, newTitle, poster_path) {
      db.collection("favoriteMovies").add({
        title: newTitle,
        movieId: newId,
        poster_path: poster_path,
      });

      // this.favoriteMovies.some((title) => title.id === newId)
      //   ? null
      //   : this.favoriteMovies.push({ id: newId, title: newTitle });
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
