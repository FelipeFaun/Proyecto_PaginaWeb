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
    $('rut').on('keyup', function() {
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

    




/*------------------------------------------*/




        // Validar Contraseña
        $.validator.addMethod("passwordCompleta", function(value, element) {
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return this.optional(element) || regex.test(value);
        }, 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial');
       
        


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
                required: "La direccion es un campo requerido."
            },
            contraseña: {
                required: "Por favor, ingresa una contraseña.",
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
                required: "El apellido es un campo requerido.",
                soloLetras: "El apellido sólo puede contener letras"
            },
            correo: {
                required: "El correo es un campo requerido.",
                emailCompleto: "El formato del correo no es válido. Un correo válido debe tener la forma nombre@dominio.com"
            },
            direccion: {
                required: "La direccion es un campo requerido."
            },
            contraseña: {
                required: "La contraseña es un campo requerido.",
                
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
});
