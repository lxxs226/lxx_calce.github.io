<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <CalculatorIndex/>
  </div>
</template>

<script>
import CalculatorIndex from './components/CalculatorIndex.vue'

export default {
  name: 'App',
  components: {
    CalculatorIndex
  }
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
</style>
