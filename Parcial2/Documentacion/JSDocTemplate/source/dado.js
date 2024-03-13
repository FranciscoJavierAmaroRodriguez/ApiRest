/** Funcion que simula una tirada de dados de 6 caras
 * 
 * @return Dado
 */
function tirarDado() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  var resultado = tirarDado();
  console.log("El resultado del lanzamiento del dado es: " + resultado);