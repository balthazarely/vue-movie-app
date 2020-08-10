<template>
  <section class="hero" style="background: red; max-width:">
    <div class="columns">
      <div class="column">
        <p class="bd-notification is-info">HEADEr</p>
        <div class="columns is-mobile ">
          <div class="column is one-forth">
            <div class="dropdown">
              <div class="dropdown-trigger">
                <button
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  @click="toggelDropdown"
                >
                  <span>Select Year</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="chooseYear(2020)">
                    2020
                  </a>
                  <a class="dropdown-item" @click="chooseYear(2019)">
                    2019
                  </a>
                  <a class="dropdown-item" @click="chooseYear(2018)">
                    2018
                  </a>
                  <a class="dropdown-item" @click="chooseYear(2017)">
                    2017
                  </a>
                </div>
              </div>
            </div>
            <a
              class="bd-notification is-info"
              @click="chooseGenre(28)"
              style="display: block"
              >Action</a
            >
            <a
              class="bd-notification is-info"
              @click="chooseGenre(35)"
              style="display: block"
              >Comedy</a
            >
            <a
              class="bd-notification is-info"
              @click="chooseGenre(27)"
              style="display: block"
              >Horror</a
            >
          </div>
          <div class="column is-three-quarters">
            <div class="columns is-mobile is-multiline is-variable">
              <div
                class="column is-3 is-one-third-mobile "
                v-for="movie in movieData.results"
                :key="movie.id"
              >
                <router-link
                  :to="{
                    name: 'Movie',
                    params: { movie_id: movie.id },
                  }"
                >
                  <figure class="image is-2-by-3">
                    <img
                      class="movie-cover"
                      v-bind:src="
                        'https://image.tmdb.org/t/p/w200/' + movie.poster_path
                      "
                    />
                  </figure>
                </router-link>
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
export default {
  name: "genres",
  data() {
    return {
      dropdownOpen: false,
      movieData: [],
      chosenGenre: 30,
      chosenYear: 2020,
      apiKey: process.env.VUE_APP_API_KEY,
    };
  },
  methods: {
    fetchGenreList() {
      axios
        .get(
          ` https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${this.chosenYear}&with_genres=${this.chosenGenre}`
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
    toggelDropdown() {
      const dropDown = document.querySelector(".dropdown");
      if (this.dropdownOpen == false) {
        dropDown.classList.add("is-active");
        this.dropdownOpen = true;
      } else {
        dropDown.classList.remove("is-active");
        this.dropdownOpen = false;
      }
    },
    chooseYear(year) {
      this.toggelDropdown();
      this.chosenYear = year;
      this.fetchGenreList();
    },
    chooseGenre(genre) {
      this.chosenGenre = genre;
      this.fetchGenreList();
    },
  },
};
</script>

<style lang="sass">
.movie-poster
  width: 150px
</style>
