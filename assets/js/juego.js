/*-- 
*"2C == Dos de treboles" 
*"2D == Dos de diamantes" 
*"2H == Dos de corazones" 
*"2S == Dos de espadas" 
                            --*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;

    
// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
// console.log( btnPedir );
const btnDetener = document.querySelector('#btnDetener');
//console.log(btnDetener)
const divCartasJugador = document.querySelector('#jugador-cartas');
// console.log(divCartasJugador)
const divCartasComputadora = document.querySelector('#computadora-cartas');
//console.log(divCartasComputadora);
const puntosHTML = document.querySelectorAll('small');
//console.log(marcadorJugador);

btnDetener.disabled= true;

// for (let i = 0; i <= tipos.length; i++) {
//     console.log(tipos[i]);
// }
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

    //console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);

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

    // console.log(deck);
    // console.log({ carta });
    // Carta debe de ser de la baraja
    return carta;
}
// pedirCarta();
const valorCarta = (carta) => {
    //Extraer el valor númerico y combertirlo a number
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
    // let puntos = 0;
    // // console.log( { valor } );

    // if ( isNaN( valor )) {
    //     //console.log('No es un número');
    //     puntos = (valor === 'A' ) ? 11 : 10;
    // }else {
    //     //console.log('Es un número');
    //     puntos = valor * 1;
    // }
    // console.log(puntos);
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
                text:`Puntos jugador: ${puntosJugador} - computadora:${puntosComputadora}, Computadora gana :(´....!`,
                icon: "error",
              });
        } else if (puntosComputadora > 21) {
            swal({
                title: "Ganaste!",
                text: `Puntos jugador: ${puntosJugador} - computadora:${puntosComputadora}, Manca esa computadora... :)!`,
                icon: "success",
              });
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
    // console.log('Click')
    // const carta = pedirCarta();
    // console.log(carta);
    // let puntos = valorCarta(carta);
    // console.log(puntos);
    // puntosJugador += puntos;
    // console.log(puntosJugador);

    // if( carta === null){
    //     btnDetener.disabled = true;
    // }

    
    
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerHTML = puntosJugador;
    
    if(puntosJugador > 1 ){
        btnDetener.disabled= false;
    }
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        //console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        //console.warn('21 - genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click', () => {
   
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

});

/*-- TODO: Borrar --*/
// console.log( 15 )
//  turnoComputadora( 15 );
