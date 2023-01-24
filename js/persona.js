function comprobar_form_persona() {
    return !!(comprobar_dni() &&
        comprobar_nombre() &&
        comprobar_apellido() &&
        comprobar_fechaNacimiento() &&
        comprobar_direccion() &&
        comprobar_telefono() &&
        comprobar_email() &&
        comprobar_foto());

}// devolverpersonas()
// funcion creada para devolver un array como el que recogeriamos de back al solicitar el contenido de la entidad persona


function devolverpersonas() {

    datospersonas = new Array();
    controlrol = 0;
    dnibase = '11111111';
    numeropersonas = 2;

    for (let i = 0; i < numeropersonas; i++) {

        persona = new Array();
        dnibase = String(Number(dnibase) + Number(23));
        persona['dni'] = dnibase + 'A';
        persona['nombre_persona'] = 'nombre persona' + i;
        persona['apellidos_persona'] = 'apellidos persona' + i;
        persona['fechaNacimiento_persona'] = '01/' + '01/' + String(Number(2000) + Number(i));
        persona['direccion_persona'] = 'Calle de la persona Nº ' + i + ' 32004 Ourense';
        persona['telefono_persona'] = 988387000 + i;
        persona['email_persona'] = 'persona' + i + '@alumnos.uvigo.es';
        persona['foto_persona'] = './fotos/foto' + i + '.png';

        datospersonas[i] = persona;
    }

    return datospersonas;

}

//Función ajax con promesas
function devolverpersonasAjaxPromesa() {

    crearformoculto('form_generico', '');
    insertacampo('form_generico', 'controlador', 'persona');
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
                closeModal()
                resolve(res);
            }
        })
            .fail(function (jqXHR) {
                mensajeHTTPFAIL(jqXHR.status);
            });
    });
}

async function devolverpersonasajax() {

    var idioma = getCookie('lang');

    await devolverpersonasAjaxPromesa()
        .then((res) => {

            getListPersonas(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    document.getElementById('form_generico').remove();

}

function getListPersonas(listapersonas) {

    $("#id_datospersonas").html('');

    for (let persona of listapersonas) {

        datosfila = "'" + persona.dni + "',"
            + "'" + persona.nombre_persona + "',"
            + "'" + persona.apellidos_persona + "',"
            + "'" + persona.fechaNacimiento_persona + "',"
            + "'" + persona.direccion_persona + "',"
            + "'" + persona.telefono_persona + "',"
            + "'" + persona.email_persona + "',"
            + "'" + persona.foto_persona
            + "'";

        lineatabla = '<tr><td>' + persona['dni'] + '</td><td>' + persona['nombre_persona'] + '</td><td>' + persona['apellidos_persona'] + '</td><td>' + persona['email_persona'] + '</td><td>' + persona['foto_persona'] + "</td>";
        botonedit = '<td><img class="titulo_edit" src="../images/edit4.png" onclick="crearformEDITpersona(' + datosfila + ');" width="50" height="50"></td>';
        botondelete = '<td><img class="titulo_delete" src="../images/delete4.png" width="50" height="50" onclick="crearformDELETEpersona(' + datosfila + ');"></td>';
        botonshowcurrent = '<td><img class="titulo_showcurrent" src="../images/detail4.png" width="50" height="50" onclick="crearformSHOWCURRENTpersona(' + datosfila + ')";></td>';

        lineatabla += botonedit + botondelete + botonshowcurrent + "</tr>";

        $("#id_datospersonas").append(lineatabla);
    }

}

//Función ajax con promesas
function personaADDAjaxPromesa() {

    insertacampo('id_form_persona', 'controlador', 'persona');
    insertacampo('id_form_persona', 'action', 'ADD');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_persona").serialize(),
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

async function ADDpersonaajax() {
    if (comprobar_form_persona()) {
        var idioma = getCookie('lang');

        await personaADDAjaxPromesa()
            .then((res) => {

                if (res.code == 'SQL_OK') {
                    res.code = 'add_persona_OK';
                }
                ;
                devolverpersonasajax();
                mensajeactionOK(res.code);
                //
                //window.location.href = "gestionpersona.html";
            })
            .catch((res) => {
                mensajeFAIL(res.code);
            });

        setLang();

        resetearformpersona();
    }
}

function crearformADDpersona() {
    // resetear el formulario
    resetearformpersona();

    // se rellena el action del formulario
    document.getElementById('id_form_persona').action = 'javascript:ADDpersonaajax()';
    //document.getElementById('id_form_persona').onblur = add_persona;

    // se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformpersona())
    document.getElementById('id_dni').onblur = comprobar_dni;
    //document.getElementById('id_dni').value = '';


    // se coloca el onblur del persona y se pone a vacio el valor (o podriamos hacerlo en el resetearformpersona())
    /*document.getElementById('id_usuario').onblur = comprobar_usuario;
    document.getElementById('id_usuario').value = '';*/

    // se invoca una función que crea el select de roles desde datos del back
    //pintarselectrolesAjax(false, false,'');

    // se crea un button submit para el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_persona").append(accionsubmit);

    // se coloca la imagen para el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_persona";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/add4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    document.getElementById('id_caja_formulario_persona').style.display = 'block';
    openModal()
}

///////EDIT////////////////
function crearformEDITpersona(
    dni,
    nombre_persona,
    apellidos_persona,
    fechaNacimiento_persona,
    direccion_persona,
    telefono_persona,
    email_persona,
    foto_persona
) {

    // resetear al formulario
    resetearformpersona();

    // se crea el action del formulario
    $("#id_form_persona").attr('action', 'javascript:EDITpersonaajax()');
    //$("#id_form_persona").on('submit', edit_usuario);

    // se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
    // se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
    $("#id_dni").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_dni").val(dni);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_persona").val(nombre_persona);
    $("#apellidos_persona").val(apellidos_persona);
    $("#fechaNacimiento_persona").val(fechaNacimiento_persona);
    $("#direccion_persona").val(direccion_persona);
    $("#telefono_persona").val(telefono_persona);
    $("#email_persona").val(email_persona);
    $("#foto_persona").val(foto_persona);

    // se invoca una funcion para pintar el select de roles con datos del back
    //pintarselectrolesAjax(false, false, rol);

    // se crea un button submit
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_persona").append(accionsubmit);

    // se coloca una imagen para el button submit en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_persona";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/edit4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    $("#id_caja_formulario_persona").attr('style', 'display: block');
    openModal()
}


//Función ajax con promesas
function personaEDITAjaxPromesa() {

    insertacampo('id_form_persona', 'controlador', 'persona');
    insertacampo('id_form_persona', 'action', 'EDIT');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_persona").serialize(),
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

async function EDITpersonaajax() {
    if (comprobar_form_persona()) {
        var idioma = getCookie('lang');

        await personaEDITAjaxPromesa()
            .then((res) => {

                if (res.code == 'SQL_OK') {
                    res.code = 'edit_persona_OK';
                }
                ;
                devolverpersonasajax();
                mensajeactionOK(res.code);
                //
                //window.location.href = "gestionpersona.html";
            })
            .catch((res) => {
                mensajeFAIL(res.code);
            });

        setLang();
        //document.getElementById('id_form_persona').reset();
        resetearformpersona();
        document.getElementById('controlador')
        //document.getElementById('id_imagen_enviar_form').remove();
    }
}


///////////////////DELETE////////////////

function crearformDELETEpersona(
    dni,
    nombre_persona,
    apellidos_persona,
    fechaNacimiento_persona,
    direccion_persona,
    telefono_persona,
    email_persona,
    foto_persona
) {

    resetearformpersona();

    $("#id_form_persona").attr('action', 'javascript:DELETEpersonaajax()');

    $("#id_dni").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_dni").val(dni);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_persona").attr('readonly', true);
    $("#nombre_persona").val(nombre_persona);
    $("#apellidos_persona").attr('readonly', true);
    $("#apellidos_persona").val(apellidos_persona);
    $("#fechaNacimiento_persona").attr('readonly', true);
    $("#fechaNacimiento_persona").val(fechaNacimiento_persona);
    $("#direccion_persona").attr('readonly', true);
    $("#direccion_persona").val(direccion_persona);
    $("#telefono_persona").attr('readonly', true);
    $("#telefono_persona").val(telefono_persona);
    $("#email_persona").attr('readonly', true);
    $("#email_persona").val(email_persona);
    $("#foto_persona").attr('readonly', true);
    $("#foto_persona").val(foto_persona);


    // se crea un button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_persona").append(accionsubmit);

    // se coloca la imagen en el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_persona";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/delete4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_persona").attr('style', 'display: block');
    openModal()
}

//Función ajax con promesas
function personaDELETEAjaxPromesa() {

    insertacampo('id_form_persona', 'controlador', 'persona');
    insertacampo('id_form_persona', 'action', 'DELETE');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_persona").serialize(),
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

async function DELETEpersonaajax() {
    if (comprobar_form_persona()) {
        var idioma = getCookie('lang');

        await personaDELETEAjaxPromesa()
            .then((res) => {

                if (res.code == 'SQL_OK') {
                    closeModal()
                    res.code = 'delete_persona_OK';
                }
                mensajeactionOK(res.code);
                devolverpersonasajax();
            })
            .catch((res) => {
                mensajeFAIL(res.code);
            });

        setLang();

        resetearformpersona();
    }

}

/////////////SHOW CURRENT///////////
function cerrarSHOWCURRENT() {
    $("#id_caja_formulario_persona").attr('style', 'display: none');
    $("#id_imagen_enviar_form").attr('style', 'display: none');
}

function crearformSHOWCURRENTpersona(
    dni,
    nombre_persona,
    apellidos_persona,
    fechaNacimiento_persona,
    direccion_persona,
    telefono_persona,
    email_persona,
    foto_persona
) {

    // reseteo el formulario
    resetearformpersona();

    $("#id_form_persona").attr('action', 'javascript:cerrarSHOWCURRENT()');

    $("#id_dni").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_dni").val(dni);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#nombre_persona").attr('readonly', true);
    $("#nombre_persona").val(nombre_persona);
    $("#apellidos_persona").attr('readonly', true);
    $("#apellidos_persona").val(apellidos_persona);
    $("#fechaNacimiento_persona").attr('readonly', true);
    $("#fechaNacimiento_persona").val(fechaNacimiento_persona);
    $("#direccion_persona").attr('readonly', true);
    $("#direccion_persona").val(direccion_persona);
    $("#telefono_persona").attr('readonly', true);
    $("#telefono_persona").val(telefono_persona);
    $("#email_persona").attr('readonly', true);
    $("#email_persona").val(email_persona);
    $("#foto_persona").attr('readonly', true);
    $("#foto_persona").val(foto_persona);


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    accionsubmit.addEventListener("click", function (){
        closeModal()
    })
    $("#id_form_persona").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_persona";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/detail4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_persona").attr('style', 'display: block');

    openModal()
}


// resetearformpersona()
// esta función se usa para inicializar el formulario y
// siempre este de la misma manera antes de entrar
// en las funciones que construyen los formularios de acciones
//
function resetearformpersona() {

    // quitar el readonly de los atributos
    $("#id_dni").attr('readonly', false);
    $("#id_dni").val('');
    $("#id_dni").on('blur', false);
    $("#nombre_persona").attr('readonly', false);
    $("#nombre_persona").val('');
    $("#nombre_persona").on('blur', false);
    $("#apellidos_persona").attr('readonly', false);
    $("#apellidos_persona").val('');
    $("#apellidos_persona").on('blur', false);
    $("#apellidos_persona").attr('readonly', false);
    $("#apellidos_persona").val('');
    $("#apellidos_persona").on('blur', false);
    $("#fechaNacimiento_persona").attr('readonly', false);
    $("#fechaNacimiento_persona").val('');
    $("#fechaNacimiento_persona").on('blur', false);
    $("#direccion_persona").attr('readonly', false);
    $("#direccion_persona").val('');
    $("#direccion_persona").on('blur', false);
    $("#telefono_persona").attr('readonly', false);
    $("#telefono_persona").val('');
    $("#telefono_persona").on('blur', false);
    $("#email_persona").attr('readonly', false);
    $("#email_persona").val('');
    $("#email_persona").on('blur', false);
    $("#foto_persona").attr('readonly', false);
    $("#foto_persona").val('');
    $("#foto_persona").on('blur', false);


    // eliminar el boton de submit de formulario
    $("#id_boton_buscar_persona").remove();

    // eliminar el button para submit el formulario de search
    $("#id_accionsubmit").remove();


    $("#controlador").remove();
    $("#action").remove();

    // se pone invisible el formulario
    $("#id_caja_formulario_persona").attr('style', 'display: none');
    closeModal()
    setLang();

}


/////////////////SEARCH/////////////
function crearformSEARCHpersona() {

    // reseteo el formulario
    resetearformpersona();

    // creo la accion para el formulario y el onsubmit
    $("#id_form_persona").attr('action', 'javascript:SEARCHpersonaAjax()');
    //$("#id_form_persona").on('submit', search_persona);

    // pongo el campo de dni editable y le asocio la funcion para el onblur
    $("#id_dni").attr('readonly', false);
    //$("#id_dni").blur(comprobar_dni_search);

    // pongo el campo de persona editable y le asocio la funcion para el onblur
    /*$("#id_persona").attr('readonly',false)
    $("#id_persona").blur(comprobar_persona_search);*/


    // se crea un elemento button submit en el formulario
    accionsubmit = document.createElement("button");
    accionsubmit.type = 'submit';
    accionsubmit.id = 'id_accionsubmit';
    $("#id_form_persona").append(accionsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_persona";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/search4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_accionsubmit").append(botonsubmit);

    setLang();

    // se pone visible el formulario
    $("#id_caja_formulario_persona").attr('style', 'display: block');
    openModal()
}

//Función ajax con promesas
function personaSEARCHAjaxPromesa() {

    insertacampo('id_form_persona', 'controlador', 'persona');
    insertacampo('id_form_persona', 'action', 'SEARCH');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_persona").serialize(),
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

async function SEARCHpersonaAjax() {

    var idioma = getCookie('lang');

    await personaSEARCHAjaxPromesa()
        .then((res) => {
            getListPersonas(res.resource);
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformpersona();

}


//////////CHECKS/////////////
function comprobar_dni() {
    const resp = check_dni(document.getElementById('id_dni').value);
    if (resp) {
        mensajeOK('id_dni');
        return true;
    } else if (resp === undefined) {
        mensajeKO('id_dni', 'letra_dni_no_corresponde')
    } else {
        mensajeKO('id_dni', 'formato_dni_no_valido')
    }
    return false;
}


function comprobar_nombre() {
    const resp = checkAcentosGuionEspacios(document.getElementById('nombre_persona').value, 45, 3);
    if (resp) {
        mensajeOK('nombre_persona');
        return true;
    } else if (resp === undefined) {
        mensajeKO('nombre_persona', 'tamano_nombre_persona_mal')
    } else {
        mensajeKO('nombre_persona', 'formato_nombre_persona_mal')
    }
    return false;
}

function comprobar_apellido() {
    const resp = checkAcentosGuionEspacios(document.getElementById('apellidos_persona').value, 100, 5);
    if (resp) {
        mensajeOK('apellidos_persona');
        return true;
    } else if (resp === undefined) {
        mensajeKO('apellidos_persona', 'tamano_apellidos_persona_mal')
    } else {
        mensajeKO('apellidos_persona', 'formato_apellidos_persona_mal')
    }
    return false;
}

function comprobar_fechaNacimiento() {
    const resp = checkBirthday(document.getElementById('fechaNacimiento_persona').value, 100, 5);
    if (resp) {
        mensajeOK('fechaNacimiento_persona');
        return true;
    } else if (resp === undefined) {
        mensajeKO('fechaNacimiento_persona', 'formato_fechaNacimiento_persona_mal')
    } else {
        mensajeKO('fechaNacimiento_persona', 'fecha_mayor_fechaNacimiento_persona_mal')
    }
    return false;
}

function comprobar_direccion() {
    const resp = checkAcentosGuionEspaciosCaracteres(document.getElementById('direccion_persona').value, 200, 10);
    if (resp) {
        mensajeOK('direccion_persona');
        return true;
    } else if (resp === undefined) {
        mensajeKO('direccion_persona', 'tamano_direccion_persona_mal')
    } else {
        mensajeKO('direccion_persona', 'formato_direccion_persona_mal')
    }
    return false;
}

function comprobar_telefono() {
    const resp = checkPhoneNumber(document.getElementById('telefono_persona').value);
    if (resp) {
        mensajeOK('telefono_persona');
        return true;
    } else if (resp === undefined) {
        mensajeKO('telefono_persona', 'tamano_telefono_persona_mal')
    } else {
        mensajeKO('telefono_persona', 'formato_telefono_persona_mal')
    }
    return false;
}


function comprobar_email() {
    const resp = checkEmail(document.getElementById('email_persona').value);
    if (resp) {
        mensajeOK('email_persona');
        return true;
    } else if (resp === undefined) {
        mensajeKO('email_persona', 'tamano_email_persona_mal')
    } else {
        mensajeKO('email_persona', 'formato_email_persona_mal')
    }
    return false;
}

function comprobar_foto() {
    const resp = checkFilename(document.getElementById('foto_persona').value);
    if (resp) {
        mensajeOK('foto_persona');
        return true;
    } else if (resp === undefined) {
        mensajeKO('foto_persona', 'tamano_foto_persona_mal')
    } else {
        mensajeKO('foto_persona', 'formato_foto_persona_mal')
    }
    return false;
}
