<template>
  <div class="container is-fullhd">
    {{ title }} |
    {{ id }}
    <!-- <div class="control">
      <div class="select">
        <select v-model="myRating" @click="addRating">
          <option>Select rating</option>
          <option>1 Star</option>
          <option>2 Star</option>
          <option>3 Star</option>
          <option>4 Star</option>
          <option>5 Star</option>
        </select>
      </div>
    </div> -->

    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="textarea" v-model="myComments"></textarea>
      </div>
    </div>
    <button @click="updateRating()">
      Save
    </button>
    <star-rating v-model="rating"></star-rating> {{ rating }}
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
          this.myComments = snapshot.data().myComments;
          this.rating = snapshot.data().rating;
        });
      console.log("Date Fetched");
    },

    updateRating() {
      db.collection("movieJournal")
        .doc(this.$route.params.id)
        .update({
          rating: this.rating,
          myComments: this.myComments,
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

<style lang="sass">
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
</style>
