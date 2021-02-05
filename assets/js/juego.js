/*-- El patrón módulo consiste en un módulo donde se encapsulará toda la lógica de nuestra aplicación o proyecto.
     Dentro de este módulo estarán declaradas todas las variables o funciones privadas 
     y sólo serán visibles dentro del mismo. --*/

(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0,
        puntosComputadora = 0;


    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    const puntosHTML = document.querySelectorAll('small');


    /**Botón detener deshabilitado al inicio del juego  */
    btnDetener.disabled = true;


    // Esta función crea una nueva baraja -deck
    const crearDeck = () => {
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
        deck = _.shuffle(deck);

        return deck;
    }


    crearDeck();


    // Esta función permite tomar una carta
    const pedirCarta = () => {

        // Validar existencia de cartas
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        let carta = deck.pop();

        return carta;
    }


    // pedirCarta();
    const valorCarta = (carta) => {
        //Extraer el valor númerico y combertirlo a number
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    /*-- Turno de la computadora --*/
    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();
            puntosComputadora += valorCarta(carta);
            puntosHTML[1].innerHTML = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                // console.warn('....Computadora gano');
                break;
            }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

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
                    text: `Puntos jugador: ${puntosJugador} - computadora:${puntosComputadora}, Computadora gana :(´....!`,
                    icon: "error",
                });
            } else if (puntosComputadora > 21) {
                swal({
                    title: "Ganaste!",
                    text: `Puntos jugador: ${puntosJugador} - computadora:${puntosComputadora}, Manca esa computadora... :)!`,
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
        puntosJugador += valorCarta(carta);
        puntosHTML[0].innerHTML = puntosJugador;

        if (puntosJugador > 1) {
            btnDetener.disabled = false;
        }
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

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
        turnoComputadora(puntosJugador);
        btnNuevo.disabled = false;
    });


    btnNuevo.addEventListener('click', () => {
        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = true;
    });

})();