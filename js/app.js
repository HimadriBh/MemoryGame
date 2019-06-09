/*
 * Create a list that holds all of your cards
 */
var iconHTML = [
    '<i class="fas fa-dove"></i>',
    '<i class="fas fa-dove"></i>',
    '<i class="fas fa-dice-six"></i>',
    '<i class="fas fa-dice-six"></i>',
    '<i class="fas fa-chess-queen"></i>',
    '<i class="fas fa-chess-queen"></i>',
    '<i class="fas fa-heart"></i>',
    '<i class="fas fa-heart"></i>',
    '<i class="fas fa-republican"></i>',
    '<i class="fas fa-republican"></i>',
    '<i class="fas fa-dice-d6"></i>',
    '<i class="fas fa-dice-d6"></i>',
    '<i class="fas fa-child"></i>',
    '<i class="fas fa-child"></i>',
    '<i class="fas fa-flag"></i>',
    '<i class="fas fa-flag"></i>',

];
var allCards = [];
var cardContainer = document.querySelector(".container");
for(let index = 15; index >= 0; index--){
    let card = document.createElement("div");
    card.innerHTML = iconHTML[index];
    card.classList.add("card");
    allCards.push(card);
}
// shuffle cards
cards = shuffle(allCards);
cards.forEach((card)=>{
    cardContainer.appendChild(card);
})

var cards = document.querySelectorAll('.card');
//var cardContainer = document.querySelector(".container");
var reset = document.querySelector(".reset");
var moves = document.querySelector(".moves span");
var stars = document.querySelectorAll(".rating li");
var timer = document.querySelector(".timer span");
var matchCount = 0;
var openCards = [];
var movesCount = 0;
var timerId = setInterval(()=>{
    +(timer.textContent)++;
}, 1000);
// console.log(cards[1].remove());
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// cards.forEach((card)=>{
//     card.addEventListener
// });

//reset game
//resetGame();
cards.forEach((card)=>{
    card.addEventListener("click", (e)=>{
    // var card = e.target;
    flipCard(card);
       console.log(openCards);
        updateMovesCount(card);
            if(openCards.length === 2){
                if(openCards[0].innerHTML == openCards[1].innerHTML){
                    // check if won?
                    openCards.forEach((card)=>{
                        card.classList.add('match');
                        
                    })
                    setTimeout(()=>{
                        openCards = [];
                    }, 700);
                    updateMatchCount();
                }else{
                    openCards.forEach((card)=>{
                        card.classList.add('shake', 'notmatch');
                        updateRating();
                    })
                    setTimeout(()=>{
                        openCards.forEach((card)=>{
                            card.className = 'card';                        
                        })
                        openCards = [];
                    }, 700);
                }
            }
    });
});

reset.addEventListener("click", function(){
    console.log("event listener working")
    resetGame();
})




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//  reset game function

function resetGame(){
    cards.forEach((card)=>{
        card.classList.remove("open", "show", 'match');
    })
    var shuffledCards = shuffle(cards);
    console.log(shuffledCards);
}

function checkWin(){ 
    if(matchCount === 16){
        console.log("not removing container");
        cardContainer.childNode.remove();
    }
}

function updateMatchCount(){
    matchCount += 2;
    console.log(matchCount);
    if(matchCount === 16){
        console.log("not removing container");
        cardContainer.childNode.remove();
    }
}

function updateMovesCount(card){
    if(card.classList.contains('card')){
        movesCount++;
        moves.textContent = movesCount;
    }
}

function updateRating(){
    console.log('firing');
        stars[2].innerHTML = '<i class="fas fa-star-half"></i>';
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function flipCard(card){
    if(openCards.length <= 2){
        if(card.classList.contains('card')){
            if(!card.classList.contains('open') && !card.classList.contains('match')){
                card.classList.add("open");
                openCards.push(card);
                console.log(openCards.length);
            }
        }
    }else{
        openCards = [];
    }
}
