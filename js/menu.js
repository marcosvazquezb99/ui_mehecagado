function comprobar_form_recuperar(){
	if(comprobar_contrasena()){
		encriptarpassword();
		document.getElementById('id_boton_cambiar_contrasena').style.display = 'block'
		return true;
	}
	else{
		return false;
	}
}
function comprobar_contrasena(){

	if (!size_minimo('id_contrasena',3)){
		mensajeKO('id_contrasena', 'contrasena_corto_ko');
		return false;
	}
	if (!size_maximo('id_contrasena',15)){
		mensajeKO('id_contrasena', 'contrasena_largo_ko');
		return false;
	}
	if (!letrassinacentoynumeros('id_contrasena')){
		mensajeKO('id_contrasena', 'contrasena_formato_ko');
		return false;
	}

	mensajeOK('id_contrasena');
	return true;

}
function comprobar_dni_persona(){
	if(!dni_formato('id_dni')){
		mensajeKO('id_dni','dni_formato_ko');
		return false;
	}
	if(!dni_letraOk('id_dni')){
		mensajeKO('id_dni','dni_letraOk_ko');
		return false;
	}
	if(!dni_tamaño('id_dni')){
		mensajeKO('id_dni','dni_tamaño_ko');
		return false;
	}

	mensajeOK('id_dni');
	return true;
}

function recuperarContrasenaAjaxPromesa(){

	insertacampo('id_form_recuperar_contrasena','controlador', 'AUTH');
	insertacampo('id_form_recuperar_contrasena','action', 'CAMBIAR_CONTRASENA');
	
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: "http://193.147.87.202/Back/index.php",
			data: $("#id_form_recuperar_contrasena").serialize(),
		}).done(res => {
			if (res.code != 'CAMBIAR_contresena_OK') {
				reject(res);
			}
			else{
				resolve(res);
			}
		})
		.fail( function( jqXHR ) {
			mensajeFAIL(jqXHR.status);
		});
	});
}

async function recuperarContrasena() {
	
	var idioma = getCookie('lang');

    await devolverdnisajax();
	await recuperarContrasenaAjaxPromesa()
		.then((res) => {
			mensajeactionOK(res.code);
		})
		.catch((res) => {
			mensajeFAIL(res.code);
	    	//eliminarcampo('controlador');
	    	//eliminarcampo('action');
        	setLang(idioma);
		});
	
}

function devolverdniAjaxPromesa(){

	crearformoculto('form_generico','');
	insertacampo('form_generico','controlador', 'usuario');
	insertacampo('form_generico','action', 'SEARCH');
    insertacampo('form_generico','usuario',getCookie('usuarioSistema'));
	
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


async function devolverdnisajax() {
	
	var idioma = getCookie('lang');

	await devolverdniAjaxPromesa()
		.then((res) => {
			
			ponerDniUsuario(res.resource);
		
		})
		.catch((res) => {
			mensajeFAIL(res.code);
        	setLang(idioma);
		});

		document.getElementById('form_generico').remove();
}

function ponerDniUsuario(listaUsuarios){
    
    insertacampo('id_form_recuperar_contrasena','dni',listaUsuarios[0].dni);
}