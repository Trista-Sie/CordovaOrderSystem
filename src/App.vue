<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link>|
    <router-link to="/purchase">Purchase</router-link> -->
    <router-view />
  </div>
</template>
<script>
// 使用 Bootstrap 套件
// import Vue from "vue";
// import bootstrap from 'bootstrap'
// Vue.use(bootstrap)
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
