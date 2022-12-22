function check_form() {
    return comprobar_nombre() && comprobar_descripcion();

}

//Función ajax con promesas
function devolverrolAjaxPromesa() {

    crearformoculto('form_generico', '');
    insertacampo('form_generico', 'controlador', 'rol');
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

async function devolverrolajax() {

    var idioma = getCookie('lang');

    await devolverrolAjaxPromesa()
        .then((res) => {

            getListrol(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    document.getElementById('form_generico').remove();
}

function getListrol(listarol) {

    $("#id_datosrol").html('');

    for (let rol of listarol) {

        datosfila = "'" + rol.id_rol + "',"
            + "'" + rol.nombre_rol + "',"
            + "'" + rol.descrip_rol + "'";

        lineatabla = '<tr><td>'
            + rol['id_rol'] + '</td><td>'
            + rol['nombre_rol'] + '</td><td>'
            + rol['descrip_rol'] + '</td>';

        botonedit = '<td><img class="titulo_edit" src="../images/edit4.png" onclick="crearformEDITrol(' + datosfila + ');" width="50" height="50"></td>';
        botondelete = '<td><img class="titulo_delete" src="../images/delete4.png" width="50" height="50" onclick="crearformDELETErol(' + datosfila + ');"></td>';
        botonshowcurrent = '<td><img class="titulo_showcurrent" src="../images/detail4.png" width="50" height="50" onclick="crearformSHOWCURRENTrol(' + datosfila + ')";></td>';

        lineatabla += botonedit + botondelete + botonshowcurrent + "</tr>";

        $("#id_datosrol").append(lineatabla);
    }

}

//Función ajax con promesas
function rolADDAjaxPromesa() {

    insertacampo('id_form_rol', 'controlador', 'rol');
    insertacampo('id_form_rol', 'action', 'ADD');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_rol").serialize(),
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


async function ADDrolajax() {
    if (check_form()) {
        var idioma = getCookie('lang');

        await rolADDAjaxPromesa()
            .then((res) => {

                if (res.code === 'SQL_OK') {
                    res.code = 'add_rol_OK';
                }

                devolverrolajax();
                mensajeactionOK(res.code);
                //
                //window.location.href = "gestionrol.html";
            })
            .catch((res) => {
                mensajeFAIL(res.code);
            });

        setLang();

        resetearformrol();
    }
}

function crearformADDrol() {
    // resetear el formulario
    resetearformrol();
    document.getElementById('id_box').style.display = 'none';

    // se rellena el action del formulario
    document.getElementById('id_form_rol').action = 'javascript:ADDrolajax()';
    //document.getElementById('id_form_rol').onblur = add_rol;

    // se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformrol())
    //document.getElementById('id_dni').onblur = comprobar_dni;
    //document.getElementById('id_dni').value = '';


    // se coloca el onblur del rol y se pone a vacio el valor (o podriamos hacerlo en el resetearformrol())
    /*document.getElementById('id_usuario').onblur = comprobar_usuario;
    document.getElementById('id_usuario').value = '';*/

    // se invoca una función que crea el select de roles desde datos del back
    //pintarselectrolesAjax(false, false,'');

    // se crea un button submit para el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_rol").append(accionsubmit);

    // se coloca la imagen para el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rol";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/add4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    document.getElementById('id_caja_formulario_rol').style.display = 'block';

}

///////EDIT////////////////
function crearformEDITrol(
    id_rol, nombre_rol, descrip_rol
) {

    // resetear al formulario
    resetearformrol();
    document.getElementById('id_box').style.display = 'none';

    // se crea el action del formulario
    $("#id_form_rol").attr('action', 'javascript:EDITrolajax()');
    //$("#id_form_rol").on('submit', edit_usuario);

    // se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
    // se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
    $("#id_rol").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_rol").val(id_rol);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_rol").val(nombre_rol);
    $("#descrip_rol").val(descrip_rol);

    // se invoca una funcion para pintar el select de roles con datos del back
    //pintarselectrolesAjax(false, false, rol);

    // se crea un button submit
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_rol").append(accionsubmit);

    // se coloca una imagen para el button submit en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rol";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/edit4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    $("#id_caja_formulario_rol").attr('style', 'display: block');

}


//Función ajax con promesas
function rolEDITAjaxPromesa() {

    insertacampo('id_form_rol', 'controlador', 'rol');
    insertacampo('id_form_rol', 'action', 'EDIT');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_rol").serialize(),
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

async function EDITrolajax() {
    if (check_form()) {
        var idioma = getCookie('lang');

        await rolEDITAjaxPromesa()
            .then((res) => {

                if (res.code == 'SQL_OK') {
                    res.code = 'edit_rol_OK';
                }
                ;
                devolverrolajax();
                mensajeactionOK(res.code);
                //
                //window.location.href = "gestionrol.html";
            })
            .catch((res) => {
                mensajeFAIL(res.code);
            });

        setLang();
        //document.getElementById('id_form_rol').reset();
        resetearformrol();
        document.getElementById('controlador')
        //document.getElementById('id_imagen_enviar_form').remove();
    }
}


///////////////////DELETE////////////////

function crearformDELETErol(
    id_rol, nombre_rol, descrip_rol
) {

    resetearformrol();

    $("#id_form_rol").attr('action', 'javascript:DELETErolajax()');

    $("#id_rol").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_rol").val(id_rol);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_rol").attr('readonly', true);
    $("#nombre_rol").val(nombre_rol);
    $("#descrip_rol").attr('readonly', true);
    $("#descrip_rol").val(descrip_rol);

    // se crea un button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_rol").append(accionsubmit);

    // se coloca la imagen en el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rol";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/delete4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_rol").attr('style', 'display: block');
}

//Función ajax con promesas
function rolDELETEAjaxPromesa() {

    insertacampo('id_form_rol', 'controlador', 'rol');
    insertacampo('id_form_rol', 'action', 'DELETE');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_rol").serialize(),
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

async function DELETErolajax() {

    var idioma = getCookie('lang');

    await rolDELETEAjaxPromesa()
        .then((res) => {

            if (res.code == 'SQL_OK') {
                res.code = 'delete_rol_OK';
            }
            mensajeactionOK(res.code);
            devolverrolajax();
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformrol();

}

/////////////SHOW CURRENT///////////
function cerrarSHOWCURRENT() {
    $("#id_caja_formulario_rol").attr('style', 'display: none');
    $("#id_imagen_enviar_form").attr('style', 'display: none');
}

function crearformSHOWCURRENTrol(
    id_rol, nombre_rol, descrip_rol
) {

    // reseteo el formulario
    resetearformrol();

    $("#id_form_rol").attr('action', 'javascript:cerrarSHOWCURRENT()');

    $("#id_rol").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_rol").val(id_rol);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_rol").attr('readonly', true);
    $("#nombre_rol").val(nombre_rol);
    $("#descrip_rol").attr('readonly', true);
    $("#descrip_rol").val(descrip_rol);


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_rol").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rol";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/detail4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_rol").attr('style', 'display: block');


}


// resetearformrol()
// esta función se usa para inicializar el formulario y
// siempre este de la misma manera antes de entrar
// en las funciones que construyen los formularios de acciones
//
function resetearformrol() {
    document.getElementById('id_box').style.display = 'block';
    // quitar el readonly de los atributos
    $("#id_rol").attr('readonly', false);
    $("#id_rol").val('');
    $("#id_rol").on('blur', false);
    $("#nombre_rol").attr('readonly', false);
    $("#nombre_rol").val('');
    $("#nombre_rol").on('blur', false);
    $("#descrip_rol").attr('readonly', false);
    $("#descrip_rol").val('');
    $("#descrip_rol").on('blur', false);

    // eliminar el boton de submit de formulario
    $("#id_boton_buscar_rol").remove();

    // eliminar el button para submit el formulario de search
    $("#id_accionsubmit").remove();

    $("#controlador").remove();
    $("#action").remove();

    // se pone invisible el formulario
    $("#id_caja_formulario_rol").attr('style', 'display: none');

    setLang();

}


/////////////////SEARCH/////////////
function crearformSEARCHrol() {

    // reseteo el formulario
    resetearformrol();

    // creo la accion para el formulario y el onsubmit
    $("#id_form_rol").attr('action', 'javascript:SEARCHrolAjax()');
    //$("#id_form_rol").on('submit', search_rol);

    // pongo el campo de dni editable y le asocio la funcion para el onblur
    //$("#id_rol").attr('readonly', false);
    //$("#id_dni").blur(comprobar_dni_search);

    // pongo el campo de rol editable y le asocio la funcion para el onblur
    /*$("#id_rol").attr('readonly',false)
    $("#id_rol").blur(comprobar_rol_search);*/


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_rol").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rol";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/search4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se pone visible el formulario
    $("#id_caja_formulario_rol").attr('style', 'display: block');
}

//Función ajax con promesas
function rolSEARCHAjaxPromesa() {

    insertacampo('id_form_rol', 'controlador', 'rol');
    insertacampo('id_form_rol', 'action', 'SEARCH');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_rol").serialize(),
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

async function SEARCHrolAjax() {
    var idioma = getCookie('lang');

    await rolSEARCHAjaxPromesa()
        .then((res) => {
            getListrol(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformrol();

}


//////////CHECKS/////////////

function comprobar_nombre() {
    const resp = checkRolName(document.getElementById('nombre_rol').value);
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
    const resp = checkRolDescription(document.getElementById('descrip_rol').value);
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


//Función ajax con promesas
function devolverrolesAjaxPromesa() {

    crearformoculto('form_generico', '');
    insertacampo('form_generico', 'controlador', 'rol');
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

async function devolverrolesAjax() {

    var idioma = getCookie('lang');

    await devolverrolesAjaxPromesa()
        .then((res) => {

            return (res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    document.getElementById('form_generico').remove();
}

//
// deshabilitado: true si se quiere que el campo select este no seleccionable
// convacio: true si se quiere que el select incorpore un vacio inicial
// rol: valor para colocar por defecto en el select
//
async function pintarselectrolesAjax(deshabilitado = false, convacio = false, rol = null) {

    var idioma = getCookie('lang');

    await devolverrolesAjaxPromesa()
        .then((res) => {

            let rol_select = crearselect(convacio, 'id_id_rol', 'id_rol', 'id_rol', 'nombre_rol', res.resource, rol);
            $("#caja_select_rol").append(rol_select);
            if (deshabilitado) {
                $("#id_id_rol:not(:selected)").attr('disabled', true);
            }

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    document.getElementById('form_generico').remove();
}