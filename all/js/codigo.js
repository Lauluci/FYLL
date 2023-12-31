console.log("FYLL");

// Tomo el archivo JSON y lo devuelvo por pantalla
fetch("json/articulos.json").then(function (e) {
    return e.json();
}).then(function (data) {
    console.log(data);
    console.log("ahora voy a tomar los datos y los voy a poner en la web");
    var numerodearticulos = data.articulos.length;
    console.log("En realidad tengo " + numerodearticulos + " articulos en el archivo JSON");

    // Tomo la URL del navegador
    const miurl = window.location.href;
    // Parto la URL en dos trozos, tomando el signo igual como separador
    partido = miurl.split("=");

    // En el caso de que el segundo elemento no exista
    if (partido[1] == "Tienda") {

        // Pintame TODOS los artículos
        for (var i = 0; i < numerodearticulos; i++) {
            document.getElementById("articulos").innerHTML += '<a href="?id=' + i + '"><article><div class="imagen" style="background:url(\'imagenes/' + data.articulos[i].imagen + '\');background-size:cover;background-position:center center;"></div><h4>' + data.articulos[i].titulo + '</h4><p>' + data.articulos[i].texto + '</p></article></a>';
        }
    }
    console.log(partido[0].split("?")[1])
    // Si no tiene el interrogante
    // O detras del interrogante no hay nada
    if(
        window.location.href.indexOf("?") == -1
        ||
        partido[0].split("?")[1] == ""
    ){
        console.log("debes estar en la pagina de inicio")
        fetch('paginas/Inicio.html').then(function (response) {
            return response.text();
        }).then(function (html) {
            // Carga un convertidor de texto a HTML
            var parser = new DOMParser();
            // Convierte el contenido en HTML
            var doc = parser.parseFromString(html, 'text/html');
            // Lanzalo por pantalla
            console.log(doc)
            document.getElementById("articulos").innerHTML += doc.documentElement.innerHTML
        })
    }else{
        document.getElementById("articulos").style.paddingTop = 0
    }
    if (partido[0].split("?")[1] == "p") {
        // Carga una pagina HTML
        fetch('paginas/'+partido[1]+'.html').then(function (response) {
            return response.text();
        }).then(function (html) {
            // Carga un convertidor de texto a HTML
            var parser = new DOMParser();
            // Convierte el contenido en HTML
            var doc = parser.parseFromString(html, 'text/html');
            // Lanzalo por pantalla
            console.log(doc);
            document.getElementById("articulos").innerHTML += doc.documentElement.innerHTML;
        });

    }
    if (partido[1] != null) {

        // Y en el caso de que SI que exista el signo igual
        // En ese caso pintame/(muestrame  el articulo que yo quiero) SOLO el articulo cuyo ID sea el id que hay en la url
        document.getElementById("video").remove();
        document.getElementById("articulos").innerHTML += '<article><div class="imagen" style="background:url(\'imagenes/' + data.articulos[partido[1]].imagen + '\');background-size:cover;background-position:center center;"></div><h4>' + data.articulos[partido[1]].titulo + '</h4><p>' + data.articulos[partido[1]].texto + '</p>';

        if (data.articulos[partido[1]].codigovideo != null) {
            document.getElementById("articulos").innerHTML += `<iframe  src="https://www.youtube.com/embed/${data.articulos[partido[1]].codigovideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
        }

        document.getElementById("articulos").innerHTML += '</article>';
        document.getElementById("articulos").style.paddingTop = "0px";
        document.getElementsByTagName("article")[0].style.width = "100%";
    }

});
