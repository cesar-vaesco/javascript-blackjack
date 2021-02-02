/*-- 
*"2C == Dos de treboles" 
*"2D == Dos de diamantes" 
*"2H == Dos de corazones" 
*"2S == Dos de espadas" 
                            --*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];


// for (let i = 0; i <= tipos.length; i++) {
//     console.log(tipos[i]);
// }

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

    console.log(deck);

    deck = _.shuffle(deck);

    console.log( deck );

    return deck;
}


crearDeck();