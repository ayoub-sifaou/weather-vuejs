<template>
  <main class="mainWeatherApp" v-if="isMobile">
    <div class="container my-3">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center align-content-center">
            <span class="text-center fs-30 text-capitalize Lato-Bold">{{title}}</span>
          </div>
          <div class="search-city mt-3">
            <input
              type="text"
              placeholder="What city?"
              autocomplete="off"
              v-model="city"
              class="form-control text-gray-two box-shadow-gray border-0 border-radius-20 fs-18 p-5 input-search"
              v-on:change="getWeatherData()"
              v-on:keyup="hideContainerWeather()"
            />
          </div>
        </div>
      </div>
      <div class="row position-relative mt-3" v-if="showWeather">
        <div class="bg-weather w-100 border-radius-20 bg-white ">
          <img v-if="isDayTime(info.weather[0].icon)" src="@/assets/images/clear.jpg" alt="" class="w-100 h-100" />
          <img v-if="!isDayTime(info.weather[0].icon)" src="@/assets/images/night.jpg" alt="" class="w-100 h-100" />
        </div>
        <div class="date-location-weather row flex-column">
          <span class="text-white Lato-Bold fs-20 lh-30">{{ day }}</span>
          <span class="text-white mt-1 Lato-Light fs-16 lh-30">{{ date }}</span>
          <div class="location w-100">
            <span class="text-white mr-2 fs-20"><font-awesome-icon icon="map-marked-alt" /></span>
            <span class="text-white mt-2 Lato-Light fs-16 lh-30">{{ info.name }}</span>
          </div>
        </div>
        <div class="w-100 position-relative">
          <div class="tem-weather">
            <div class="icon-weather mb-2">
              <i class="wi text-white fs-70" :class="getNewIcon(info.weather[0].icon)"></i>
            </div>
            <div class="temp">
              <span class="Lato-Bold fs-70 l-35 mr-2 text-white">{{spitOutCelcius(info.main.temp)}}</span>
              <i class="wi wi-celsius text-white fs-80"></i>
            </div>
            <div class="condition">
              <span class="fs-22 lh-30 text-capitalize Lato-Bold text-white">
                {{info.weather[0].description}}
              </span>
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
import { faTemperatureHigh, faThermometerFull, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTemperatureHigh, faThermometerFull, faMapMarkedAlt)
@Options({
  components: {
    FontAwesomeIcon
  }
})
export default class WeatherApp extends Vue {
  apiWeather = process.env.VUE_APP_WEATHER_API;
  apiKeyWeather = process.env.VUE_APP_WEATHER_API_KEY;;
  showWeather: boolean = false;
  city: string = '';
  info: any = [];
  isMobile = isMobile();
  dateObject: Date = new Date();
  days: any = [];
  day: string = '';
  date: string = '';
  iconUrl: string = '';
  dataCity: any = []
  @Prop({ default: 'Weather in' }) title?: string;

  created () {
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    this.day = this.days[this.dateObject.getDay()]
    this.date = this.dateObject.toLocaleDateString('en-US', { day: 'numeric' }) + ' ' +
      this.dateObject.toLocaleDateString('en-US', { month: 'short' }) + ' ' +
      this.dateObject.toLocaleDateString('en-US', { year: 'numeric' })
  }

  mounted () {
  }

  spitOutCelcius (tem: any) {
    return Math.round(tem - 273.15)
  }

  hideContainerWeather () {
    this.showWeather = false
  }

  isDayTime (icon: string) {
    if (icon.includes('d')) {
      return true
    } else {
      return false
    }
  }

  getWeatherData () {
    alert('tetetetet')
    if (this.city !== '') {
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

  getNewIcon (icon: string) {
    switch (icon) {
      case '01d': {
        return 'wi-day-sunny'
      }
      case '01n': {
        return 'wi-night-clear'
      }
      case '02d': {
        return 'wi-day-cloudy'
      }
      case '02n': {
        return 'wi-night-alt-cloudy'
      }
      case '03d': {
        return 'wi-cloudy'
      }
      case '03n': {
        return 'wi-cloudy'
      }
      case '04d': {
        return 'wi-smog'
      }
      case '04n': {
        return 'wi-smog'
      }
      default: {
        // statements;
        break
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use "../../assets/scss/bootstrap-overrides" as var;

.mainWeatherApp {
  .bg-weather {
    height: calc(100vh - 152px);
    margin: auto 15px;
    overflow: hidden;
    img {
      object-fit: cover;
      object-position: center;
    }
  }
  .date-location-weather {
    width: calc(100% - 70px);
    position: absolute;
    left: 50px;
    top: 15px;
    span {
      text-shadow: 1px 1px 2px var.$white;
    }
  }
  .tem-weather {
    position: absolute;
    left: 30%;
    bottom: 89px;
  }
}
</style>
