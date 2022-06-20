<template>
<div class="app">
  <img class="logo" alt="Dit logo" src="./assets/ditLogo.png">
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  width: 400px;
}
</style>
