$(document).ready(function(){
    $.validator.addMethod("emailCompleto", function(value, element) {
    
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
    
        return regex.test(value);
    
      }, 'El formato del correo no es válido');
    
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
        errorPlacement: function(error, element) {
            var errorElementId = element.attr("id") + "Error";
            $("#" + errorElementId).text(error.text());
        },
        submitHandler: function(form) {
            form.submit();
        }
    })
    
    $('#foto').change(function(event) {
    
        var archivo = event.target.files[0];
        
        var urlImagen = URL.createObjectURL(archivo);
        
        $('#imagen').attr('src', urlImagen);
    
    });
    
    
    $("#formulario-bodega").validate({
        rules: {
            titulo: {
                required: true
            },
    
            categoria: {
                required: true
            },
    
            cantidad: {
                required: true
            },

            foto: {
                required: true
            },
        },
        messages: {
    
            titulo: {
                required: "El titulo es un campo requerido."
            },
    
            categoria: {
                required: "La categoria es un campo requerido."
            },
    
            cantidad: {
                required: "La cantidad es un campo requerido."
            },

            foto: {
                required: "La foto es un campo requerido"
            }
    
        },
    })
    
    });
    