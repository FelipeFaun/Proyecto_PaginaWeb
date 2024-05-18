$(document).ready(function() {

    $('#btn-obtener-ropa').click(function() {

        $.get('http://fakestoreapi.com/products', function(data) {

            $.each(data, function(i, item) {
                
                if (item.category === "women's clothing" || item.category === "men's clothing") {

                    var carta = `

                    <div class="card ropa_carta">
                        <img src="${item.image}" class="card-img-top ropa_carta_imagen">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item ropa_carta_titulo">${item.title}</li>
                        <li class="list-group-item">${item.category}</li>
                        <li class="list-group-item">$${item.price}</li>
                        </ul>
                    </div>
                    
                    `;

                    $('#fila_ropa').append(carta);

                }

            });

        });

    });

});