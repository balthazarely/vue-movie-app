<template>
  <div id="app">
    <div id="nav">
      <div class="logo"><img id="logo" src="./assets/cine-app-logo.svg" /></div>
      <router-link to="/">Home</router-link> |
      <router-link to="/new-releases">Popular</router-link> |
      <router-link to="/favorites">Watchlist</router-link> |
      <router-link to="/genres">By Genre</router-link> |
      <router-link to="/Journal">Journals</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
