function Tablero() {
    //añadir el update cell linea 673 battleboat
    this.placingOnGrid=false;
    this.nombreBarco;

    this.ini = function () {
        //crear los tableros gráficos
        //inicializar los manejadores 
        var humanCells = document.querySelector('.human-player').childNodes;
        for (var k = 0; k < humanCells.length; k++) {
            humanCells[k].self = this;
            humanCells[k].addEventListener('click', this.placementListener, false);
            humanCells[k].addEventListener('mouseover', this.placementMouseover, false);
            humanCells[k].addEventListener('mouseout', this.placementMouseout, false);
        }

        var playerRoster = document.querySelector('.fleet-roster').querySelectorAll('li');
        for (var i = 0; i < playerRoster.length; i++) {
            playerRoster[i].self = this;
            playerRoster[i].addEventListener('click', this.rosterListener, false);
        }
    }

    this.rosterListener = function(e) {
        var self = e.target.self;
        // Remove all classes of 'placing' from the fleet roster first
        var roster = document.querySelectorAll('.fleet-roster li');
        for (var i = 0; i < roster.length; i++) {
            var classes = roster[i].getAttribute('class') || '';
            classes = classes.replace('placing', '');
            roster[i].setAttribute('class', classes);
        }
        
        // Set the class of the target ship to 'placing'
        self.nombreBarco = e.target.getAttribute('id');
        document.getElementById(self.nombreBarco).setAttribute('class', 'placing');
        //Game.placeShipDirection = parseInt(document.getElementById('rotate-button').getAttribute('data-direction'), 10);
        self.placingOnGrid = true;
    };

    this.placementListener = function (e) {
        var self = e.target.self;
        if (self.placingOnGrid) {
            // Extract coordinates from event listener
            var x = parseInt(e.target.getAttribute('data-x'), 10);
            var y = parseInt(e.target.getAttribute('data-y'), 10);
            console.log("Barco: "+self.nombreBarco+"x:"+x+"y:"+y);
            // Don't screw up the direction if the user tries to place again.
             var successful = self.colocarBarco(self.nombreBarco, x, y);
             if (successful) {
            //     // Done placing this ship
            //     self.endPlacing(Game.placeShipType);

            //     // Remove the helper arrow
            //     if (gameTutorial.currentStep === 2) {
            //         gameTutorial.nextStep();
            //     }

                 self.placingOnGrid = false;
                // if (self.areAllShipsPlaced()) {
                //     var el = document.getElementById('rotate-button');
                //     el.addEventListener(transitionEndEventName(), (function () {
                //         el.setAttribute('class', 'hidden');
                //         if (gameTutorial.showTutorial) {
                //             document.getElementById('start-game').setAttribute('class', 'highlight');
                //         } else {
                //             document.getElementById('start-game').removeAttribute('class');
                //         }
                //     }), false);
                //     el.setAttribute('class', 'invisible');
                // }
            }
        }
    };

    this.colocarBarco = function (nombre, x, y) {
        console.log("Barco: "+self.nombre+"x:"+x+"y:"+y);
        return true;
    }

    this.mostrarTablero = function () {

    }
    //manejadores (click en tablero propi,click tablero rival)
    //updateCell (actualiza las celdas)

    this.crearGrid = function () {
        var gridDiv = document.querySelectorAll('.grid');
        for (var grid = 0; grid < gridDiv.length; grid++) {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var el = document.createElement('div');
                    el.setAttribute('data-x', j);
                    el.setAttribute('data-y', i);
                    el.setAttribute('class', 'grid-cell grid-cell-' + j + '-' + i);
                    gridDiv[grid].appendChild(el);
                }
            }
        }
    };
    this.crearGrid();
    this.ini();
    //colocar en el index.html los div class grid
    //cargar en el index.html los estilos
}