arrayGA={

	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////HTTP////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
		//Codigos HTTP
		'MENSAJE_ERROR_INTERNO' : 'Erro Interno. Contacte co Administrador',
		'ERROR_AUTENTICACION' : 'Erro de autenticación. Volva a identificarse',
		'ERR_CONNECTION_REFUSED' : 'Conexión rechazada. Contacte co Administrador',
	'usuario_EXISTE_EN_usuario_KO': 'Usuario xa existe',
	'id_rol_NO_EXISTE_en_rol_KO': 'Rol non existe',
	'dni_NO_EXISTE_en_usuario_KO': 'DNI non existe',
	'id_rol_EXISTE_en_usuario_KO': 'Rol xa existe',
	'dni_EXISTE_en_persona_KO': 'Xa hai unha persoa con ese DNI',
	'dni_EXISTE_EN_usuario_KO': 'Xa hai un usuario con ese DNI',
	'id_accion_NO_EXISTE_en_accion_KO': 'A acción non existe',
	'id_funcionalidad_NO_EXISTE_en_funcionalidad_KO': 'A funcionalidade non existe',
	'permiso_EXISTE_en_rolaccionfuncionalidad_KO': 'O permiso xa existe',
	'prohibido_edit_rolaccionfuncionalidad': 'O permiso non se pode editar',
	'permiso_NO_EXISTE_en_rolaccionfuncionalidad_KO': 'O permiso non existe',
	'no_puede_borrar_permiso_admin': 'O permiso non se pode borrar',
	'no_puede_borrar_rol_adminybasico': 'O rol admin e básico no se poden borrar',
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////usuario////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
		//Codigos usuario
		'pagina_login_wellcome': 'Autenticación usuarios',
		'pagina_registrar_wellcome' : 'Rexistro de usuarios',
		'pagina_usuario_wellcome' : 'Xestión de usuarios',
		'pagina_rol_wellcome' : 'Xestión de roles',
		'pagina_rolaccionfuncionalidad_wellcome' : 'Xestión de permisos',
	'pagina_accion_wellcome' : 'Xestión de acciones',
	'pagina_funcionalidad_wellcome' : 'Xestión de funcionalidades',
		'pagina_menu_wellcome' : 'Menú de aplicación',

		'dni' : 'DNI', 
		'id_dni' : 'DNI',
		'usuario' : 'Login Usuario',
		'contrasena': 'Contrasinal',
		'id_rol' : 'Rol Usuario',
		'text_formato_dni' : '8 letras e un número',
		'text_formato_usuario' : 'letras sen acentos e números',
		//Códigos error
		'usuario_corto_ko': 'Tamaño login demasiado corto (min 3 caracteres)',
		'usuario_largo_ko': 'Tamaño login demasiado largo (max 15 caracteres)',
		'usuario_formato_ko': 'O login contén carecteres non permitidos (solo letras sen acentos e números)',
		'contrasena_corto_ko': 'Tamaño contraseña demasiado corto (min 3 caracteres)',
		'contrasena_largo_ko': 'Tamaño contraseña demasiado largo (max 15 caracteres)',
		'contrasena_formato_ko': 'El contraseña contiene carecteres no permitidos (solo letras sen acentos e números)',
		'USUARIO_PASS_KO':'A contrasinal non é correcta',
		'USUARIO_LOGIN_KO':'Non existe o nome de usuario',
		'rep_contrasena' : 'Repite o contrasinal',
		'add_usuario_OK':'O usuario insertouse con éxito',
		'delete_usuario_OK':'O usuario borrouse con éxito',
		'edit_usuario_OK' : 'O usuario modificouse con éxito',
		'enviar': 'enviar',
		'dni_NO_EXISTE_en_persona_KO':'Error : Introduza os datos de persoa',
		'user':'Usuario',

	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////persona////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
		//Codigos persona
		'pagina_persona_wellcome' : 'Xestión de persoas',
		'dni' : 'DNI', 
		'nombre_persona' : 'Nome persoa',
		'apellidos_persona' : 'Apelidos persoa',
		'fechaNacimiento_persona' : 'Data Nacemento persoa',
		'direccion_persona' : 'Dirección persoa',
		'telefono_persona' : 'Teléfono persoa',
		'email_persona' : 'Email persoa',
		'foto_persona' : 'Foto Persoa',
		'text_formato_dni' : '8 letras e un número',
		'text_formato_nombre_persona' : 'letras sen acentos e números',
		'text_formato_fechaNacimiento_persona' : 'dd/mm/aaaa',
		'text_formato_telefono' : '9 números',
		//Códigos error

	'add_persona_OK':'A persoa insertouse con éxito',
	'delete_persona_OK':'A persoa borrouse con éxito',
	'edit_persona_OK' : 'A persoa modificouse con éxito',

	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////acciones////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
		//Codigos acciones
		'titulo_edit' : 'Editar',
		'titulo_delete' : 'Borrar', 
		'titulo_add' : 'Insertar',
		'titulo_search' : 'Buscar',
		'titulo_showcurrent' : 'Detalle',
		'titulo_registrar' : 'Registrar',
		'titulo_volver': 'Volver',

	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////rol////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	'nombre':'Nome',
	'descrip': 'Descrición',
	'add_rol_OK':'O rol insertouse con éxito',
	'delete_rol_OK':'O rol borrouse con éxito',
	'edit_rol_OK' : 'O rol modificouse con éxito',



	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////funcionalidad////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////

	'add_funcionalidad_OK':'A funcionalidade insertouse con éxito',
	'delete_funcionalidad_OK':'A funcionalidade borrouse con éxito',
	'edit_funcionalidad_OK' : 'A funcionalidade modificouse con éxito',

	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////accion////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////

	'add_accion_OK':'A acción insertouse con éxito',
	'delete_accion_OK':'A acción borrouse con éxito',
	'edit_accion_OK' : 'A acción modificouse con éxito',

	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////accion////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////

	'add_rolaccionfuncionalidad_OK':'O permiso insertouse con éxito',
	'delete_rolaccionfuncionalidad_OK':'O permiso borrouse con éxito',
	'edit_rolaccionfuncionalidad_OK' : 'O permiso modificouse con éxito',

	'repetir_contrasena': 'Repetir contrasinal',


	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////Errores////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	'dni_letra_mal': 'A letra do DNI non é correcta',
	'dni_formato_mal': 'O formato do DNI non é correcto, debe ser 8 números mais unha letra',
	'letra_dni_no_corresponde': 'A letra do DNI non é correcta',
	'formato_dni_no_valido': 'O formato do DNI non é correcto',
	'tamano_nombre_persona_mal': 'O tamaño do nome ten que ser de entre 3 e 45 caracteres',
	'tamano_apellidos_persona_mal': 'O tamaño dos apelidos ten que ser de entre 3 e 45 caracteres',
	'formato_nombre_persona_mal': 'O nome só soporta caracteres con acentos e guiones polo medio',
	'formato_apellidos_persona_mal': 'Os apelidos só soportan caracteres con acentos e guiones polo medio',
	'tamano_email_persona_mal': 'O tamaño do email ten que ser de entre 8 e 45 caracteres',
	'formato_email_persona_mal': 'O email debe ter un formato coma este: correo@url.com',
	'formato_fechaNacimiento_persona_mal': 'A fecha intrudcida non é válida (DD/MM/YYYY)',
	'fecha_mayor_fechaNacimiento_persona_mal': 'A fecha non pode ser maior que hoxe',
	'tamano_direccion_persona_mal': 'O tamaño do enderezo ten que ser de entre 10 e 200 caracteres',
	'formato_direccion_persona_mal': 'O enderezo só soporta caracteres con acentos e guiones, comas, º e ª polo medio',
	'tamano_telefono_persona_mal': 'O tamaño do teléfono ten que se de 9 números',
	'formato_telefono_persona_mal': 'O teléfono só admite 9 números',
	'tamano_foto_persona_mal': 'O tamaño do nome da foto ten que estar entre 6 e 40 caracteres incluíndo a extensión',
	'formato_foto_persona_mal': 'Só se soportan fotos en .png ou .jpg con un nome sen acentos nin caracteres especiais, so letras e números',
	'contrasena_match_error': 'As contrasinais non son iguais',
	'tamano_nombre_rol_mal': 'O tamaño do nome debe de estar entre 6 e 48 caracteres',
	'formato_nombre_rol_mal': 'Para o nome só está permitido letras e números sen acentos',
	'tamano_descrip_rol_mal': 'A descrición debe ter entre 20 e 200 caracters',
	'formato_descrip_rol_mal': 'A descrición soporta calquera caracter a excepción de =<>$#{}[]',



	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////Info////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	'dni_format': '8 números e unha letra ',
	'nombre_format': 'Alfabético con acentos, guión e espazos de máximo 45 e mínimo 3 caracteres',
	'apellidos_format': 'Alfabético con acentos, guión e espazos de máximo 100 e mínimo 5 caracteres',
	'fechaNacimiento_format': 'Fecha válida de 2 números para o día, dous números para o mes e catro números para o ano. / como caracter de separación',
	'direccion_format': 'Alfabético con acentos, números, espacios, ‘/’,’-’,’,’,’º’,‘ª’, máximo 200 e mínimo 10 caracteres',
	'foto_format': 'Alfabético sen acentos con extensión jpg o png con máximo 40 e mínimo 6 caracteres',
	'telefono_format': 'Número de teléfono válido formato de España de 9 díxitos',
	'email_format': 'Email válido máximo 45 e mínimo 8 caracteres (correo@algo.com)',
	'contrasena_format': 'Alfabético sen acentos, números,’-’,’_’ max 45 min 3',
	'usuario_format': 'Alfabético sen acentos, números max 45 min 3',
	'name_format': 'Alfabético sen acentos max 48 min 6',
	'descripcion_format': 'Calquer caracter excepto ‘=<>$#{}[]’ max 200 min 20',


}














































