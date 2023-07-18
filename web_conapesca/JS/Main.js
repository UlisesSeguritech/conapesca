var datesMail = {};
var datesFolio = {};
var folioId = {};
var nameState  ="";
var nameLocal  ="";

var nameRNPA  ="";
var nameEmbarca  ="";
var nameMatricula  ="";
var nameOwner  ="";
// crea un nuevo objeto `Date`
var today = new Date();

// `getDate()` devuelve el día del mes (del 1 al 31)
var day = today.getDate();

// `getMonth()` devuelve el mes (de 0 a 11)
var month = today.getMonth() + 1;

// `getFullYear()` devuelve el año completo
var year = today.getFullYear();

var now = today.getHours();
var nowMasDos = today.getHours()+2;

var nowMinutes = today.getMinutes();
/*var button = document.querySelector("#sendRNPA");
button.disabled = true;*/

var setDay = day + "/" + month + "/" + year;
$("#calendarYear").attr("placeholder", setDay);

$("#calendarYearR").attr("placeholder", setDay);

$("#validateRNPA").click(function () {
  validateUsername();

  if (datesMail.rnpa) {
    $.ajax({
      type: "GET",
      url: "https://ss.seguritech.org/ConapescaPublicApi/api/public/GetVesselListBasic",
      headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk2ODk4MzEsImlzcyI6IkJsdWVUcmFrZXIiLCJhdWQiOiJwdWJsaWMuYXBpLmNvbnN1bWVyIn0.l6ykAzooQadhR8xCcmbVPPKWxE_uV_7-HGh9QQvEL3E'},
      dataType: 'json',
      success: function (result, status, xhr) {
        for(i=0; i<=result.length; i++){
          if(datesMail.rnpa == result[i].vesselIdentification.rnpa){
           
            nameRNPA = result[i].vesselIdentification.rnpa;
            nameEmbarca = result[i].vesselIdentification.vesselName;
            nameMatricula = result[i].vesselIdentification.matricula;
            nameOwner = result[i].vesselIdentification.rnpaTitular;
            
            $(".CardSolicitudOne").hide();
            $(".CardSolicitudTwo").show();
            return false;
          }else{
            $("#usercheck").show();
            $("#usercheck").html("El RNPA no existe.");
          }
        }
      },
      error: function (xhr, status, error) {
        $("#usercheck").show();
        $("#usercheck").html("El RNPA no existe.");
      }
    });
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
    datesFolio.rnpaFolio = usernameValue;
    console.log(datesMail);
  }
}

//SET DE telefono
function validateTelLength() {
  let telValue = $("#telForm").val();
  if (telValue.length < 10) {
    $("#phoneerror").show();
    $("#phoneerror").html("El Teléfono debe contener 10 caracteres.");
     telError = true;
    //return false;
  } else {
    $("#phoneerror").hide();
    telError = false;
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
        $("#inputMue").val("");
        for (i = 0; i < data.length; i++) {
           nameState = data[0].nombreEstado.name;

          $("#inputLoc").append(
            '<option  value="' +
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

function getEstadoR(val) {
  $.get(
    "/estados/" + val + "/localidad",
   //"http://localhost:8080/estados/" + val + "/localidad",
    function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
      if (data) {
        $("#inputLocR").prop("disabled", false);
        $("#inputLocR").empty();
        $("#inputLocR").append('<option value="0">Localidad</option>');
        $("#inputMueR").val("");
        for (i = 0; i < data.length; i++) {
           nameState = data[0].nombreEstado.name;

          $("#inputLocR").append(
            '<option  value="' +
              data[i].id +
              '">' +
              data[i].nameLoc +
              "</option>"
          );
          $("#inputLocR").val(0);
          $("#inputLocR").focus();
        }
        datesMail.estado = nameState;
        console.log(datesMail);
      }
    }
  );
}

function getLocalidad(val) {
  console.log(val)
  if(val == "0"){
    $("#inputMue").val("");
    $("#inputMue").prop("disabled", true);

    console.log(typeof val)
  }else{
    $.get("/localidad/" + val, function (data, status) {
      //$.get("http://localhost:8080/localidad/" + val, function (data, status) {
      console.log("si", data.namePue);
      nameLocal = data.nameLoc;
      console.log(val)
  
  
  
      if (data) {
        $("#inputMue").prop("disabled", true);
        $("#inputMue").empty();
        $("#inputMue").val(data.namePue);
        datesMail.muelle = data.namePue;
        (datesMail.localidad = nameLocal), console.log(datesMail);
      }else{
        $("#inputMue").empty();
  
      }
    })  .fail(function() {
      $("#inputMue").prop("disabled", true);
      $("#inputMue").empty();
    });
  }

}

function getLocalidadR(val) {
  console.log(val)
  if(val == "0"){
    $("#inputMueR").val("");
    $("#inputMueR").prop("disabled", true);

    console.log(typeof val)
  }else{
  $.get("/localidad/" + val, function (data, status) {
    //$.get("http://localhost:8080/localidad/" + val, function (data, status) {
    console.log("si", data.namePue);
    nameLocal = data.nameLoc;
    if (data) {
      $("#inputMueR").prop("disabled", true);
      $("#inputMueR").empty();
      $("#inputMueR").val(data.namePue);
      datesMail.muelle = data.namePue;
      (datesMail.localidad = nameLocal), console.log(datesMail);
    }
  });
}
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
$("#dateerrorActual").hide();
$("#dateerrorActualR").hide();

let usernameError = true;
let telError = true;
$("#usernames").keyup(function () {
  validateUsername();
});

$("#telForm").keyup(function () {
  validateTelLength();
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

function validateWhiteSpaces() {
  let refField = $("#refrenciaForm").val();
  let desField = $("#descForm").val();
  let contactField = $("#contactForm").val();

  let regex = /^\s+/;
  let regexFin = /\s+$/;

  if (refField) {
    if (regex.test(refField)) {
      $("#referrorstart").show();
      errorWhiteSpRef = true;
    } else {
      $("#referrorstart").hide();
      errorWhiteSpRef = false;

    }

    if (regexFin.test(refField)) {
      $("#referrorstart").show();
      errorWhiteSpRef = true;

    } else {
      $("#referrorstart").hide();
      errorWhiteSpRef = false;

    }
  }

  if (desField) {
    if (regex.test(desField)) {
      $("#deserrorstart").show();
      errorWhiteSpDes = true;
      
    } else {
      $("#deserrorstart").hide();
      errorWhiteSpDes = false;

    }

    if (regexFin.test(desField)) {
      $("#deserrorstart").show();
      errorWhiteSpDes = true;

    } else {
      $("#deserrorstart").hide();
      errorWhiteSpDes = false;

    }
  }

  if (contactField) {
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
  let muelleField = $("#inputMue").val();
  let refField = $("#refrenciaForm").val();
  let descField = $("#descForm").val();
  let dateField = $("#calendarYear").val();
  let timetField = $("#timeForm").val();
  let telField = $("#telForm").val();
  let contactField = $("#contactForm").val();

  //set table values

  if (stateField.length == "" || stateField.length == 0) {
    $("#stateerror").show();
  } else {
    $("#stateerror").hide();
    datesMail.estado = nameState;
    console.log(datesMail);
    if (localField == 0) {
      $("#localerror").show();
    } else {
      $("#localerror").hide();
      datesMail.localidad = nameLocal;
      datesMail.muelle = $("#inputMue").val();
      
      console.log(datesMail);
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
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";

  if (letras.indexOf(tecla) == -1) {
    return false;
  }
}

function validateDate() {
  let dateField = $("#timeForm").val();

  var d_reg = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
  var dateValue = $("#calendarYear").val();
  console.log("valor date value", dateValue);

  var dayIn = parseInt(dateValue.split("/")[0]);
  var monthIn = parseInt(dateValue.split("/")[1]);
  var yearIn = parseInt(dateValue.split("/")[2]);
  var horaInput = dateField.substr(-20,2);
  var horaInt = Math.floor(horaInput)
  var minutesInput = dateField.slice(-2);
  var minutesInt = Math.floor(minutesInput);
 


  if (dateValue) {
    if (d_reg.test(dateValue)) {
      console.log("Success");
      if (yearIn < year) {
        $("#dateerroryear").show();
        $("#dateerroryear").html("El año no puede ser menor al actual.");
        fechaError = true;
      }

      if (yearIn == year) {
        
        if(monthIn == month && dayIn == day){
          console.log("el dia es hoy")
          console.log(now, nowMasDos, minutesInt, nowMinutes)

          if( horaInt == 0){
            $("#dateerrorActual").show();
            $("#dateerrorActual").html("Es necesario cambiar la fecha a un dia siguiente");
            horaError = true;
          }

          if( monthIn == month && dayIn == day && horaInt >= nowMasDos && minutesInt > nowMinutes ){
            $("#dateerrorActual").hide();
            console.log("hola soy min")
            horaError = false;
            fechaError = false;

          }else{
            $("#dateerrorActual").hide();
            $("#dateerrorActual").show();
            $("#dateerroryear").hide();
            $("#dateerrorActual").html("La hora para el dia de hoy, tiene que ser mayor a 2 horas.");
            horaError = true;
            fechaError = true;

          } 
        }

        if (monthIn >= month && dayIn > day) {
          $("#dateerroryear").hide();
          console.log("soy 1")
          fechaError = false;
          horaError = false;

        }

        if (monthIn <= month && dayIn < day) {
          $("#dateerroryear").show();
          $("#dateerroryear").html(
            "La fecha no puede ser menor al dia en curso."
          );
        fechaError = true;

        }

        if (monthIn < month && dayIn <= day) {
          $("#dateerroryear").show();
          $("#dateerroryear").html(
            "La fecha no puede ser menor al dia en curso."
          );
        fechaError = true;

        }
      }

      if (yearIn == year + 1 ) {

        if(monthIn >= month && dayIn >= day){
          $("#dateerroryear").hide();
          fechaError = false;
          horaError = false;
        }else{
          $("#dateerroryear").show();
          $("#dateerroryear").html(
            "La fecha tiene que ser mayor a un año."
          );
        }


      }

      if (yearIn > year + 2) {
        $("#dateerroryear").show();
        $("#dateerroryear").html(
          "La fecha no puede superar 2 años del actual."
        );
        fechaError = true;
        horaError = true;

      }
    } else {
      $("#dateerroryear").show();
      $("#dateerroryear").html("El formato de fecha es invalido.");
      fechaError = true;

    }
  }
}

var mensajeRef = document.getElementById("refrenciaForm");
var contadorRef = document.getElementById("contadorRef");
var mensajeDes = document.getElementById("descForm");
var contadorDes = document.getElementById("contadorDes");

mensajeRef.addEventListener("input", function (e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute("maxlength") - target.value.length;
  contadorRef.innerHTML = `${longitudAct}/${longMin}`;
});

mensajeDes.addEventListener("input", function (e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute("maxlength") - target.value.length;
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
  datesMail = {};
  validateInputs();
  validateEmail();
  validateDate();
  validateWhiteSpaces();
  validateTelLength();
  console.log(mailError, fechaError, horaError, errorWhiteSpRef, errorWhiteSpDes)
  
  if (mailError == false && fechaError == false && horaError == false &&  errorWhiteSpRef == false && errorWhiteSpDes == false) {

    datesMail.nameEmb = nameEmbarca;
    datesMail.matricula = nameMatricula;
    datesMail.propietario = nameOwner;
    datesMail.rnpa = nameRNPA;

    //RNPA
    let rnVal = document.querySelector(".rnpaValue");
    rnVal.innerHTML = datesMail.rnpa;

    //nombre embaracion
    let nmVal = document.querySelector(".nameValue");
    nmVal.innerHTML = datesMail.nameEmb ;

    //Matricula
    let mtVal = document.querySelector(".matValue");
    mtVal.innerHTML = datesMail.matricula;

    //puerto
    let ptVal = document.querySelector(".ptValue");
    ptVal.innerHTML = datesMail.estado;

    //RNPA propietario
    let rnpVal = document.querySelector(".rnpropValue");
    rnpVal.innerHTML = datesMail.propietario;



    //localidad
    let lcVal = document.querySelector(".locValue");
    lcVal.innerHTML = datesMail.localidad;

    //muelle
    let mueVal = document.querySelector(".mullValue");
    mueVal.innerHTML = datesMail.muelle;



    //fecha
    let dtVal = document.querySelector(".dteValue");
    dtVal.innerHTML = datesMail.fecha;

    //hora
    let hrVal = document.querySelector(".hourValue");
    hrVal.innerHTML = datesMail.hora;

    //user
    let usrVal = document.querySelector(".ctctValue");
    usrVal.innerHTML = datesMail.contacto;

    //tel
    let telVal = document.querySelector(".teleValue");
    telVal.innerHTML = datesMail.telefono;

    //mail
    let emVal = document.querySelector(".emaValue");
    emVal.innerHTML = datesMail.mail;

    if(datesMail.estado && datesMail.localidad && datesMail.descripcion && datesMail.referencia && datesMail.fecha && datesMail.hora && datesMail.contacto && datesMail.telefono.length == 10 && datesMail.mail){
      
      const descrip = datesMail.descripcion.split(". ").join('-').split('\n').join('-').split('\n\n').join('-').split('-');

      var desWhite = descrip.filter(elements => {
        return (elements != null && elements !== undefined && elements !== '');
       });

      for (let i = 0; i < desWhite.length; i++) {
        desWhite[i] = desWhite[i][0].toUpperCase() + desWhite[i].substr(1);
      }
       
      //var saltoLinDes = descrip.split("\n")
      const refer = datesMail.referencia.split(". ").join('-').split('\n').join('-').split('\n\n').join('-').split('-');

      var refWhite = refer.filter(elements => {
        return (elements != null && elements !== undefined && elements !== '');
       });

      for (let i = 0; i < refWhite.length; i++) {
        refWhite[i] = refWhite[i][0].toUpperCase() + refWhite[i].substr(1);

      }
      console.log("soy descrip",desWhite)
      console.log("soy descrip",refWhite)

      //descripcion
      let dsVal = document.querySelector(".desValue");
      datesMail.descripcion = desWhite.toString().replace(/,/g,'. ').trim().replace(/\.  /g,', ');
      dsVal.innerHTML = datesMail.descripcion = datesMail.descripcion.charAt(0).toUpperCase() + datesMail.descripcion.slice(1).replace(/\.\./g,".");
      //referencia
      let refVal = document.querySelector(".refeValue");
      datesMail.referencia = refWhite.toString().replace(/,/g,'. ').trim().replace(/\.  /g,', ');
      refVal.innerHTML = datesMail.referencia = datesMail.referencia.charAt(0).toUpperCase() + datesMail.referencia.slice(1).replace(/\.\./g,".");

      console.log(datesMail);


      $(".CardSolicitudOne").hide();
      $(".CardSolicitudTwo").hide();
      $(".CardSolicitudThree").show();

    }else{
      //alert("Todos los campos son obligatorios")
      console.log(datesMail);

    }

    



    //saveInfo();
    //generatePDF();
  }
});

$("#generateFolio").click(function () {
  saveInfo();
  
});

function saveInfo() {

  genFolio = JSON.stringify(datesFolio);

  $.ajax({
    url: "/generateFolio/",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    dataType: "json",
    data: genFolio,
    success: function (xhr, status, res) {
      //folioId.folio = res.responseJSON.idFolio;
      datesMail.folioId = res.responseJSON.idFolio;
      formatFolio = datesMail.folioId.toString().padStart(6,'0');
      datesMail.folioId = formatFolio;
      generatePDF(formatFolio);
      nuw = JSON.stringify(datesMail);
      console.log(nuw,"desktop")

      $.ajax({
        url: "/sendMail/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        dataType: "json",
        data: nuw,
        complete: function (xhr, status) {
          
          alert("Gracias, sus datos se enviaron con éxito. Estado: ");
          document.location.href = "/";
        },
      });
    },
  });




}

function generatePDF(fol) {

  var doc = new jsPDF("l", "pt", "letter");
  var htmlstring = "";
  var tempVarToCheckPageHeight = 0;
  var pageHeight = 0;
  pageHeight = doc.internal.pageSize.height;
  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    "#bypassme": function (element, renderer) {
      // true = "handled elsewhere, bypass text extraction"
      return true;
    },
  };
  margins = {
    top: 150,
    bottom: 60,
    left: 40,
    right: 40,
    width: 600,
  };
  var y = 20;
  doc.setLineWidth(2);
  doc.text(
    200,
    (y = y + 30),
    "Solicitud de verificación / Número de solicitud " + fol
  );
  doc.autoTable({
    html: "#conapescaTable",
    startY: 70,
    theme: "striped",
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
      },
    },
    styles: {
      minCellHeight: 40,
    },
  });
  doc.output("dataurlnewwindow");
}

//funciones responsive para PDF

$("#generateFolioRes").click(function () {
  saveInfores();
});

function saveInfores() {
  genFoliores = JSON.stringify(datesFolio);

  $.ajax({
    url: "/generateFolio/",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    dataType: "json",
    data: genFoliores,
    success: function (xhr, status, res) {
      datesMail.folioId = res.responseJSON.idFolio;
      datesMail.folioId = res.responseJSON.idFolio;
      formatFolio = datesMail.folioId.toString().padStart(6,'0');
      datesMail.folioId = formatFolio;

      generatePDFRes(formatFolio);
      nuw = JSON.stringify(datesMail);
      console.log(nuw,"responsive")
      $.ajax({
        url: "/sendMail/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        dataType: "json",
        data: nuw,
        complete: function (xhr, status) {
          alert("Gracias, sus datos se enviaron con éxito. Estado: ");
          document.location.href = "/";
        },
      });
    },
  });


}

function generatePDFRes(foli) {
  var doc = new jsPDF("l", "pt", "letter");
  var htmlstring = "";
  var tempVarToCheckPageHeight = 0;
  var pageHeight = 0;
  pageHeight = doc.internal.pageSize.height;
  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    "#bypassme": function (element, renderer) {
      // true = "handled elsewhere, bypass text extraction"
      return true;
    },
  };
  margins = {
    top: 150,
    bottom: 60,
    left: 40,
    right: 40,
    width: 600,
  };
  var y = 20;
  doc.setLineWidth(2);
  console.log("soy fol",foli),

  doc.text(
    200,
    (y = y + 30),
   

    "Solicitud de verificación / Número de solicitud " + foli
    
  );
  doc.autoTable({
    html: "#conapescaTableRes",
    startY: 70,
    theme: "striped",
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
      },
    },
    styles: {
      minCellHeight: 40,
    },
  });
  doc.output("dataurlnewwindow");
}

//

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
  document.location.href = "/";
};

//Funcion del FRAMEWORK de gobienrno que se ejecuta cuando todas las dependencias se cargaron correctamente
//INICIALIZAMOS LOS INPUTS TIPO CALENDAR
$gmx(document).ready(function () {
  $("#calendarYear").datepicker({ changeYear: true });
});
$gmx(document).ready(function () {
  $("#calendarYearR").datepicker({ changeYear: true });
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
    console.log("clicltime");
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

function validateWhiteSpacesR() {
  let refFieldR = $("#refrenciaFormR").val();
  let desField = $("#descFormR").val();
  let contactFieldR = $("#contactFormR").val();

  let regex = /^\s+/;
  let regexFin = /\s+$/;

  if (refFieldR) {
    if (regex.test(refFieldR)) {
      $("#referrorstartR").show();
      errorWhiteSpRef = true;

    } else {
      $("#referrorstartR").hide();
      errorWhiteSpRef = false;

    }

    if (regexFin.test(refFieldR)) {
      $("#referrorstartR").show();
      errorWhiteSpRef = true;

    } else {
      $("#referrorstartR").hide();
      errorWhiteSpRef = false;

    }
  }

  if (desField) {
    if (regex.test(desField)) {
      $("#deserrorstartR").show();
      errorWhiteSpDes = true;

    } else {
      $("#deserrorstartR").hide();
      errorWhiteSpDes = false;

    }

    if (regexFin.test(desField)) {
      $("#deserrorstartR").show();
      errorWhiteSpDes = true;

    } else {
      $("#deserrorstartR").hide();
      errorWhiteSpDes = false;

    }
  }

  if (contactFieldR) {
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
    datesFolio.rnpaFolio = usernameValue;
    console.log(datesMail);
  }
}

function limpiarNumero(obj) {
  /* El evento "change" sólo saltará si son diferentes */
  obj.value = obj.value.replace(/\D/g, '');
}
//SET DE telefono
function validateTelLengthR() {
  let telValue = $("#telFormR").val();
  if (telValue.length < 10) {
    $("#phoneerrorR").show();
    $("#phoneerrorR").html("El Teléfono debe contener 10 caracteres.");
     telError = true;
    //return false;
  } else {
    $("#phoneerrorR").hide();
    telError = false;
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

    //set table values Responsive

  if (stateFieldR.length == "" || stateFieldR.length == 0) {
    $("#stateerrorR").show();
  } else {
    $("#stateerrorR").hide();
    datesMail.estado = nameState;
    console.log(datesMail);
    if (localFieldR == 0) {
      $("#localerrorR").show();
    } else {
      $("#localerrorR").hide();
      datesMail.localidad = nameLocal;
      datesMail.muelle = $("#inputMueR").val();
      console.log(datesMail);

    }
  }

  if (refFieldR.length == "") {
    $("#referrorR").show();
  } else {
    $("#referrorR").hide();
    datesMail.referencia = $("#refrenciaFormR").val();
    console.log(datesMail);
  }

  if (descFieldR.length == "") {
    $("#descerrorR").show();
  } else {
    $("#descerrorR").hide();
    datesMail.descripcion = $("#descFormR").val();
    console.log(datesMail);
  }

  if (dateFieldR.length == "") {
    $("#dateerrorR").show();
    $("#dateerroryearR").hide();
  } else {
    $("#dateerrorR").hide();
    datesMail.fecha = $("#calendarYearR").val();
    console.log(datesMail);
  }

  if (timetFieldR.length == "") {
    $("#timeerrorR").show();
  } else {
    $("#timeerrorR").hide();
    datesMail.hora = $("#timeFormR").val();
    console.log(datesMail);
  }

  if (telFieldR.length == "") {
    $("#phoneerrorR").show();
  } else {
    $("#phoneerrorR").hide();
    datesMail.telefono = $("#telFormR").val();
    console.log(datesMail);
  }

  if (contactFieldR.length == "") {
    $("#contacterrorR").show();
  } else {
    $("#contacterrorR").hide();
    datesMail.contacto = $("#contactFormR").val();
    console.log(datesMail);
  }
}

function soloLetras(e) {
  var key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";

  if (letras.indexOf(tecla) == -1) {
    return false;
  }
}

function validateDateR() {
  let dateFieldR = $("#timeFormR").val();

  var d_reg = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
  var dateValue = $("#calendarYearR").val();
  console.log("valor date value", dateValue);

  var dayIn = parseInt(dateValue.split("/")[0]);
  var monthIn = parseInt(dateValue.split("/")[1]);
  var yearIn = parseInt(dateValue.split("/")[2]);
  var horaInput = dateFieldR.substr(-20,2);
  var horaInt = Math.floor(horaInput)
  var minutesInput = dateFieldR.slice(-2);
  var minutesInt = Math.floor(minutesInput);

  console.log("aqui", dayIn, monthIn, yearIn);
  console.log("aqui2", day, month, year);

  if (dateValue) {
    if (d_reg.test(dateValue)) {
      console.log("Success");
      if (yearIn < year) {
        $("#dateerroryearR").show();
        $("#dateerroryearR").html("El año no puede ser menor al actual.");
        fechaError = true;
      
      }

      if (yearIn == year) {

        if(monthIn == month && dayIn == day){
          console.log("el dia es hoy")
          console.log(now, nowMasDos)

          if( horaInt == 0){
            $("#dateerrorActualR").show();
            $("#dateerrorActualR").html("Es necesario cambiar la fecha a un dia siguiente");
            horaError = true;
          }

          if( monthIn == month && dayIn == day && horaInt >= nowMasDos && minutesInt > nowMinutes ){
            $("#dateerrorActualR").hide();
            horaError = false;
            fechaError = false;

          }else{
            $("#dateerrorActualR").hide();
            $("#dateerrorActualR").show();
            $("#dateerroryearR").hide();
            $("#dateerrorActualR").html("La hora para el dia de hoy, tiene que ser mayor a 2 horas.");
            horaError = true;
            fechaError = true;

          } 
        }


        if (monthIn >= month && dayIn > day) {
          $("#dateerroryearR").hide();
          console.log("soy 1")
          fechaError = false;
          horaError = false;

        }

        if (monthIn <= month && dayIn < day) {
          $("#dateerroryearR").show();
          $("#dateerroryearR").html(
            "La fecha no puede ser menor al dia en curso."
          );
        fechaError = true;

        }

        if (monthIn < month && dayIn <= day) {
          $("#dateerroryearR").show();
          $("#dateerroryearR").html(
            "La fecha no puede ser menor al dia en curso."
          );
        fechaError = true;

        }
      }

      if (yearIn == year + 1 || yearIn == year + 1) {
        $("#dateerroryearR").hide();
        fechaError = false;
        horaError = false;


      }

      if (yearIn > year + 2) {
        $("#dateerroryearR").show();
        $("#dateerroryearR").html(
          "La fecha no puede superar 2 años del actual."
        );
        fechaError = true;
        horaError = true;


      }
    } else {
      $("#dateerroryearR").show();
      $("#dateerroryearR").html("El formato de fecha es invalido.");
      fechaError = true;
    
    }
  }
}

var mensajeRefR = document.getElementById("refrenciaFormR");
var contadorRefR = document.getElementById("contadorRefR");
var mensajeDesR = document.getElementById("descFormR");
var contadorDesR = document.getElementById("contadorDesR");

mensajeRefR.addEventListener("input", function (e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute("maxlength") - target.value.length;
  contadorRefR.innerHTML = `${longitudAct}/${longMin}`;
});

mensajeDesR.addEventListener("input", function (e) {
  var target = e.target;
  //var longitudMax = target.getAttribute('maxlength');
  var longitudAct = target.value.length;
  var longMin = target.getAttribute("maxlength") - target.value.length;
  contadorDesR.innerHTML = `${longitudAct}/${longMin}`;
});

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
    datesMail.mail = mailValue;
    mailErrorR = false;
  } else {
    console.log("Email is invalid, skip form submission");
    $("#mailerrorR").show();
    $("#mailerrorR").html("Ingrese un formato válido de correo electrónico.");
    mailErrorR = true;
  }
}

$("#validateRNPAR").click(function () {
  validateUsernameR();
  if (datesMail.rnpa) {
    $.ajax({
      type: "GET",
      url: "https://ss.seguritech.org/ConapescaPublicApi/api/public/GetVesselListBasic",
      headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk2ODk4MzEsImlzcyI6IkJsdWVUcmFrZXIiLCJhdWQiOiJwdWJsaWMuYXBpLmNvbnN1bWVyIn0.l6ykAzooQadhR8xCcmbVPPKWxE_uV_7-HGh9QQvEL3E'},
      dataType: 'json',
      success: function (result, status, xhr) {
        for(i=0; i<=result.length; i++){


          
          if(datesMail.rnpa == result[i].vesselIdentification.rnpa){
            nameRNPA = result[i].vesselIdentification.rnpa;
            nameEmbarca = result[i].vesselIdentification.vesselName;
            nameMatricula = result[i].vesselIdentification.matricula;
            nameOwner = result[i].vesselIdentification.rnpaTitular;
            
            $(".CardSolicitudOne").hide();
            $(".CardSolicitudTwo").show();
            return false;
          }else{
            $("#usercheckR").show();
            $("#usercheckR").html("El RNPA no existe.");
          }
        }
      },
      error: function (xhr, status, error) {
        $("#usercheckR").show();
        $("#usercheckR").html("El RNPA no existe.");
      }
    });
  }

});

$("#sendRNPAR").click(function () {
  datesMail = {};
  validateInputsR();
  validateEmailR();
  validateDateR();
  validateWhiteSpacesR();

  validateTelLengthR();
  console.log(mailErrorR, fechaError, horaError, errorWhiteSpRef, errorWhiteSpDes)

  
  //saveIn();
  //console.log("datos " + JSON.stringify(datesMail));
  if (mailErrorR == false && fechaError == false && horaError == false &&  errorWhiteSpRef == false && errorWhiteSpDes == false) {

    datesMail.nameEmb = nameEmbarca;
    datesMail.matricula = nameMatricula;
    datesMail.propietario = nameOwner;
    datesMail.rnpa = nameRNPA;

    //RNPA
    let rnVal = document.querySelector(".rnpaValueR");
    rnVal.innerHTML = datesMail.rnpa;

    //nombre embaracion
    let nmVal = document.querySelector(".nameValueR");
    nmVal.innerHTML = datesMail.nameEmb;

    //Matricula
    let mtVal = document.querySelector(".matValueR");
    mtVal.innerHTML = datesMail.matricula;

    //puerto
    let ptVal = document.querySelector(".ptValueR");
    ptVal.innerHTML = datesMail.estado;

    //RNPA propietario
    let rnpVal = document.querySelector(".rnpropValueR");
    rnpVal.innerHTML = datesMail.propietario;



    //localidad
    let lcVal = document.querySelector(".locValueR");
    lcVal.innerHTML = datesMail.localidad;

    //muelle
    let mueVal = document.querySelector(".mullValueR");
    mueVal.innerHTML = datesMail.muelle;

    //referencia
    let refVal = document.querySelector(".refeValueR");
    refVal.innerHTML = datesMail.referencia;

    //fecha
    let dtVal = document.querySelector(".dteValueR");
    dtVal.innerHTML = datesMail.fecha;

    //hora
    let hrVal = document.querySelector(".hourValueR");
    hrVal.innerHTML = datesMail.hora;

    //user
    let usrVal = document.querySelector(".ctctValueR");
    usrVal.innerHTML = datesMail.contacto;

    //tel
    let telVal = document.querySelector(".teleValueR");
    telVal.innerHTML = datesMail.telefono;

    //mail
    let emVal = document.querySelector(".emaValueR");
    emVal.innerHTML = datesMail.mail;

    if(datesMail.estado && datesMail.localidad && datesMail.descripcion && datesMail.referencia && datesMail.fecha && datesMail.hora && datesMail.contacto && datesMail.telefono.length == 10 && datesMail.mail){
      
      const descrip = datesMail.descripcion.split(". ").join('-').split('\n').join('-').split('\n\n').join('-').split('-')

      var desWhite = descrip.filter(elements => {
        return (elements != null && elements !== undefined && elements !== '');
       });

      for (let i = 0; i < desWhite.length; i++) {
        desWhite[i] = desWhite[i][0].toUpperCase() + desWhite[i].substr(1);
      }
       
      //var saltoLinDes = descrip.split("\n")
      const refer = datesMail.referencia.split(". ").join('-').split('\n').join('-').split('\n\n').join('-').split('-')

      var refWhite = refer.filter(elements => {
        return (elements != null && elements !== undefined && elements !== '');
       });

      for (let i = 0; i < refWhite.length; i++) {
        refWhite[i] = refWhite[i][0].toUpperCase() + refWhite[i].substr(1);

      }
      console.log("soy descrip",desWhite)
      console.log("soy descrip",refWhite)

       //descripcion
       let dsVal = document.querySelector(".desValueR");
       datesMail.descripcion = desWhite.toString().replace(/,/g,'. ').trim().replace(/\.  /g,', ');
       dsVal.innerHTML = datesMail.descripcion = datesMail.descripcion.charAt(0).toUpperCase() + datesMail.descripcion.slice(1).replace(/\.\./g,".");;
       //referencia
       let refVal = document.querySelector(".refeValueR");
       datesMail.referencia = refWhite.toString().replace(/,/g,'. ').trim().replace(/\.  /g,', ');
       refVal.innerHTML = datesMail.referencia = datesMail.referencia.charAt(0).toUpperCase() + datesMail.referencia.slice(1).replace(/\.\./g,".");;
 
      console.log(datesMail);

      $(".CardSolicitudOne").hide();
      $(".CardSolicitudTwo").hide();
      $(".CardSolicitudThree").show();

    }else{
      //alert("Todos los campos son obligatorios")
      console.log(datesMail);

    }

    //saveInfo();
    //generatePDF();
  }
});

let panelSolicitudVer = document.getElementById("panelSolicitudVer");

panelSolicitudVer.addEventListener("click", () => {
  console.log("click");
  setTimeout(function () {
    panelSolicitudVer.scrollIntoView({
           /*behavior: 'smooth',*/ block: "center",
    });
  }, 250);
});
