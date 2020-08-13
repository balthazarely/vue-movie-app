<template>
  <section class="hero main-container">
    <div class="movie-theatre-wrapper">
      <p
        class="title is-4 is-size-5-mobile has-text-white has-text-weight-bold"
      >
        Check out recent popular movies!
      </p>
      <div class="field">
        <label class="label has-text-white">Trending Timeframe</label>
        <div class="control">
          <div class="select">
            <select v-model="filterBy">
              <option>day</option>
              <option>week</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="container" else>
      <div class="notification is-white">
        <div class="columns">
          <div class="columns is-mobile is-multiline is-variable is-3">
            <div
              class="column  is-one-fifth-widescreen is-one-third-mobile is-one-fifth-desktop is-one-quarter-tablet  movie-card"
              v-for="movie in topMovieData.results"
              :key="movie.id"
            >
              <router-link
                :to="{
                  name: 'Movie',
                  params: { movie_id: movie.id },
                }"
              >
                <figure class="image movie-image is-2-by-3">
                  <img
                    class="movie-cover"
                    v-bind:src="
                      'https://image.tmdb.org/t/p/w200/' + movie.poster_path
                    "
                  />
                </figure>
              </router-link>
              <div class="title is-6 is-size-4-mobile movie-title">
                <router-link
                  :to="{
                    name: 'Movie',
                    params: { movie_id: movie.id },
                  }"
                >
                  <p
                    class="title is-6 is-size-6-mobile"
                    style="text-decoration: none;"
                  >
                    {{ movie.title }}
                  </p>
                </router-link>
              </div>
              <div class="subtitle is-6 movie-subtitle">
                {{ trimeDate(movie.release_date) }}
              </div>
            </div>
          </div>
        </div>
        <nav class="pagination" role="navigation" aria-label="pagination">
          <a
            class="pagination-previous"
            title="This is the first page"
            :disabled="previousDisabled"
            @click="previousPage"
            >Previous</a
          >
          <a class="pagination-next" @click="nextPage" :disabled="nextDisabled"
            >Next page</a
          >
        </nav>
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
      currentPage: 1,
      totalPages: null,
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      // get most popular movies
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.currentPage}`
          // `https://api.themoviedb.org/3/trending/movie/${this.filterBy}?api_key=${this.apiKey}&page=${this.currentPage}`
        )
        .then((response) => {
          this.topMovieData = response.data;
          this.totalPages = response.data.total_pages;
          console.log(this.topMovieData);
        });
    },

    addMovieToFavorites(newId, newTitle, poster_path) {
      // db.collection("favoriteMovies").add({
      //   title: newTitle,
      //   movieId: newId,
      //   poster_path: poster_path,
      //   dateAdded: new Date(),
      // });
      const query = db
        .collection("favoriteMovies")
        .where("movieId", "==", newId)
        .get()
        .then((doc) => {
          if (doc.docs.length >= 2) {
            console.log("this already exisits");
          } else {
            db.collection("favoriteMovies").add({
              title: newTitle,
              movieId: newId,
              poster_path: poster_path,
              dateAdded: new Date(),
            });
          }
        });

      console.log(newId);
    },
    nextPage() {
      this.currentPage++;
      this.fetchMovies();
    },
    previousPage() {
      this.currentPage--;
      this.fetchMovies();
    },
    trimeDate(date) {
      let length = date.length;
      let wantedLength = 6;
      let math = length - wantedLength;
      return date.slice(0, math);
    },
  },
  computed: {
    previousDisabled() {
      if (this.currentPage == 1) {
        return true;
      } else {
        return false;
      }
    },
    nextDisabled() {
      if (this.currentPage == this.totalPages) {
        return true;
      } else {
        return false;
      }
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

<style lang="sass" scoped>
.main-container
  background: white

.movie-theatre-wrapper
  width: 100%
  height: 200px
  background-position: top
  background-repeat: no-repeat
  background-size: cover
  background-image: linear-gradient(rgba(1, 40, 68 , .8), rgba(1, 40, 68 , .8)),  url("../assets/pulpfiction.jpg")
  display: flex
  justify-content: center
  align-items: center

.add-movie-btn
  z-index: 100
  position: relative
  left: 100px
  top: 20px
</style>
