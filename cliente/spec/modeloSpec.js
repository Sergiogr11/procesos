describe("El juego...", function() {
	var miJuego;
	var usr1,usr2;

  beforeEach(function() {
    miJuego=new Juego();
	miJuego.agregarUsuario("pepe");
	miJuego.agregarUsuario("luis");
	usr1=miJuego.usuarios["pepe"];
	usr2=miJuego.usuarios["luis"];
	usr1.crearPartida();
  });

  it("Inicialmente", function() {
    let lista=miJuego.obtenerPartidas();
	expect(lista.length).toEqual(0);
	expect(usr1.nick).toEqual("pepe");
	expect(usr2.nick).toEqual("luis");
	expect(lista.length).toEqual(1);
  });
});

//Añadir más tests