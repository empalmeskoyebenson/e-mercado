//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let contenido = [];
let comentarios = [];
let imagenes = [];
let ratings = [];
let rating = 0;
let comentario = "";

// Hice mi propio JSON con la info de todos los autos, pero los comentarios son genéricos
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData("https://empalmeskoyebenson.github.io/ejemplo/entregable3JSON.json").then(datos => {
        contenido = datos.data
        let contenedor = "";
        for (let i = 0; i < contenido.length; i++) {
            if (contenido[i].name == JSON.parse(localStorage.producto)) {
                imagenes = contenido[i].images
                contenedor = `
            <h1>${contenido[i].name}</h1>
            <p>${contenido[i].description}</p>
            <h3>Coste: ${contenido[i].currency} ${contenido[i].cost}</h3>
            <p>Vendidos: ${contenido[i].soldCount}</p>
            `
                document.getElementById("contenido").innerHTML += contenedor
                contenedor = ""
                for (let index = 0; index < imagenes.length; index++) {
                    contenedor += `<div class="carousel-item">
                    <img src="${imagenes[index]}" class="d-block w-100" alt="...">
                  </div>`
                }
                document.getElementById("carousel").innerHTML = contenedor
                document.getElementsByClassName("carousel-item")[0].classList.add("active") //esto añade la clase "active" al primer elemento del carrusel, si no no me funciona
            }
        }
    }
    ).then(getJSONData(PRODUCT_INFO_COMMENTS_URL).then(datos => {
        comentarios = datos.data
        let contenedor = "";
        //esto crea estrellas amarillas igual al rating del comentario, y despues crea estrellas negras igual a 5 menos el mismo rating 
        for (let i = 0; i < comentarios.length; i++) {
            let estrellas = ""
            for (let index = 0; index < parseInt(comentarios[i].score); index++) {
                estrellas += `<span class="fa fa-star checked"></span>`
            }
            for (let index = 0; index < (5 - parseInt(comentarios[i].score)); index++) {
                estrellas += `<span class="fa fa-star"></span>`
            }
            contenedor = `<div class="comentario">
            ` + estrellas + `
            <p class="comentariouser">${comentarios[i].user}</p>
            <p class="comentariotime">${comentarios[i].dateTime}</p>
            <p class="comentariodesc">${comentarios[i].description}</p>
            </div>
            `
            document.getElementById("divcomentarios").innerHTML += contenedor
        }
    }))
})
//siento que pude haber usado una función en general para mostrar tanto los comentarios puestos como los que puede poner el usuario, pero no me quize quemar la cabeza
function comentar() {
    comentario = document.getElementById("textocomentario").value
    /* Este es el código viejo para la calificación de estrellas
    ratings = document.getElementsByName("rating")
    for (let index = 0; index < ratings.length; index++) {
        if (ratings[index].checked) {
            rating = ratings[index].value
            break
        }
        */

    if ((comentario != "") && (rating != 0)) {
        let contenedor = "";
        let estrellas = "";
        for (let index = 0; index < parseInt(rating); index++) {
            estrellas += `<span class="fa fa-star checked"></span>`
        }
        for (let index = 0; index < (5 - parseInt(rating)); index++) {
            estrellas += `<span class="fa fa-star"></span>`
        }
        contenedor = `<div class="comentario">
                ` + estrellas + `
                <p class="comentariouser">`+ localStorage.getItem('usuario') + `</p>
                <p class="comentariotime">${new Date().toLocaleString()}</p>
                <p class="comentariodesc">${comentario}</p>
                </div>
                `
        document.getElementById("divcomentarios").innerHTML += contenedor
        console.log(new Date().toLocaleString()) /* esto es para ver si funcionaba la funcíon para dar el tiempo actual del sistema */

    }
}



