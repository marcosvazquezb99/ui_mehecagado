/*Función que elimina todas las cookies para que no quede basura en ellas*/
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        setCookie(name, '');
    }
}

function desconectar() {
   deleteAllCookies();
   // console.log('comeme un pie')
     window.location.href = "login.html";
}

function redirigir() {

    if ((getCookie('usuarioSistema') === null) || (getCookie('usuarioSistema') === '')) {
        window.location.href = "login.html";
    } else {
        window.location.href = "menu.html";
    }
}

function incluircabecera() {

    $("#id_caja_superior").html = "";
    $("#leftSidenav").html = "";

    let sidenav = " <a href=\"javascript:void(0)\" class=\"closebtn\" onclick=\"closeNav()\">&times;</a>\n" +
        "    <a href=\"./gestionpersona.html\" class=\"pagina_persona_wellcome\">Gestión de personas</a>\n" +
        "    <a href=\"./gestionusuario.html\" class=\"pagina_usuario_wellcome\">Gestión de usuarios</a>\n" +
        "    <a href=\"./gestionrol.html\" class=\"pagina_rol_wellcome\"></a>\n" +
        "    <a href=\"./gestionaccion.html\" class=\"pagina_accion_wellcome\"></a>\n" +
        "    <a href=\"./gestionfuncionalidad.html\" class=\"pagina_funcionalidad_wellcome\"></a>\n" +
        "    <a href=\"./gestionrolaccionfuncionalidad.html\" class=\"pagina_rolaccionfuncionalidad_wellcome\"></a>\n" +
        "    <div id=\"id_caja_superior\">\n" +
        "        <table id=\"id_tabla_idiomas\">\n" +
        "            <!--<tbody><tr><td onclick=\"setLang(&#39;ES&#39;);\">ES</td><td onclick=\"setLang(&#39;EN&#39;);\">EN</td><td onclick=\"setLang(&#39;GA&#39;);\">GA</td></tr></tbody>--></table>\n" +
        "        <!--Usuario :root<br><a href=\"javascript:desconectar();\">Desconectar</a>--></div>\n" +
        "</div>"
        + "<table style='color: white' id='id_tabla_idiomas'>" +
        "<tr>" +
        "<td onclick=\"setLang(\'ES\');\">ES</td>" +
        "<td onclick=\"setLang(\'EN\');\">EN</td>" +
        "<td onclick=\"setLang(\'GA\');\">GA</td>" +
        "</tr>" +
        "</table>";



    $("#leftSidenav").append(sidenav);



    /*let incluir = "<table style='color: white' id='id_tabla_idiomas'>" +
        "<tr>" +
        "<td onclick=\"setLang(\'ES\');\">ES</td>" +
        "<td onclick=\"setLang(\'EN\');\">EN</td>" +
        "<td onclick=\"setLang(\'GA\');\">GA</td>" +
        "</tr>" +
        "</table>";

    $("#id_caja_superior").append(incluir);*/

    if ($('#fechaNacimiento_persona')[0] !== undefined) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("fechaNacimiento_persona").setAttribute("max", today);

    }

}
function openNav() {
    document.getElementById("leftSidenav").style.width = "250px";
}

function closeNav() {
        document.getElementById("leftSidenav").style.width = "0";
}

function esta_autenticado() {
    if ((getCookie('usuarioSistema') === null) || (getCookie('usuarioSistema') === '')) {
        window.location.href = "login.html";

    } else {

        let temp = "<span class='user' style='color: white'>Usuario: </span>  <span style='color: white'>" + getCookie('usuarioSistema') +'</span>';
         temp += "<br><a href='javascript:desconectar();' style='color: white'>Desconectar</a>";
        $("#leftSidenav").append(temp);

    }

}

function comprobar_permisos() {

}

/**Función para crear un formulario oculto*/
function crearformoculto(name, action) {

    if ($("#" + name).length == 0) {

        var formu = document.createElement('form');
        document.body.appendChild(formu);
        formu.name = name;
        formu.action = action;
        formu.id = name;
        formu.style.display = "none";

    }

}

function ponerinvisibleerror() {
    document.getElementById('id_caja_error').style.display = 'none';
}

function ponerinvisibleformusuario() {
    document.getElementById('id_caja_formulario_usuario').style.display = 'none';
}

function ponerinvisible(idElemento) {
    document.getElementById(idElemento).style.display = 'none';
}

function ponervisible(idElemento) {
    document.getElementById(idElemento).style.display = 'block';
}

function mensajeKO(idElemento, codigoerror) {
    document.getElementById('id_texterror')
        .classList.forEach((value) => {
        document.getElementById('id_texterror').classList.remove(value)
    })
    document.getElementById('id_texterror').classList.add(codigoerror);
    document.getElementById('id_caja_error').style.display = 'block';
    document.getElementById(idElemento).style.borderColor = "#ff0000";
    setLang();

}

// cerrarMensajeKO()
// si el div de error fuese modal, se controlaria que solo hubiese un class
// de texto de error
// como no es modal por el momento, ante la acumulación de class de errores 
// encadenados, se obtiene la lista de clases del elemento, se convierte en un
// string desde un DOMtokenList, se crea un array con los elementos al hacer
// split con el espacio, y se eliminan de la lista de clases cada uno de los
// codigos del array
// despues de pone la ventana de error como invisible
function cerrarMensajeKO() {

    codigos = String(document.getElementById('id_caja_error').classList);
    codigos = codigos.split(' ');
    for (let codigo of codigos) {
        document.getElementById('id_caja_error').classList.remove(codigo);
    }
    document.getElementById('id_caja_error').innerHTML = '';
    document.getElementById('id_caja_error').style.borderColor = "";
    document.getElementById('id_caja_error').style.display = 'none';

}

function mensajeOK(idElemento) {

    //document.getElementById('id_texterror').innerHTML = '';
    document.getElementById('id_caja_error').style.display = 'none';
    document.getElementById(idElemento).style.borderColor = "#00e600";

}

function mensajeactionOK(codigo) {
    document.getElementById('snackbar')
        .classList.forEach((value) => {
        document.getElementById('snackbar').classList.remove(value)
    })
    //document.getElementById('id_texterror').innerHTML = codigo;
    
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    document.getElementById('snackbar').classList.add(codigo);
    document.getElementById('snackbar').style.borderColor = "#00e600";
    document.getElementById('snackbar').style.display = 'block';

    mensajeModal(codigo);

    setLang();

}

function mensajeFAIL(codigoerror) {

    mensajeModal(codigoerror);

}

function mensajeModal(codigo){
    var modal = document.getElementById("modal");
    var span = document.getElementsByClassName("close")[0];
    document.getElementById("id_texto_mensaje_accion").classList.add(codigo);
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
}

/**Función para mostrar mensaje de error cuando fallan las peticiones ajax*/
function mensajeHTTPFAIL(status) {
    var idioma = getCookie('lang');

    if (status === 500) {
        mensajeFAIL("MENSAJE_ERROR_INTERNO");
    } else if (status === 403) {
        mensajeFAIL("ERROR_AUTENTICACION");
    } else if (status === 0) {
        mensajeFAIL("ERR_CONNECTION_REFUSED");
    }

    setLang();
}

/**Función para insertar campos en el formulario a mayores*/
function insertacampo(idform, name, value) {

    formulario = document.getElementById(idform);
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.id = name;
    input.value = value;
    input.className = name;
    formulario.appendChild(input);

}

function size_minimo(idElemento, longitudminima) {

    let elemento;
    elemento = document.getElementById(idElemento).value;
    if (elemento.length < longitudminima) {
        return false;
    } else {
        return true;
    }
}

function size_maximo(idElemento, longitudmaxima) {

    elemento = document.getElementById(idElemento).value;
    if (elemento.length > longitudmaxima) {
        return false;
    } else {
        return true;
    }
}

function letrassinacentoynumeros(idElemento) {
    const value = document.getElementById(idElemento).value;

    const expresion_regular_nombre = /^[a-zA-Z0-9_-]{3,45}$/;

    return expresion_regular_nombre.test(value.trim());

}

function encriptarpassword() {
    document.getElementById('id_contrasena').value = hex_md5(document.getElementById('id_contrasena').value);
    return true;
}


function check_dni() {
    let numero, aux, letra;
    const expresion_regular_dni = /^\d{8}[A-Z]$/;

    let dni = $('#id_dni')[0].value.toUpperCase();
    if (expresion_regular_dni.test(dni) === true) {
        numero = dni.substring(0, dni.length - 1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        aux = dni.substring(dni.length - 1, dni.length);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra !== aux) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return undefined;
        } else {
            //alert('Dni correcto');
            mensajeOK('id_dni');
            return true;
        }
    }

    return false;
}


function checkAcentosGuionEspacios(value, maxlenght, minlenght) {

    const expresion_regular_nombre = /^[0-9a-zA-ZÀ-ÿ\-\/,]+(\s*[0-9a-zA-ZÀ-ÿ\-]*)*[0-9a-zA-ZÀ-ÿºª]+$/;

    if (value.length < minlenght || value.length > maxlenght) {
        return undefined
    } else if (!expresion_regular_nombre.test(value.trim())) {
        return false
    }
    return true

}

function checkAcentosGuionEspaciosCaracteres(value, maxlenght, minlenght) {

    const expresion_regular_nombre = /^[0-9a-zA-ZÀ-ÿ\-\/,]+(\s*[0-9a-zA-ZÀ-ÿ\-\/\,ºª]*)*[0-9a-zA-ZÀ-ÿºª]+$/;

    if (value.length < minlenght || value.length > maxlenght) {
        return undefined
    } else if (!expresion_regular_nombre.test(value.trim())) {
        return false
    }
    return true

}

function checkPhoneNumber(value) {
    const expresion_regular_nombre = /^[0-9]{9}$/;

    if (value.length !== 9) {
        return undefined;
    } else if (!expresion_regular_nombre.test(value.trim())) {
        return false
    }
    return true

}

function checkImage(value) {
    const expresion_regular_nombre = /^[0-9]{9}$/;

    if (expresion_regular_nombre.test(value.trim())) {
        return true
    }
    return false

}


function checkEmail(value) {
    value = value.trim();
    const expresion_regular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value.length >= 45 || value.length <= 8) {
        return undefined;
    } else if (!expresion_regular.test(value)) {
        return false
    }
    return true;
}

function checkBirthday(value) {
    const birthday = new Date(value);
    let birthday_dd = birthday.getDate();
    let birthday_mm = birthday.getMonth() + 1; //January is 0!
    const birthday_yyyy = birthday.getFullYear();
    if (birthday_dd < 10) {
        birthday_dd = '0' + birthday_dd
    }
    if (birthday_mm < 10) {
        birthday_mm = '0' + birthday_mm
    }
    const birthdayDate = birthday_dd + '/' + birthday_mm + '/' + birthday_yyyy;
    let Today = new Date();
    let dd = Today.getDate();
    let mm = Today.getMonth() + 1; //January is 0!
    const yyyy = Today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    Today = dd + '/' + mm + '/' + yyyy;

    let dateFirst = birthdayDate.split('/');
    let dateSecond = Today.split('/');
    value = new Date(dateFirst[2], dateFirst[1], dateFirst[0]);
    const current = new Date(dateSecond[2], dateSecond[1], dateSecond[0]);

    if (birthday == 'Invalid Date') {

        return undefined;
    } else if (current < value) {
        return false;
    }

    return true;
}

function checkFilename(value) {
    value = value.trim();
    const expresion_regular = /^([a-zA-Z0-9]{2,36})\.(png|jpg)$/;

    if (value.length >= 40 || value.length <= 6) {
        return undefined;
    } else if (!expresion_regular.test(value)) {
        return false
    }
    return true;
}

function checkRolName(value) {
    value = value.trim();
    const expresion_regular = /^[a-zA-Z0-9]{3,45}$/;

    if (value.length >= 45 || value.length <= 3) {
        return undefined;
    } else if (!expresion_regular.test(value)) {
        return false
    }
    return true;
}

function checkRolDescription(value) {
    value = value.trim();
    const expresion_regular = /^[^(\[\]\}\{=><#$)]{20,200}$/;

    if (value.length >= 200 || value.length <= 20) {
        return undefined;
    } else if (!expresion_regular.test(value)) {
        return false
    }
    return true;
}







