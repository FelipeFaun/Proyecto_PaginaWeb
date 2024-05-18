$(document).ready(function() {


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

        },
    })

});