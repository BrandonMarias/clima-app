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
const elegirTarea = (tareas, conChecked = false) => {
  return tareas.map((tarea, i) => {
    if (conChecked) {
      return {
        value: tarea.id,
        name: `${`${i + 1}.`.green} ${tarea.description}`,
        checked: tarea.completadoEn ? true : false,
      };
    }
    return {
      value: tarea.id,
      name: `${`${i + 1}.`.green} ${tarea.description}`,
    };
  });
};

const selecionarTarea = async (tareas = [], message = "") => {
  const choices = elegirTarea(tareas);
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

const listaCompletar = async (tareas = []) => {
  const choices = elegirTarea(tareas, true);

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "seleciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  leerInput,
  selecionarTarea,
  confirmar,
  listaCompletar,
};
