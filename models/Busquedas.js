const fs = require("fs");

const axios = require("axios");
require("colors");
class Busquedas {
  historial = [];
  dbPath = "./db/historial.json";

  constructor() {
    this.leerDB();
  }
  ///////////////////////////////////////////
  get historialCap() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }

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

  get paramsWeather() {
    return {
      lang: "es",
      units: "metric",
      appid: process.env.OPENWEATHER_KEY,
    };
  }

  async buscarClima(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: { ...this.paramsWeather, lat, lon },
      });

      const { data } = await instance.get();

      return data;
    } catch (error) {
      return [];
    }
  }

  async mostrarClima({ lat, lon, nombre }) {
    const { weather, main } = await this.buscarClima(lat, lon);
    console.clear();
    console.log("\n informacion del Clima\n".green);
    console.log("Ciudad: ", `${nombre}`.yellow);
    console.log("Lat: ", lat);
    console.log("Lng: ", lon);
    console.log("Clima: ", `${weather[0].description}`.yellow);
    console.log("Temperatura: ", main.temp);
    console.log("Sensación térmica: ", main.feels_like);
  }

  agregarEnHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }

    this.historial.unshift(lugar.toLocaleLowerCase());

    if (this.historial.length > 5) this.historial.pop();

    this.guardarBD();
  }

  guardarBD() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) {
      return null;
    }

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });

    this.historial = [...JSON.parse(info).historial];
  }
}

module.exports = Busquedas;
