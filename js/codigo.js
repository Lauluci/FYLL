// Comprobación de que todo va bien
console.log("FYLL");

// Tomo el archivo JSON y lo devuelvo por pantalla
fetch("json/articulos.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    console.log("ahora voy a tomar los datos y los voy a poner en la web");

    var numerodearticulos = data.articulos.length;
    console.log("En realidad tengo " + numerodearticulos + " articulos en el archivo JSON");

    // Tomo la URL del navegador
    const miurl = window.location.href;
    // Parto la URL en dos trozos, tomando el signo igual como separador
    const partido = miurl.split("=");

    // En el caso de que el segundo elemento no exista
    if (!partido[1] || partido[1] === "Home") {
      // Pintar TODOS los artículos
      for (var i = 0; i < numerodearticulos; i++) {
        document.getElementById("articulos").innerHTML += `
          <a href="?id=${i}">
            <article>
              <div class="imagen" style="background:url('imagenes/${data.articulos[i].imagen}');background-size:cover;background-position:center center;"></div>
              <time datetime="${data.articulos[i].fecha}">${data.articulos[i].fecha}</time>
              <h4>${data.articulos[i].titulo}</h4>
              <p>${data.articulos[i].texto}</p>
            </article>
          </a>`;
      }
    }

    // Si hay una página especificada
    if (partido[0].split("?")[1] === "p") {
      const pageName = partido[1];
      document.getElementById("articulos").innerHTML = "Voy a cargar una página que se llama: " + pageName;
      // Cargar una página HTML
      fetch('paginas/' + pageName + '.html')
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Error al cargar la página');
          }
          return response.text();
        })
        .then(function(html) {
          // Convertir el contenido en HTML
          document.getElementById("articulos").innerHTML = html;
        })
        .catch(function(error) {
          console.error("Error al cargar la página:", error);
          document.getElementById("articulos").innerHTML = "<p>Error al cargar la página. Por favor, inténtelo de nuevo más tarde.</p>";
        });
    }

    // Si hay un ID especificado
    if (partido[1] && !isNaN(partido[1])) {
      const id = parseInt(partido[1]);
      if (id >= 0 && id < numerodearticulos) {
        // Eliminar el video si existe
        const video = document.getElementById("video");
        if (video) video.remove();

        document.getElementById("articulos").innerHTML = `
          <article>
            <div class="imagen" style="background:url('imagenes/${data.articulos[id].imagen}');background-size:cover;background-position:center center;"></div>
            <time datetime="${data.articulos[id].fecha}">${data.articulos[id].fecha}</time>
            <h4>${data.articulos[id].titulo}</h4>
            <p>${data.articulos[id].texto}</p>
            ${data.articulos[id].codigovideo ? `<iframe src="https://www.youtube.com/embed/${data.articulos[id].codigovideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : ''}
          </article>`;
        document.getElementById("articulos").style.paddingTop = "0px";
        document.getElementsByTagName("article")[0].style.width = "100%";
      } else {
        console.error("ID de artículo no válido:", id);
      }
    }
  })
  .catch(function(error) {
    console.error("Error al cargar los artículos:", error);
  });
