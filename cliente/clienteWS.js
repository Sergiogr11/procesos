function ClienteWS(){
	this.socket;
	this.codigo;
	this.conectar=function(){
		this.socket=io();
		this.servidorWS();
	}
	this.crearPartida=function(){
		this.socket.emit("crearPartida",rest.nick);
	}
	this.unirseAPartida=function(codigo){
		this.socket.emit("unirseAPartida",rest.nick,codigo);
	}
	this.abandonarPartida=function(){
		this.socket.emit("abandonarPartida",rest.nick,this.codigo); //cws.codigo
	}
	this.salir = function(){
		this.socket.emit("usuarioSale", rest.nick);
	}
	this.colocarBarco=function(nombre,x,y){
		this.socket.emit("colocarBarco", rest.nick, nombre, x,y);
	}
	
	this.barcosDesplegados=function(){
		this.socket.emit("barcosDesplegados", rest.nick);
	}
	
	this.disparar=function(x,y){
		this.socket.emit("disparar", rest.nick,x,y);
	}

	this.servidorWS=function(){
		let cli=this;
		this.socket.on("partidaCreada",function(data){
			console.log(data);
			if (data.codigo!=-1){
				console.log("Usuario "+rest.nick+" crea partida codigo: "+data.codigo)
				iu.mostrarCodigo(data.codigo);
				cli.codigo=data.codigo;
			}
			else{
				console.log("No se ha podido crear partida");
				iu.mostrarModal("No se ha podido crear partida");
				//iu.mostrarCrearPartida();
				rest.comprobarUsuario();
			}
		});
		this.socket.on("unidoAPartida",function(data){
			if (data.codigo!=-1){
				console.log("Usuario "+rest.nick+" se une a partida codigo: "+data.codigo);
				iu.mostrarCodigo(data.codigo);
				cli.codigo=data.codigo;
			}
			else{
				console.log("No se ha podido unir a partida");
			}
		});
		this.socket.on("actualizarListaPartidas",function(lista){
			if (!cli.codigo){
				iu.mostrarListaDePartidasDisponibles(lista);
			}
		});
		this.socket.on("faseDesplegando",function(){
			iu.mostrarModal("Ya puedes desplegar la flota!");
		});
		this.socket.on("aJugar",function(){
			iu.mostrarModal("A jugaaar!");
		});
		this.socket.on("esperandoRival",function(){
			iu.mostrarModal("Esperando rival");
		});
		this.socket.on("disparo",function(){
			iu.mostrarModal(res.impacto);
			iu.mostrarModal("Turno: " + res.turno);
		});
		this.socket.on("info",function(){
			console.log(info);
		});
		this.socket.on("finPartida",function(res){
			console.log("Fin de la partida");
			console.log("Ganador: "+res.turno);
			iu.mostrarModal("Fin de la partida. Ganador: " + res.turno);
			iu.finPartida();
		});
	}
}