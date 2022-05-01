const { inquirerMenu, pause, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/Busquedas");

console.clear();

const busquedas = new Busquedas();

const main = async () => {
  let opcion = "";

  do {
    opcion = await inquirerMenu();

    switch (opcion) {
      case "1":
        const {input} = await leerInput("Busque una Ciudad");
        busquedas.buscarCiudad(input)

        break;

      case "2":
        console.log("hola 2");
        break;
    }

    await pause();
  } while (opcion !== "0");
};

main();
