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
    puntosComputador = 0;

// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
// console.log( btnPedir );

const divCartasJugador = document.querySelector('#jugador-cartas');
// console.log(divCartasJugador)
const puntosHTML = document.querySelectorAll('small');
//console.log(marcadorJugador);


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
const valorCarta = ( carta ) => {
    //Extraer el valor númerico y combertirlo a number
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor)) ? 
            (valor === 'A') ? 11: 10 
            : valor * 1 ;
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

/*-- Eventos --*/
btnPedir.addEventListener('click', ()=>{
    // console.log('Click')
    // const carta = pedirCarta();
    // console.log(carta);
    // let puntos = valorCarta(carta);
    // console.log(puntos);
    // puntosJugador += puntos;
    // console.log(puntosJugador);
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerHTML = puntosJugador;

    // <!-- <img class="carta" src="assets/cartas/10C.png" alt=""> -->
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`; 
    imgCarta.classList.add('carta');    
    divCartasJugador.append(imgCarta);
   

});

