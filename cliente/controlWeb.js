function ControlWeb() {

    this.comprobarCookie = function () {
        if ($.cookie('nick')) {
            rest.nick = $.cookie('nick');
            rest.comprobarUsuario();
            // cws.conectar();
            this.mostrarHome();
        } else {
            this.mostrarAgregarUsuario();
        }

    }

    this.mostrarAgregarUsuario = function () {
        var cadena = `
        <div id="mAU">
        
        <div class="row">
            <div class="col">
                <h1>Hundir la Flota</h1>
            </div>
            <div id="fondo">
         <img src="../cliente/img/fondo.png"/>
        </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="text" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nickname (max 6 letras)" required>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button id="btnAU" class="btn btn-primary mb-2 mr-sm-2">Iniciar sesión</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
            <a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>
            </div>
        </div>
        
        <div class="row">
            <div class="col">
                <div id="nota"></div>
            </div>
        </div>
    </div>
    
`


        $("#agregarUsuario").append(cadena);

        $("#btnAU").on("click", function (e) {
            if ($('#usr').val() === '' || $('#usr').val().length > 6) {
                e.preventDefault();
                $('#nota').append('Nick inválido');
            }
            else {
                var nick = $('#usr').val();
                $("#mAU").remove();
                $("#aviso").remove();
                rest.agregarUsuario(nick);



            }

        })
    }

    this.mostrarHome = function () {

        $("#mH").remove();
        $('#gc').remove();
        $('#fondo').remove();

        let cadena = `
    <div class="row" id="mH">
            <div class="col">
             <h1>Hundir la Flota</h1>
        </div>
        <div>
            <h2>Bienvenido ${rest.nick}</h2>
        </div>
        <div style="margin-bottom:15px" id="codigo"></div>
        <button id="btnS" class="btn btn-primary mb-2 mr-sm-2">Salir</button>
    </div>

        `


        $('#agregarUsuario').append(cadena);
        this.mostrarCrearPartida();
        rest.obtenerListaPartidasDisponibles();

        $("#btnS").on("click", function (e) {
            $("#mCP").remove();
            $('#mLP').remove();
            $('#mH').remove();
            $('#gc').remove();
            rest.usuarioSale();
        })




    }

    this.mostrarCrearPartida = function () {
        //dibujar un boton que al hacer click llame a crear partida de rest

        $('#mCP').remove();

        let cadena = `
        <div class="row" id="mCP">
            <div class="col">
                <button id="btnCP" class="btn btn-primary mb-2 mr-sm-2">Crear Partida</button>
            </div>
        </div>
        `

        $('#crearPartida').append(cadena);

        $("#btnCP").on("click", function (e) {
            $('#mCP').remove();
            $('#mLP').remove();
            cws.crearPartida();
        })








    }

    this.mostrarAbandonarPartida = function () {

        $('#mAbP').remove();

        let cadena = `
        <div class="row" id="mAbP">
         <div style="margin-top:15px" class="col">
            <button id="btnAbP" class="btn btn-primary mb-2 mr-sm-2">Abandonar Partida</button>
         </div>
        </div>
        `

        $('#codigo').append(cadena);

        $("#btnAbP").on("click", function (e) {

            cws.abandonarPartida();
        })
    }

    this.mostrarCodigo = function (codigo) {
        let cadena = " Codigo de la partida: " + codigo;
        $('#codigo').append(cadena);

        iu.mostrarAbandonarPartida();
    }



    this.mostrarListaDePartidas = function (lista) {
        $('#mLP').remove();
        let cadena = "<div id='mLP'>";
        cadena = cadena + '<ul class="list-group">';
        for (i = 0; i < lista.length; i++) {
            cadena = cadena + '<li class="list-group-item">' + lista[i].codigo + ' propietario: ' + lista[i].owner + '</li>';
        }
        cadena = cadena + "</ul>";
        cadena = cadena + "</div>"
        $('#listaPartidas').append(cadena);

    }

    this.mostrarListaDePartidasDisponibles = function (lista) {
        $('#mLP').remove();
        let cadena = "<div class='row' id='mLP'>";
        cadena = cadena + "<div class='col'>";
        cadena = cadena + "<h3>Lista de partidas disponibles</h3>";
        cadena = cadena + '<ul class="list-group">';
        for (i = 0; i < lista.length; i++) {
            cadena = cadena + '<li class="list-group-item"><a href="#" value="' + lista[i].codigo + '"> Nick propietario: ' + lista[i].owner + '</a></li>';
        }
        cadena = cadena + "</ul>";
        cadena = cadena + "</div></div>"
        $('#listaPartidas').append(cadena);

        $("#btnAP").on("click", function (e) { //este es el boton que hemos quitado por los WS
            $('#mLP').remove();
            rest.obtenerListaPartidasDisponibles();

        })

        $(".list-group a").click(function () {
            codigo = $(this).attr("value");
            console.log(codigo);
            if (codigo) {
                $('#mLP').remove();
                $('#mCP').remove();
                cws.unirseAPartida(codigo);
            }
        });
    }

    this.finalPartida = function () {
        $('#mH').remove()
        cws.codigo = undefined;
        $('#gc').remove();
        tablero = new Tablero(10);
        this.mostrarHome()
    }



    this.mostrarModal = function (msg) {
        $('#mM').remove();
        var cadena = "<p id='mM'>" + msg + "</p>";
        $('#contenidoModal').append(cadena);
        $('#miModal').modal("show");
    }


}