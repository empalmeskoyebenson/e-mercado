//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
 document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("preview").src = JSON.parse(localStorage.getItem("imagen"))
    if (JSON.parse(localStorage.getItem("imagen")) === null) {
        document.getElementById("preview").src = "img/user.png"
    }
    document.getElementById("userinput").value = JSON.parse(localStorage.getItem("usuario"))
    document.getElementById("nombreinput").value = datos.nombre
    document.getElementById("apellidoinput").value = datos.apellidos
    document.getElementById("edadinput").value = datos.edad
    document.getElementById("emailinput").value = datos.email
    document.getElementById("telinput").value = datos.tel
});
let datos = JSON.parse(localStorage.getItem("datos"))
function guardardatos(){
    datos = {
        nombre: document.getElementById("nombreinput").value,
        apellidos: document.getElementById("apellidoinput").value,
        edad: document.getElementById("edadinput").value,
        email: document.getElementById("emailinput").value,
        tel: document.getElementById("telinput").value,
    }
    localStorage.setItem("datos", JSON.stringify(datos))
    localStorage.setItem("usuario", JSON.stringify(document.getElementById("userinput").value))
}
function mostrarpreview(){
    let preview = document.getElementById("preview")
    let archivo = document.getElementById("inputfoto").files[0];
    let reader = new FileReader();
    reader.onload = function(){
        preview.src = reader.result;
        localStorage.setItem("imagen", JSON.stringify(preview.src))
    }
    if (archivo) {
        reader.readAsDataURL(archivo)
    }else{preview.src = "img/user.png"}
}



document.getElementById("inputfoto").addEventListener("change", function(e){mostrarpreview()})