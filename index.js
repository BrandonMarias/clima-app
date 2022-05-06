require("dotenv").config();

const {
  inquirerMenu,
  pause,
  leerInput,
  selecionarCiudad,
} = require("./helpers/inquirer");

const Busquedas = require("./models/Busquedas");

console.clear();

const busquedas = new Busquedas();

const main = async () => {
  let opcion = "";

  do {
    opcion = await inquirerMenu();

    switch (opcion) {
      case "1":
        const { input } = await leerInput("Busque una Ciudad");
        const lugares = await busquedas.buscarCiudad(input);
        const id = await selecionarCiudad(lugares);
        if (id === "0") continue;
        const lugarSelecionado = lugares.find((l) => l.id === id);
        busquedas.agregarEnHistorial(lugarSelecionado);
        busquedas.mostrarClima(lugarSelecionado);
        break;

      case "2":
        const idLugar = await selecionarCiudad(
          busquedas.historial,
          "Selecione una ciudad",
          true
        );

        if (idLugar === "0") continue;

        const seleccion = busquedas.historial.find((e) => e.id == idLugar);

        busquedas.mostrarClima(seleccion);
        break;
    }

    await pause();
  } while (opcion !== "0");
};

main();
