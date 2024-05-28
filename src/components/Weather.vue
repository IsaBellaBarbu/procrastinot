<script>
export default {
  data() {
    return {
      cityFound: false,
      visible: false,
      isDay: true,
      citySearch: "",
      weather: {
        cityName: "Berlin",
        country: "NG",
        temperature: 12,
        description: "Clouds everywhere",
        lowTemp: "19",
        highTemp: "30",
        feelsLike: "20",
        humidity: "55",
      },
    };
  },
  methods: {
    getWeather: async function () {
      console.log(this.citySearch);
      const key = '3ba231a6498765f1332dcd6bb5a64595';
      const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch}&appid=${key}&units=metric`;

      //fetch weather
      try {
        const response = await fetch(baseURL);
        const data = await response.json();
        console.log(data);
        this.citySearch = "";
        this.weather.cityName = data.city;
        this.weather.country = data.sys.country;
        //Math.round for easier look of numbers
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.description = data.weather[0].description;
        this.weather.lowTemp = Math.round(data.main.temp_min);
        this.weather.highTemp = Math.round(data.main.temp_max);
        this.weather.humidity = Math.round(data.main.humidity);

        const timeOfDay = data.weather[0].icon;

        // Check for time of day
        if (timeOfDay.includes("n")) {
          this.isDay = false;
        } else {
          this.isDay = true;
        }

        this.visible = true;
        this.cityFound = false;
      } catch (error) {
        console.log(error);
        this.cityFound = true;
        this.visible = false;
      }
    },
  },
};
</script>

<template>
  <div id="main" :class="isDay ? 'day' : 'night'">
    <div class="container my-5" style="max-width: 400px; min-width: 360px">
      <h1 class="title text-center">Weather in</h1>
      <form class="search-location" v-on:submit.prevent="getWeather">
        <input
            type="text"
            class="form-control text-muted form-rounded p-4 shadow-sm"
            placeholder="What City?"
            v-model="citySearch"
            autocomplete="off"
        />
      </form>
      <p class="text-center my-3" v-if="cityFound">No city found</p>
      <div
          class="card rounded my-3 shadow-lg back-card overflow-hidden"
          v-if="visible">

        <!-- Top of card starts here -->
        <div class="card-top text-center" style="margin-bottom: 15rem">
          <div class="city-name my-3">
            <p>{{ weather.cityName }}</p>
            <span>...</span>
            <p class="">{{ weather.country }}</p>
          </div>
        </div>
        <!-- top of card ends here -->

        <!--card middle body, card body used cos I want to just update the innerHTML -->
        <div class="card-body">
          <!-- card middle starts here -->
          <div class="card-mid">
            <div class="row">
              <div class="col-12 text-center temp">
                <span>{{ weather.temperature }}&deg;C</span>
                <p class="my-4">{{ weather.description }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-between px-5 mx-5">
                <p>
                  <img src="./assets/down.svg" alt="" />
                  {{ weather.lowTemp }}&deg;C
                </p>
                <p>
                  <img src="./assets/up.svg" alt="" />
                  {{ weather.highTemp }}&deg;C
                </p>
              </div>
            </div>
          </div>
          <!-- card middle ends here -->

          <!-- card bottom starts here -->
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>{{ weather.feelsLike }}&deg;C</p>
              <span>Feels like</span>
            </div>
            <div class="col text-center">
              <p>{{ weather.humidity }}%</p>
              <span>humidity</span>
            </div>
          </div>

          <!-- card bottom ends here -->
        </div>
      </div>
    </div>
  </div>
</template>





<style scoped>
#main {
  position: absolute;
  height: 100%;
  width: 100%;
}
.day {
  background: linear-gradient(to bottom left, #d7d3ac, #ffffff);
}
.night {
  background: linear-gradient(to bottom left, #4854a2, #3d3d3d);
  color: white;
}

.title {
  font-size: 50px;
  font-weight: 500;
}

.form-rounded {
  border-radius: 2rem;
}
.back-card {
  border-radius: 40px !important;
  color: white;
  background: linear-gradient(to bottom right, #707070, #434647);
  text-shadow: 2px 2px 2px #707070;
}

.city-name {
  position: absolute;
  width: 100%;
}

.city-name p {
  font-weight: 400;
  font-size: 16pt;
}

.city-name span {
  position: relative;
  top: -50px;
  font-size: 40pt;
  font-family: "Times New Roman", Times, serif;
}

.temp span {
  font-weight: 100;
  font-size: 5em;
  letter-spacing: -5px;
  white-space: nowrap;
}
.card-mid {
  line-height: 0.5;
}
.condition {
  font-size: 1em;
  font-weight: 700;
  line-height: 1em;
  text-transform: capitalize;
}

.high {
  font-size: 15px;
}

.low {
  font-size: 15px;
}

.card-bottom p {
  font-size: 50px;
  font-weight: 100;
  letter-spacing: -3px;
}
.card-bottom {
  line-height: 0.5;
}

.card-bottom span {
  font-size: 12px;
}

.form-control:focus {
  box-shadow: none;
  border-color: inherit;
}
</style>
