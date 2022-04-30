const { leerInput } = require("./helpers/inquirer");

const main = async () => {
  const {desc} = await leerInput("escribe");

  console.log(desc);
};

main();
