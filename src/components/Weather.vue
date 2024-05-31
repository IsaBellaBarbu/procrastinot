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
    <div class="container">
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
      <p class="text-center my-3" v-if="cityFound">No city found or no internet connection</p>
      <div
          class="card glass rounded my-3 shadow-lg overflow-hidden"
          v-if="visible"
      >
        <!-- Top of card starts here -->
        <div class="card-top text-center">
          <div class="city-name my-3">
            <p>{{ weather.cityName }}</p>
            <span>...</span>
            <p>{{ weather.country }}</p>
          </div>
        </div>
        <!-- top of card ends here -->

        <!-- card middle body -->
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
                <p>{{ weather.lowTemp }}&deg;C</p>
                <p>{{ weather.highTemp }}&deg;C</p>
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
              <span>Humidity</span>
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #8ecae6; /* Day color */
  transition: background-color 0.5s ease;
}
#main.night {
  background-color: #023047; /* Night color */
}
.container {
  background-color: transparent;
  max-width: 400px;
  min-width: 360px;
  padding: 20px;
  border-radius: 16px;
}
.title {
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
}
.form-rounded {
  border-radius: 2rem;
}
.form-control {
  margin-bottom: 1rem;
}
.form-control:focus {
  box-shadow: none;
  border-color: inherit;
}
.glass {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
.city-name {
  color: #6f00ff;
}
.city-name p {
  font-weight: 400;
  font-size: 1.25rem;
  color: #fff;
}
.city-name span {
  display: block;
  font-size: 2rem;
  font-family: "Times New Roman", Times, serif;
  color: #fff;
  position: relative;
  top: -20px;
}
.temp span {
  font-weight: 100;
  font-size: 5rem;
  letter-spacing: -5px;
  white-space: nowrap;
  color: #fff;
}
.card-mid {
  line-height: 1.5;
  margin-top: 1rem;
}
.card-mid p {
  color: #fff;
}
.card-bottom {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 16px;
  margin-top: 1rem;
}
.card-bottom p {
  font-size: 1.25rem;
  font-weight: 100;
  letter-spacing: -1px;
  color: #fff;
}
.card-bottom span {
  font-size: 0.75rem;
  color: #fff;
}
</style>