/*-- El patrón módulo consiste en un módulo donde se encapsulará toda la lógica de nuestra aplicación o proyecto.
     Dentro de este módulo estarán declaradas todas las variables o funciones privadas 
     y sólo serán visibles dentro del mismo. --*/

const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    /*-- Esta función inicializa el juego --*/
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
      
        puntosHTML.forEach ( (elemento) => elemento.innerText = 0);
        divCartasJugadores.forEach( (elemento) => elemento.innerHTML = '');
      
        btnPedir.disabled = false;
        btnDetener.disabled = true;
    } 

    /**Botón detener deshabilitado al inicio del juego  */
    // btnDetener.disabled = true;


    // Esta función crea una nueva baraja - deck
    const crearDeck = () => {
    
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (const tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (const tipo of tipos) {
            for (const especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle( deck );
    }


    // Esta función permite tomar una carta
    const pedirCarta = () => {

        // Validar existencia de cartas
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }


    // Esta función sirve para pedir el valor de la carta
    const valorCarta = (carta) => {
        //Extraer el valor númerico y combertirlo a number
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
    
    // Acumular puntos
    // Turno: 0 = primer jugador y el último sera la computadora
    const acumularPuntos = ( carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText =  puntosJugadores[turno];

        return puntosJugadores[ turno ];
    } 

    const crearCarta = ( carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
        
    } 

    /*-- Turno de la computadora --*/
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1 );

            crearCarta(carta, puntosJugadores.length -1);
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

            
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

     /*-- Determinar ganador --*/
     const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                swal({
                    title: "Empate!",
                    text: "Nadie gana :(´....!",
                    icon: "error",
                });
            } else if (puntosMinimos > 21) {
                swal({
                    title: "Perdiste!",
                    text: ` Computadora gana :(´....!`,
                    icon: "error",
                });
            } else if (puntosComputadora > 21) {
                swal({
                    title: "Ganaste!",
                    text: ` Manca esa computadora... :)!`,
                    icon: "success",
                });
                btnNuevo.disabled = false;
            } else {
                swal({
                    title: "Perdiste!",
                    text: "Computadora gana :(´....!",
                    icon: "error",
                });
            }
        }, 100);

     } 


    /*-- Eventos --*/
    btnPedir.addEventListener('click', () => {
        btnNuevo.disabled = true;
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        // puntosJugador += valorCarta(carta);
        // puntosHTML[0].innerHTML = puntosJugador;

        crearCarta(carta, 0);

        if (puntosJugador > 1) {
            btnDetener.disabled = false;
        }
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugadores.append(imgCarta);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            btnNuevo.disabled = false;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
        btnNuevo.disabled = false;
    });


    btnNuevo.addEventListener('click', () => {
    
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();