<template>
  <div id="app">
    <div id="nav">
      <div class="has-text-right">
        <router-link to="/Login"
          ><button class="button is-small">Login</button></router-link
        >
        <router-link to="/Register"
          ><button class="button is-small">Register</button></router-link
        >
      </div>
      <div class="logo"><img id="logo" src="./assets/cine-app-logo.svg" /></div>
      <router-link to="/">Home</router-link> |
      <router-link to="/new-releases">Popular</router-link> |
      <router-link to="/genres">By Genre</router-link> |
      <router-link to="/favorites">Watchlist</router-link> |
      <router-link to="/Journal">Journals</router-link> |
    </div>
    <router-view />
    <!-- <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>cineapp</strong> by
          <a href="https://jgthms.com">Balthazar Ely</a>. The source code can be
          found here
        </p>
      </div>
    </footer> -->
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "app",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
        console.log(this.isLoggedIn);
      }
      console.log(this.isLoggedIn);
    },

    // getUser() {
    //   firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       console.log(user, " < signed in on APP.vue");
    //       this.isLoggedIn = true;
    //     } else {
    //       console.log(user, " < signed NOTTTTT in");
    //       this.isLoggedIn = false;
    //     }
    //   });
    // },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background: #012844;
  color: white;
  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #3abac0;
    }
  }
}

#logo {
  width: 60px;
}
</style>
