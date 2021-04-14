const fs = require("fs")

const path = "./db/data.json";

const guardarDB = ( data ) => {
  fs.writeFileSync(path, JSON.stringify(data));
}

const obtenerArchivo = () => {
  if(!fs.existsSync(path)) {
    return null;
  }

  const data = fs.readFileSync("./db/data.json", "utf8");
  return JSON.parse(data);
}

module.exports = {
  guardarDB,
  obtenerArchivo
}