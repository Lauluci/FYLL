console.log("FYLL");

// Cargar el archivo JSON y procesar los datos
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
        console.log("En realidad tengo " + numerodearticulos + " artículos en el archivo JSON")
        
        // Obtener el elemento donde se mostrarán los artículos
        var articulosContainer = document.getElementById("articulos");
        // Generar y agregar contenido HTML para cada artículo
        for (var i = 0; i < numerodearticulos; i++) {
            var articleHTML =
                '<article>' +
                '<div class="imagen" style="background:url(\'imagenes/' + data.articulos[i].imagen + '\');' +
                'background-size:cover;background-position:center center;"></div>' +
                '<h4><a href="' + data.articulos[i].enlace + '">' + data.articulos[i].titulo + '</a></h4>' +
                '<p>' + data.articulos[i].texto + '</p>' +
                '</article>';    
            // Agregar el artículo al contenedor
            articulosContainer.innerHTML += articleHTML;
        }
    })
    
    .catch(function(error) {
        console.error('Error:', error);
    });