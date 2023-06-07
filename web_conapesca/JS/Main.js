var datesMail = {};

function getEstado(val) {
  console.log(val);

  $.get(
    "/estados/" + val + "/localidad",
   //"http://localhost:8080/estados/" + val + "/localidad",
    function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
      if (data) {
        $("#inputLoc").prop("disabled", false);
        $("#inputLoc").empty();
        $("#inputLoc").append('<option value="0">Localidad</option>');

        

        for (i = 0; i < data.length; i++) {
          $("#inputLoc").append('<option  value="' +
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
    $.get("/localidad/" + val, function (data, status) {
    //$.get("http://localhost:8080/localidad/" + val, function (data, status) {
    console.log("si",data.namePue)
    if (data) {
      $("#inputMue").prop("disabled", true);
      $("#inputMue").empty();
      $("#inputMue").val(data.namePue);
    }
  });
}

$("#usercheck").hide();
$("#stateerror").hide();
$("#localerror").hide();
$("#muelleerror").hide();
$("#referror").hide();
$("#referrorstart").hide();
$("#referrorend").hide();
$("#dateerror").hide();
$("#timeerror").hide();
$("#phoneerror").hide();
$("#contacterror").hide();
$("#mailerror").hide();
$("#descerror").hide();
$("#deserrorstart").hide();
$("#deserrorend").hide();
$("#dateerroryear").hide();

let usernameError = true;

$("#usernames").keyup(function () {
  validateUsername();
});

$("#refrenciaForm").keyup(function () {
  validateWhiteSpaces();
});

$("#descForm").keyup(function () {
  validateWhiteSpaces();
});

function validateWhiteSpaces(){
  let refField = $("#refrenciaForm").val();
  let desField = $("#descForm").val();

  let regex = /^\s+/;
  let regexFin = /\s+$/;

  if(refField){
    if (regex.test(refField)) {
      $("#referrorstart").show();
    } else {
      $("#referrorstart").hide();
    }
  
    if (regexFin.test(refField)) {
      $("#referrorend").show();
    } else {
      $("#referrorend").hide();
    }
  }

  if(desField){
    if (regex.test(desField)) {
      $("#deserrorstart").show();
    } else {
      $("#deserrorstart").hide();
    }
  
    if (regexFin.test(desField)) {
      $("#deserrorend").show();
    } else {
      $("#deserrorend").hide();
    }
  }


}

function validateUsername() {
  let usernameValue = $("#usernames").val();
  if (usernameValue.length == "") {
    $("#usercheck").show();
    usernameError = true;
    //return false;
  } else if (usernameValue.length < 8) {
    $("#usercheck").show();
    $("#usercheck").html("El RNPA debe contener 8 caracteres.");
    usernameError = true;
    //return false;
  } else {
    $("#usercheck").hide();
    usernameError = false;
    console.log(usernameValue);
    datesMail.RNPA = usernameValue;
    console.log(datesMail);
  }
}

function validateInputs() {
  let stateField = $("#estado").val();
  let localField = $("#inputLoc").val();
  let muelleField = $("#inputMue").val();
  let refField = $("#refrenciaForm").val();
  let descField = $("#descForm").val();
  let dateField = $("#calendarYear").val();
  let timetField = $("#timeForm").val();
  let telField = $("#telForm").val();
  let contactField = $("#contactForm").val();

  if (stateField.length == "" || stateField.length == 0) {
    $("#stateerror").show();


  } else {
    $("#stateerror").hide();
    if (localField == 0) {
      $("#localerror").show();
    } else {
      $("#localerror").hide();
    }
  }



  /*if (muelleField !== undefined) {
    if (muelleField.length == "") {
      $("#muelleerror").show();
    } else {
      $("#muelleerror").hide();
    }
  }*/



  if (refField.length == "") {
    $("#referror").show();
  } else {
    $("#referror").hide();
  }

  if (descField.length == "") {
    $("#descerror").show();
  } else {
    $("#descerror").hide();
  }

  if (dateField.length == "") {
    $("#dateerror").show();
    $("#dateerroryear").hide();

  } else {
    $("#dateerror").hide();
  }

  if (timetField.length == "") {
    $("#timeerror").show();
  } else {
    $("#timeerror").hide();
  }

  if (telField.length == "") {
    $("#phoneerror").show();
  } else {
    $("#phoneerror").hide();
  }

  if (contactField.length == "") {
    $("#contacterror").show();
  } else {
    $("#contacterror").hide();
  }
}

function soloLetras(e) {
  var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz"
    //especiales = [8, 37, 39, 46],
    // = false;

  /*for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }*/

  if (letras.indexOf(tecla) == -1) {
    return false;
  }
}

function validateDate(){

    // crea un nuevo objeto `Date`
    var today = new Date();
    
    // `getDate()` devuelve el día del mes (del 1 al 31)
    var day = today.getDate();
    
    // `getMonth()` devuelve el mes (de 0 a 11)
    var month = today.getMonth() + 1;
    
    // `getFullYear()` devuelve el año completo
    var year = today.getFullYear();
    
    // muestra la fecha de hoy en formato `MM/DD/YYYY`
    //console.log(`0${day}/0${month}/${year}`);

    var d_reg =  /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
    var dateValue = $("#calendarYear").val();
    var user_date = dateValue;
    var yearPicker = dateValue.substring(dateValue.length - 4)
    console.log("valor date value", user_date);

    if(user_date){
      if (d_reg.test(user_date)) {
        console.log("valor date value", user_date, yearPicker);
  
        if (yearPicker > year) {
          
          $("#dateerroryear").show();
          $("#dateerroryear").html("El año no puede ser mayor al año en curso.");
    
        } 
        
        if(yearPicker < year){
          $("#dateerroryear").show();
          $("#dateerroryear").html("El año no puede ser menor al año en curso.");
        }
    
        if(yearPicker == year){
          console.log("Fechas ok.");
          $("#dateerroryear").hide();
        }
  
        console.log("Success");
      } else{
      console.log("valor date value", user_date);
  
        $("#dateerroryear").show();
        $("#dateerroryear").html("El formato de fecha es invalido.");

  
      }
    }
}

var mensajeRef = document.getElementById('refrenciaForm');
var contadorRef = document.getElementById('contadorRef');
var mensajeDes = document.getElementById('descForm');
var contadorDes = document.getElementById('contadorDes');

mensajeRef.addEventListener('input', function(e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute('maxlength') - target.value.length;
  contadorRef.innerHTML = `${longitudAct}/${longMin}`;
});

mensajeDes.addEventListener('input', function(e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute('maxlength') - target.value.length;
  contadorDes.innerHTML = `${longitudAct}/${longMin}`;
});



/*function validateFormatDate(dateGet) {
  console.log("Hola",dateGet);
  var d_reg =  /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
  if (d_reg.test(dateGet)) {
    console.log("Success");
    $("#dateerroryear").hide();
  } else{
    console.log("False");

    $("#dateerroryear").show();

  }


}*/

function validateEmail() {
  // Get our input reference.
  var emailField = document.getElementById("mailForm");

  // Define our regular expression.
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  let mailValue = $("#mailForm").val();

  if (mailValue.length == "") {
    $("#mailerror").show();
  } else {
    $("#mailerror").hide();
  }

  // Using test we can check if the text match the pattern
  if (validEmail.test(emailField.value)) {
    console.log("Email is valid, continue with form submission");

    mailError = false;
  } else {
    console.log("Email is invalid, skip form submission");
    $("#mailerror").show();
    $("#mailerror").html("Ingrese un formato válido de correo electrónico.");
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
  (datesMail.estado = estadoValue),
    (datesMail.localidad = localidadValue),
    (datesMail.inputMue = muelleValue),
    (datesMail.referencia = refValue),
    (datesMail.descripcion = descValue),
    (datesMail.fecha = dateValue),
    (datesMail.hora = timeValue),
    (datesMail.telefono = telValue),
    (datesMail.contacto = contactValue),
    (datesMail.mail = mailValue);

  console.log(JSON.stringify(datesMail));

  console.log(typeof datesMail);
  nuw = JSON.stringify(datesMail);

  $.ajax({
    url: '/sendMail/',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: nuw,
    complete : function(xhr, status) {
      alert("Gracias, sus datos se enviaron con éxito. Estado: ")
      document.location.href="/"; 
  }
  });

  


}

$("#validateRNPA").click(function () {
  validateUsername();

  if (datesMail.RNPA) {
    console.log(datesMail.RNPA);

    if(datesMail.RNPA == "12345678"){
      $(".CardSolicitudOne").hide();
      $(".CardSolicitudTwo").show();
      return false;
    } else {

      $("#usercheck").show();
      $("#usercheck").html("El RNPA no existe.");
    

  }
}





});

$("#sendRNPA").click(function () {
  validateInputs();
  validateEmail();
  validateDate();
  if (mailError == false) {
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
  document.getElementById("usernames").value = "";
  $("#usercheck").hide();
  document.getElementById("myForm").reset();

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
  /*
  const botones = document.querySelectorAll(".btn-gren");
  // Agrega el event listener a cada botón verde y al hacer click hace invisible la NOM
  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Acción a realizar al hacer clic en cualquier botón
      //console.log('¡Se hizo clic en un botón!');
      // Aquí puedes agregar tu lógica adicional
      //$("#hideNom").hide();
      if ($('#hideNom').is(':visible')) {
        $("#hideNom").hide();
      }else{
        $("#hideNom").show();
      }
    });
  });*/

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

  let buttons = document.querySelectorAll(".btnAGren");

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      let idTab = this.getAttribute("href");
      console.log(idTab);
      tabClick = document.querySelector(idTab);
      console.log(tabClick.getAttribute("class"));
      var isActive = tabClick.classList.contains("active");
      console.log("es activa" + isActive);
      if (isActive) {
        if ($(".contenedorTabsGren").is(":visible")) {
          // El elemento está visible
          $(".contenedorTabsGren").hide();
          $("#hideNom").show();
          event.preventDefault();
          console.log("El elemento está visible");
        } else {
          // El elemento está oculto
          console.log("El elemento está oculto");
          $(".contenedorTabsGren").show();
          $("#hideNom").hide();
        }
        //tabClick.className = 'tab-pane cardG tabGren fade';
      } else {
        $(".contenedorTabsGren").show();
        $("#hideNom").hide();
      }
    });
  });
}); //Termina inicializador de framework
