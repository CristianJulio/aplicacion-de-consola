require("colors");
const {
  inquirerMenu,
  pausa,
  leerInput,
  tareasParaBorrar,
  confirmar,
  mostrarEstadosCheckList
} = require("./helper/inquirer");
const { guardarDB, obtenerArchivo } = require("./helper/guardarArchivo");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = obtenerArchivo();

  if (tareasDB) {
    tareas.cargarTareas(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // Crear opción
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarTareasPorEstado();
        break;
      case "4":
        tareas.listarTareasPorEstado(false);
        break;
      case "5":
        const ids = await mostrarEstadosCheckList(tareas.listadoArr);
        tareas.toggleEstado(ids);
        break;
      case "6":
        const id = await tareasParaBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Seguro que quieres borrar esta tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
