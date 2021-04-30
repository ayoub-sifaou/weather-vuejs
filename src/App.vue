<template>
  <WeatherApp />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import WeatherApp from './components/weather-app/WeatherApp.vue'

@Options({
  components: {
    WeatherApp
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
