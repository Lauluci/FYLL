document.addEventListener("DOMContentLoaded", function() {
    var oculto = true; // Variable para controlar el estado del menú (oculto o visible)

    // Escuchar el evento click en el ícono de hamburguesa
    document.getElementById("hamburguesa").onclick = function() {
        console.log("Has hecho click en la hamburguesa");

        var elementos = document.querySelectorAll("nav ul.menu li"); // Seleccionar todos los elementos de la lista del menú
        console.log(elementos);

        // Si el menú está oculto, mostrar los elementos del menú
        if (oculto) {
            elementos.forEach(function(elemento) {
                elemento.style.display = "inline-block";
            });
            oculto = false; // Actualizar el estado del menú a visible
            this.src = "img/hamburguesa2.png"; // Cambiar la imagen de la hamburguesa a una versión activa
        } else {
            // Si el menú está visible, ocultar todos los elementos del menú, excepto el primer elemento (Home)
            for (var i = 1; i < elementos.length; i++) {
                elementos[i].style.display = "none";
            }
            oculto = true; // Actualizar el estado del menú a oculto
            this.src = "img/hamburguesa.png"; // Cambiar la imagen de la hamburguesa a la versión inicial
        }
    };
});
