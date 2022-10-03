function Juego(){
    this.partidas=[];
	this.usuarios={}; //array asociativo
    
	this.agregarUsuario=function(nick){
		if(!this.usuarios[nick]){
			this.usuarios[nick]=new Usuario(nick,this);
		}
	}
	
	this.crearPartida=function(nick){
		//obtener código único
		//crear partida con propietario nick
		//devolver código/partida
		let codigo = Date.now();
		this.partidas[codigo] = new Partida(codigo, nick);
		return codigo;
	}
	
	this.unirseAPartida=function(codigo,nick){
		if(this.partidas[codigo]){
			this.partidas[codigo].agregarJugador(nick);
		}else{
			console.log("La partida no existe");
		}
	}
	
	this.obtenerPartidas=function(){
		let lista = []; 
		for(let key in this.partidas){
			lista.push({"codigo":key,"owner":this.partidas[key].owner});
		}
		return lista;
	}
	this.obtenerPartidasDisponibles=function(){
		//devolver solo las partidas sin completar
	}
}

function Usuario(nick,juego){
	this.nick=nick;
	this.juego=juego;
	this.crearPartida=function(){
		return this.juego.crearPartida(this.nick);
	}
	this.unirseAPartida=function(codigo){
		this.juego.unirseAPartida(codigo, this.nick);
	}
}

function Partida(codigo, nick){
    this.codigo = codigo;
	this.owner = nick;
	this.jugadores = []; //array normal o asociativo
	//this.maxJugadores = 2;
	this.fase="inicial"; //new Inicial()
	this.agregarJugador = function(nick){
		if(this.jugadores.length<2){
			this.jugadores.push(nick);
		}else{
			console.log("La partida esta completa");
		}
	}
	this.agregarJugador(this.owner);
}