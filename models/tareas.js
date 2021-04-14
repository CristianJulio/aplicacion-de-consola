const Tarea = require("./tarea");

class Tareas {
  constructor() {
    this._listado = {};
  }

  toggleEstado(ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id];

      if(!tarea.completadoEn) {
        tarea.completadoEn = new Date().toLocaleDateString();
      }
    });

    this.listadoArr.forEach(tarea => {
      if(!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }

  borrarTarea( id = "" ) {
    if(this._listado[id]) {
      delete this._listado[id];
    }
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  cargarTareas(tareas = []) {
    tareas.forEach((t) => {
      this._listado[t.id] = t;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  mostrarTareas(tareas = []) {
    console.log("");
    
    tareas.forEach((tarea, index) => {
      const id = ((index + 1) + ".").green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? completadoEn.green : "Pendiente".red;

      console.log(`${id} ${desc} :: ${estado}`);
    });
  }

  listadoCompleto() {
    this.mostrarTareas(this.listadoArr);
  }

  listarTareasPorEstado(estado = true) {
    let completadas = [];
    let pendientes = [];

    completadas = this.listadoArr.filter(
      (tarea) => tarea.completadoEn !== null
    );
    pendientes = this.listadoArr.filter((tarea) => tarea.completadoEn === null);

    if(estado)
      this.mostrarTareas(completadas);
    else
      this.mostrarTareas(pendientes);
  }
}

module.exports = Tareas;
