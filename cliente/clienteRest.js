function ClienteRest(){
    this.nick;
    this.agregarUsuario=function(nick){
        let cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.nick!=-1){
                console.log("Usuario " + data.nick + " registrado");
                cli.nick = data.nick;
                //ws.nick=data.nick;
                //$.cookie("nick",ws.nick);
                //iu.mostrarHome(data);
            }
            else{
                console.log("No se ha podido registrar el usuario");
                //iu.mostrarModal("El nick ya está en uso");
                //iu.mostrarAgregarJugador();
            }
        });
    }


    this.crearPartida=function(nick){
        let cli=this;
        $.getJSON("/crearPartida/"+nick,function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario " + data.nick + " crea partida con codigo " + data.codigo);
                
                //ws.nick=data.nick;
                //$.cookie("nick",ws.nick);
                //iu.mostrarHome(data);
            }
            else{
                console.log("No se ha podido crear partida");
                //iu.mostrarModal("El nick ya está en uso");
                //iu.mostrarAgregarJugador();
            }
        });
    }

    this.unirseAPartida=function(nick,codigo){
        let cli=this;
        $.getJSON("/unirseAPartida/"+nick+"/"+codigo,function(data){
            //se ejecuta cuando conteste el servidor
            console.log(data);
            if (data.codigo!=-1){
                console.log("Usuario " + data.nick + " se une a la partida con codigo " + data.codigo);
                
                //ws.nick=data.nick;
                //$.cookie("nick",ws.nick);
                //iu.mostrarHome(data);
            }
            else{
                console.log("No se ha podido unir a la partida");
                //iu.mostrarModal("El nick ya está en uso");
                //iu.mostrarAgregarJugador();
            }
        });
    }


}


