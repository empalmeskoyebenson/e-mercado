//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let cantidad = 0
let coste = 0
let cantidadTotal = 0
let produtosTotal = 0
let divisa = ""
let rbts = document.getElementsByName("radiomoneda")
let valorestotales = []
let indice = 0
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(datos => {
    indice = 0
    datos.data.articles.forEach(element => {
      let contenedor = "";
      let cantidad = 1;
      let coste = parseInt(element.unitCost)
      cantidad = parseInt(element.count);

      contenedor = `
            <div class="row p-2 border-bottom  border-dark">
            <div class="col-4 text-center">
              <img class="img-fluid border-right" src="${element.src}" alt="">
          </div>
          <div class="col-8 d-flex align-content-center flex-wrap">
            <div class="row h-100 justify-content-center">
              <div class="col-12"><h5>${element.name}</h5></div>
              <div class="row w-100 d-flex align-items-center">
                <div class="col-4 text-center"><button onclick="restar(${indice})" class="btn btn-dark">-</button></div>
                <div class="col-4 d-flex align-content-center flex-wrap h-100"><input onkeyup="setItemTotal(${indice})" class="h-100 w-100 text-center cantProd" style="width: 2em;font-size: 2em;" min="1" max="50" placeholder="0" step="1" value="${element.count}" type="number" name="inputcant" id="cant${indice}"></div>
                <div class="col-4 text-center"><button onclick="sumar(${indice})" class="btn btn-dark">+</button></div>
              </div>
              <div class="row w-100  d-flex align-items-center p-0">
                <div class="col-6"><h5 style="font-weight: normal; font-size: 1em;">${element.currency} <strong class="${element.currency}" id="coste${indice}" style="font-weight: normal; font-size: 1.5em;">${coste}</strong> C/U</h5></div>
                <div class="col-6 text-center"><h5>${element.currency} <strong class="cantTotal" id="cantTotal${indice}" style="font-weight: normal; font-size: 1.5em;">${coste * cantidad}</strong></h5></div>
              <p style="display: none;" id="valoroculto${indice}" class="valoroculto">${coste * cantidad}</p>
                </div>
            </div>
          </div>
          </div>
            
            
            `
      document.getElementById("listprod").innerHTML += contenedor
      indice += 1
    });

  }).then(function () {
    for (let index = 0; index < indice; index++) {
      setItemTotal(index)
    }
  })
});

function setItemTotal(indice) {
  if (isNaN(parseFloat(document.getElementById(`cant${indice}`).value))) {
    cantidad = 0
  } else { cantidad = parseInt(document.getElementById(`cant${indice}`).value) }
  coste = parseFloat(document.getElementById(`coste${indice}`).innerHTML).toFixed(1)
  if (document.getElementById(`coste${indice}`).classList.contains("UYU")) {
    coste = coste / 40
    document.getElementById(`cantTotal${indice}`).innerHTML = cantidad * coste * 40
  } else {
    document.getElementById(`cantTotal${indice}`).innerHTML = cantidad * coste
  }
  document.getElementById(`valoroculto${indice}`).innerHTML = cantidad * coste
  totalTodos()
}
function restar(indice) {
  cantidad = parseInt(document.getElementById(`cant${indice}`).value)
  coste = parseFloat(document.getElementById(`coste${indice}`).innerHTML).toFixed(1)
  if (cantidad > 1) {
    cantidad -= 1
    document.getElementById(`cant${indice}`).value = cantidad
  }
  setItemTotal(indice)

}
function sumar(indice) {
  cantidad = parseInt(document.getElementById(`cant${indice}`).value)
  coste = parseFloat(document.getElementById(`coste${indice}`).innerHTML).toFixed(1)
  cantidad += 1
  document.getElementById(`cant${indice}`).value = cantidad
  setItemTotal(indice)

}
function totalTodos() {
  var lista = document.getElementsByClassName("valoroculto")
  cantidadTotal = 0
  for (const item of lista) {
    cantidadTotal += parseFloat(item.innerHTML)
  }
  produtosTotal = 0
  lista = document.getElementsByClassName("cantProd")
  for (const item of lista) {
    if (isNaN(parseFloat(item.value))) {
    } else { produtosTotal += parseInt(item.value) }
  }
  for (const item of rbts) {
    if (item.checked) {
      divisa = item.value
    }
  }
  if (divisa == "UYU") {
    cantidadTotal = cantidadTotal * 40
    let divisas = document.getElementsByClassName("divisa")
    for (const item of divisas) {
      item.innerHTML = divisa
    }
  }
  if (divisa == "USD") {
    let divisas = document.getElementsByClassName("divisa")
    for (const item of divisas) {
      item.innerHTML = divisa
    }
  }
  calculartotal(cantidadTotal)
  document.getElementById("totalProductos").innerHTML = cantidadTotal
  document.getElementById("cantidadProductos").innerHTML = produtosTotal + " productos"
}
document.getElementsByName('radiomoneda').forEach(function (e) {
  e.addEventListener("click", function (e) {
    for (let index = 0; index < indice; index++) {
      setItemTotal(index)
    }
  });
});
function calculartotal(cantidad) {
  document.getElementById("subtotal").innerHTML = cantidad
}
function establecer(indice) {
  cantidad = parseInt(document.getElementById(`cant${indice}`).value)
  coste = parseFloat(document.getElementById(`coste${indice}`).innerHTML).toFixed(1)
  document.getElementById(`cant${indice}`).value = cantidad
  setItemTotal(indice)
}


