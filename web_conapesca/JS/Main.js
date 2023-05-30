  //funcion cancelarsolicitud regresa a la vista inicial de solicitud y limpia los inputs
  let cancelarSolicitud = () => {
    //Mostramos la card correcta de solicitud de verificacion
    $('.CardSolicitudOne').show(); 
    $('.CardSolicitudTwo').hide();
    $('.CardSolicitudThree').hide();
    //Limpiamos los formularios
    $('#formSolicitudV')[0].reset();
};

//Funcion del FRAMEWORK de gobienrno que se ejecuta cuando todas las dependencias se cargaron correctamente
$gmx(document).ready(function () {
    //ACORDION jQUERY
    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).prev('.panel-heading').addClass('active');
    });
    
    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).prev('.panel-heading').removeClass('active');
    });
  //COLLAPSE HAMBURGESA HEADER RESPNSIVO
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-collapse').collapse('hide');
    });
    
//Mostramos la card correcta de solicitud de verificacion
$('.CardSolicitudOne').show(); 
$('.CardSolicitudTwo').hide();
$('.CardSolicitudThree').hide();
//INICIALIZAMOS LOS INPUTS TIPO CALENDAR
$("#calendarYear").datepicker({ changeYear: true });



//console.log('Se cargo la ventana con exito');
// Selecciona los botones utilizando el selector adecuado
const botones = document.querySelectorAll(".btn-gren");
// Agrega el event listener a cada botón verde y al hacer click hace invisible la NOM
botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
        // Acción a realizar al hacer clic en cualquier botón
        //console.log('¡Se hizo clic en un botón!');
        // Aquí puedes agregar tu lógica adicional
        $('#hideNom').hide();
        
    });
});

//SolicitudDeVerificacion
const contenedorSolicitud = document.getElementById("contenedorSolicitud");
const guardarSolicitud = document.querySelectorAll(".guardarSolicitud");
//Vistas-Cards-Solucitud


//Button listener para pasar a la segunda card
guardarSolicitud.forEach(function(elemento1) {
    elemento1.addEventListener("click", () => {
        $('.CardSolicitudOne').hide(); 
        $('.CardSolicitudTwo').show();
        $('.CardSolicitudThree').hide(); 
        })

        const guardarSolicitud2 = document.querySelectorAll(".guardarSolicitud2");
        guardarSolicitud2.forEach(function(elemento2) {
            elemento2.addEventListener("click", () => {
                $('.CardSolicitudOne').hide(); 
                $('.CardSolicitudTwo').hide();
                $('.CardSolicitudThree').show();
            });
        });
});










//DISEÑO RESPONSIVE
// Obtener los divs con los contenidos
var contenidoDesktop = document.getElementById("contenido-desktop");
var contenidoMobile = document.getElementById("contenido-mobile");

var imgConapesca = document.getElementById("imgConapesca");
var imgSatelite = document.getElementById("imgSatelite");
var imgEmbarcaciones = document.getElementById("imgEmbarcaciones");
var imgCms = document.getElementById("imgCms");
var imgConsulta = document.getElementById("imgConsulta");

// Utilizar matchMedia para detectar la resolución de pantalla
var mediaQuery = window.matchMedia("(max-width: 767px)");

// Función para mostrar/ocultar los contenidos según la resolución
function actualizarContenido() {
  if (mediaQuery.matches) {
    // La resolución es menor o igual a 768px, mostrar contenido móvil
    imgConapesca.src = "assets/Img/Edificio_conapescaR.png";
    imgSatelite.src = "assets/Img/Seguimiento_satelitalR.png";
    imgEmbarcaciones.src = "assets/Img/Embarcaciones_pesquerasR.png";
    imgCms.src = "assets/Img/Centro_localizacionR.png";
    imgConsulta.src = "assets/Img/Sistema_monitoreoR.png";
    contenidoDesktop.style.display = "none";
    contenidoMobile.style.display = "block";
    $('#header-deskop').hide();
    $('#header-mobile').show();
    $('#hideNom').show();
    //contenido-mobile
   
  } else {
    // La resolución es mayor a 768px, mostrar contenido de escritorio
    imgConapesca.src = "assets/Img/edificios.jpg";
    imgSatelite.src = "assets/Img/satelite.jpg";
    imgEmbarcaciones.src = "assets/Img/embarcaciones.jpg";
    imgCms.src = "assets/Img/monitoreo.jpg";
    imgConsulta.src = "assets/Img/consulta.jpg";

    contenidoDesktop.style.display = "block";
    contenidoMobile.style.display = "none";
    $('#header-deskop').show();
    $('#hideNom').show();
    $('#header-mobile').hide();
    
  }
}

// Ejecutar la función por primera vez al cargar la página
// Ejecutar la función por primera vez al cargar la página
actualizarContenido();
$('#hideNom').show();
//TERMINA DISEÑO RESPONSIVE


// Actualizar los contenidos cuando cambia la resolución de pantalla
window.addEventListener("resize", actualizarContenido);












}); //Termina inicializador de framework







