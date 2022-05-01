const axios = require("axios");

class Busquedas {
  historial = [];

  constructor() {}

  get parametrosMapBox() {
    return {
      access_token:
        "pk.eyJ1IjoiYnJhbmRvbm1hcmlhcyIsImEiOiJjbDJtaXpiajEwM3FhM2VwOGpwcjljdXMwIn0.horAEJzvd-o11_mVnm3cNw",
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

      console.log(respuesta.data.features);
    } catch (error) {
      return [];
    }
  }

  mostrarClima() {
    console.log("\n informacion del Clima\n".green);
    console.log("Ciudad: ");
    console.log("Lat: ");
    console.log("Lng: ");
    console.log("Temperatura: ");
    console.log("Mínima: ");
    console.log("Máxima: ");
  }
}

module.exports = Busquedas;
