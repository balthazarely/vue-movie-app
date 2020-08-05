<template>
  <div class="container">
    <div
      class="container is-fullhd bg-container"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w200${movieData.poster_path})`,
      }"
    ></div>
    <div class="container main-container is-fullhd">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import axios from "axios";
export default {
  name: "Movie",
  data() {
    return {
      movieId: this.$route.params.movie_id,
      movieData: [],
    };
  },
  created() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=5e9bd2fa585826bdfc4233fb6424f425&language=en-US`
      )
      .then((response) => {
        this.movieData = response.data;
        console.log(this.movieData);
      });
  },
};
</script>

<style lang="sass">
.container
  position: relative

.movie-cover
  border-radius: 10px
  margin: 20px

.bg-container
  background-repeat: no-repeat
  background-size: cover
  background-position: center
  height: 100%
  width: 100%
  position: absolute
  top: 0
  opacity: 0.3

.main-container
</style>
