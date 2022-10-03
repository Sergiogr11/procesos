function Juego(){
    this.partidas=[];
	this.usuarios={}; //array asociativo

    this.agregarUsuario=function(nick){
		let res={nick:-1};
		if(!this.usuarios[nick]){
			this.usuarios[nick]=new Usuario(nick,this);
			res={nick:nick};
			console.log("Nuevo usuario " + nick);
		}
		return res
	}
	
	this.crearPartida=function(usr){
		//obtener código único
		//crear partida con propietario nick
		//devolver código/partida
		let codigo = Date.now();
		console.log("Usuario " + usr.nick + " crea Partida y se une");
		this.partidas[codigo] = new Partida(codigo, usr);
		return codigo;
	}

	this.jugadorCreaPartida=function(nick){
		let usr = this.usuarios[nick]; //juego.obtenerUsuario(nick); CREAR METODO EN modelo.js
		  let res={codigo:-1};
		  let codigo;
		  if(usr){
			codigo=usr.crearPartida();
			res={codigo:codigo};
		  }
		return res;
	}
	
	this.unirseAPartida=function(codigo,usr){
		let res=-1;
		if(this.partidas[codigo]){
			res = this.partidas[codigo].agregarJugador(usr);
		}else{
			console.log("La partida no existe");
		}
	}

	this.jugadorseUneAPartida=function(nick,codigo){
		let usr = this.usuarios[nick];
		let res={"codigo":-1}
		if(usr){
			let valor=this.unirseAPartida(codigo,usr);
			res={"codigo":valor};
		}
		return res;
	}
	
	this.obtenerPartidas=function(){
		let lista = []; 
		for(let key in this.partidas){
			lista.push({"codigo":key,"owner":this.partidas[key].owner.nick});
		}
		return lista;
	}
	this.obtenerPartidasDisponibles=function(){
		//devolver solo las partidas sin completar
		let lista = [];
		for (let key in this.partidas) {
			if (this.partidas[key].jugadores.length < 2) {
				lista.push({ "codigo": key, "owner": this.partidas[key].owner.nick});
			}
		}
		return lista;
	}
}

function Usuario(nick,juego){
	this.nick=nick;
	this.juego=juego;
	this.crearPartida=function(){
		return this.juego.crearPartida(this);
	}
	this.unirseAPartida=function(codigo){
		this.juego.unirseAPartida(codigo, this);
	}
}

function Partida(codigo, usr){
    this.codigo = codigo;
	this.owner = usr;
	this.jugadores = []; //array normal o asociativo
	this.maxJugadores = 2;
	this.fase="inicial"; //new Inicial()
	this.agregarJugador = function(usr){
		let res=this.codigo;
		if(this.jugadores.length<2){
			this.jugadores.push(usr);
			console.log("El usuario " + usr.nick + " se ha unido a la partida de codigo " + codigo);
		}else{
			res=-1
			console.log("La partida esta completa");
		}
		return res;
	}
	this.hayHueco=function(){
		return (this.jugadores.length<this.maxJugadores);
	}

	this.comprobarFase=function(){
		if (!this.hayHueco()){
			this.fase="jugando";
		}
	}

	this.agregarJugador(this.owner);
}

module.exports.Juego = Juego;