const axios = require("axios");
require('colors')
class Busquedas {
  historial = [];

  constructor() {}
  ///////////////////////////////////////////
  get parametrosMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
      limit: 5,
    };
  }

  async buscarCiudad(ciudad = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
        params: this.parametrosMapBox,
      });

      const respuesta = await instance.get();

      return respuesta.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lat: lugar.center[1],
        lon: lugar.center[0],
      }));
    } catch (error) {
      return [];
    }
  }
  /////////////////////////////////////////////

  get paramsWeather(){
    return{
      lang: "es",
      units: "metric",
      appid: process.env.OPENWEATHER_KEY,
    }
  }

  async buscarClima(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: {...this.paramsWeather, lat, lon}
      });

      const {data} = await instance.get();

      return data
    } catch (error) {
      return [];
    }
  }

  async mostrarClima({lat, lon, nombre, }) {

    const {weather, main} = await this.buscarClima(lat, lon);
    console.clear()
    console.log("\n informacion del Clima\n".green);
    console.log("Ciudad: ", `${nombre}`.yellow);
    console.log("Lat: ", lat);
    console.log("Lng: ", lon);
    console.log("Clima: ", `${weather[0].description}`.yellow);
    console.log("Temperatura: ",main.temp);
    console.log("Sensación térmica: ",main.feels_like);
  }
}

module.exports = Busquedas;
