//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Estuve como 6 horas para resolver esta parte, lo logré ejecutando la función getJSONdata con un console.log, ahi me di cuenta de que el array estaba en un objeto .data
//Además en el JSON tienen las últimas dos imágenes de los autos alrevez
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("despl-list-prod-div").innerHTML = "";
    getJSONData(PRODUCTS_URL).then(datos =>
        datos.data.forEach(element => {
            let contenido = "";
            contenido = `
          <div class="contenidoAutos">
              <img class="imgauto" src="`+ element.imgSrc + `" alt="">
              <p class="nombreAuto">` + element.name + `</p>
              <p>`+ element.description + `</p>
              <p>Costo = `+ element.currency + ` ` + element.cost + `</p>
              <p>Vendidos: `+ element.soldCount + `</p>
          </div>
          `;
            document.getElementById("despl-list-prod-div").innerHTML += contenido;
        }
        ))
})
