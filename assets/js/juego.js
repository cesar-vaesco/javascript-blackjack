/*-- 
*"2C == Dos de treboles" 
*"2D == Dos de diamantes" 
*"2H == Dos de corazones" 
*"2S == Dos de espadas" 
                            --*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];


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

    console.log(deck);
    console.log({ carta });
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

const valor = valorCarta(pedirCarta());

console.log({ valor })