const inquirer = require("inquirer");
require("colors");

const arrayPreguntas = [
  "Buscar ciudad",
  "historial",
];

const listaDePreguntas = arrayPreguntas.map((prgunta, i) => {
  return {
    value: `${i + 1}`,
    name: `${`${i + 1}.`.green} ${prgunta}`,
  };
});

listaDePreguntas.push({
  value: "0",
  name: `${"0.".green} Salir y Guardar`,
});

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿qué desea hacer?",
    choices: listaDePreguntas,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".rainbow);
  console.log("   selecione una opción  ".white);
  console.log("==========================\n".rainbow);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};
////////////////////////////////////////////////////////////////
const pause = async () => {
  console.log(`\n`);
  return await inquirer.prompt({
    type: "input",
    name: "pause",
    message: `presione ${"ENTER".green} para continuar`,
  });
};
///////////////////////////////////////////////////////////////
const leerInput = async (message) => {
  return await inquirer.prompt({
    type: "input",
    name: "input",
    message,
    validate(value) {
      if (value.length === 0) {
        return "ingrese un valor";
      }
      return true;
    },
  });
};
//////////////////////////////////////////////////////////////////


const selecionarCiudad = async (ciudades = [], message = "Seleccione lugar") => {
  const choices = ciudades.map((ciudad, idx) => ({
    value: ciudad.id,
    name: `${`${idx + 1}`.green} ${ciudad.nombre}`
  }))
  
  choices.unshift({
    value: "0",
    name: `${"0.".green} Cancelar`,
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message,
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  return await inquirer.prompt({
    type: "confirm",
    name: "ok",
    message,
  });
};


module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  confirmar,
  selecionarCiudad
};
