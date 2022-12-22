function comprobar_form_login(){
	return comprobar_dni() &&
		comprobar_nombre() &&
		comprobar_apellido() &&
		comprobar_fechaNacimiento() &&
		comprobar_direccion() &&
		comprobar_telefono() &&
		comprobar_email() &&
		comprobar_foto() &&
		comprobar_usuario() &&
		comprobar_contrasena() &&
		check_password_equal();
	
}

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
	check_password_equal();
	return true;

}

function objectifyForm(formArray) {
	//serialize data function
	let returnArray = {};
	for (var i = 0; i < formArray.length; i++){
		returnArray[formArray[i]['name']] = formArray[i]['value'];
	}
	return returnArray;
}

//Función ajax con promesas
function loginAjaxPromesa(){

	insertacampo('id_form_login','controlador', 'AUTH');
	insertacampo('id_form_login','action', 'REGISTRAR');
	const data = $("#id_form_login").serializeArray();
	let object = {
		...objectifyForm(data),
		contrasena: hex_md5(document.getElementById('id_contrasena').value)
	}
	return new Promise(function(resolve, reject) {
		$.ajax({
			method: "POST",
			url: urlPeticionesAjax,
			data: object,
		}).done(res => {
			if (res.code !== 'REGISTRAR_OK') {
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

function resetearformregistro() {


		// quitar el readonly de los atributos
		$("#id_dni").attr('readonly', false);
		$("#id_dni").val('');
		$("#nombre_persona").attr('readonly', false);
		$("#nombre_persona").val('');
		$("#apellidos_persona").attr('readonly', false);
		$("#apellidos_persona").val('');
		$("#apellidos_persona").attr('readonly', false);
		$("#apellidos_persona").val('');
		$("#fechaNacimiento_persona").attr('readonly', false);
		$("#fechaNacimiento_persona").val('');
		$("#direccion_persona").attr('readonly', false);
		$("#direccion_persona").val('');
		$("#telefono_persona").attr('readonly', false);
		$("#telefono_persona").val('');
		$("#email_persona").attr('readonly', false);
		$("#email_persona").val('');
		$("#foto_persona").attr('readonly', false);
		$("#foto_persona").val('');
		$("#id_usuario").attr('readonly', false);
		$("#id_usuario").val('');
		$("#id_contrasena").attr('readonly', false);
		$("#id_contrasena").val('');
		$("#repetir_contrasena").attr('readonly', false);
		$("#repetir_contrasena").val('');





		// eliminar el boton de submit de formulario
		$("#id_boton_buscar_persona").remove();

		// eliminar el button para submit el formulario de search
		$("#id_accionsubmit").remove();

		$("#controlador").remove();
		$("#action").remove();

		// se pone invisible el formulario
		$("#id_caja_formulario_persona").attr('style', 'display: none');

		setLang();


}

async function registrar() {
	
	var idioma = getCookie('lang');

	await loginAjaxPromesa()
		.then((res) => {
			resetearformregistro()
			mensajeactionOK(res.code);
			window.location.href = "index.html";
		})
		.catch((res) => {
			mensajeFAIL(res.code);
	    	//eliminarcampo('controlador');
	    	//eliminarcampo('action');
        	setLang(idioma);
		});
	
}



/////////////////////CHECKS//////////////////////////////////

function comprobar_dni() {
	const resp = check_dni(document.getElementById('id_dni').value);
	if(resp){
		mensajeOK('id_dni');
		return true;
	}else if(resp === undefined){
		mensajeKO('id_dni', 'letra_dni_no_corresponde')
	}else{
		mensajeKO('id_dni', 'formato_dni_no_valido')
	}
	return false;
}


function comprobar_nombre() {
	const resp = checkAcentosGuionEspacios(document.getElementById('nombre_persona').value, 45, 3);
	if(resp){
		mensajeOK('nombre_persona');
		return true;
	}else if(resp === undefined){
		mensajeKO('nombre_persona', 'tamano_nombre_persona_mal')
	}else{
		mensajeKO('nombre_persona', 'formato_nombre_persona_mal')
	}
	return false;
}

function comprobar_apellido() {
	const resp = checkAcentosGuionEspacios(document.getElementById('apellidos_persona').value, 100, 5);
	if(resp){
		mensajeOK('apellidos_persona');
		return true;
	}else if(resp === undefined){
		mensajeKO('apellidos_persona', 'tamano_apellidos_persona_mal')
	}else{
		mensajeKO('apellidos_persona', 'formato_apellidos_persona_mal')
	}
	return false;
}

function comprobar_fechaNacimiento() {
	const resp = checkBirthday(document.getElementById('fechaNacimiento_persona').value, 100, 5);
	if(resp){
		mensajeOK('fechaNacimiento_persona');
		return true;
	}else if(resp === undefined){
		mensajeKO('fechaNacimiento_persona', 'formato_fechaNacimiento_persona_mal')
	}else{
		mensajeKO('fechaNacimiento_persona', 'fecha_mayor_fechaNacimiento_persona_mal')
	}
	return false;
}

function comprobar_direccion(){
	const resp = checkAcentosGuionEspaciosCaracteres(document.getElementById('direccion_persona').value, 200, 10);
	if(resp){
		mensajeOK('direccion_persona');
		return true;
	}else if(resp === undefined){
		mensajeKO('direccion_persona', 'tamano_direccion_persona_mal')
	}else{
		mensajeKO('direccion_persona', 'formato_direccion_persona_mal')
	}
	return false;
}

function comprobar_telefono(){
	const resp = checkPhoneNumber(document.getElementById('telefono_persona').value);
	if(resp){
		mensajeOK('telefono_persona');
		return true;
	}else if(resp === undefined){
		mensajeKO('telefono_persona', 'tamano_telefono_persona_mal')
	}else{
		mensajeKO('telefono_persona', 'formato_telefono_persona_mal')
	}
	return false;
}


function comprobar_email() {
	const resp = checkEmail(document.getElementById('email_persona').value);
	if(resp){
		mensajeOK('email_persona');
		return true;
	}else if(resp === undefined){
		mensajeKO('email_persona', 'tamano_email_persona_mal')
	}else{
		mensajeKO('email_persona', 'formato_email_persona_mal')
	}
	return false;
}

function comprobar_foto() {
	const resp = checkFilename(document.getElementById('foto_persona').value);
	if(resp){
		mensajeOK('foto_persona');
		return true;
	}else if(resp === undefined){
		mensajeKO('foto_persona', 'tamano_foto_persona_mal')
	}else{
		mensajeKO('foto_persona', 'formato_foto_persona_mal')
	}
	return false;
}

function check_password_equal(){
	if(document.getElementById('id_contrasena').value === document.getElementById('repetir_contrasena').value){
		mensajeOK('repetir_contrasena')
		return true
	}
	mensajeKO('repetir_contrasena', 'contrasena_match_error');
	return false


}



