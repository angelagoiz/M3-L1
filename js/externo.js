$(document).ready(function () {

  // 1. Cambiar color de la lista
  $("#lista li").css("color", "#555");

  // 2. Agregar elemento dinámicamente
  $("#lista").append("<li>Ofertas</li>");

  // 3. Botón ocultar/mostrar lista
  $("#toggleLista").click(function () {
    console.log("Botón clickeado");
    $("#lista").toggle();

    if ($("#lista").is(":visible")) {
      $(this).text("Ocultar lista");
    } else {
      $(this).text("Mostrar lista");
    }
  });

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

});