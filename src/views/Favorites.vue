<template>
  <div class="hero">
    <div class="movie-theatre-wrapper">
      <p
        class="title is-4 is-size-5-mobile has-text-white has-text-weight-bold"
      >
        My Watchlist
      </p>
      <p class="subtitle is-6 is-size-6-mobile has-text-white mt-1">
        Once you've watched the movie, click "Journal" to add them to your watch
        journal
      </p>
    </div>
    <div class="container">
      <div class="notification">
        <div class="columns is-multiline is-mobile">
          <div
            v-for="movie in favoriteMovies"
            :key="movie.id"
            class="column is-full-tablet is-full-mobile is-half-desktop "
          >
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image ">
                      <img
                        style="height: 200px; width: 133px"
                        v-bind:src="
                          'https://image.tmdb.org/t/p/w200/' + movie.poster_path
                        "
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div
                      style="display: flex; justify-content: space-between; "
                    >
                      <router-link
                        :to="{
                          name: 'Movie',
                          params: { movie_id: movie.movieId },
                        }"
                      >
                        <p class="title has-text-left is-5 is-size-5-mobile">
                          {{ movie.title }}
                        </p>
                      </router-link>
                      <div
                        class="btn-wrapper"
                        style=" display: flex; flex-direction: row"
                      >
                        <button
                          @click="
                            addToJournal(
                              movie.id,
                              movie.title,
                              movie.poster_path,
                              movie.dateAdded
                            )
                          "
                          class="button is-small"
                        >
                          <span class="icon is-small">
                            <i class="fas fa-book"></i>
                          </span>
                          <span> Journal</span>
                        </button>
                        <button
                          @click="removeMovieFromFavorites(movie.id)"
                          class="button is-small"
                        >
                          <span class="icon is-small">
                            <i class="fas fa-trash-alt"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                    <p
                      class="subtitle is-5 is-size-5-mobile is-size-6-tablet has-text-left"
                    >
                      {{ trimeDate(movie.releaseDate) }}
                    </p>
                    <p class="subtitle is-6 is-size-7-mobile has-text-left">
                      {{ shortenString(movie.overview) }}...
                    </p>
                  </div>
                </div>
              </div>
              <!-- <footer class="card-footer">
              <a
                @click="
                  addToJournal(
                    movie.id,
                    movie.title,
                    movie.poster_path,
                    movie.dateAdded
                  )
                "
                class="card-footer-item"
                >Wached</a
              >
              <a
                @click="removeMovieFromFavorites(movie.id)"
                class="card-footer-item"
                >Delete</a
              >
            </footer> -->
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
import firebase from "firebase";
export default {
  name: "about",
  data() {
    return {
      favoriteMovies: [],
      selectedGenre: null,
      apiKey: process.env.VUE_APP_API_KEY,
      currentUser: false,
      currentUserUID: false,
    };
  },
  created() {
    this.getUser();
    this.getAllFavoriteMovies();
  },
  methods: {
    getUser() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
        this.currentUserUID = firebase.auth().currentUser.uid;
      }
      console.log(this.currentUserUID);
    },
    shortenString(string) {
      return string.substring(0, 300);
    },
    trimeDate(date) {
      let length = date.length;
      let wantedLength = 6;
      let math = length - wantedLength;
      return date.slice(0, math);
    },
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
        userUID: this.currentUserUID,
      });
      this.removeMovieFromFavorites(newId);
    },
    getAllFavoriteMovies() {
      db.collection("favoriteMovies")
        .where("userUID", "==", this.currentUserUID)
        // .orderBy("dateAdded")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const movie = {
              title: doc.data().title,
              id: doc.id,
              poster_path: doc.data().poster_path,
              movieId: doc.data().movieId,

              dateAdded: doc.data().dateAdded,
              overview: doc.data().overview,
              releaseDate: doc.data().releaseDate,
            };

            this.favoriteMovies.push(movie);
          });
        });
      console.log(this.favoriteMovies);
    },
  },
};
</script>

<style lang="sass" scoped>
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

.movie-theatre-wrapper
  width: 100%
  height: 200px
  background-position: right top 20px 10px
  background-repeat: no-repeat
  background-size: cover
  background-image: linear-gradient(rgba(1, 40, 68 , .8), rgba(1, 40, 68 , .8)),  url("../assets/blackkklansman.jpg")
  display: flex
  justify-content: center
  align-items: center
</style>
