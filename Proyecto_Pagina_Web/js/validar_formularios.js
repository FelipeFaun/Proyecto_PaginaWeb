$(document).ready(function() {

    // Métodos de Validación

        // Validar Rut

    $.validator.addMethod("rutChileno", function(value, element) {

        // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
        var rutPattern = /^\d{7,8}-[\dK]$/;
        if (!rutPattern.test(value)) {
            return false;
        }
    
        // Validar el dígito verificador
        var rutSinGuion = value.replace("-", "");
        var rut = rutSinGuion.slice(0, -1);
        var dv = rutSinGuion.slice(-1);
        var factor = 2;
        var sum = 0;
        for (var i = rut.length - 1; i >= 0; i--) {
            sum += parseInt(rut.charAt(i)) * factor;
            factor = factor === 7 ? 2 : factor + 1;
        }
        var dvCalculado = 11 - (sum % 11);
        dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();
    
        return dv === dvCalculado;
        }, "El RUT no es válido (escriba sin puntos y con guión)");

        // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
    $('#rut').on('keyup', function() {
        $(this).val($(this).val().toUpperCase());
    });


        // Validar Correo

    $.validator.addMethod("emailCompleto", function(value, element) {

        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
    
        return regex.test(value);
    
      }, 'El formato del correo no es válido');


        // Validar Nombre y Apellido

    $.validator.addMethod("soloLetras", function(value, element) {

        return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
    
        }, "Sólo se permiten letras y espacios en blanco.");


    // Seleccionar una imagen y mostrarla en el elemento img

    $('#foto').change(function(event) {

        var archivo = event.target.files[0];
        
        var urlImagen = URL.createObjectURL(archivo);
        
        $('#imagen').attr('src', urlImagen);

    });

    
    // Validadores para el formulario PRODUCTOS
    
    $("#formulario-productos").validate({
        rules: {
            id: {
                required: true,
                number: true,
                min: 1
            },
            categoria: {
                required: true
            },
            nombre: {
                required: true
            },
            descripcion: {
                required: true
            },
            precio: {
                required: true,
                number: true,
                min: 1
            },
            descuento_suscripcion: {
                required: true,
                number: true,
                min: 0,
                max: 100
            },
            descuento_oferta: {
                required: true,
                number: true,
                min: 0,
                max: 100
            },
            foto: {
                required: true
            },
        },
        messages: {
            id: {
                required: "El id es un campo requerido.",
                number: "El id debe ser un numero.",
                min: "Debe ser un numero mayor a 0."
            },
            categoria: {
                required: "La categoría es un campo requerido."
            },
            nombre: {
                required: "El nombre es un campo requerido."
            },
            descripcion: {
                required: "La descripción es un campo requerido."
            },
            precio: {
                required: "El precio es un campo requerido.",
                number: "El precio debe ser un numero.",
                min: "El precio debe ser mayor que 0"
            },
            descuento_suscripcion: {
                required: "El descuento por suscripción es un campo requerido.",
                number: "El descuento por suscripción debe ser un numero.",
                min: "El descuento debe ser mayor o igual a 0%",
                max: "El descuento debe ser menor o igual a 100%"

            },
            descuento_oferta: {
                required: "La oferta es un campo requerido",
                number: "El descuento por oferta debe ser un numero.",
                min: "El descuento debe ser mayor o igual a 0%",
                max: "El descuento debe ser menor o igual a 100%"

            },
            foto: {
                required: "La foto es un campo requerido."
            },
        },
    }),


    // Validador para el formulario USUARIOS

    $("#formulario-usuarios").validate({

        rules: {
            id: {
                required: true,
                number: true,
                min: 1
            },
            tipo_usuario: {
                required: true
            },
            rut: {
                required: true,
                rutChileno: true
            },
            nombres: {
                required: true,
                soloLetras: true
            },
            apellidos: {
                required: true,
                soloLetras: true
            },
            correo: {
                required: true,
                emailCompleto: true
            },
            direccion: {
                required: true
            },
            contrasena: {
                required: true,
                minlength: 5,
                maxlength: 15,
            },
            foto: {
                required: true
            },
        },
        messages: {
            id: {
                required: "El id es un campo requerido.",
                number: "El id debe ser un numero",
                min: "El id debe ser mayor que 0"
            },
            tipo_usuario: {
                required: "Seleccione el tipo de usuario"
            },
            rut: {
                required: "El rut es un campo requerido.",
                rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
            },
            nombres: {
                required: "Los nombres son un campo requerido.",
                soloLetras: "El nombre sólo puede contener letras y espacios en blanco."
            },
            apellidos: {
                required: "Los apellidos son un campo requerido.",
                soloLetras: "El apellido sólo puede contener letras y espacios en blanco."
            },
            correo: {
                required: "El correo es un campo requerido.",
                emailCompleto: "El formato del correo no es válido."
            },
            direccion: {
                required: "La dirección es un campo requerido."
            },
            contrasena: {
                required: "La contraseña es un campo requerido.",
                minlength: "La contraseña debe tener un mínimo de 5 caracteres",
                maxlength: "La contraseña debe tener un máximo de 15 caracteres",
            },
            foto: {
                required: "La foto es un campo requerido."
            },
        },
    }),


    // Validadores para el formulario REGISTRO

    $("#formulario-registro").validate({
        rules: {
            rut: {
                required: true,
                rutChileno: true
            },
            nombre: {
                required: true,
                soloLetras: true
            },
            apellido: {
                required: true,
                soloLetras: true
            },
            correo: {
                required: true,
                emailCompleto: true
            },
            direccion: {
                required: true
            },
            contraseña: {
                required: true,
                minlength: 8,
                maxlength: 20
                
            },
            repetirContraseña: {
                required: true,
                equalTo: "#contraseña"
            },
            foto: {
                required: true
            }
        },
        messages: {
            rut: {
                required: "El rut es un campo requerido."
            },
            nombre: {
                required: "El nombre es un campo requerido."
            },
            apellido: {
                required: "El apellido es un campo requerido."
            },
            correo: {
                required: "El correo es un campo requerido.",
                emailCompleto: "El formato del correo no es válido. Un correo válido debe tener la forma nombre@dominio.com"
            },
            direccion: {
                required: "La dirección es un campo requerido."
            },
            contraseña: {
                required: "Por favor, ingresa una contraseña.",
                minlength: "La contraseña debe tener un mínimo de 8 caracteres",
                maxlength: "La contraseña debe tener un máximo de 20 caracteres"
            },
            repetirContraseña: {
                required: "Por favor, repite tu contraseña.",
                equalTo: "Las contraseñas no coinciden."
            },
            foto: {
                required: "La foto es un campo requerido."
            }
        }
    });


    // Validadores para el formulario MIS DATOS

    $("#formulario-misdatos").validate({
        rules: {
            rut: {
                required: true,
                rutChileno: true
            },
            nombre: {
                required: true,
                soloLetras: true
            },
            apellido: {
                required: true,
                soloLetras: true
            },
            correo: {
                required: true,
                emailCompleto: true
            },
            direccion: {
                required: true
            },
            contrasena: {
                required: true,
                minlength: 8,
                maxlength: 20  
            },
            repetirContrasena: {
                required: true,
                equalTo: "#contrasena"
            },
            foto: {
                required: true
            }
        },
        messages: {
            rut: {
                required: "El rut es un campo requerido."
            },
            nombre: {
                required: "El nombre es un campo requerido."
            },
            apellido: {
                required: "El apellido es un campo requerido."
            },
            correo: {
                required: "El correo es un campo requerido.",
                emailCompleto: "El formato del correo no es válido. Un correo válido debe tener la forma nombre@dominio.com"
            },
            direccion: {
                required: "La direccion es un campo requerido."
            },
            contrasena: {
                required: "La contrasena es un campo requerido.",
                minlength: "La contraseña debe tener un mínimo de 8 caracteres",
                maxlength: "La contraseña debe tener un máximo de 20 caracteres"
                
            },
            repetirContrasena: {
                required: "Por favor, repite tu contraseña.",
                equalTo: "Las contraseñas no coinciden."
            },
            foto: {
                required: "La foto es un campo requerido."
            }
        }
    });


    // Validadores para el formulario Ingresar

    $('#ingresar').validate({
        rules: {
            email: {
                required: true,
                emailCompleto: true
            },
            password: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            email: {
                required: "El campo de correo electrónico es obligatorio.",
                emailCompleto: "El formato del correo no es válido."
            },
            
            password: {
                required: "El campo de contraseña es obligatorio.",
                minlength: "La contraseña debe tener al menos 8 caracteres."
            }
        },
    })
    
    
    // Validadores para el formulario BODEGA

    $("#formulario-bodega").validate({
        rules: {
            titulo: {
                required: true
            },
    
            categoria: {
                required: true
            },
    
            cantidad: {
                required: true,
                number: true,
                min: 1
            },
            foto: {
                required: true
            }
        },
        messages: {
    
            titulo: {
                required: "El titulo es un campo requerido."
            },
    
            categoria: {
                required: "La categoría es un campo requerido."
            },
    
            cantidad: {
                required: "La cantidad es un campo requerido.",
                number: "La cantidad debe ser un número",
                min: "La cantidad debe ser un numero mayor que 0"
            },
            foto: {
                required: "La foto es un campo requerido."
            }
    
        },
    })
    
});