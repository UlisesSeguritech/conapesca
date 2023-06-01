var datesMail = { };

function getEstado(val) {
  console.log(val);

  $.get(
    "http://localhost:8080/estados/" + val + "/localidad",
    function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
      if (data) {
        $("#inputLoc").prop("disabled", false);
        $("#inputLoc").empty();
        $("#inputLoc").append('<option value="0">Localidad</option>');

        for (i = 0; i < data.length; i++) {
          $("#inputLoc").append(
            '<option onclick="getLocalidad(' +
              data[i].id +
              ')" value="' +
              data[i].id +
              '">' +
              data[i].nameLoc +
              "</option>"
          );
          $("#inputLoc").val(0);
          $("#inputLoc").focus();
        }
      }
    }
  );
}

function getLocalidad(val) {
  $.get("http://localhost:8080/localidad/" + val, function (data, status) {
    if (data) {
      $("#inputMue").empty();
      $("#inputMue").append('<option value="0">' + data.namePue + "</option>");
      $("#inputMue").val(0);
    }
  });
}


$("#usercheck").hide();
$("#stateerror").hide();
$("#localerror").hide();
$("#muelleerror").hide();
$("#referror").hide();
$("#dateerror").hide();
$("#timeerror").hide();
$("#phoneerror").hide();
$("#contacterror").hide();
$("#mailerror").hide();
$("#descerror").hide();

let usernameError = true;
$("#usernames").keyup(function () {
    validateUsername();
});

function validateUsername() {
  let usernameValue = $("#usernames").val();
  if (usernameValue.length == "") {
      $("#usercheck").show();
      usernameError = true;
      //return false;
  } else if (usernameValue.length < 8 ) {
      $("#usercheck").show();
      $("#usercheck").html("El RNPA debe contener 8 caracteres");
      usernameError = true;
      //return false;
  } else {
      $("#usercheck").hide();
      usernameError = false;
      console.log(usernameValue)
      datesMail.RNPA = usernameValue;
      console.log(datesMail)

  }
}

function validateInputs(){
  let stateField = $("#estado").val();
  let localField = $("#inputLoc").val();
  let muelleField = $("#inputMue").val();
  let refField = $("#refrenciaForm").val();
  let descField = $("#descForm").val();
  let dateField = $("#calendarYear").val();
  let timetField = $("#timeForm").val();
  let telField = $("#telForm").val();
  let contactField = $("#contactForm").val();

  if (stateField.length == "") {
    $("#stateterror").show();
  }else{
    $("#stateterror").hide();
  }

  if (localField.length == "") {
    $("#localerror").show();
  }else{
    $("#localerror").hide();
  }

  if (muelleField !== undefined) {
    if (muelleField.length == "") {
      $("#muelleerror").show();
    }else{
      $("#muelleerror").hide();
    }
  }

  

  if (refField.length == "") {
    $("#referror").show();
  }else{
    $("#referror").hide();
  }

  if (descField.length == "") {
    $("#descerror").show();
  }else{
    $("#descerror").hide();
  }

  if (dateField.length == "") {
    $("#dateerror").show();
  }else{
    $("#dateerror").hide();
  }

  if (timetField.length == "") {
    $("#timeerror").show();
  }else{
    $("#timeerror").hide();
  }

  if (telField.length == "") {
    $("#phoneerror").show();
  }else{
    $("#phoneerror").hide();
  }

  if (contactField.length == "") {
    $("#contacterror").show();
  }else{
    $("#contacterror").hide();
  }
} 

function soloLetras(e) {
  var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
    especiales = [8, 37, 39, 46],
    tecla_especial = false;

  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    return false;
  }
}

function validateEmail(){
                
	// Get our input reference.
	var emailField = document.getElementById('mailForm');
	
	// Define our regular expression.
	var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  let mailValue = $("#mailForm").val();

  if (mailValue.length == "") {
    $("#mailerror").show();
  }else{
    $("#mailerror").hide();
  }

	// Using test we can check if the text match the pattern
	if( validEmail.test(emailField.value) ){
		console.log('Email is valid, continue with form submission');

    mailError = false;
	}else{
		console.log('Email is invalid, skip form submission');
    $("#mailerror").show();
    $("#mailerror").html("Ingrese un formato valido de correo electronico");
    mailError = true;
	}
} 

function saveInfo() {
  let usernameValue = $("#usernames").val();
  let estadoValue = $("#estado").val();
  let localidadValue = $("#inputLoc").val();
  let muelleValue = $("#inputMue").val();
  let refValue = $("#refrenciaForm").val();
  let descValue = $("#descForm").val();
  let dateValue = $("#calendarYear").val();
  let timeValue = $("#timeForm").val();
  let telValue = $("#telForm").val();
  let contactValue = $("#contactForm").val();
  let mailValue = $("#mailForm").val();

  datesMail.RNPA = usernameValue;
  datesMail.estado = estadoValue, 
  datesMail.localidad = localidadValue, 
  datesMail.inputMue = muelleValue, 
  datesMail.referencia = refValue, 
  datesMail.descripcion = descValue, 
  datesMail.fecha = dateValue, 
  datesMail.hora = timeValue, 
  datesMail.telefono = telValue, 
  datesMail.contacto = contactValue,
  datesMail.mail = mailValue

  console.log(datesMail)
  
}

$("#validateRNPA").click(function () {
  validateUsername();
  
  if (usernameError == true) {
      console.log(usernameError)
  } else {
    console.log(usernameError)
    $(".CardSolicitudOne").hide();
    $(".CardSolicitudTwo").show();
      return false;
  }
});

$("#sendRNPA").click(function () {
  validateInputs();
  validateEmail();
  if(mailError == false){
    saveInfo();
  }
  
});



//funcion cancelarsolicitud regresa a la vista inicial de solicitud y limpia los inputs
let cancelarSolicitud = () => {
  //Mostramos la card correcta de solicitud de verificacion
  $(".CardSolicitudOne").show();
  $(".CardSolicitudTwo").hide();
  $(".CardSolicitudThree").hide();
  //Limpiamos los formularios
  $("#formSolicitudV")[0].reset();
};

//Funcion del FRAMEWORK de gobienrno que se ejecuta cuando todas las dependencias se cargaron correctamente
//INICIALIZAMOS LOS INPUTS TIPO CALENDAR
$gmx(document).ready(function () {
  $("#calendarYear").datepicker({ changeYear: true });
});
$gmx(document).ready(function () {
  //ACORDION jQUERY
  $(".panel-collapse").on("show.bs.collapse", function () {
    $(this).prev(".panel-heading").addClass("active");
  });

  $(".panel-collapse").on("hide.bs.collapse", function () {
    $(this).prev(".panel-heading").removeClass("active");
  });
  //COLLAPSE HAMBURGESA HEADER RESPNSIVO
  $(".navbar-collapse ul li a").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  //Mostramos la card correcta de solicitud de verificacion
  $(".CardSolicitudOne").show();
  $(".CardSolicitudTwo").hide();
  $(".CardSolicitudThree").hide();

  //console.log('Se cargo la ventana con exito');
  // Selecciona los botones utilizando el selector adecuado
  const botones = document.querySelectorAll(".btn-gren");
  // Agrega el event listener a cada botón verde y al hacer click hace invisible la NOM
  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Acción a realizar al hacer clic en cualquier botón
      //console.log('¡Se hizo clic en un botón!');
      // Aquí puedes agregar tu lógica adicional
      $("#hideNom").hide();
    });
  });

  //SolicitudDeVerificacion
  const contenedorSolicitud = document.getElementById("contenedorSolicitud");
  const guardarSolicitud = document.querySelectorAll(".guardarSolicitud");
  //Vistas-Cards-Solucitud

  //Button listener para pasar a la segunda card
  guardarSolicitud.forEach(function (elemento1) {
    elemento1.addEventListener("click", () => {
      $(".CardSolicitudOne").hide();
      $(".CardSolicitudTwo").show();
      $(".CardSolicitudThree").hide();
    });
    
    const guardarSolicitud2 = document.querySelectorAll(".guardarSolicitud2");
    /*
    guardarSolicitud2.forEach(function (elemento2) {
      elemento2.addEventListener("click", () => {
        $(".CardSolicitudOne").hide();
        $(".CardSolicitudTwo").hide();
        $(".CardSolicitudThree").show();
      });
    });*/
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
      $("#header-deskop").hide();
      $("#header-mobile").show();
      $("#hideNom").show();
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
      $("#header-deskop").show();
      $("#hideNom").show();
      $("#header-mobile").hide();
    }
  }

  // Ejecutar la función por primera vez al cargar la página
  // Ejecutar la función por primera vez al cargar la página
  actualizarContenido();
  //$("#hideNom").show();
  //TERMINA DISEÑO RESPONSIVE

  // Actualizar los contenidos cuando cambia la resolución de pantalla
  window.addEventListener("resize", actualizarContenido);

/*
  $(document).ready(function() {
    $('.nav-tabs a').click(function() {
      // Si la pestaña está activa, ciérrala
      if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $($(this).attr('href')).removeClass('active');
      } else {
        // Si la pestaña no está activa, ábrela
        $(this).tab('show');
      }
    });
  });*/
}); //Termina inicializador de framework
