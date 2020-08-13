<template>
  <div class="hero">
    <div class="movie-theatre-wrapper">
      <p
        class="title is-4 is-size-5-mobile has-text-white has-text-weight-bold"
      >
        My Journal
      </p>
      <p class="subtitle is-6 is-size-6-mobile has-text-white mt-1">
        Look back on your recently watched movies and your notes, ratings, and
        date you watched them.
      </p>
    </div>
    <div class="container">
      <div class="notification">
        <div class="columns is-multiline is-mobile">
          <div
            v-for="movie in journaledMovies"
            :key="movie.id"
            class="column is-full-tablet is-full-mobile is-full-desktop "
          >
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image ">
                      <img
                        style="height: 150px; width: 100px"
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
                        <router-link
                          style="    text-decoration: none;"
                          v-bind:to="{
                            name: 'journal-edit',
                            params: { id: movie.id },
                          }"
                        >
                          <button class="button is-small">
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                          </button>
                        </router-link>
                        <button
                          @click="removeMovieFromJournal(movie.id)"
                          class="button is-small"
                        >
                          <span class="icon is-small">
                            <i class="fas fa-trash-alt"></i>
                          </span>
                        </button>
                      </div>
                    </div>

                    <p class="rating-container">
                      <span v-if="movie.rating == 1" class="">
                        <i class="fas fa-star"></i>
                      </span>
                      <span
                        v-if="movie.rating == 2"
                        class=""
                        style="margin-right: 20px"
                      >
                        <i class="fas fa-star "></i>
                        <i class="fas fa-star "></i>
                      </span>
                      <span
                        v-if="movie.rating == 3"
                        class=""
                        style="margin-right: 20px"
                      >
                        <i class="fas fa-star "></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </span>
                      <span
                        v-if="movie.rating == 4"
                        class=""
                        style="margin-right: 20px"
                      >
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </span>
                      <span
                        v-if="movie.rating == 5"
                        class=""
                        style="margin-right: 20px"
                      >
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </span>
                    </p>
                    <p v-if="!movie.myComments" class="mt-5">
                      Click "Edit" to add your own comments!
                    </p>
                    <p
                      else
                      class="subtitle mt-4 is-6 is-size-7-mobile has-text-left"
                    >
                      {{ movie.myComments }}
                    </p>
                    <p
                      v-if="movie.watchDate"
                      class="subtitle mt-4 is-6 is-size-7-mobile has-text-left"
                    >
                      <span style="font-size: 14px">date watched:</span>
                      {{ movie.watchDate }}
                    </p>
                  </div>
                </div>
              </div>
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
import StarRating from "vue-star-rating";

export default {
  name: "about",
  components: {
    StarRating,
  },
  data() {
    return {
      journaledMovies: [],
      apiKey: process.env.VUE_APP_API_KEY,
      rating: null,
      currentUser: false,
      currentUserUID: false,
    };
  },
  created() {
    this.getUser();
    this.getAllJournalMovies();
    console.log(this.journaledMovies);
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
    getAllJournalMovies() {
      db.collection("movieJournal")
        .where("userUID", "==", this.currentUserUID)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const movie = {
              title: doc.data().title,
              id: doc.id,
              poster_path: doc.data().poster_path,
              movieId: doc.data().movieId,
              rating: doc.data().rating,
              myComments: doc.data().myComments,
              watchDate: doc.data().watchDate,
              // userUID: doc.data().userUID,
            };
            this.journaledMovies.push(movie);
          });
        });
    },
    removeMovieFromJournal(id) {
      this.journaledMovies = this.journaledMovies.filter((movie) => {
        return movie.movieId != id;
      });
      db.collection("movieJournal")
        .doc(id)
        .delete()
        .then(() => {
          this.journaledMovies = this.journaledMovies.filter((movie) => {
            return movie.id != id;
          });
        });
    },
    convertDate(date) {
      let newDate = date.split("-");
      let reformatedDate = newDate[1] + "/" + newDate[2] + "/" + newDate[0];
      return reformatedDate;
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

.rating-container
  margin-top: -10px
  display: flex


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

.rating-wrapper
    border: 2px solid red

.movie-theatre-wrapper
  width: 100%
  height: 200px
  background-position: right top 20px 10px
  background-repeat: no-repeat
  background-size: cover
  background-image: linear-gradient(rgba(1, 40, 68 , .8), rgba(1, 40, 68 , .8)),  url("../assets/blackkklansman.jpg")
  display: flex
  justify-content: center
</style>
