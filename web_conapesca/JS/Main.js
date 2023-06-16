var datesMail = {};
    // crea un nuevo objeto `Date`
    var today = new Date();
    
    // `getDate()` devuelve el día del mes (del 1 al 31)
    var day = today.getDate();
    
    // `getMonth()` devuelve el mes (de 0 a 11)
    var month = today.getMonth() + 1;
    
    // `getFullYear()` devuelve el año completo
    var year = today.getFullYear();

    var setDay = day+"/"+month+"/"+year;
    $('#calendarYear').attr('placeholder',
    setDay);


$("#validateRNPA").click(function () {
  validateUsername();

  if (datesMail.rnpa) {
    console.log(datesMail.rnpa);

    if(datesMail.rnpa == "12345678"){
      $(".CardSolicitudOne").hide();
      $(".CardSolicitudTwo").show();
      return false;
    } else {

      $("#usercheck").show();
      $("#usercheck").html("El RNPA no existe.");
    

  }
}

});

//SET DE RNPA
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
    datesMail.rnpa = usernameValue;
    console.log(datesMail);
  }
}

//SET ESTADO
function getEstado(val) { 

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
          var nameState = data[0].nombreEstado.name;

          $("#inputLoc").append('<option  value="' +
              data[i].id +
              '">' +
              data[i].nameLoc +
              "</option>"
          );
          $("#inputLoc").val(0);
          $("#inputLoc").focus();
        }
        datesMail.estado = nameState;
        console.log(datesMail);

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
      datesMail.muelle = data.namePue;
      datesMail.localidad = data.nameLoc,

      console.log(datesMail);

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
$("#contacterrorstart").hide();
$("#contacterrorend").hide();
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

$("#contactForm").keyup(function () {
  validateWhiteSpaces();
});


function validateWhiteSpaces(){
  let refField = $("#refrenciaForm").val();
  let desField = $("#descForm").val();
  let contactField = $("#contactForm").val();

  let regex = /^\s+/;
  let regexFin = /\s+$/;

  if(refField){
    if (regex.test(refField)) {
      $("#referrorstart").show();
    } else {
      $("#referrorstart").hide();
    }
  
    if (regexFin.test(refField)) {
      $("#referrorstart").show();
    } else {
      $("#referrorstart").hide();
    }
  }


  if(desField){
    if (regex.test(desField)) {
      $("#deserrorstart").show();
    } else {
      $("#deserrorstart").hide();
    }
  
    if (regexFin.test(desField)) {
      $("#deserrorstart").show();
    } else {
      $("#deserrorstart").hide();
    }
  }

  
  if(contactField){
    if (regex.test(contactField)) {
      $("#contacterrorstart").show();
    } else {
      $("#contacterrorstart").hide();
    }
  
    if (regexFin.test(contactField)) {
      $("#contacterrorstart").show();
    } else {
      $("#contacterrorstart").hide();
    }
  }


}




function validateInputs() {
  let stateField = $("#estado").val();
  let localField = $("#inputLoc").val();
  let refField = $("#refrenciaForm").val();
  let descField = $("#descForm").val();
  let dateField = $("#calendarYear").val();
  let timetField = $("#timeForm").val();
  let telField = $("#telForm").val();
  let contactField = $("#contactForm").val();

  //set table values

  

  if (stateField.length == "" || stateField.length == 0) {
    $("#stateerror").show();

    stateNull = true;
  } else {
    stateNull = false;
    $("#stateerror").hide();
    if (localField == 0) {
      $("#localerror").show();
      localNull = true;
    } else {
      $("#localerror").hide();
      localNull = false;
    }
  }


  if (refField.length == "") {
    $("#referror").show();
  } else {
    $("#referror").hide();
    datesMail.referencia = $("#refrenciaForm").val();
    console.log(datesMail);

  }

  if (descField.length == "") {
    $("#descerror").show();
  } else {
    $("#descerror").hide();
    datesMail.descripcion = $("#descForm").val();
    console.log(datesMail);


  }

  if (dateField.length == "") {
    $("#dateerror").show();
    $("#dateerroryear").hide();
  } else {
    $("#dateerror").hide();
    datesMail.fecha = $("#calendarYear").val();
    console.log(datesMail);

  }

  if (timetField.length == "") {
    $("#timeerror").show();
  } else {
    $("#timeerror").hide();
    datesMail.hora = $("#timeForm").val();
    console.log(datesMail);

  }

  if (telField.length == "") {
    $("#phoneerror").show();
  } else {
    $("#phoneerror").hide();
    datesMail.telefono = $("#telForm").val();
    console.log(datesMail);


  }

  if (contactField.length == "") {
    $("#contacterror").show();
  } else {
    $("#contacterror").hide();
    datesMail.contacto = $("#contactForm").val();
    console.log(datesMail);


  }
}

function soloLetras(e) {
  var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz"

  if (letras.indexOf(tecla) == -1) {
    return false;
  }
}

function validateDate(){

    var d_reg =  /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
    var dateValue = $("#calendarYear").val();
    console.log("valor date value", dateValue);

    var dayIn = parseInt(dateValue.split('/')[0])
    var monthIn = parseInt(dateValue.split('/')[1])
    var yearIn = parseInt(dateValue.split('/')[2])

    console.log("aqui",dayIn,monthIn,yearIn)
    console.log("aqui2",day,month,year)

    if(dateValue){
      if (d_reg.test(dateValue)) {
        console.log("Success");
        if(yearIn < year ){
          $("#dateerroryear").show();
          $("#dateerroryear").html("El año no puede ser menor al actual.");
    

        }

        if(yearIn == year ){
          if(monthIn >= month && dayIn >= day){
          $("#dateerroryear").hide();
          }

          if(monthIn <= month && dayIn < day){
            $("#dateerroryear").show();
            $("#dateerroryear").html("La fecha no puede ser menor al dia en curso.");
          }

          if(monthIn < month && dayIn <= day){
            $("#dateerroryear").show();
            $("#dateerroryear").html("La fecha no puede ser menor al dia en curso.");
          }
          
        }

        if(yearIn == year+1 || yearIn == year+2 ){
          $("#dateerroryear").hide();
        }

          if(yearIn > year+2 ){
            $("#dateerroryear").show();
            $("#dateerroryear").html("La fecha no puede superar 2 años del actual.");
        }
      } else{
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
    datesMail.mail = mailValue;
    mailError = false;
  } else {
    console.log("Email is invalid, skip form submission");
    $("#mailerror").show();
    $("#mailerror").html("Ingrese un formato válido de correo electrónico.");
    mailError = true;
  }
}


$("#sendRNPA").click(function () {
  validateInputs();
  validateEmail();
  validateDate();
  if (mailError == false && localNull == false && stateNull == false) {
    $(".CardSolicitudOne").hide();
    $(".CardSolicitudTwo").hide();
    $(".CardSolicitudThree").show();
    
    //RNPA
    let rnVal = document.querySelector('.rnpaValue');
    rnVal.innerHTML = datesMail.rnpa;
    
    //nombre embaracion
    let nmVal = document.querySelector('.nameValue');
    nmVal.innerHTML = "CAMILA";
    
    //Matricula
    let mtVal = document.querySelector('.matValue');
    mtVal.innerHTML = "00559966";
    
    //puerto
    let ptVal = document.querySelector('.ptValue');
    ptVal.innerHTML = datesMail.estado;

    //RNPA propietario
    let rnpVal = document.querySelector('.rnpropValue');
    rnpVal.innerHTML = "12345678";

    //descripcion
    let dsVal = document.querySelector('.desValue');
    dsVal.innerHTML = datesMail.descripcion;

    //localidad
    let lcVal = document.querySelector('.locValue');
    lcVal.innerHTML = datesMail.localidad;

    //muelle
    let mueVal = document.querySelector('.mullValue');
    mueVal.innerHTML = datesMail.muelle;

    //referencia
    let refVal = document.querySelector('.refeValue');
    refVal.innerHTML = datesMail.referencia;

    //fecha
    let dtVal = document.querySelector('.dteValue');
    dtVal.innerHTML = datesMail.fecha;

    //hora
    let hrVal = document.querySelector('.hourValue');
    hrVal.innerHTML = datesMail.hora;

    //user
    let usrVal = document.querySelector('.ctctValue');
    usrVal.innerHTML = datesMail.contacto ;

    //tel
    let telVal = document.querySelector('.teleValue');
    telVal.innerHTML = datesMail.telefono;

    //mail
    let emVal = document.querySelector('.emaValue');
    emVal.innerHTML = datesMail.mail;

    //saveInfo();
    //generatePDF();
  }
});

$("#generateFolio").click(function () {
    saveInfo();
    generatePDF();
});

function saveInfo() {


  console.log("aca",JSON.stringify(datesMail));

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



function generatePDF() {
  var doc = new jsPDF('l', 'pt', 'letter');  
  var htmlstring = '';  
  var tempVarToCheckPageHeight = 0;  
  var pageHeight = 0;  
  pageHeight = doc.internal.pageSize.height;  
  specialElementHandlers = {  
      // element with id of "bypass" - jQuery style selector  
      '#bypassme': function(element, renderer) {  
          // true = "handled elsewhere, bypass text extraction"  
          return true  
      }  
  };  
  margins = {  
      top: 150,  
      bottom: 60,  
      left: 40,  
      right: 40,  
      width: 600  
  };  
  var y = 20;  
  doc.setLineWidth(2);  
  doc.text(200, y = y + 30, "Solicitud de verificación / Número de solicitud “00001” ");  
  doc.autoTable({  
      html: '#conapescaTable',  
      startY: 70,  
      theme: 'striped',  
      columnStyles: {  
          0: {  
              cellWidth: 180,  
          },  
          1: {  
              cellWidth: 180,  
          },  
          2: {  
              cellWidth: 180,  
          },  
          3: {  
            cellWidth: 180,  
        }
      },  
      styles: {  
          minCellHeight: 40  
      }  
  })  
  doc.output('dataurlnewwindow');  
}  
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
  document.location.href="/"; 


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



 //Time piker responsive
 const timepickerButton = document.getElementById("timeForm");
 const timepickerContainer = document.getElementById("timepicker");
 const confirmButton = document.getElementById("confirm");
 
 // Mostrar/ocultar el time picker al hacer clic en el botón
 timepickerButton.addEventListener("click", () => {
   timepickerContainer.classList.toggle("hidden");
 });
 
 // Obtener la hora seleccionada al hacer clic en el botón "Confirmar"
 confirmButton.addEventListener("click", () => {
   const selectedHour = document.getElementById("hours").value;
   const selectedMinute = document.getElementById("minutes").value;
   const formattedTime = `${selectedHour}:${selectedMinute}`;
 
   // Asignar la hora seleccionada al input
   timepickerButton.value = formattedTime;
 
   // Ocultar el time picker
   timepickerContainer.classList.add("hidden");
 });






  //Time piker descktop
  const timepickerButtonR = document.getElementById("timeFormR");
  const timepickerContainerR = document.getElementById("timepickerR");
  const confirmButtonR = document.getElementById("confirmR");
  
  // Mostrar/ocultar el time picker al hacer clic en el botón
  timepickerButtonR.addEventListener("click", () => {
    timepickerContainerR.classList.toggle("hidden");
    console.log('clicltime');
  });
  
  // Obtener la hora seleccionada al hacer clic en el botón "Confirmar"
  confirmButtonR.addEventListener("click", () => {
    const selectedHour = document.getElementById("hoursR").value;
    const selectedMinute = document.getElementById("minutesR").value;
    const formattedTime = `${selectedHour}:${selectedMinute}`;
  
    // Asignar la hora seleccionada al input
    timepickerButtonR.value = formattedTime;
  
    // Ocultar el time picker
    timepickerContainerR.classList.add("hidden");
  });
 
 



}); //Termina inicializador de framework



/**
 * 
 * BACK RESPONSIVE
 */

$("#usercheckR").hide();
$("#stateerrorR").hide();
$("#localerrorR").hide();
$("#muelleerrorR").hide();
$("#referrorR").hide();
$("#referrorstartR").hide();
$("#referrorendR").hide();
$("#dateerrorR").hide();
$("#timeerrorR").hide();
$("#phoneerrorR").hide();
$("#contacterrorR").hide();
$("#contacterrorstartR").hide();
$("#contacterrorendR").hide();
$("#mailerrorR").hide();
$("#descerrorR").hide();
$("#deserrorstartR").hide();
$("#deserrorendR").hide();
$("#dateerroryearR").hide();

let usernameErrorR = true;

$("#usernamesR").keyup(function () {
  validateUsernameR();
});

$("#refrenciaFormR").keyup(function () {
  validateWhiteSpacesR();
});

$("#descFormR").keyup(function () {
  validateWhiteSpacesR();
});

$("#contactFormR").keyup(function () {
  validateWhiteSpacesR();
});


function validateWhiteSpacesR(){
  let refFieldR = $("#refrenciaFormR").val();
  let desField = $("#descFormR").val();
  let contactFieldR = $("#contactFormR").val();

  let regex = /^\s+/;
  let regexFin = /\s+$/;

  if(refFieldR){
    if (regex.test(refFieldR)) {
      $("#referrorstartR").show();
    } else {
      $("#referrorstartR").hide();
    }
  
    if (regexFin.test(refFieldR)) {
      $("#referrorstartR").show();
    } else {
      $("#referrorstartR").hide();
    }
  }


  if(desField){
    if (regex.test(desField)) {
      $("#deserrorstartR").show();
    } else {
      $("#deserrorstartR").hide();
    }
  
    if (regexFin.test(desField)) {
      $("#deserrorstartR").show();
    } else {
      $("#deserrorstartR").hide();
    }
  }

  
  if(contactFieldR){
    if (regex.test(contactFieldR)) {
      $("#contacterrorstart").show();
    } else {
      $("#contacterrorstart").hide();
    }
  
    if (regexFin.test(contactFieldR)) {
      $("#contacterrorstart").show();
    } else {
      $("#contacterrorstart").hide();
    }
  }


}


function validateUsernameR() {
  let usernameValue = $("#usernamesR").val();
  if (usernameValue.length == "") {
    $("#usercheckR").show();
    usernameErrorR = true;
    //return false;
  } else if (usernameValue.length < 8) {
    $("#usercheckR").show();
    $("#usercheckR").html("El RNPA debe contener 8 caracteres.");
    usernameErrorR = true;
    //return false;
  } else {
    $("#usercheckR").hide();
    usernameErrorR = false;
    console.log(usernameValue);
    datesMail.rnpa = usernameValue;
    console.log(datesMail);
  }
}

function validateInputsR() {
  let stateFieldR = $("#estadoR").val();
  let localFieldR = $("#inputLocR").val();
  let muelleField = $("#inputMueR").val();
  let refFieldR = $("#refrenciaFormR").val();
  let descFieldR = $("#descFormR").val();
  let dateFieldR = $("#calendarYearR").val();
  let timetFieldR = $("#timeFormR").val();
  let telFieldR = $("#telFormR").val();
  let contactFieldR = $("#contactFormR").val();

  if (stateFieldR.length == "" || stateFieldR.length == 0) {
    $("#stateerrorR").show();


  } else {
    $("#stateerrorR").hide();
    if (localFieldR == 0) {
      $("#localerrorR").show();
    } else {
      $("#localerrorR").hide();
    }
  }



  /*if (muelleField !== undefined) {
    if (muelleField.length == "") {
      $("#muelleerrorR").show();
    } else {
      $("#muelleerrorR").hide();
    }
  }*/



  if (refFieldR.length == "") {
    $("#referrorR").show();
  } else {
    $("#referrorR").hide();
  }

  if (descFieldR.length == "") {
    $("#descerrorR").show();
  } else {
    $("#descerrorR").hide();
  }

  if (dateFieldR.length == "") {
    $("#dateerrorR").show();
    $("#dateerroryearR").hide();

  } else {
    $("#dateerrorR").hide();
  }

  if (timetFieldR.length == "") {
    $("#timeerrorR").show();
  } else {
    $("#timeerrorR").hide();
  }

  if (telFieldR.length == "") {
    $("#phoneerrorR").show();
  } else {
    $("#phoneerrorR").hide();
  }

  if (contactFieldR.length == "") {
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

function validateDateR(){



    var d_reg =  /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
    var dateValue = $("#calendarYearR").val();
    console.log("valor date value", dateValue);

    var dayIn = parseInt(dateValue.split('/')[0])
    var monthIn = parseInt(dateValue.split('/')[1])
    var yearIn = parseInt(dateValue.split('/')[2])

    console.log("aqui",dayIn,monthIn,yearIn)
    console.log("aqui2",day,month,year)

    if(dateValue){
      if (d_reg.test(dateValue)) {
        console.log("Success");
        if(yearIn < year ){
          $("#dateerroryearR").show();
          $("#dateerroryearR").html("El año no puede ser menor al actual.");
    

        }

        if(yearIn == year ){
          if(monthIn >= month && dayIn >= day){
          $("#dateerroryearR").hide();
          }

          if(monthIn <= month && dayIn < day){
            $("#dateerroryearR").show();
            $("#dateerroryearR").html("La fecha no puede ser menor al dia en curso.");
          }

          if(monthIn < month && dayIn <= day){
            $("#dateerroryearR").show();
            $("#dateerroryearR").html("La fecha no puede ser menor al dia en curso.");
          }
          
        }

        if(yearIn == year+1 || yearIn == year+2 ){
          $("#dateerroryearR").hide();
        }

          if(yearIn > year+2 ){
            $("#dateerroryearR").show();
            $("#dateerroryearR").html("La fecha no puede superar 2 años del actual.");
        }
      } else{
        $("#dateerroryearR").show();
        $("#dateerroryearR").html("El formato de fecha es invalido.");
  
      }
    }
}

var mensajeRefR = document.getElementById('refrenciaFormR');
var contadorRefR = document.getElementById('contadorRefR');
var mensajeDesR = document.getElementById('descFormR');
var contadorDesR = document.getElementById('contadorDesR');

mensajeRefR.addEventListener('input', function(e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute('maxlength') - target.value.length;
  contadorRefR.innerHTML = `${longitudAct}/${longMin}`;
});

mensajeDesR.addEventListener('input', function(e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute('maxlength') - target.value.length;
  contadorDesR.innerHTML = `${longitudAct}/${longMin}`;
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

function validateEmailR() {
  // Get our input reference.
  var emailField = document.getElementById("mailFormR");

  // Define our regular expression.
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  let mailValue = $("#mailFormR").val();

  if (mailValue.length == "") {
    $("#mailerrorR").show();
  } else {
    $("#mailerrorR").hide();
  }

  // Using test we can check if the text match the pattern
  if (validEmail.test(emailField.value)) {
    console.log("Email is valid, continue with form submission");

    mailErrorR = false;
  } else {
    console.log("Email is invalid, skip form submission");
    $("#mailerrorR").show();
    $("#mailerrorR").html("Ingrese un formato válido de correo electrónico.");
    mailErrorR = true;
  }
}

function saveIn() {
  let usernameValue = $("#usernamesR").val();
  let estadoRValue = $("#estadoR").val();
  let localidadValue = $("#inputLocR").val();
  let muelleValue = $("#inputMueR").val();
  let refValue = $("#refrenciaFormR").val();
  let descValue = $("#descFormR").val();
  let dateValue = $("#calendarYearR").val();
  let timeValue = $("#timeFormR").val();
  let telValue = $("#telFormR").val();
  let contactValue = $("#contactFormR").val();
  let mailValue = $("#mailFormR").val();

  datesMail.rnpa = usernameValue;
  (datesMail.estado = estadoRValue),
    (datesMail.localidad = localidadValue),
    (datesMail.inputMueR = muelleValue),
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

 /* $.ajax({
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
  });*/

  


}

$("#validateRNPAR").click(function () {
  validateUsernameR();

  if (datesMail.rnpa) {
    console.log(datesMail.rnpa);

    if(datesMail.rnpa == "12345678"){
      $(".CardSolicitudOne").hide();
      $(".CardSolicitudTwo").show();
      return false;
    } else {

      $("#usercheckR").show();
      $("#usercheckR").html("El RNPA no existe.");
    

  }
}





});

$("#sendRNPAR").click(function () {
  validateInputsR();
  validateEmailR();
  validateDateR();
  if (mailErrorR == false) {
    //saveInfo();
  }
});
