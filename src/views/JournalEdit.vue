<template>
  <div class="container">
    <div class="notification ">
      <div class="columns ">
        <div class="column image-col">
          <figure class="image">
            <img
              style="max-height: 300px; max-width: 200px"
              v-bind:src="'https://image.tmdb.org/t/p/w200/' + poster_path"
            />
          </figure>
          <p class="title is-5 is-size-5-mobile has-text-center mt-5">
            {{ title }}
          </p>
        </div>
        <div class="column is-three-quarters">
          <div class="field">
            <label class="label has-text-left">Notes</label>
            <div class="control ">
              <textarea
                class="textarea"
                rows="10"
                v-model="myComments"
              ></textarea>
            </div>
            <div class="star-container">
              <div style="display: flex">
                <p class="subtitle is-5 is-size-5-mobile has-text-left mt-5">
                  My rating:
                </p>
                <star-rating
                  v-model="rating"
                  active-color="#1DA6A2"
                  v-bind:star-size="30"
                  v-bind:show-rating="false"
                ></star-rating>
              </div>

              <div class="date-wrapper" style="display: flex">
                <label for="start">Watch date:</label>
                <input
                  style="height: 20px"
                  type="date"
                  id="start"
                  v-model="watchDate"
                  name="trip-start"
                  value=""
                  min="2018-01-01"
                  max=""
                />
              </div>
            </div>
          </div>

          <router-link to="/Journal">
            <button class="button is-warning " style="text-decoration: none;">
              Back
            </button></router-link
          >
          <button @click="updateRating()" class="button is-primary ">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import axios from "axios";
import db from "@/firebase/init";
import StarRating from "vue-star-rating";
export default {
  name: "journal-edit",
  components: {
    StarRating,
  },
  data() {
    return {
      id: null,
      title: null,
      myComments: null,
      rating: 3,
      watchDate: null,
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.fetchData();
  },
  methods: {
    fetchData() {
      db.collection("movieJournal")
        .doc(this.$route.params.id)
        .get()
        .then((snapshot) => {
          console.log(snapshot.data());
          this.id = snapshot.data().movieId;
          this.title = snapshot.data().title;
          this.poster_path = snapshot.data().poster_path;
          this.myComments = snapshot.data().myComments;
          this.rating = snapshot.data().rating;
          this.watchDate = snapshot.data().watchDate;
        });
      console.log("Date Fetched");
    },

    updateRating() {
      db.collection("movieJournal")
        .doc(this.$route.params.id)
        .update({
          rating: this.rating,
          myComments: this.myComments,
          watchDate: this.watchDate,
        })
        .then(() => {
          this.$router.push({
            name: "Journal",
          });
        });
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

.rating-wrapper
    border: 2px solid red

.image-col
  display: flex
  flex-direction: column

.image
    display: flex
    justify-content: center

.star-container
    display: flex
    justify-content: space-between
</style>
