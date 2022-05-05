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
        const lugares =  await busquedas.buscarCiudad(input);
        const id = await selecionarCiudad(lugares)
        if (id==='0') continue;
        const lugarSelecionado = lugares.find( l => l.id === id)
        busquedas.agregarEnHistorial(lugarSelecionado.nombre)
        busquedas.mostrarClima(lugarSelecionado)
        break;

      case "2":
        busquedas.historialCap.forEach((lugar,i) => {
          const idx = `${i + 1}.`.green

          console.log(`${idx} ${lugar.toLocaleUpperCase()}`)
        })
        break;
    }

    await pause();
  } while (opcion !== "0");
};

main();
