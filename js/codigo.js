console.log("FYLL");

// Tomo el archivo JSON y lo devuelvo por pantalla
fetch("json/articulos.json")
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log("Ahora voy a tomar los datos y los voy a poner en la web");
        var numerodearticulos = data.articulos.length;
        console.log("En realidad tengo " + numerodearticulos + " artículos en el archivo JSON");

        // Tomo la URL del navegador
        const miurl = window.location.href;
        // Parto la URL en dos trozos, tomando el signo igual como separador
        let partido = miurl.split("=");
        let pagina = partido[1] ? partido[1] : "Home";

        // Lógica para mostrar los artículos según la página actual
        if (pagina === "Hoddies") {
            // Mostrar solo los artículos de la categoría "Hoodies"
            document.getElementById("articulos").innerHTML = ''; // Limpiar el contenido actual
            for (var i = 0; i < numerodearticulos; i++) {
                if (data.articulos[i].categoria === "Hoodies") {
                    document.getElementById("articulos").innerHTML += `
                        <article>
                            <div class="imagen" style="background:url('imagenes/${data.articulos[i].imagen}'); background-size:cover; background-position:center center;"></div>
                            <h4>${data.articulos[i].titulo}</h4>
                            <p>${data.articulos[i].texto}</p>
                        </article>`;
                }
            }
        } else {
            // Cargar contenido por defecto o manejar otras páginas según sea necesario
            console.log("Cargando contenido por defecto o manejo de otras páginas...");
        }

    })
    .catch(function(error) {
        console.error('There has been a problem with your fetch operation:', error);
    });
