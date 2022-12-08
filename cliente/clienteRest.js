function ClienteRest() {
    this.nick;

    this.agregarUsuario = function (nick) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nick, function (data) {
            console.log(data);
            if (data.nick != -1) {
                console.log("Usuario " + data.nick + " registrado")
                cli.nick = data.nick;
                $.cookie("nick", data.nick);
                cws.conectar();
                iu.mostrarHome();



            }
            else {
                console.log("No se ha podido registrar el usuario")
                iu.mostrarModal("El nick ya está en uso");
                iu.mostrarAgregarUsuario();

            }
        })
    }

    this.comprobarUsuario = function () {
        let cli = this;
        $.getJSON("/comprobarUsuario/" + this.nick, function (data) {
            if (data.nick != -1) {
                console.log("Usuario " + data.nick + " activo")
                cws.conectar();
                iu.mostrarHome();
            }
            else {
                console.log("No se ha podido registrar el usuario")
                iu.mostrarAgregarUsuario();

            }
        });
    }

    this.crearPartida = function () {
        let cli = this;
        let nick = cli.nick;

        $.getJSON("/crearPartida/" + nick, function (data) {
            console.log(data)
            if (data.codigo != -1) {
                console.log("Partida creada por " + nick + " con codigo " + data.codigo)
                iu.mostrarCodigo(data.codigo);
            }
            else {
                console.log("No se ha podido crear la partida")
            }

        })


    }

    this.unirseAPartida = function (codigo) {
        let cli = this;
        $.getJSON("/unirseAPartida/" + cli.nick + "/" + codigo, function (data) {
            if (data.codigo != -1) {
                console.log("Usuario " + cli.nick + " se une a partida codigo: " + data.codigo);
                iu.mostrarCodigo(data.codigo);
            }
            else {
                console.log("No se ha podido unir a partida")
            }
        });
    }

    this.obtenerListaPartidas = function () {
        let cli = this;
        $.getJSON("/obtenerPartidas", function (lista) {
            console.log(lista);
            iu.mostrarListaPartidas(lista);

        })

    }


    this.obtenerListaPartidasDisponibles = function () {
        let cli = this;
        $.getJSON("/obtenerPartidasDisponibles", function (lista) {
            console.log(lista);
            iu.mostrarListaDePartidasDisponibles(lista);
        });
    }

    this.usuarioSale = function () {
        let nick = this.nick;

        $.getJSON("/salir/" + nick, function (data) {
            $.removeCookie("nick");
            iu.comprobarCookie();
            cws.usuarioSale(nick, data.codigo);
        })
    }

}