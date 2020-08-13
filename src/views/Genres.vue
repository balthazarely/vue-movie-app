<template>
  <section class="hero main-container ">
    <div class="movie-theatre-wrapper ">
      <p
        class="title is-4 is-size-5-mobile has-text-white has-text-weight-bold"
      >
        Sort by genre
      </p>
      <div class="form-container" style="display: flex">
        <div class="control">
          <div class="select">
            <select v-model="genreSelected" @change="fetchGenreList">
              <option>Select genre</option>
              <option value="28">Action</option>
              <option value="12">Adventure</option>
              <option value="16">Animation</option>
              <option value="35">Comedy</option>
              <option value="80">Crome</option>
              <option value="99">Documentary</option>
              <option value="18">Drama</option>
              <option value="10751">Family</option>
              <option value="14">Fantasy</option>
              <option value="36">History</option>
              <option value="27">Horror</option>
              <option value="10402">Music</option>
              <option value="9648">Mystery</option>
              <option value="10749">Romance</option>
              <option value="878">Science Fiction</option>
              <option value="10770">TV Movie</option>
              <option value="53">Thriller</option>
              <option value="10752">War</option>
              <option value="37">Western</option>
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
              v-for="movie in movieData.results"
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

        <div v-if="genreSelected != null">
          <nav class="pagination" role="navigation" aria-label="pagination">
            <a
              class="pagination-previous"
              title="This is the first page"
              :disabled="previousDisabled"
              @click="previousPage"
              >Previous</a
            >
            <a
              class="pagination-next"
              @click="nextPage"
              :disabled="nextDisabled"
              >Next page</a
            >
          </nav>
        </div>
      </div>
    </div>
  </section>
  <!-- <section class="hero">
    <div class="columns">
      <div class="column">
        <div class="columns is-mobile ">
          <div class="column is one-forth">
            <div class="dropdown">
              <div class="dropdown-trigger"></div>
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
  </section> -->
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
      genreSelected: null,
      chosenYear: "",
      currentPage: 1,
      apiKey: process.env.VUE_APP_API_KEY,
      searchCompleted: false,
    };
  },
  created() {
    // this.fetchGenreList();
  },
  methods: {
    fetchGenreList() {
      axios
        .get(
          ` https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.currentPage}&with_genres=${this.genreSelected}&year=${this.chosenYear}`
        )
        .then((response) => {
          if (response.data.Error) {
            this.movieData = null;
            this.errFeedback = "Your search didn't yeild any results";
          } else {
            this.movieData = response.data;
            this.errFeedback = "";
            console.log(response.data);
            this.searchCompleted = true;
          }
        });
    },
    nextPage() {
      this.currentPage++;
      this.fetchGenreList();
    },
    previousPage() {
      this.currentPage--;
      this.fetchGenreList();
    },
    trimeDate(date) {
      let length = date.length;
      let wantedLength = 6;
      let math = length - wantedLength;
      return date.slice(0, math);
    },

    // toggelDropdown() {
    //   const dropDown = document.querySelector(".dropdown");
    //   if (this.dropdownOpen == false) {
    //     dropDown.classList.add("is-active");
    //     this.dropdownOpen = true;
    //   } else {
    //     dropDown.classList.remove("is-active");
    //     this.dropdownOpen = false;
    //   }
    // },
    // chooseYear(year) {
    //   this.toggelDropdown();
    //   this.chosenYear = year;
    //   this.fetchGenreList();
    // },
    // chooseGenre(genre) {
    //   this.chosenGenre = genre;
    //   this.fetchGenreList();
    // },
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
};
</script>

<style lang="sass" scoped>
.movie-poster
  width: 150px


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

.year-wrapper
  width: 100%
  height: 200px
  background-position: top
  background-repeat: no-repeat
  background-size: cover
  background: #F8F8F8
  display: flex
  justify-content: center
  align-items: center
</style>
