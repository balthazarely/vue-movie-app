<template>
  <section class=" bg-container">
    <!-- <div class="hero overlay"></div> -->
    <div
      class="hero-body banner-image"
      :style="{
        height: '60vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `linear-gradient(rgba(${colorPallet.DarkMuted.r},${colorPallet.DarkMuted.g},${colorPallet.DarkMuted.b},0.6), rgba(${colorPallet.DarkMuted.r},${colorPallet.DarkMuted.g},${colorPallet.DarkMuted.b},1)), url(https://image.tmdb.org/t/p/w780/${movieData.backdrop_path}) `,
      }"
    >
      <!-- movieData.backdrop_path -->
      <div class="container">
        <div class="columns is-mobile ">
          <div class="column is-variable is-3-desktop is-mobile">
            <figure class="image is-2-by-3">
              <img
                class="movie-cover"
                v-bind:src="
                  'https://image.tmdb.org/t/p/w200/' + movieData.poster_path
                "
              />
            </figure>
          </div>
          <div
            class="column is-mobile is-multiline is-variable is-two-thirds is-mobile"
          >
            <h1
              class="title is-3 is-size-4-mobile has-text-white has-text-left has-text-weight-bold"
            >
              {{ movieData.title }}
            </h1>

            <h1
              class="subtitle is-4 is-size-5-mobile has-text-white has-text-left has-text-weight-light"
            >
              {{ trimeDate(movieData.release_date) }}
            </h1>
            <div class="container has-text-left mb-5">
              <button
                @click="
                  addMovieToFavorites(
                    movieData.id,
                    movieData.title,
                    movieData.poster_path
                  )
                "
                class="button is-success"
              >
                <span class="icon is-small">
                  <i class="fas fa-check"></i>
                </span>
                <span>Save</span>
              </button>
            </div>

            <div class="genre-wrapper">
              <div v-for="(genre, i) in movieData.genres" :key="i">
                <span class="tag is-light genres">{{ genre.name }}</span>
              </div>
            </div>
            <h2
              class="subtitle is-5 is-size-4-mobile has-text-white has-text-left mt-5"
            >
              {{ movieData.tagline }}
            </h2>

            <p class=" is-5 is-size-7-mobile has-text-white has-text-left mt-4">
              {{ movieData.overview }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <h1
      class="similar-header"
      :style="{
        background: `rgba(${colorPallet.DarkMuted.r},${colorPallet.DarkMuted.g},${colorPallet.DarkMuted.b}, 1) `,
      }"
    >
      Similar Movies
    </h1>
    <carousel
      :perPageCustom="[
        [600, 4],
        [1024, 6],
      ]"
      class="carousel"
      :style="{
        background: `rgba(${colorPallet.DarkMuted.r},${colorPallet.DarkMuted.g},${colorPallet.DarkMuted.b}, 1) `,
      }"
    >
      <slide
        class="carousel-slide"
        v-for="movie in similarMovieData"
        :key="movie.id"
      >
        <img
          class="movie-cover"
          v-bind:src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path"
        />
        <router-link
          :to="{
            name: 'Movie',
            params: { movie_id: movie.id },
          }"
        >
          <h1
            class="title is-7 is-size-4-mobile has-text-white  has-text-weight-bold"
          >
            {{ movie.title }}
          </h1>
        </router-link>
      </slide>
    </carousel>

    <div class="hero-body banner-image">THIS IS A PLACE</div>
  </section>
</template>

<script>
import "bulma/css/bulma.css";
import axios from "axios";
import db from "@/firebase/init";
import { Carousel, Slide } from "vue-carousel";
import * as Vibrant from "node-vibrant";

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
      colorPallet: [],
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
        console.log(this.movieCredits, "movie credits");
      });
  },
  methods: {
    addMovieToFavorites(newId, newTitle, poster_path) {
      db.collection("favoriteMovies").add({
        title: newTitle,
        movieId: newId,
        poster_path: poster_path,
        dateAdded: new Date(),
      });
    },
    fetchData() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${this.apiKey}&language=en-US`
        )
        .then((response) => {
          this.movieData = response.data;
          console.log(this.movieData);
        })
        .then(() => {
          Vibrant.from(
            `https://image.tmdb.org/t/p/w185//${this.movieData.poster_path}`
          )
            .getPalette()
            .then((palette) => {
              this.colorPallet = palette;
            })
            .then(() => {
              console.log(this.colorPallet, "color");
            });
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
    trimeDate(date) {
      let length = date.length;
      let wantedLength = 6;
      let math = length - wantedLength;
      return date.slice(0, math);
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

.similar-header
  color: white
  font-size: 20px
  padding-top: 10px


.overlay
  width: 100%
  height: 100%
  background: red
  position: absolute
  top: 0
  opacity: 0.5


.carousel-slide

.carousel
  height: 300px

.genre-wrapper
  display: flex
  justify-content: flex-start
  align-items: center
  flex-direction: row

.genres
  display: flex
  margin: 0px 5px 0px 0px
</style>
