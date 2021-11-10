//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var cosas = [];
var elementoprincipal = document.getElementsByClassName("contenidoAutos");
let listado = document.getElementsByClassName("valor");
var maxprecio = undefined;
var minprecio = undefined;
let busca = document.getElementById("buscador");
let nombrearticulo = undefined;
let descripcionarticulo = undefined;
//Estuve como 6 horas para resolver esta parte, lo logré ejecutando la función getJSONdata con un console.log, ahi me di cuenta de que el array estaba en un objeto .data
//Además en el JSON tienen las últimas dos imágenes de los autos alrevez
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("despl-list-prod-div").innerHTML = "";
    getJSONData(PRODUCTS_URL).then(datos =>
        datos.data.forEach(element => {
            let contenido = "";
            contenido = `
            <div class="col-12 col-md-6 contenidoAutos">
          <div class="card">
            <img class="card-img-top p-3" src="`+ element.imgSrc + ` "onclick="irproducto('${element.name}')">
            <div class="card-body">
                <h5 class="card-title nombreAuto">` + element.name + `</h5>
                <p class="card-text">Costo = `+ element.currency + ` ` + '<strong class="valor">' + element.cost + `</strong></p>
                <p class="card-text descripcionauto">`+ element.description + `</p>
                <p class="card-text">Vendidos: `+ '<strong class=vendidos">' + element.soldCount + `</strong></p>
            </div>
            </div>
          </div>
          
          `;
            document.getElementById("despl-list-prod-div").innerHTML += contenido;
        }
        ))
    ordenar()
})





function mostrarlista(array) {
    document.getElementById("despl-list-prod-div").innerHTML = "";
    array.forEach(element => {
        let contenido = "";
        contenido = `
        <div class="col-12 col-md-6 contenidoAutos">
        <div class="card">
          <img class="card-img-top p-3" src="`+ element.imgSrc + ` "onclick="irproducto('${element.name}')">
          <div class="card-body">
              <h5 class="card-title nombreAuto">` + element.name + `</h5>
              <p class="card-text">Costo = `+ element.currency + ` ` + '<strong class="valor">' + element.cost + `</strong></p>
              <p class="card-text descripcionauto">`+ element.description + `</p>
              <p class="card-text">Vendidos: `+ '<strong class=vendidos">' + element.soldCount + `</strong></p>
          </div>
          </div>
        </div>
          `;
        document.getElementById("despl-list-prod-div").innerHTML += contenido;
    })
    aplicarfiltros()
    buscar();
}

function ordenar() {
    cosas = getJSONData(PRODUCTS_URL).then(datos =>
        cosas = datos.data)
}


function esconder(index) {
    elementoprincipal[index].classList.add("oculto")
}
function mostrar(index) {
    elementoprincipal[index].classList.remove("oculto")
}
function aplicarfiltros() {
    maxprecio = document.getElementById("maxprecio").value;
    minprecio = document.getElementById("minprecio").value;
    if ((maxprecio != undefined) && (parseInt(maxprecio)) > 0) {
        maxprecio = parseInt(maxprecio)
    } else { maxprecio = undefined }
    if ((minprecio != undefined) && (parseInt(minprecio)) > 0) {
        minprecio = parseInt(minprecio)
    } else { minprecio = undefined }

    for (let i = 0; i < listado.length; i++) {
        let precio = ""
        precio = parseInt(listado[i].innerHTML);
        if (((maxprecio == undefined) || (precio <= maxprecio)) && ((minprecio == undefined) || (precio >= minprecio))) {
            mostrar(i)
        } else { esconder(i) }
    }
}
//la forma de mostrar o esconder las cosas se hace a partir de css con la propiedad "display: hidden;".
//en esta funcion se incluye un comprobante de los input, para que devuelva undefined en caso de no ser un número positivo.





function limpiarfiltros() {
    for (let index = 0; index < elementoprincipal.length; index++) {
        mostrar(index)
        document.getElementById("maxprecio").value = ''
        document.getElementById("minprecio").value = ''
    }
}
//ademas de limpiar los filtros, esto borra lo escrito en los campos numéricos de flitrado











function ordenarrelevancia() {
    cosas.sort(function (a, b) {
        if (a.soldCount > b.soldCount) {
            return -1;
        }
        if (a.soldCount < b.soldCount) {
            return 1
        }
        return 0;
    })
    mostrarlista(cosas);
}
//esta es la funcion que toma la lista ordenada con "ordenar()" y la muestra en pantalla reemplazando los elementos iniciales
//al final de ordenar, aplica de nuevo los filtros para aplicarlos a los productos ordenados.





function ordenarprecio(direccion) {
    cosas.sort(function (a, b) {
        if (a.cost > b.cost) {
            return -direccion;
        }
        if (a.cost < b.cost) {
            return direccion
        }
        return 0;
    })
    mostrarlista(cosas);

}





busca.addEventListener("input", (event) => {
    buscar();
})

//este es el código para el buscador, puse todos los strings en mayusculas para que al final ignore si las coloca el usuario o no.





function buscar() {
    nombrearticulo = document.getElementsByClassName("nombreAuto");
    descripcionarticulo = document.getElementsByClassName("descripcionauto");
    for (let index = 0; index < elementoprincipal.length; index++) {
        if ((nombrearticulo[index].innerHTML.toUpperCase().includes(busca.value.toUpperCase())) || (descripcionarticulo[index].innerHTML.toUpperCase().includes(busca.value.toUpperCase()))) {
            mostrar(index)
        } else { esconder(index) }
    }
}
document.getElementById("filtropor").addEventListener("input", (event) => {
    organizar()
})





function organizar() {
    switch (document.getElementById("filtropor").value) {
        case "relev":
            ordenarrelevancia();
            aplicarfiltros();
            buscar();
            break;
        case "pAsc":
            ordenarprecio(-1);
            aplicarfiltros();
            buscar();
            break;
        case "pDes":
            ordenarprecio(1);
            aplicarfiltros();
            buscar();
            break;
        default:
            break;
    }
}