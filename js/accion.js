//Función ajax con promesas
function devolveraccionAjaxPromesa() {

    crearformoculto('form_generico', '');
    insertacampo('form_generico', 'controlador', 'accion');
    insertacampo('form_generico', 'action', 'SEARCH');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#form_generico").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            } else {
                closeModal();
                resolve(res);
            }
        })
            .fail(function (jqXHR) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function devolveraccionajax() {

    var idioma = getCookie('lang');

    await devolveraccionAjaxPromesa()
        .then((res) => {

            getListaccion(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    document.getElementById('form_generico').remove();
}

function getListaccion(listaaccion) {

    $("#id_datosaccion").html('');

    for (let accion of listaaccion) {

        datosfila = "'" + accion.id_accion + "',"
            + "'" + accion.nombre_accion + "',"
            + "'" + accion.descrip_accion + "'";

        lineatabla = '<tr><td>'
            + accion['id_accion'] + '</td><td>'
            + accion['nombre_accion'] + '</td><td>'
            + accion['descrip_accion'] + '</td>';

        botonedit = '<td><img class="titulo_edit" src="../images/edit4.png" onclick="crearformEDITaccion(' + datosfila + ');" width="50" height="50"></td>';
        botondelete = '<td><img class="titulo_delete" src="../images/delete4.png" width="50" height="50" onclick="crearformDELETEaccion(' + datosfila + ');"></td>';
        botonshowcurrent = '<td><img class="titulo_showcurrent" src="../images/detail4.png" width="50" height="50" onclick="crearformSHOWCURRENTaccion(' + datosfila + ')";></td>';

        lineatabla += botonedit + botondelete + botonshowcurrent + "</tr>";

        $("#id_datosaccion").append(lineatabla);
    }

}

//Función ajax con promesas
function accionADDAjaxPromesa() {

    insertacampo('id_form_accion', 'controlador', 'accion');
    insertacampo('id_form_accion', 'action', 'ADD');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_accion").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            } else {
                closeModal()
                resolve(res);
            }
        })
            .fail(function (jqXHR) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}








async function ADDaccionajax() {
if(!comprobar_descripcion() || !comprobar_nombre()){
    return false
}
    var idioma = getCookie('lang');

    await accionADDAjaxPromesa()
        .then((res) => {

            if (res.code == 'SQL_OK') {
                closeModal();
                res.code = 'add_accion_OK';
            }
            ;
            devolveraccionajax();
            mensajeactionOK(res.code);
            //
            //window.location.href = "gestionaccion.html";
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformaccion();
}

function crearformADDaccion() {
    // resetear el formulario
    resetearformaccion();
    document.getElementById('id_box').style.display = 'none';

    // se rellena el action del formulario
    document.getElementById('id_form_accion').action = 'javascript:ADDaccionajax()';
    //document.getElementById('id_form_accion').onblur = add_accion;

    // se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformaccion())
    //document.getElementById('id_dni').onblur = comprobar_dni;
    //document.getElementById('id_dni').value = '';


    // se coloca el onblur del accion y se pone a vacio el valor (o podriamos hacerlo en el resetearformaccion())
    /*document.getElementById('id_usuario').onblur = comprobar_usuario;
    document.getElementById('id_usuario').value = '';*/

    // se invoca una función que crea el select de acciones desde datos del back
    //pintarselectaccionesAjax(false, false,'');

    // se crea un button submit para el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_accion").append(accionsubmit);

    // se coloca la imagen para el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_accion";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/add4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    document.getElementById('id_caja_formulario_accion').style.display = 'block';
openModal();
}

///////EDIT////////////////
function crearformEDITaccion(
    id_accion, nombre_accion, descrip_accion
) {
    // resetear al formulario
    resetearformaccion();
    document.getElementById('id_box').style.display = 'none';

    // se crea el action del formulario
    $("#id_form_accion").attr('action', 'javascript:EDITaccionajax()');
    //$("#id_form_accion").on('submit', edit_usuario);

    // se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
    // se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
    $("#id_accion").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_accion").val(id_accion);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_accion").val(nombre_accion);
    $("#descrip_accion").val(descrip_accion);

    // se invoca una funcion para pintar el select de acciones con datos del back
    //pintarselectaccionesAjax(false, false, accion);

    // se crea un button submit
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_accion").append(accionsubmit);

    // se coloca una imagen para el button submit en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_accion";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/edit4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    $("#id_caja_formulario_accion").attr('style', 'display: block');
    openModal()
}


//Función ajax con promesas
function accionEDITAjaxPromesa() {

    insertacampo('id_form_accion', 'controlador', 'accion');
    insertacampo('id_form_accion', 'action', 'EDIT');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_accion").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            } else {
                closeModal();
                resolve(res);
            }
        })
            .fail(function (jqXHR) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function EDITaccionajax() {
    if(!comprobar_descripcion() || !comprobar_nombre()){
        return false;
    }
    var idioma = getCookie('lang');

    await accionEDITAjaxPromesa()
        .then((res) => {

            if (res.code == 'SQL_OK') {
                res.code = 'edit_accion_OK';
            }
            ;
            devolveraccionajax();
            mensajeactionOK(res.code);
            //
            //window.location.href = "gestionaccion.html";
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();
    //document.getElementById('id_form_accion').reset();
    resetearformaccion();
    document.getElementById('controlador')
    //document.getElementById('id_imagen_enviar_form').remove();
}


///////////////////DELETE////////////////

function crearformDELETEaccion(
    id_accion, nombre_accion, descrip_accion
){

    resetearformaccion();

    $("#id_form_accion").attr('action','javascript:DELETEaccionajax()');

    $("#id_accion").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_accion").val(id_accion);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_accion").attr('readonly', true);
    $("#nombre_accion").val(nombre_accion);
    $("#descrip_accion").attr('readonly', true);
    $("#descrip_accion").val(descrip_accion);

    // se crea un button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_accion").append(accionsubmit);

    // se coloca la imagen en el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_accion";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src= "./images/delete4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_accion").attr('style', 'display: block');
    openModal()
}

//Función ajax con promesas
function accionDELETEAjaxPromesa(){

    insertacampo('id_form_accion','controlador', 'accion');
    insertacampo('id_form_accion','action', 'DELETE');

    return new Promise(function(resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_accion").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            }
            else{
                closeModal();
                resolve(res);
            }
        })
            .fail( function( jqXHR ) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function DELETEaccionajax() {

    var idioma = getCookie('lang');

    await accionDELETEAjaxPromesa()
        .then((res) => {

            if (res.code == 'SQL_OK'){
                res.code = 'delete_accion_OK';
            }
            mensajeactionOK(res.code);
            devolveraccionajax();
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformaccion();

}

/////////////SHOW CURRENT///////////
function cerrarSHOWCURRENT(){
    $("#id_caja_formulario_accion").attr('style', 'display: none');
    $("#id_imagen_enviar_form").attr('style', 'display: none');
}
function crearformSHOWCURRENTaccion(
    id_accion, nombre_accion, descrip_accion

){

    // reseteo el formulario
    resetearformaccion();

    $("#id_form_accion").attr('action','javascript:cerrarSHOWCURRENT()');

    $("#id_accion").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_accion").val(id_accion);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_accion").attr('readonly', true);
    $("#nombre_accion").val(nombre_accion);
    $("#descrip_accion").attr('readonly', true);
    $("#descrip_accion").val(descrip_accion);


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    accionsubmit.addEventListener("click", function (){
        closeModal()
    })
    $("#id_form_accion").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_accion";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src= "./images/detail4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_accion").attr('style', 'display: block');
    openModal()


}



// resetearformaccion()
// esta función se usa para inicializar el formulario y
// siempre este de la misma manera antes de entrar
// en las funciones que construyen los formularios de acciones
//
function resetearformaccion() {
    document.getElementById('id_box').style.display = 'block';
    // quitar el readonly de los atributos
    $("#id_accion").attr('readonly', false);
    $("#id_accion").val('');
    $("#id_accion").on('blur', false);
    $("#nombre_accion").attr('readonly', false);
    $("#nombre_accion").val('');
    $("#nombre_accion").on('blur', false);
    $("#descrip_accion").attr('readonly', false);
    $("#descrip_accion").val('');
    $("#descrip_accion").on('blur', false);

    // eliminar el boton de submit de formulario
    $("#id_boton_buscar_accion").remove();

    // eliminar el button para submit el formulario de search
    $("#id_accionsubmit").remove();

    $("#controlador").remove();
    $("#action").remove();

    // se pone invisible el formulario
    $("#id_caja_formulario_accion").attr('style', 'display: none');

    setLang();

}


/////////////////SEARCH/////////////
function crearformSEARCHaccion(){

    // reseteo el formulario
    resetearformaccion();

    // creo la accion para el formulario y el onsubmit
    $("#id_form_accion").attr('action','javascript:SEARCHaccionAjax()');
    //$("#id_form_accion").on('submit', search_accion);

    // pongo el campo de dni editable y le asocio la funcion para el onblur
    //$("#id_accion").attr('readonly', false);
    //$("#id_dni").blur(comprobar_dni_search);

    // pongo el campo de accion editable y le asocio la funcion para el onblur
    /*$("#id_accion").attr('readonly',false)
    $("#id_accion").blur(comprobar_accion_search);*/


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_accion").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_accion";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src= "./images/search4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se pone visible el formulario
    $("#id_caja_formulario_accion").attr('style', 'display: block');
    openModal()
}

//Función ajax con promesas
function accionSEARCHAjaxPromesa(){

    insertacampo('id_form_accion','controlador', 'accion');
    insertacampo('id_form_accion','action', 'SEARCH');

    return new Promise(function(resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_accion").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            }
            else{
                closeModal();
                resolve(res);
            }
        })
            .fail( function( jqXHR ) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function SEARCHaccionAjax() {
    var idioma = getCookie('lang');

    await accionSEARCHAjaxPromesa()
        .then((res) => {
            getListaccion(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformaccion();

}


//////////CHECKS/////////////

function comprobar_nombre() {
    const resp = checkRolName(document.getElementById('nombre_accion').value);
    if (resp) {
        mensajeOK('nombre_accion');
        return true;
    } else if (resp === undefined) {
        mensajeKO('nombre_accion', 'tamano_nombre_rol_mal')
    } else {
        mensajeKO('nombre_accion', 'formato_nombre_rol_mal')
    }
    return false;
}

function comprobar_descripcion() {
    const resp = checkRolDescription(document.getElementById('descrip_accion').value);
    if (resp) {
        mensajeOK('descrip_accion');
        return true;
    } else if (resp === undefined) {
        mensajeKO('descrip_accion', 'tamano_descrip_rol_mal')
    } else {
        mensajeKO('descrip_accion', 'formato_descrip_rol_mal')
    }
    return false;
}








































