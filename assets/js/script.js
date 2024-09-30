/* eslint-disable no-alert */ // Esto deshabilitará la regla 'no-alert' en todo el archivo.

$(document).ready(function () {
  let chart;
  let dataPoints = [];

  // Capturar valor ingresado
  $("#btnBuscar").click(function () {
    // Capturar el valor del input
    let valorInput = parseInt($("#buscarHeroe").val());
    console.log(valorInput);

    // Limpiar el input después de obtener su valor
    $("#buscarHeroe").val("");

    // Limpiar el contenido anterior
    $("#card").empty();
    if (chart) {
      chart.destroy();
    }

    // Crear la conexión a la API
    // Hacer el llamado Ajax
    const apiKey = "fcef60b31c29d69046e2b1a0f83ac32e";
    const heroId = valorInput;

    $.ajax({
      type: "GET",
      url: `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${apiKey}/${heroId}`,

      dataType: "json",
      success: function (datos) {
        // console.log(datos.image);

        let card = `
             <div class="col-6">
                <div class="left__card row">
                    <div class="col-6">
                        <img src="${datos.image.url}" alt="" class="w-100">
                    </div>
                    <div class="col-6">
                        <h5 class="card-title py-2 hero-text">Nombre: ${datos.name}</h5>
                        <p class= "hero-text">Publicado por: <span class="hero-text-2" id="tag-placeholder">${datos.biography.publisher}</span></p>
                        <hr>
                        <p class= "hero-text">Ocupación: <span class="hero-text-2" id="ocupacion-placeholder">${datos.work.occupation}</span></p>
                        <hr>
                        <p class= "hero-text">Primera aparición: <span class="hero-text-2" id="aparicion-placeholder">${datos.biography["first-appearance"]}</span></p>
                        <hr>
                        <p class= "hero-text">Altura: <span class="hero-text-2" id="altura-placeholder">${datos.appearance.height}</span></p>
                        <hr>
                        <p class= "hero-text">Peso: <span class="hero-text-2" id="peso-placeholder">${datos.appearance.weight}</span></p>
                        <hr>
                          <p class= "hero-text">Alianzas: <span class="hero-text-2">${datos.connections["group-affiliation"]}</span></p>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <!--Sección gráficos-->
                <div id="chartContainer" style="height: 300px; width: 100%;"></div>
            </div>
        `;

        for (let stat in datos.powerstats) {
          dataPoints.push({
            label: stat,
            y: datos.powerstats[stat] || 0,
          });
        }

        // Agregar la información al html
        $("#card").append(card);

        setTimeout(() => {
          chart = new CanvasJS.Chart("chartContainer", {
            theme: "light1", //  "light2", "dark1",  "dark2"
            animationEnabled: true, // change to true
            title: {
              text: `Estadisticas de Poder para ${datos.name}`,
            },
            // axisX: {
            //   title: "Fecha",
            //   titleFontSize: 12,
            // },
            // axisY: {
            //   title: datos.powerstats[stat],
            //   titleFontSize: 12,
            // },
            data: [
              {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "pie",
                dataPoints: dataPoints,
              },
            ],
          });

          // Renderizar el gráfico
          chart.render();
        }, 100);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  // Crear el gráfico
});
