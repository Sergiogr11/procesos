function ServidorWS(){
	//enviar peticiones
	this.enviarAlRemitente=function(socket,mensaje,datos){
		socket.emit(mensaje,datos);
	}
	this.enviarATodosEnPartida=function(io,codigo,mensaje,datos){
		io.sockets.in(codigo).emit(mensaje,datos);
	}
	this.enviarATodos=function(socket,mens,datos){
    		socket.broadcast.emit(mens,datos);
    }

	//gestionar peticiones
	this.lanzarServidorWS=function(io,juego){
		let cli=this;
		io.on('connection', (socket) => {
		  	console.log('Usuario conectado');
			socket.on("crearPartida",function(nick){		  	
			  	let res = juego.jugadorCreaPartida(nick);		  	
			  	let codigoStr=res.codigo.toString();
			  	socket.join(codigoStr);
	  			//cli.enviarAlRemitente(socket,"partidaCreada",res);
	  			cli.enviarATodosEnPartida(io,codigoStr,"partidaCreada",res)
	  			let lista=juego.obtenerPartidasDisponibles();
	  			cli.enviarATodos(socket,"actualizarListaPartidas",lista);
			});
			socket.on("unirseAPartida",function(nick,codigo){
			  	let codigoStr=codigo.toString();
			  	socket.join(codigoStr);
			  	let res = juego.jugadorSeUneAPartida(nick,codigo);		  	
			  	cli.enviarAlRemitente(socket,"unidoAPartida",res);		  	
			  	let partida=juego.obtenerPartida(codigo);
			  	if (partida.esDesplegando()){
			  		cli.enviarATodosEnPartida(io,codigoStr,"faseDesplegando",{});
			  	}
			});
			socket.on("barcosDesplegados", function(nick){
				let us = juego.obtenerUsuario(nick);
				if(us){
					us.barcosDesplegados();
					let partida=us.partida;
					if(partida.fase=="jugando"){
						let res={fase:partida.turno, turno:partida.turno}
						let codigoStr=partida.codigo.toString();
						cli.enviarATodosEnPartida(io, codigoStr, "aJugar",{})
					}
				}

			});
			socket.on("disparar", function(nick, x, y){
				let us = juego.obtenerUsuario(nick)
				let partida=us.partida;
				if(us && partida.esJugando() && partida.turno.nick==nick){
					us.disparar(x,y);
					let estado=us.obtenerEstadoMarcado(x,y);
					let partida=us.partida;
					let codigoStr=partida.codigo.toString();
					let res={impacto:estado, x:x, y:y, turno:partida.turno.nick};
					cli.enviarATodosEnPartida(io,codigoStr,"disparo", res);
					if(partida.fase == "final"){
						cli.enviarATodosEnPartida(io, codigoStr, "finPartida", res);
					}
				}
			});
			socket.on("colocarBarco", function(nick, nombre, x, y){
				let us=juego.obtenerUsuario(nick);
				if(us){
					us.colocarBarco(nombre,x,y);
					let desplegado=us.obtenerBarcoDesplegado(nombre);
					let res = {barco:nombre, colocado:desplegado};
					cli.enviarAlRemitente(socket, "barcoColocado");
				}
			});
		
		});
	}
}

module.exports.ServidorWS=ServidorWS;