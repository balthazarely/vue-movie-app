<template>
  <section class="hero bg-container">
    <!-- <div class="hero overlay"></div> -->
    <div class="hero-body" style="border: 2px solid blue">
      <div class="container">
        <h1 class="title">
          Hero title
        </h1>
        <div class="columns" style="border: 2px solid red">
          <div class="column is-one-third">
            <figure class="image is-2-by-3">
              <img
                class="movie-cover"
                v-bind:src="
                  'https://image.tmdb.org/t/p/w200/' + movieData.poster_path
                "
              />
            </figure>
          </div>
          <div class="column is-two-thirds">
            <h1>{{ movieData.title }}</h1>
            <h2>{{ movieData.tagline }}</h2>
            <h2>{{ movieData.release_date }}</h2>
            <h2>{{ movieData.runtime }}</h2>

            <div class="genre" v-for="(genre, i) in movieData.genres" :key="i">
              <div>{{ genre.name }}</div>
            </div>
            <p>{{ movieData.overview }}</p>

            <button
              class=""
              @click="
                addMovieToFavorites(
                  movieData.id,
                  movieData.title,
                  movieData.poster_path
                )
              "
            >
              Add to Favorites
            </button>

            <!-- need to make this so that this is a vloop  -->

            <carousel :perPage="4" class="carousel">
              <slide
                class="carousel-slide"
                v-for="movie in similarMovieData"
                :key="movie.id"
              >
                <img
                  class="movie-cover"
                  v-bind:src="
                    'https://image.tmdb.org/t/p/w200/' + movie.poster_path
                  "
                />
                <router-link
                  :to="{
                    name: 'Movie',
                    params: { movie_id: movie.id },
                  }"
                >
                  {{ movie.title }}
                </router-link>
              </slide>
            </carousel>

            <!-- <div
              class="cast"
              v-for="actor in movieCredits.cast"
              :key="actor.id"
            >
              <div>{{ actor.name }}</div>
            </div> -->
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
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "Movie",
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_API_KEY,
      movieId: this.$route.params.movie_id,
      movieData: [],
      movieCredits: [],
      similarMovieData: [],
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.movieId = to.params.movie_id;
    this.fetchData();
  },
  created() {
    console.log("hi");
    this.fetchData();
    // CREDITS
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=${this.apiKey}`
      )
      .then((response) => {
        this.movieCredits = response.data;
        // console.log(this.movieCredits, "movie credits");
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
    fetchData() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${this.apiKey}&language=en-US`
        )
        .then((response) => {
          this.movieData = response.data;
          // console.log(this.movieData);
        });

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.movieId}/similar?api_key=${this.apiKey}&language=en-US&page=1`
        )
        .then((response) => {
          let array = response.data.results;
          let length = array.length;
          // this.similarMovieData = array.splice(14 + 1, array.length - (14 + 1));
          this.similarMovieData = response.data.results;
          console.log(this.similarMovieData, " similar movies");
        });
    },
  },
};
</script>

<style lang="sass">
.container
  position: relative

.movie-cover
  border-radius: 10px
  margin: 10px
  width: 120px

.bg-container
  // background-repeat: no-repeat
  // background-size: cover
  // background-position: center
  // height: 100%
  // width: 100%
  // z-index: -0

.overlay
  width: 100%
  height: 100%
  background: red
  position: absolute
  top: 0
  opacity: 0.5


.carousel-slide

.carousel
  border: 2px solid red
  height: 300px
</style>
