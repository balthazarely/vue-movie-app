<template>
  <section class="hero" style="background: red">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Hero title
        </h1>
        <h2 class="subtitle">
          Hero subtitle
        </h2>

        <div class="field">
          <label class="label">Trending Timeframe</label>
          <div class="control">
            <div class="select">
              <select v-model="filterBy">
                <option>day</option>
                <option>week</option>
              </select>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="columns is-multiline is-variable is-3">
            <div
              class="column  is-one-fifth-widescreen is-one-quarter-desktop is-one-third-tablet  movie-card"
              v-for="movie in topMovieData.results"
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
  </section>
</template>

<script>
import "bulma/css/bulma.css";
import axios from "axios";
import db from "@/firebase/init";
export default {
  name: "about",
  data() {
    return {
      topMovieData: [],
      filterBy: "day",
      apiKey: process.env.VUE_APP_API_KEY,
    };
  },
  mounted() {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/${this.filterBy}?api_key=${this.apiKey}`
      )
      .then((response) => {
        this.topMovieData = response.data;
        console.log(this.topMovieData);
      });
  },
  methods: {
    addMovieToFavorites(newId, newTitle, poster_path) {
      db.collection("favoriteMovies").add({
        title: newTitle,
        movieId: newId,
        poster_path: poster_path,
      });
    },
  },
  watch: {
    filterBy: function(val, oldVal) {
      console.log(val, oldVal);
      this.filterBy = val;
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/${this.filterBy}?api_key=5e9bd2fa585826bdfc4233fb6424f425`
        )
        .then((response) => {
          this.topMovieData = response.data;
          console.log(this.topMovieData);
        });
    },
  },
};
</script>
