//Función ajax con promesas
function devolverrolaccionfuncionalidadAjaxPromesa() {

    crearformoculto('form_generico', '');
    insertacampo('form_generico', 'controlador', 'rolaccionfuncionalidad');
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

async function devolverrolaccionfuncionalidadajax() {

    var idioma = getCookie('lang');

    return await devolverrolaccionfuncionalidadAjaxPromesa()
        .then((res) => {
            return res.resource;
            //getListrolaccionfuncionalidad(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    //document.getElementById('form_generico').remove();
}

async function getListrolaccionfuncionalidad(listarolaccionfuncionalidad) {

    $("#id_datosrolaccionfuncionalidad").html('');


    for (let rolaccionfuncionalidad of listarolaccionfuncionalidad) {


        lineatabla = '<tr><td>'
            + rolaccionfuncionalidad['id_funcionalidad'].nombre_funcionalidad + '</td><td>'
            + rolaccionfuncionalidad['id_accion'].nombre_accion + '</td><td>'
        /*+ rolaccionfuncionalidad['id_rol'].nombre_rol + '</td>';*/

        lineatabla += "</tr>";


    }

}

async function getListrolaccionfuncionalidad(listarolaccionfuncionalidad) {

    $("#id_datosrolaccionfuncionalidad").html('');


    for (let rolaccionfuncionalidad of listarolaccionfuncionalidad) {


        lineatabla = '<tr><td>'
            + rolaccionfuncionalidad['id_funcionalidad'].nombre_funcionalidad + '</td><td>'
            + rolaccionfuncionalidad['id_accion'].nombre_accion + '</td><td>'
        /*+ rolaccionfuncionalidad['id_rol'].nombre_rol + '</td>';*/

        lineatabla += "</tr>";


    }

}


async function appendToTbody() {
    let accion = await devolveraccionajax();
    let funcionalidad = await devolverfuncionalidadajax();
    let roles = await devolverrolajax();
    let rolaccionfuncionalidad = await devolverrolaccionfuncionalidadajax();
    appendRolToTableHeader(roles);
    let result = await formatData(funcionalidad, accion, roles, rolaccionfuncionalidad);
    $("#id_datosrolaccionfuncionalidad").html('');
    $("#id_datosrolaccionfuncionalidad").append(result);
    checRadioButton();

    //$("#id_datosrolaccionfuncionalidad").append(lineatabla);
}

function formatData(funcionalidad, accion, roles, rolaccionfuncionalidad) {
    let codigo = '';
    let result = '';
    for (let f of funcionalidad) {
        result += '<tr>';
        for (let a of accion) {
            result += '<tr><td>' + f.nombre_funcionalidad + '</td><td>' + a.nombre_accion + '</td>'
            for (let rol of roles) {
                codigo = "'" + f.id_funcionalidad + "_" + a.id_accion + "_" + rol.id_rol + "'";
                result += '<td style="text-align: center">' +
                    '<label>' +
                    '<input type="radio" ' + checRadioButton(rolaccionfuncionalidad, codigo) + ' onchange="javascript:ADDrolaccionfuncionalidadajax(' + codigo + ')" name="' + codigo + '" id="' + codigo + '">' +
                    '<img src="../images/add.png" alt="Option 1">' +
                    '   </label>' +
                    '<label>' +
                    '<input type="radio" ' + checRadioButton(rolaccionfuncionalidad, codigo, false) + ' onchange="javascript:DELETErolaccionfuncionalidadajax(' + codigo + ')" name="' + codigo + '" id="' + codigo + '">' +
                    ' <img src="../images/delete.png" alt="Option 2">' +
                    '</label>' +
                    '</td>'
            }
            result += '</tr>'
        }
        result += '</tr>';
    }
    return result;
}

function checRadioButton(rolaccionfuncionalidad, id, add = true) {
    let codigo = '';
    if (id && rolaccionfuncionalidad) {
        id = id.replace("'", "").replace("'", "");
        for (let raf of rolaccionfuncionalidad) {
            codigo = raf.id_funcionalidad.id_funcionalidad + "_" + raf.id_accion.id_accion + "_" + raf.id_rol.id_rol;
            if (codigo == id) {
                return add ? 'checked' : '';
            }
        }
        return add ? '' : 'checked';
    }


}

//GET ROL
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
                closeModal();
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

    return await devolverrolAjaxPromesa()
        .then((res) => {
            return res.resource
            //appendRolToTableHeader(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

}

function appendRolToTableHeader(roles) {
    lineatabla = '<th>Funcionalidad</th><th>Acción</th>';
    $("#tr_tablarolaccionfuncionalidad").append(lineatabla);

    for (let rol of roles) {

        datosfila = "'" + rol.nombre_rol.id_funcionalidad + "'";

        lineatabla = '<th style="width: 500px">'
            + rol['nombre_rol'] + '</th>';

        $("#tr_tablarolaccionfuncionalidad").append(lineatabla);
    }


}


//GET FUNCIONALIDAD
function devolverfuncionalidadAjaxPromesa() {

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
                closeModal();
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

    return await devolverfuncionalidadAjaxPromesa()
        .then((res) => {
            return res.resource;

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

    document.getElementById('form_generico').remove();
}

//GET FUNCIONALIDAD
function devolveraccionAjaxPromesa() {

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

    return await devolveraccionAjaxPromesa()
        .then((res) => {
            return res.resource

        })
        .catch((res) => {
            mensajeFAIL(res.code);
            setLang(idioma);
        });

}


//Función ajax con promesas
function rolaccionfuncionalidadADDAjaxPromesa(data) {
    data.controlador = 'rolaccionfuncionalidad';
    data.action = 'ADD';


    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: data,
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


async function ADDrolaccionfuncionalidadajax(data) {
    let split = data.split('_');

    split = {
        id_rol: split[2],
        id_funcionalidad: split[0],
        id_accion: split[1]
    }

    var idioma = getCookie('lang');

    await rolaccionfuncionalidadADDAjaxPromesa(split)
        .then((res) => {

            if (res.code == 'SQL_OK') {
                closeModal();
                res.code = 'add_rolaccionfuncionalidad_OK';
            }
            ;
            devolverrolaccionfuncionalidadajax();
            mensajeactionOK(res.code);
            //
            //window.location.href = "gestionrolaccionfuncionalidad.html";
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformrolaccionfuncionalidad();
}

function crearformADDrolaccionfuncionalidad() {
    // resetear el formulario
    resetearformrolaccionfuncionalidad();

    // se rellena el action del formulario
    document.getElementById('id_form_rolaccionfuncionalidad').action = 'javascript:ADDrolaccionfuncionalidadajax()';
    //document.getElementById('id_form_rolaccionfuncionalidad').onblur = add_rolaccionfuncionalidad;

    // se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformrolaccionfuncionalidad())
    //document.getElementById('id_dni').onblur = comprobar_dni;
    //document.getElementById('id_dni').value = '';


    // se coloca el onblur del rolaccionfuncionalidad y se pone a vacio el valor (o podriamos hacerlo en el resetearformrolaccionfuncionalidad())
    /*document.getElementById('id_usuario').onblur = comprobar_usuario;
    document.getElementById('id_usuario').value = '';*/

    // se invoca una función que crea el select de rolaccionfuncionalidades desde datos del back
    //pintarselectrolaccionfuncionalidadesAjax(false, false,'');

    // se crea un button submit para el formulario
    rolaccionfuncionalidadsubmit = document.createElement("button");
    rolaccionfuncionalidadsubmit.type = 'submit';
    rolaccionfuncionalidadsubmit.id = 'id_rolaccionfuncionalidadsubmit';
    accionsubmit.addEventListener("click", function () {
        closeModal()
    })
    $("#id_form_rolaccionfuncionalidad").append(rolaccionfuncionalidadsubmit);

    // se coloca la imagen para el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rolaccionfuncionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/add4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_rolaccionfuncionalidadsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    document.getElementById('id_caja_formulario_rolaccionfuncionalidad').style.display = 'block';
    openModal();
}

///////EDIT////////////////
function crearformEDITrolaccionfuncionalidad(
    id_funcionalidad, id_accion, id_rol
) {
    // resetear al formulario
    resetearformrolaccionfuncionalidad();

    // se crea el action del formulario
    $("#id_form_rolaccionfuncionalidad").attr('action', 'javascript:EDITrolaccionfuncionalidadajax()');
    //$("#id_form_rolaccionfuncionalidad").on('submit', edit_usuario);

    // se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
    // se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
    $("#id_funcionalidad").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_funcionalidad").val(id_funcionalidad);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#id_accion").val(id_accion);
    $("#id_rol").val(id_rol);

    // se invoca una funcion para pintar el select de rolaccionfuncionalidades con datos del back
    //pintarselectrolaccionfuncionalidadesAjax(false, false, rolaccionfuncionalidad);

    // se crea un button submit
    rolaccionfuncionalidadsubmit = document.createElement("button");
    rolaccionfuncionalidadsubmit.type = 'submit';
    rolaccionfuncionalidadsubmit.id = 'id_rolaccionfuncionalidadsubmit';
    $("#id_form_rolaccionfuncionalidad").append(rolaccionfuncionalidadsubmit);

    // se coloca una imagen para el button submit en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rolaccionfuncionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/edit4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_rolaccionfuncionalidadsubmit").append(botonsubmit);

    setLang();

    // se muestra el formulario
    $("#id_caja_formulario_rolaccionfuncionalidad").attr('style', 'display: block');
    openModal()
}


//Función ajax con promesas
function rolaccionfuncionalidadEDITAjaxPromesa(data) {
    data.controlador = 'rolaccionfuncionalidad';
    data.action = 'EDIT';

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: JSON.stringify(data),
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

async function EDITrolaccionfuncionalidadajax(data) {
    let split = data.split('_');

    split = {
        id_rol: split[2],
        id_funcionalidad: split[0],
        id_accion: split[1]
    }

    var idioma = getCookie('lang');

    await rolaccionfuncionalidadEDITAjaxPromesa(split)
        .then((res) => {

            if (res.code == 'SQL_OK') {
                res.code = 'edit_rolaccionfuncionalidad_OK';
            }
            ;
            devolverrolaccionfuncionalidadajax();
            mensajeactionOK(res.code);
            //
            //window.location.href = "gestionrolaccionfuncionalidad.html";
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();
    //document.getElementById('id_form_rolaccionfuncionalidad').reset();
    resetearformrolaccionfuncionalidad();
    document.getElementById('controlador')
    //document.getElementById('id_imagen_enviar_form').remove();
}


///////////////////DELETE////////////////

function crearformDELETErolaccionfuncionalidad(
    id_funcionalidad, id_accion, id_rol
) {

    resetearformrolaccionfuncionalidad();

    $("#id_form_rolaccionfuncionalidad").attr('action', 'javascript:DELETErolaccionfuncionalidadajax()');

    $("#id_funcionalidad").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_funcionalidad").val(id_funcionalidad);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#id_accion").attr('readonly', true);
    $("#id_accion").val(id_accion);
    $("#id_rol").attr('readonly', true);
    $("#id_rol").val(id_rol);

    // se crea un button submit en el formulario
    rolaccionfuncionalidadsubmit = document.createElement("button");
    rolaccionfuncionalidadsubmit.type = 'submit';
    rolaccionfuncionalidadsubmit.id = 'id_rolaccionfuncionalidadsubmit';

    $("#id_form_rolaccionfuncionalidad").append(rolaccionfuncionalidadsubmit);

    // se coloca la imagen en el button submit
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rolaccionfuncionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/delete4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_rolaccionfuncionalidadsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_rolaccionfuncionalidad").attr('style', 'display: block');
    openModal();
}

//Función ajax con promesas
function rolaccionfuncionalidadDELETEAjaxPromesa(data) {
    data.controlador = 'rolaccionfuncionalidad';
    data.action = 'DELETE';

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: data,
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

async function DELETErolaccionfuncionalidadajax(data) {
    let split = data.split('_');
    split = {
        id_rol: split[2],
        id_funcionalidad: split[0],
        id_accion: split[1]
    }

    var idioma = getCookie('lang');

    await rolaccionfuncionalidadDELETEAjaxPromesa(split)
        .then((res) => {

            if (res.code == 'SQL_OK') {
                res.code = 'delete_rolaccionfuncionalidad_OK';
            }
            mensajeactionOK(res.code);
            devolverrolaccionfuncionalidadajax();
        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformrolaccionfuncionalidad();

}

/////////////SHOW CURRENT///////////
function cerrarSHOWCURRENT() {
    $("#id_caja_formulario_rolaccionfuncionalidad").attr('style', 'display: none');
    $("#id_imagen_enviar_form").attr('style', 'display: none');
}

function crearformSHOWCURRENTrolaccionfuncionalidad(
    id_funcionalidad, id_accion, id_rol
) {

    // reseteo el formulario
    resetearformrolaccionfuncionalidad();

    $("#id_form_rolaccionfuncionalidad").attr('action', 'javascript:cerrarSHOWCURRENT()');

    $("#id_funcionalidad").attr('readonly', true);
    //$("#id_dni").blur(comprobar_dni);
    $("#id_funcionalidad").val(id_funcionalidad);

    // se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
    //$("#id_usuario").on('blur',comprobar_usuario);
    $("#id_accion").attr('readonly', true);
    $("#id_accion").val(id_accion);
    $("#id_rol").attr('readonly', true);
    $("#id_rol").val(id_rol);


    // se crea un elemento button submit en el formulario
    rolaccionfuncionalidadsubmit = document.createElement("button");
    rolaccionfuncionalidadsubmit.type = 'submit';
    rolaccionfuncionalidadsubmit.id = 'id_rolaccionfuncionalidadsubmit';
    rolaccionfuncionalidadsubmit.addEventListener("click", function (){
        closeModal()
    })
    $("#id_form_rolaccionfuncionalidad").append(rolaccionfuncionalidadsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rolaccionfuncionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/detail4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_rolaccionfuncionalidadsubmit").append(botonsubmit);

    setLang();

    $("#id_caja_formulario_rolaccionfuncionalidad").attr('style', 'display: block');

    openModal();
}


// resetearformrolaccionfuncionalidad()
// esta función se usa para inicializar el formulario y
// siempre este de la misma manera antes de entrar
// en las funciones que construyen los formularios de rolaccionfuncionalidades
//
function resetearformrolaccionfuncionalidad() {

    // quitar el readonly de los atributos
    $("#id_funcionalidad").attr('readonly', false);
    $("#id_funcionalidad").val('');
    $("#id_funcionalidad").on('blur', false);
    $("#id_accion").attr('readonly', false);
    $("#id_accion").val('');
    $("#id_accion").on('blur', false);
    $("#id_rol").attr('readonly', false);
    $("#id_rol").val('');
    $("#id_rol").on('blur', false);

    // eliminar el boton de submit de formulario
    $("#id_boton_buscar_rolaccionfuncionalidad").remove();

    // eliminar el button para submit el formulario de search
    $("#id_rolaccionfuncionalidadsubmit").remove();

    $("#controlador").remove();
    $("#action").remove();

    // se pone invisible el formulario
    $("#id_caja_formulario_rolaccionfuncionalidad").attr('style', 'display: none');

    setLang();

}


/////////////////SEARCH/////////////
function crearformSEARCHrolaccionfuncionalidad() {

    // reseteo el formulario
    resetearformrolaccionfuncionalidad();

    // creo la rolaccionfuncionalidad para el formulario y el onsubmit
    $("#id_form_rolaccionfuncionalidad").attr('action', 'javascript:SEARCHrolaccionfuncionalidadAjax()');
    //$("#id_form_rolaccionfuncionalidad").on('submit', search_rolaccionfuncionalidad);

    // pongo el campo de dni editable y le asocio la funcion para el onblur
    //$("#id_funcionalidad").attr('readonly', false);
    //$("#id_dni").blur(comprobar_dni_search);

    // pongo el campo de rolaccionfuncionalidad editable y le asocio la funcion para el onblur
    /*$("#id_funcionalidad").attr('readonly',false)
    $("#id_funcionalidad").blur(comprobar_rolaccionfuncionalidad_search);*/


    // se crea un elemento button submit en el formulario
    rolaccionfuncionalidadsubmit = document.createElement("button");
    rolaccionfuncionalidadsubmit.type = 'submit';
    rolaccionfuncionalidadsubmit.id = 'id_rolaccionfuncionalidadsubmit';
    $("#id_form_rolaccionfuncionalidad").append(rolaccionfuncionalidadsubmit);

    // se coloca una imagen para button anterior en el formulario
    botonsubmit = document.createElement("img");
    botonsubmit.id = "id_boton_buscar_rolaccionfuncionalidad";
    botonsubmit.className = 'titulo_search';
    botonsubmit.src = "./images/search4.png";
    botonsubmit.width = '80';
    botonsubmit.height = '80';
    $("#id_rolaccionfuncionalidadsubmit").append(botonsubmit);

    setLang();

    // se pone visible el formulario
    $("#id_caja_formulario_rolaccionfuncionalidad").attr('style', 'display: block');
    openModal();
}

//Función ajax con promesas
function rolaccionfuncionalidadSEARCHAjaxPromesa() {

    insertacampo('id_form_rolaccionfuncionalidad', 'controlador', 'rolaccionfuncionalidad');
    insertacampo('id_form_rolaccionfuncionalidad', 'action', 'SEARCH');

    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "POST",
            url: urlPeticionesAjax,
            data: $("#id_form_rolaccionfuncionalidad").serialize(),
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

async function SEARCHrolaccionfuncionalidadAjax() {
    var idioma = getCookie('lang');

    await rolaccionfuncionalidadSEARCHAjaxPromesa()
        .then((res) => {
            getListrolaccionfuncionalidad(res.resource);

        })
        .catch((res) => {
            mensajeFAIL(res.code);
        });

    setLang();

    resetearformrolaccionfuncionalidad();

}


//////////CHECKS/////////////










































