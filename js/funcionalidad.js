//Función ajax con promesas
function devolverfuncionalidadAjaxPromesa() {

    crearformoculto('form_generico', '');
    insertacampo('form_generico', 'controlador', 'funcionalidad');
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
                resolve(res);
            }
        })
            .fail(function (jqXHR) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function devolverfuncionalidadajax() {

    var idioma = getCookie('lang');

    await devolverfuncionalidadAjaxPromesa()
        .then((res) => {

            getListfuncionalidad(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    document.getElementById('form_generico').remove();
}

function getListfuncionalidad(listafuncionalidad) {

    $("#id_datosfuncionalidad").html('');

    for (let funcionalidad of listafuncionalidad) {

        datosfila = "'" + funcionalidad.id_funcionalidad + "',"
            + "'" + funcionalidad.nombre_funcionalidad + "',"
            + "'" + funcionalidad.descrip_funcionalidad + "'";

        lineatabla = '<tr><td>'
            + funcionalidad['id_funcionalidad'] + '</td><td>'
            + funcionalidad['nombre_funcionalidad'] + '</td><td>'
            + funcionalidad['descrip_funcionalidad'] + '</td>';

        botonedit = '<td><img class="titulo_edit" src="../images/edit4.png" onclick="crearformEDITfuncionalidad(' + datosfila + ');" width="50" height="50"></td>';
        botondelete = '<td><img class="titulo_delete" src="../images/delete4.png" width="50" height="50" onclick="crearformDELETEfuncionalidad(' + datosfila + ');"></td>';
        botonshowcurrent = '<td><img class="titulo_showcurrent" src="../images/detail4.png" width="50" height="50" onclick="crearformSHOWCURRENTfuncionalidad(' + datosfila + ')";></td>';

        lineatabla += botonedit + botondelete + botonshowcurrent + "</tr>";

        $("#id_datosfuncionalidad").append(lineatabla);
    }

}

//Función ajax con promesas
function funcionalidadADDAjaxPromesa() {

    insertacampo('id_form_funcionalidad', 'controlador', 'funcionalidad');
    insertacampo('id_form_funcionalidad', 'action', 'ADD');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_funcionalidad").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            } else {
                resolve(res);
            }
        })
            .fail(function (jqXHR) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}








async function ADDfuncionalidadajax() {

    var idioma = getCookie('lang');

    await funcionalidadADDAjaxPromesa()
        .then((res) => {

            if (res.code == 'SQL_OK') {
                res.code = 'add_funcionalidad_OK';
            }
            ;
            devolverfuncionalidadajax();
            mensajeactionOK(res.code);
            //
            //window.location.href = "gestionfuncionalidad.html";
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformfuncionalidad();
}

function crearformADDfuncionalidad() {
    // resetear el formulario
    resetearformfuncionalidad();
    document.getElementById('id_box').style.display = 'none';
    // se rellena el action del formulario
    document.getElementById('id_form_funcionalidad').action = 'javascript:ADDfuncionalidadajax()';
    //document.getElementById('id_form_funcionalidad').onblur = add_funcionalidad;

    // se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformfuncionalidad())
    //document.getElementById('id_dni').onblur = comprobar_dni;
    //document.getElementById('id_dni').value = '';


    // se coloca el onblur del funcionalidad y se pone a vacio el valor (o podriamos hacerlo en el resetearformfuncionalidad())
    /*document.getElementById('id_usuario').onblur = comprobar_usuario;
    document.getElementById('id_usuario').value = '';*/

    // se invoca una función que crea el select de funcionalidades desde datos del back
    //pintarselectfuncionalidadesAjax(false, false,'');

    // se crea un button submit para el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_funcionalidad").append(accionsubmit);

    // se coloca la imagen para el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_funcionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/add4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    document.getElementById('id_caja_formulario_funcionalidad').style.display = 'block';

}

///////EDIT////////////////
function crearformEDITfuncionalidad(
    id_funcionalidad, nombre_funcionalidad, descrip_funcionalidad
) {

    // resetear al formulario
    resetearformfuncionalidad();
    document.getElementById('id_box').style.display = 'none';
    // se crea el action del formulario
    $("#id_form_funcionalidad").attr('action', 'javascript:EDITfuncionalidadajax()');
    //$("#id_form_funcionalidad").on('submit', edit_usuario);

    // se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
    // se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
    $("#id_funcionalidad").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_funcionalidad").val(id_funcionalidad);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_funcionalidad").val(nombre_funcionalidad);
    $("#descrip_funcionalidad").val(descrip_funcionalidad);

    // se invoca una funcion para pintar el select de funcionalidades con datos del back
    //pintarselectfuncionalidadesAjax(false, false, funcionalidad);

    // se crea un button submit
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_funcionalidad").append(accionsubmit);

    // se coloca una imagen para el button submit en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_funcionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/edit4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    $("#id_caja_formulario_funcionalidad").attr('style', 'display: block');
}


//Función ajax con promesas
function funcionalidadEDITAjaxPromesa() {

    insertacampo('id_form_funcionalidad', 'controlador', 'funcionalidad');
    insertacampo('id_form_funcionalidad', 'action', 'EDIT');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_funcionalidad").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            } else {
                resolve(res);
            }
        })
            .fail(function (jqXHR) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function EDITfuncionalidadajax() {

    var idioma = getCookie('lang');

    await funcionalidadEDITAjaxPromesa()
        .then((res) => {

            if (res.code == 'SQL_OK') {
                res.code = 'edit_funcionalidad_OK';
            }
            ;
            devolverfuncionalidadajax();
            mensajeactionOK(res.code);
            //
            //window.location.href = "gestionfuncionalidad.html";
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();
    //document.getElementById('id_form_funcionalidad').reset();
    resetearformfuncionalidad();
    document.getElementById('contfuncionalidadador')
    //document.getElementById('id_imagen_enviar_form').remove();
}


///////////////////DELETE////////////////

function crearformDELETEfuncionalidad(
    id_funcionalidad, nombre_funcionalidad, descrip_funcionalidad
){

    resetearformfuncionalidad();

    $("#id_form_funcionalidad").attr('action','javascript:DELETEfuncionalidadajax()');

    $("#id_funcionalidad").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_funcionalidad").val(id_funcionalidad);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_funcionalidad").attr('readonly', true);
    $("#nombre_funcionalidad").val(nombre_funcionalidad);
    $("#descrip_funcionalidad").attr('readonly', true);
    $("#descrip_funcionalidad").val(descrip_funcionalidad);

    // se crea un button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_funcionalidad").append(accionsubmit);

    // se coloca la imagen en el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_funcionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src= "./images/delete4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_funcionalidad").attr('style', 'display: block');
}

//Función ajax con promesas
function funcionalidadDELETEAjaxPromesa(){

    insertacampo('id_form_funcionalidad','controlador', 'funcionalidad');
    insertacampo('id_form_funcionalidad','action', 'DELETE');

    return new Promise(function(resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_funcionalidad").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            }
            else{
                resolve(res);
            }
        })
            .fail( function( jqXHR ) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function DELETEfuncionalidadajax() {

    var idioma = getCookie('lang');

    await funcionalidadDELETEAjaxPromesa()
        .then((res) => {

            if (res.code == 'SQL_OK'){
                res.code = 'delete_funcionalidad_OK';
            }
            mensajeactionOK(res.code);
            devolverfuncionalidadajax();
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformfuncionalidad();

}

/////////////SHOW CURRENT///////////
function cerrarSHOWCURRENT(){
    $("#id_caja_formulario_funcionalidad").attr('style', 'display: none');
    $("#id_imagen_enviar_form").attr('style', 'display: none');
}
function crearformSHOWCURRENTfuncionalidad(
    id_funcionalidad, nombre_funcionalidad, descrip_funcionalidad

){

    // reseteo el formulario
    resetearformfuncionalidad();

    $("#id_form_funcionalidad").attr('action','javascript:cerrarSHOWCURRENT()');

    $("#id_funcionalidad").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_funcionalidad").val(id_funcionalidad);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_funcionalidad").attr('readonly', true);
    $("#nombre_funcionalidad").val(nombre_funcionalidad);
    $("#descrip_funcionalidad").attr('readonly', true);
    $("#descrip_funcionalidad").val(descrip_funcionalidad);


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_funcionalidad").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_funcionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src= "./images/detail4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_funcionalidad").attr('style', 'display: block');


}



// resetearformfuncionalidad()
// esta función se usa para inicializar el formulario y
// siempre este de la misma manera antes de entrar
// en las funciones que construyen los formularios de acciones
//
function resetearformfuncionalidad() {
    document.getElementById('id_box').style.display = 'block';

    // quitar el readonly de los atributos
    $("#id_funcionalidad").attr('readonly', false);
    $("#id_funcionalidad").val('');
    $("#id_funcionalidad").on('blur', false);
    $("#nombre_funcionalidad").attr('readonly', false);
    $("#nombre_funcionalidad").val('');
    $("#nombre_funcionalidad").on('blur', false);
    $("#descrip_funcionalidad").attr('readonly', false);
    $("#descrip_funcionalidad").val('');
    $("#descrip_funcionalidad").on('blur', false);

    // eliminar el boton de submit de formulario
    $("#id_boton_buscar_funcionalidad").remove();

    // eliminar el button para submit el formulario de search
    $("#id_accionsubmit").remove();

    $("#contfuncionalidadador").remove();
    $("#action").remove();

    // se pone invisible el formulario
    $("#id_caja_formulario_funcionalidad").attr('style', 'display: none');

    setLang();

}


/////////////////SEARCH/////////////
function crearformSEARCHfuncionalidad(){

    // reseteo el formulario
    resetearformfuncionalidad();

    // creo la accion para el formulario y el onsubmit
    $("#id_form_funcionalidad").attr('action','javascript:SEARCHfuncionalidadAjax()');
    //$("#id_form_funcionalidad").on('submit', search_funcionalidad);

    // pongo el campo de dni editable y le asocio la funcion para el onblur
    //$("#id_funcionalidad").attr('readonly', false);
    //$("#id_dni").blur(comprobar_dni_search);

    // pongo el campo de funcionalidad editable y le asocio la funcion para el onblur
    /*$("#id_funcionalidad").attr('readonly',false)
    $("#id_funcionalidad").blur(comprobar_funcionalidad_search);*/


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_funcionalidad").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_funcionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src= "./images/search4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se pone visible el formulario
    $("#id_caja_formulario_funcionalidad").attr('style', 'display: block');
}

//Función ajax con promesas
function funcionalidadSEARCHAjaxPromesa(){

    insertacampo('id_form_funcionalidad','contfuncionalidadador', 'funcionalidad');
    insertacampo('id_form_funcionalidad','action', 'SEARCH');

    return new Promise(function(resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_funcionalidad").serialize(),
        }).done(res => {
            if (res.ok != true) {
                reject(res);
            }
            else{
                resolve(res);
            }
        })
            .fail( function( jqXHR ) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function SEARCHfuncionalidadAjax() {
    var idioma = getCookie('lang');

    await funcionalidadSEARCHAjaxPromesa()
        .then((res) => {
            getListfuncionalidad(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformfuncionalidad();

}


//////////CHECKS/////////////
function comprobar_nombre() {
    const resp = checkRolName(document.getElementById('nombre_funcionalidad').value);
    if (resp) {
        mensajeOK('nombre_rol');
        return true;
    } else if (resp === undefined) {
        mensajeKO('nombre_rol', 'tamano_nombre_rol_mal')
    } else {
        mensajeKO('nombre_rol', 'formato_nombre_rol_mal')
    }
    return false;
}

function comprobar_descripcion() {
    const resp = checkRolDescription(document.getElementById('descrip_funcionalidad').value);
    if (resp) {
        mensajeOK('descrip_rol');
        return true;
    } else if (resp === undefined) {
        mensajeKO('descrip_rol', 'tamano_descrip_rol_mal')
    } else {
        mensajeKO('descrip_rol', 'formato_descrip_rol_mal')
    }
    return false;
}









































