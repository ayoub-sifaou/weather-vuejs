<template>
  <main class="mainWeatherApp" v-if="isMobile">
    <div class="container my-3">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center align-content-center">
            <span class="text-center fs-30 text-capitalize Lato-Bold">{{title}}</span>
          </div>
          <form class="search-city mt-3">
            <input
              type="text"
              placeholder="What city?"
              autocomplete="off"
              v-model="city"
              class="form-control border-radius-20 fs-16 p-5 input-search"
              v-on:keyup="getByCountry()"
            />
          </form>
        </div>
      </div>
      <div class="row mt-3" v-if="showWeather">
        <div class="col-12">
          <div class="card-weather position-relative bg-white border-radius-20">
           <div class="card-weather-header border-radius-20 bg-white ">
             <img src="@/assets/images/clear-sky.jpg" alt="" class="w-100 h-100" />
           </div>
           <div class="card-weather-body px-3 py-5">
             <div class="tem-weather">
               <div class="row">
                 <div class="col-8">
                   <span class="d-flex justify-content-center align-items-center">
                     <span class="text-gray-two d-flex justify-content-center Lato-Light fs-35">
                     {{spitOutCelcius(info.main.temp)}}&deg;C
                   </span>
                   <span class="ml-2 text-blue-weather fs-28"><font-awesome-icon icon="thermometer-full" /></span>
                   </span>
                 </div>
                 <div class="col-4">
                   <div class="">

                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div class="name-city-weather d-flex flex-column align-items-center position-absolute">
              <span class="Lato-Light fs-20 text-gray-two">{{ info.name }}</span>
              <span class="Lato-Bold fs-25 lh-2">...</span>
           </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import axios from 'axios'
import { isMobile } from '@/modal/utilits_functions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTemperatureHigh, faThermometerFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTemperatureHigh, faThermometerFull)

@Options({
  components: {
    FontAwesomeIcon
  }
})
export default class WeatherApp extends Vue {
  apiWeather = process.env.VUE_APP_WEATHER_API;
  apiKeyWeather = process.env.VUE_APP_WEATHER_API_KEY;
  showWeather: boolean = false;
  city: string = '';
  info: any = [];
  isMobile = isMobile();
  @Prop({ default: 'Weather in' }) title?: string;

  created () {}

  mounted () {
  }

  spitOutCelcius (tem: any) {
    return Math.round(tem - 273.15)
  }

  getWeatherCondition () {}

  getByCountry () {
    axios
      .get(this.apiWeather + this.city + '&appid=' + this.apiKeyWeather)
      .then(response => {
        this.showWeather = true
        this.info = response.data
      })
      .catch(error => {
        this.showWeather = false
        console.log(error)
      })
  }
}
</script>

<style scoped lang="scss">
@use "../../assets/scss/bootstrap-overrides" as *;

.mainWeatherApp {
  .city-name {
    span {
      top: -60px;
    }
  }
  .search-city {
    .input-search  {
      &:focus {
        box-shadow: none;
        border: 0;
      }
    }
  }
  .card-weather {
    .card-weather-header {
      height: 170px;
      overflow: hidden;
    }
  }
  .name-city-weather {
    left: 37%;
    top: 85px;
  }
}
</style>
