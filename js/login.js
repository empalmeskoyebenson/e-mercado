//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    localStorage.removeItem('usuario')
    document.getElementById("btnlogin").addEventListener("click", function () {
        let userinput = document.getElementById("userinput")
        let passinput = document.getElementById("passinput")
        if (userinput.value.length != 0 && passinput.value.length >= 8) {
            window.localStorage.setItem('usuario', userinput.value)
            alert("entrando al sitio")
            window.location.href = 'inicio.html';

        } else alert("Error, datos inválidos.");
    }
    )
})

// este es mi método para comprobar los datos, lo de la contraseña es porque la gran mayoria de los sitios te piden 8 cáracteres mínimos para la contraseña.
// el problema es que tendría que cambiar todos los html, por el banner de arriba, al apretar inicio redirige a el login (por haber cambiado los nombres), no lo hice por las dudas de que despues se aclare como.
