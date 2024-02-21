//Generar update con un objeto
let Alumno =
{
    Nombre: "Francisco",
    Edad: "21",
    Carrera: "Sistemas"
}

let update = "UPDATE Alumnos SET ";
//propiedad es una variable que contiene el nombre de cada propiedad del objeto
for (let propiedad in Alumno) {
    update += propiedad + " = '" + Alumno[propiedad] + "', ";
}

update = update.slice(0, -2);

console.log(update);
