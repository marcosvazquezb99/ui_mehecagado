// comprobar_form_usuario_add()
// funcion para validar el submit del formulario usuario para las acciones que no sean search

function comprobar_form_usuario_add(){

	if (comprobar_dni() && comprobar_usuario() && comprobar_id_rol()){
		return true;
	}
	else{
		return false;
	}
}

// comprobar_form_usuario_search()
// funcion para validar el submit del formulario de usuario para la accion search
function comprobar_form_usuario_search(){
	
	if (comprobar_dni_search() && comprobar_usuario_search() && comprobar_id_rol_search()){
		return true;
	}
	else{
		return false;
	}
}

// comprobar_usuario()
// funcion de validación de formato de usuario en acciones que no sean search
function comprobar_usuario(){

	if (!size_minimo('id_usuario',3)){
		mensajeKO('id_usuario', 'usuario_corto_ko');
		return false;
	}
	if (!size_maximo('id_usuario',15)){
		mensajeKO('id_usuario', 'usuario_largo_ko');
		return false;
	}
	if (!letrassinacentoynumeros('id_usuario')){
		mensajeKO('id_usuario', 'usuario_formato_ko');
		return false;
	}

	mensajeOK('id_usuario');
	return true;

}

// comprobar_usuario_search()
// funcion de validación de formato de usuario en search
function comprobar_usuario_search(){
	return true;
}

// comprobar_dni()
// funcion de validación de formato de dni en acciones que no sean search
function comprobar_dni(){
	return true;
}

// comprobar_dni_search()
// funcion de validación de formato de dni en search
function comprobar_dni_search(){
	return true;
}

// comprobar_id_rol()
// funcion de validacion del formato de id_rol en acciones que no son search
function comprobar_id_rol(){
	return true;
}

// comprobar_id_rol_search()
// funcion de validacion del formato de id_rol
function comprobar_id_rol_search(){
	return true;
}


// crearselect(
	// true/false : con true se coloca un valor vacio como primer option (para SEARCH)
	// id que va tener el select, 
	// name que va tener el select, 
	// atributo del array datos que utilizamos para el value de cada option, 
	// atributo del array datos que vamos utilizar para el text de cada option, 
	// array de datos con las filas de la entidad, 
	// value que queremos que este como selected en el select)
// devuelve un elemento select
function crearselect(convacio, id, name, valueoption, textoption, datos, itemseleccionado){
	
	rol_select = document.createElement("select");
	rol_select.name = name;
	rol_select.id = id;

	if (convacio){
		option_rol = document.createElement("option");
		option_rol.value = '';
		option_rol.text = '';
		option_rol.selected = true;
		rol_select.appendChild(option_rol);
	}

	for (let i=0;i<datos.length;i++){
		option_rol = document.createElement("option");
		option_rol.value = datos[i][valueoption];
		option_rol.text = datos[i][textoption];

		if (option_rol.value == itemseleccionado){
			option_rol.selected = true;
		}
		rol_select.appendChild(option_rol);
	}
	
	return rol_select;

}

// add_usuario()
// funcion a ser ejecutada cuando se completa el formulario y se hace submit
// comprueba los inputs para el add
// devuelve true si son correctos
function add_usuario(){

	if (comprobar_form_usuario_add()){
		return true;
	}

}

// edit_usuario()
// funcion a ser ejecutada cuando se completa el formulario y se hace submit
// comprueba los inputs para el edit
// devuelve true si son correctos
function edit_usuario(){

	if (comprobar_form_usuario_add()){
		return true;
	}

}

// delete_usuario()
// funcion a ser ejecutada cuando se completa el formulario al hacer submir
// llama a la funcion de petición pq no es necesario comprobación de formularios.

function delete_usuario(){

	return true;

}

// search_usuario()
// funcion a ser ejecutada cuando se completa el formulario
// comprueba los formatos de atributo del formulario y devuelve true para que se invoque el action
function search_usuario(){

	if (comprobar_form_usuario_search()){
		return true;
	}
}

// resetearformusuario()
// esta función se usa para inicializar el formulario y 
// siempre este de la misma manera antes de entrar 
// en las funciones que construyen los formularios de acciones
// 
function resetearformusuario(){

	// eliminar el select
	selectviejorol = document.getElementById('id_id_rol');
	if (!(selectviejorol === null)){
		document.getElementById('caja_select_rol').removeChild(selectviejorol);
	}

	// quitar el readonly de los atributos
	$("#id_dni").attr('readonly',false);
	$("#id_dni").val('');
	$("#id_dni").on('blur',false);
	$("#id_usuario").attr('readonly',false);
	$("#id_usuario").val('');
	$("#id_usuario").on('blur',false);
	$("#id_id_rol").attr('readonly',false);
	$("#id_id_rol").val('');
	$("#id_id_rol").on('blur',false);

	// eliminar el boton de submit de formulario
	$("#id_boton_buscar_usuario").remove();

	// eliminar el button para submit el formulario de search
	$("#id_accionsubmit").remove();

	$("#controlador").remove();
	$("#action").remove();

	// se pone invisible el formulario
	$("#id_caja_formulario_usuario").attr('style', 'display: none');

	setLang();

}

// crearformADDusuario() creado con javascript
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html  
// Se crea un button submit con una imagen para el formulario
// llame a la funcion add_usuario al pulsarla y esta llama a peticionADDusuarioajax que provoca el submit del formulario
// y se ejecuta el action

function crearformADDusuario(){

	// resetear el formulario
	resetearformusuario();

	// se rellena el action del formulario
	document.getElementById('id_form_usuario').action = 'javascript:ADDusuarioajax()';
	document.getElementById('id_form_usuario').onblur = add_usuario;
	
	// se coloca el onblur del dni y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
	document.getElementById('id_dni').onblur = comprobar_dni;
	document.getElementById('id_dni').value = '';

	// se coloca el onblur del usuario y se pone a vacio el valor (o podriamos hacerlo en el resetearformusuario())
	document.getElementById('id_usuario').onblur = comprobar_usuario;
	document.getElementById('id_usuario').value = '';

	// se invoca una función que crea el select de roles desde datos del back
	pintarselectrolesAjax(false, false,'');

	// se crea un button submit para el formulario
	accionsubmit = document.createElement("button");
	accionsubmit.type = 'submit';
	accionsubmit.id = 'id_accionsubmit';
	$("#id_form_usuario").append(accionsubmit);
	
	// se coloca la imagen para el button submit
	botonsubmit = document.createElement("img");
	botonsubmit.id = "id_boton_buscar_usuario";
	botonsubmit.className = 'titulo_search';
	botonsubmit.src= "./images/add4.png";
	botonsubmit.width = '80';
	botonsubmit.height = '80';
	$("#id_accionsubmit").append(botonsubmit);	

	setLang(); 

	// se muestra el formulario
	document.getElementById('id_caja_formulario_usuario').style.display = 'block';

}

//Función ajax con promesas
function usuarioADDAjaxPromesa(){

	insertacampo('id_form_usuario','controlador', 'usuario');
	insertacampo('id_form_usuario','action', 'ADD');
	
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: urlPeticionesAjax,
			data: $("#id_form_usuario").serialize(),
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

async function ADDusuarioajax() {
	
	var idioma = getCookie('lang');

	await usuarioADDAjaxPromesa()
		.then((res) => {
			
			if (res.code == 'SQL_OK'){
				res.code = 'add_usuario_OK';
			};
			devolverusuariosajax();
			mensajeactionOK(res.code);
			//
			//window.location.href = "gestionusuario.html";
		})
		.catch((res) => {
			mensajeFAIL(res.code);
		});

		setLang();

		resetearformusuario();
 
}

// crearformEDITusuario() creado con jquery
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html  
// Se crea un button submit para el formulario
// llame a la funcion edit_usuario al pulsarla y esta llama a peticionEDITusuarioajax que provoca el submit del formulario
// y se ejecuta el action

function crearformEDITusuario(dni, usuario, rol){

	// resetear al formulario
	resetearformusuario();
	
	// se crea el action del formulario 
	$("#id_form_usuario").attr('action','javascript:EDITusuarioajax()');
	$("#id_form_usuario").on('submit', edit_usuario);
	
	// se pone no editable el dni al ser clave primaria y no querer que se modifique por el usuario
	// se pone la funcion de comprobación aunque no sea necesaria y se pone el valor por defecto que se proporciona como parametro
	$("#id_dni").attr('readonly',true);
	$("#id_dni").blur(comprobar_dni);
	$("#id_dni").val(dni);

	// se pone la función de validación de usuario y se pone el valor por defecto proporcionado como parametro
	$("#id_usuario").on('blur',comprobar_usuario);
	$("#id_usuario").val(usuario);

	// se invoca una funcion para pintar el select de roles con datos del back
	pintarselectrolesAjax(false, false, rol);
	
	// se crea un button submit
	accionsubmit = document.createElement("button");
	accionsubmit.type = 'submit';
	accionsubmit.id = 'id_accionsubmit';
	$("#id_form_usuario").append(accionsubmit);
	
	// se coloca una imagen para el button submit en el formulario
	botonsubmit = document.createElement("img");
	botonsubmit.id = "id_boton_buscar_usuario";
	botonsubmit.className = 'titulo_search';
	botonsubmit.src= "./images/edit4.png";
	botonsubmit.width = '80';
	botonsubmit.height = '80';
	$("#id_accionsubmit").append(botonsubmit);	

	setLang(); 

	// se muestra el formulario
	$("#id_caja_formulario_usuario").attr('style', 'display: block');
}

//Función ajax con promesas
function usuarioEDITAjaxPromesa(){

	insertacampo('id_form_usuario','controlador', 'usuario');
	insertacampo('id_form_usuario','action', 'EDIT');
	
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: urlPeticionesAjax,
			data: $("#id_form_usuario").serialize(),
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

async function EDITusuarioajax() {
	
	var idioma = getCookie('lang');

	await usuarioEDITAjaxPromesa()
		.then((res) => {
			
			if (res.code == 'SQL_OK'){
				res.code = 'edit_usuario_OK';
			};
			devolverusuariosajax();
			mensajeactionOK(res.code);
			//
			//window.location.href = "gestionusuario.html";
		})
		.catch((res) => {
			mensajeFAIL(res.code);
		});

		setLang();
		//document.getElementById('id_form_usuario').reset();
		resetearformusuario();
		document.getElementById('controlador')
		//document.getElementById('id_imagen_enviar_form').remove(); 
}


// crearformDELETEusuario() creado con jquery
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html  
// Se crea una input button con imagen para el submit
// llame a la funcion delete_usuario al pulsarla y esta llama a peticionDELETEusuarioajax que provoca el submit del formulario
// y se ejecuta el action

function crearformDELETEusuario(dni, usuario, rol){

	resetearformusuario();
	
	$("#id_form_usuario").attr('action','javascript:DELETEusuarioajax()');
	
	$("#id_dni").attr('readonly','true')
	$("#id_dni").val(dni);

	$("#id_usuario").attr('readonly','true')
	$("#id_usuario").val(usuario);

	// se invoca una función para crear el select de los roles
	pintarselectrolesAjax(true, false, rol);

	// se crea un button submit en el formulario
	accionsubmit = document.createElement("button");
	accionsubmit.type = 'submit';
	accionsubmit.id = 'id_accionsubmit';
	$("#id_form_usuario").append(accionsubmit);
	
	// se coloca la imagen en el button submit
	botonsubmit = document.createElement("img");
	botonsubmit.id = "id_boton_buscar_usuario";
	botonsubmit.className = 'titulo_search';
	botonsubmit.src= "./images/delete4.png";
	botonsubmit.width = '80';
	botonsubmit.height = '80';
	$("#id_accionsubmit").append(botonsubmit);	

	setLang(); 
	
	$("#id_caja_formulario_usuario").attr('style', 'display: block');
}

//Función ajax con promesas
function usuarioDELETEAjaxPromesa(){

	insertacampo('id_form_usuario','controlador', 'usuario');
	insertacampo('id_form_usuario','action', 'DELETE');
	
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: urlPeticionesAjax,
			data: $("#id_form_usuario").serialize(),
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

async function DELETEusuarioajax() {
	
	var idioma = getCookie('lang');

	await usuarioDELETEAjaxPromesa()
		.then((res) => {
			
			if (res.code == 'SQL_OK'){
				res.code = 'delete_usuario_OK';
			}
			mensajeactionOK(res.code);
			devolverusuariosajax();
		})
		.catch((res) => {
			mensajeFAIL(res.code);
		});

		setLang();
	
		resetearformusuario();
	
}

// crearformSEARCHusuario() creado con jquery (except el option que utiliza javascript)
// Este formulario se crea usando la estructura básica del formulario html en gestionusuario.html
// Se crea un input button con una imagen para el submit del formulario
// Cuando esto pasa se llama a la funcion search_usuario en el onsubmit y se hace la comprobación de atributos
// cuando esta función devuelve true se ejecuta el action

function crearformSEARCHusuario(){

	// reseteo el formulario
	resetearformusuario();
	
	// creo la accion para el formulario y el onsubmit
	$("#id_form_usuario").attr('action','javascript:SEARCHusuarioAjax()');
	$("#id_form_usuario").attr('class','buscar-button');
	$("#id_form_usuario").on('submit', search_usuario);
	
	// pongo el campo de dni editable y le asocio la funcion para el onblur
	$("#id_dni").attr('readonly', false);
	$("#id_dni").blur(comprobar_dni_search);

	// pongo el campo de usuario editable y le asocio la funcion para el onblur
	$("#id_usuario").attr('readonly',false)
	$("#id_usuario").blur(comprobar_usuario_search);

	// se llama a una funcion para crear el select de roles
	pintarselectrolesAjax(false, true, '');
		
	// se crea un elemento button submit en el formulario
	accionsubmit = document.createElement("button");
	accionsubmit.type = 'submit';
	accionsubmit.id = 'id_accionsubmit';
	$("#id_form_usuario").append(accionsubmit);
	
	// se coloca una imagen para button anterior en el formulario
	botonsubmit = document.createElement("img");
	botonsubmit.id = "id_boton_buscar_usuario";
	botonsubmit.className = 'titulo_search';
	botonsubmit.src= "./images/search4.png";
	botonsubmit.width = '80';
	botonsubmit.height = '80';
	$("#id_accionsubmit").append(botonsubmit);	

	setLang(); 

	// se pone visible el formulario
	$("#id_caja_formulario_usuario").attr('style', 'display: block');
}

//Función ajax con promesas
function usuarioSEARCHAjaxPromesa(){

	insertacampo('id_form_usuario','controlador', 'usuario');
	insertacampo('id_form_usuario','action', 'SEARCH');
	
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: urlPeticionesAjax,
			data: $("#id_form_usuario").serialize(),
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

async function SEARCHusuarioAjax() {
	
	var idioma = getCookie('lang');

	await usuarioSEARCHAjaxPromesa()
		.then((res) => {
			getListUsuarios(res.resource);
		})
		.catch((res) => {
			mensajeFAIL(res.code);
		});

		setLang();

		resetearformusuario();

}

function crearformSHOWCURRENTusuario(dni, usuario, rol){

	// reseteo el formulario
	resetearformusuario();

	$("#id_form_usuario").attr('action','javascript:cerrarSHOWCURRENT()');
	
	$("#id_dni").attr('readonly','true')
	$("#id_dni").val(dni);

	$("#id_usuario").attr('readonly','true')
	$("#id_usuario").val(usuario);

	pintarselectrolesAjax(true, false, rol);

	// se crea un elemento button submit en el formulario
	accionsubmit = document.createElement("button");
	accionsubmit.type = 'submit';
	accionsubmit.id = 'id_accionsubmit';
	$("#id_form_usuario").append(accionsubmit);
	
	// se coloca una imagen para button anterior en el formulario
	botonsubmit = document.createElement("img");
	botonsubmit.id = "id_boton_buscar_usuario";
	botonsubmit.className = 'titulo_search';
	botonsubmit.src= "./images/detail4.png";
	botonsubmit.width = '80';
	botonsubmit.height = '80';
	$("#id_accionsubmit").append(botonsubmit);	

	setLang(); 

	$("#id_caja_formulario_usuario").attr('style', 'display: block');
	
	
}

function cerrarSHOWCURRENT(){
	$("#id_caja_formulario_usuario").attr('style', 'display: none');
	$("#id_imagen_enviar_form").attr('style', 'display: none');
}

//Función ajax con promesas
function devolverusuariosAjaxPromesa(){

	crearformoculto('form_generico','');
	insertacampo('form_generico','controlador', 'usuario');
	insertacampo('form_generico','action', 'SEARCH');
	
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: urlPeticionesAjax,
			data: $("#form_generico").serialize(),
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

async function devolverusuariosajax() {
	
	var idioma = getCookie('lang');

	await devolverusuariosAjaxPromesa()
		.then((res) => {
			
			getListUsuarios(res.resource);
		
		})
		.catch((res) => {
			mensajeFAIL(res.code);
        	setLang(idioma);
		});

		document.getElementById('form_generico').remove();
}

function getListUsuarios(listausuarios){

	$("#id_datosusuarios").html('');

	// se cargan las filas nuevas
	for (let usuario of listausuarios){

		datosfila = "'"+usuario.dni+"',"+"'"+usuario.usuario+"',"+"'"+usuario.id_rol.id_rol+"'";

		lineatabla = '<tr><td>'+usuario['dni']+'</td><td>'+usuario['usuario']+'</td><td>'+usuario['id_rol'].nombre_rol+"</td>";
		botonedit = '<td><img class="titulo_edit" src="./images/edit4.png" onclick="crearformEDITusuario('+datosfila+');" width="50" height="50"></td>';
		botondelete = '<td><img class="titulo_delete" src="./images/delete4.png" width="50" height="50" onclick="crearformDELETEusuario('+datosfila+');"></td>';
		botonshowcurrent = '<td><img class="titulo_showcurrent" src="./images/detail4.png" width="50" height="50" onclick="crearformSHOWCURRENTusuario('+datosfila+')";></td>';

		lineatabla += botonedit+botondelete+botonshowcurrent+"</tr>";

		$("#id_datosusuarios").append(lineatabla);
	}

}

