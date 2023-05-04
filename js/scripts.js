/*!
 * Start Bootstrap - Small Business v5.0.6 (https://startbootstrap.com/template/small-business)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-small-business/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

$(document).ready(function () {
  $(".btn-tab").click(function () {
    // Desactivar botones inactivos
    $(".btn-tab").not($(this)).removeClass("btn-tab-active");
    // Activar botón actual
    $(this).addClass("btn-tab-active");
    // Obtener objetivo del botón
    var target = $(this).attr("data-bs-target");
    // Ocultar elementos no seleccionados
    $(".collapse.show").not(target).removeClass("show");
    // Mostrar el elemento seleccionado
    $(target).addClass("show");
    $("#contHide").show();
    $(".btn-gren").removeClass("active-green");
  });
  $(".btn-resp").click(function () {
    // Desactivar botones inactivos
    $(".btn-resp").not($(this)).removeClass("active");
    // Activar botón actual
    $(this).addClass("active");
    // Obtener objetivo del botón
    var target = $(this).attr("href");
    // Ocultar elementos no seleccionados
    $(".collapse.show").not(target).removeClass("show");
    // Mostrar el elemento seleccionado
    $(target).addClass("show");
    $("#contHide").show();
    $(".btn-gren").removeClass("active-green");
  });

  $(".btn-gren").click(function () {
    $("#contHide").hide();
    // Desactivar botones inactivos
    $(".btn-gren").not($(this)).removeClass("active-green");
    // Activar botón actual
    $(this).addClass("active-green");
    // Obtener objetivo del botón

    var target = this.querySelector("a").getAttribute("href");
    // Ocultar elementos no seleccionados
    $(".collapse.collapseC.show").not(target).removeClass("show");
    // Mostrar el elemento seleccionado
    $(target).addClass("show");

    //console.log(this);
    //console.log(target);
  });

  const collapseElements = document.querySelectorAll(".collapse");
  collapseElements.forEach((element) => {
    element.style.transition = "none";
  });
});

var contenedorC1 = document.getElementById("contenedorC1");
$("#solictudI").click(function () {
  $("#formatoI").not($(this)).removeClass("btn-instalacion-active");
  $(this).addClass("btn-instalacion-active");
  contenedorC1.innerHTML = `   <div class="  shadow card-nom p-5">
  <h5>Requisitos para solicitar la instalación de un equipo transreceptor</h5>
 
  <p>Los permisionarios y/o concesionarios con derechos vigentes y con embarcaciones
     pesqueras que se ubiquen dentro de las características establecidas al apartado 1.2
     de la  <b>Norma Oficial Mexicana NOM-062-SAG/PESC-2014, para la utilización del
        Sistema de Localización y Monitoreo Satelital de Embarcaciones Pesqueras
        publicada en el Diario Oficial de la Federación el 3 de julio del 2015,</b> deberán llevar
        a cabo la gestión con los siguientes requisitos:
  </p>
  <div class="ms-5">
  <p><b>1.</b> Presentar en original, escrito de solicitud de instalación de equipo transreceptor
     dirigido a la DIRECCIÓN GENERAL DE INSPECCIÓN Y VIGILANCIA DE LA
     COMISIÓN NACIONAL DE ACUACULTURA Y PESCA (CONAPESCA), y ser
     presentado ante las Oficinas de Representación de la CONAPESCA en las
     Entidades Federativas de la Secretaría de Agricultura y Desarrollo Rural de su
     localidad (en caso de residir fuera de Mazatlán, Sinaloa), mismos que serán
     sellados de recibido y turnados de forma gratuita a la CONAPESCA, así mismo
     podrá acudir directamente a las oficinas de correo para envío mediante un
     correo certificado.
  </p>
  <p><b>2.</b> Adjuntar original debidamente llenado del "FORMATO DE INSCRIPCIÓN AL
     REGISTRO DEL PROGRAMA DE SISTEMA DE MONITOREO SATELITAL DE
     EMBARCACIONES PESQUERAS 2013-2018".
  </p>
</div>
  <p><b>Adjuntar copia simple de los siguientes documentos:</b></p>
  <div class="ms-5">
  <b>1.</b> Identificación oficial del propietario de la embarcación (Persona Física).<br>
  <b>2.</b> En caso de tratarse de personas morales el trámite lo efectúa el representante
  legal, acreditando la personalidad por medio de carta poder general notarial
  (Escritura Pública otorgando poder legal).<br>
  <b>3.</b> Identificación oficial del representante legal.<br>
  <b>4.</b> Comprobante de domicilio del permisionario (con vigencia no mayor a 3
  meses).<br>
  <b>5.</b> Permiso y/o concesión vigente.<br>
  <b>6.</b> Certificado Nacional de Seguridad vigente (UNICAPAM).<br>
  <b>7.</b> Certificado de Matrícula (UNICAPAM). (Documentación complementaria requerida).<br>
  <b>8.</b> Documento que acredite el carácter de propietario o posesionario de la
  embarcación. (Documentación complementaria requerida). <br>
  El trámite de solicitud debe ser acompañado de la documentación requerida, para
  que este Órgano Administrativo esté en posibilidades de iniciar el trámite de solicitud.</p>
</div>
  <p><b>Nota Importante:</b>  Toda documentación presentada será verificada, por lo que en
     caso de falsear información será turnada a las autoridades competentes para los
     efectos legales correspondientes.
  </p>
  <p>La realización del presente trámite es necesario, por lo que la falta de un documento
     solicitado, será considerado como falta de interés del solicitante para la continuidad
     del mismo.</p>

  <p>Las solicitudes que cumplan con los requisitos serán atendidas por la CONAPESCA,
por medio de Seguritech Privada S.A. de C.V., que es la empresa encargada de prestar
los servicios de instalación y mantenimiento de los equipos transreceptores, y que
para el permisionario y/o concesionario se llevará a cabo la instalación de manera
gratuita conforme al procedimiento establecido, atendiendo el orden de prelación de
solicitudes registradas así como la disponibilidad de equipos transreceptores
  </p>
  <p>El único facultado para la realización del trámite de instalación del equipo transreceptor, es el titular del permiso y/o concesión (persona física o moral) asignado a la
     embarcación requirente.
  </p>
  <p>Ningún servidor público de la CONAPESCA está facultado para solicitar documentos
     adicionales a los requisitos antes señalados, ni para requerir pagos por la realización
     del trámite, distintos a los establecidos en los ordenamientos legales aplicables. Para
     cualquier duda o aclaración referente, comunicarse al Centro de Localización y
     Monitoreo Satelital de Embarcaciones Pesqueras, de la Dirección General de
     Inspección y Vigilancia de la CONAPESCA al teléfono (669) 9156900 extensiones 58311
     y 58329, correo electrónico: monitoreo.satelital@conapesca.gob.mx
  </p>
  <p>Se requiere a los solicitantes que la documentación que sea entregada en las Oficinas
     de Representación de la CONAPESCA en las Entidades Federativas de la Secretaría de
     Agricultura y Desarrollo Rural, se recibe sólo para el efecto de ser turnada a la
     Dirección General de Inspección y Vigilancia de CONAPESCA, quien acusará de
     recibido como autoridad competente para su revisión, y determinará lo procedente a
     su solicitud, dentro del plazo de cinco días hábiles.</p>
</div>

<div class="row m-3 mt-5">
  <div class="col-4 mx-auto  text-center ">
     <a href="assets/pdfs/requisitos_solicitar-instalacion-equipo-transreceptor.pdf" target="_blank"> <button type="button" class="btn btn-outline-danger mx-auto w-100 align-left">Descargar Requisitos</button></a>
  </div>
  <div class="col-md-4"></div>
  <div class="col-md-4"></div>
</div>`;
});
$("#formatoI").click(function () {
  $("#solictudI").not($(this)).removeClass("btn-instalacion-active");
  $(this).addClass("btn-instalacion-active");
  contenedorC1.innerHTML = `<div class="shadow card-nom p-5">
                                <h5 >Formato de instalacion</h5>
                                <div class="row mt-5 ">
                        
                        <div class="col-3 mx-auto">
                        <div class="text-center">
                             <img src="./assets/Img/pdf.jpg" alt="">
                             <p class="text-muted ms-3" style="font-size:10px">Solicitud de Instalación</p>
                             </div>
                         </div>
                         <div class="col-9 mx-auto">
                         <a href="assets/pdfs/requisitos_solicitar-instalacion-equipo-transreceptor.pdf" target="_blank"><button type="button" class="btn btn-outline-danger mb-2" style="width:60%;">Descarga</button></a>
                           

                         </div>
                         
                       
                     </div>
                                </div>
                              `;
});

collapse3 = document.getElementById("collapseC3");
btnAceptVerificacion = document.getElementById("aceptarVerificacion");
btnAceptVerificacion.addEventListener("click", () => {
  collapse3.innerHTML = `<div class="mx-5 py-4">
   <div class="card align-items-center shadow my-5 ubucacionEmb card-verifi">
   <div class="m-3 p-3">
      <h4>Ubicacion actual de la embarcacion</h4>
      <div class="row">
         <div class="col m-3">
            <select class="form-select" aria-label="Default select example">
               <option selected>Estado</option>
               <option value="">Selecciona un estado con litoral</option>
               <option value="Baja California Sur">Baja California Sur</option>
               <option value="Baja California">Baja California</option>
               <option value="Sonora">Sonora</option>
               <option value="Sinaloa">Sinaloa</option>
               <option value="Nayarit">Nayarit</option>
               <option value="Jalisco">Jalisco</option>
               <option value="Colima">Colima</option>
               <option value="Michoacán">Michoacán</option>
               <option value="Guerrero">Guerrero</option>
               <option value="Oaxaca">Oaxaca</option>
               <option value="Chiapas">Chiapas</option>
               <option value="Quintana Roo">Quintana Roo</option>
               <option value="Yucatán">Yucatán</option>
               <option value="Campeche">Campeche</option>
               <option value="Tabasco">Tabasco</option>
               <option value="Veracruz">Veracruz</option>
               <option value="Tamaulipas">Tamaulipas</option>
             </select>
         </div>
         <div class="col m-3">
            <select class="form-select" aria-label="Default select example">
               <option selected>Localidad</option>
               <option value="1">One</option>
               <option value="2">Two</option>
               <option value="3">Three</option>
             </select>
         </div>
      </div>
      <div class="row">
         <div class="col m-3">
            <select class="form-select" aria-label="Default select example">
               <option selected>Muelle</option>
               <option value="1">One</option>
               <option value="2">Two</option>
               <option value="3">Three</option>
             </select>
         </div>
         <div class="col m-3">
            <select class="form-select" aria-label="Default select example">
               <option selected>Referencia</option>
               <option value="1">One</option>
               <option value="2">Two</option>
               <option value="3">Three</option>
             </select>
         </div>
      </div>
      <div class="row">
         <div class="col m-3">
            <textarea class="form-control" placeholder="Descripción de la falla" rows="3"></textarea>
         </div>
      </div>
   
   </div>   
         
   </div>
   
   <div class="card align-items-center shadow my-5 ubucacionEmb card-verifi" >
   <div class="m-3 p-3">
      <h4>Datos de contacto</h4>
      <div class="row">
         <div class="col m-3">
            <input class="form-control" type="text" placeholder="Fecha sugerida" >
         </div>
         <div class="col m-3">
            <input class="form-control" type="text" placeholder="Hora sugerida" >
         </div>
         </div>
         <div class="row">
            <div class="col m-3">
               <input class="form-control" type="text" placeholder="Teléfono" >
            </div>
            <div class="col m-3">
               <input class="form-control" type="text" placeholder="Persona de contacto" >
            </div>

         </div>
         <div class="row">
         <div class="col m-3">
            <input class="form-control" type="email" placeholder="Correo electrónico" >
         </div>
         <div class="col m-3">
            
         </div>

      </div>
        
            <div class="row mt-5">
            <div class="col"></div>
               <div class="col text-center">
                  <button type="button" class="btn btn-outline-secondary mb-1 w-100">Cancelar</button>
               </div>
               <div class="col text-center">
                 <button type="button" class="btn btn-outline-danger mb-1 w-100" id="aceptarVerificacion2">Aceptar</button>
               </div>
               <div class="col"></div>
               
             
          
            </div>
      </div>
   </div>       
   </div>
   `;

  btnAceptVerificacion2 = document.getElementById("aceptarVerificacion2");
  btnAceptVerificacion2.addEventListener("click", () => {
    collapse3.innerHTML = ` 
         <div class="card back-gray">
         <div class="container ">
            <div class="collapseGreen shadow card-nom p-5 my-3 mx-auto px-5 collapseGreen ">
            <div class="container">
            <table class="table text-center">
            <thead>
              <tr class="table-secondary">
                <th class="fw-normal">Tipo de solicitud</th>
                <th class="fw-normal">RNPA de la embarcación</th>
                <th class="fw-normal">Nombre de la Embarcación</th>
                <th class="fw-normal">Matricula</th>
              </tr>
            </thead>
            <tbody>
              <tr>
               <td class="fw-bold">Solicitud</td>
               <td class="fw-bold">09817162</td>
               <td class="fw-bold">CAMILA</td>
               <td class="fw-bold">00056549</td>
              
              </tr>
             
            </tbody>
            <thead>
            <tr class="table-secondary">
            <th class="fw-normal">Puerto Base</th>
            <th class="fw-normal">RNPA del propietario</th>
            <th class="fw-normal">Razón Social</th>
            <th class="fw-normal">Tipo de Falla</th>
            </tr>
          </thead>
          <tbody>
            <tr>
               <td class="fw-bold">Sinaloa</td>
               <td class="fw-bold">89111262</td>
               <td class="fw-bold">EMPRESA</td>
               <td class="fw-bold">Falla</td>
            
            </tr>
           
          </tbody>
          </table>
          <div class="row mt-5">
          <div class="col"></div>
             <div class="col text-center">
                <button type="button" class="btn btn-outline-secondary mb-1 w-100">Cancelar</button>
             </div>
             <div class="col text-center">
               <button type="button" class="btn btn-outline-danger mb-1 w-100" id="generarFolio">Generar Folio</button>
             </div>
             <div class="col"></div>
             
           
        
          </div>
          
            </div>


               </div>
            </div>
         </div>`;
  });
});
