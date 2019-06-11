/*
 * Create a list that holds all of your cards
 */
var iconHTML = [
    '<i class="fas fa-dove"></i>', '<i class="fas fa-dove"></i>',
    '<i class="fas fa-dice-six"></i>', '<i class="fas fa-dice-six"></i>',
    '<i class="fas fa-chess-queen"></i>', '<i class="fas fa-chess-queen"></i>',
    '<i class="fas fa-heart"></i>', '<i class="fas fa-heart"></i>',
    '<i class="fas fa-republican"></i>', '<i class="fas fa-republican"></i>',
    '<i class="fas fa-dice-d6"></i>', '<i class="fas fa-dice-d6"></i>',
    '<i class="fas fa-child"></i>', '<i class="fas fa-child"></i>',
    '<i class="fas fa-flag"></i>', '<i class="fas fa-flag"></i>',
];
var allCards = [];
var cardContainer = document.querySelector(".container");
var cards = document.querySelectorAll('.card');
var reset = document.querySelector(".reset");
var moves = document.querySelector(".moves span");
var stars = document.querySelectorAll(".rating li");
var timer = document.querySelector(".timer span");
var scoreDisplay = document.querySelector(".score__display");
var msgSection = document.querySelector("section");
var finalScore = document.querySelector(".final__scores");
let playAgainbtn = document.querySelector(".playagain__btn");
var matchCount = 0;
var openCards = [];
var movesCount = 0;
var gameTimer;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
initGame();

function initGame(){
    setUpCards();
    setCardEventListeners();
    initTimer();
}


function setUpCards(){
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
}

function setCardEventListeners(){
    cards.forEach((card)=>{
        card.addEventListener("click", (e)=>{
            flipCard(card);
            updateMovesCount(card);
            if(openCards.length === 2){
                if(openCards[0].innerHTML == openCards[1].innerHTML){
                    // check if won?
                    lockCards();
                }else{
                    hideCards();
                }
            }
            updateRating();
        });
    });
}    

reset.addEventListener("click", function(){
    resetGame();
})

playAgainbtn.addEventListener("click", function(){
    scoreDisplay.classList.remove("hide");
    msgSection.classList.add("hide");
    resetGame();
})

function initTimer(){
    gameTimer = setInterval(()=>{
        +(timer.textContent)++;
        },
        1000);
}

function resetGame(){
    cards.forEach((card)=>{
        cardContainer.removeChild(card);
    })
    resetAllControls();
    initGame();
}

function checkIfWon(){ 
        for(var card of cards){
           if(!card.classList.contains("open", 'match', 'show')){
               return;
           }
        }
        // call off gamerTimer after win
        try{
        clearInterval(gameTimer);
        }
        finally{
        setTimeout(()=>{
            cardContainer.classList.add("hide");
            scoreDisplay.classList.add("hide");
            displayMessage();
        }, 800);
    }
}

function updateMatchCount(){
    matchCount += 1;
    checkIfWon();
}

function updateMovesCount(card){
    if(card.classList.contains('card')){
        movesCount++;
        moves.textContent = movesCount;
    }
}

function updateRating(){
    if(movesCount == 6){
        stars[2].innerHTML = '<i class="fas fa-star-half-alt"></i>';
    }else if(movesCount == 10){
        stars[2].innerHTML =  '<i class="far fa-star"></i>';
    }else if(movesCount == 14){
        stars[1].innerHTML =  '<i class="fas fa-star-half-alt"></i>';
    }else if(movesCount == 18){
        stars[1].innerHTML =  '<i class="far fa-star"></i>';
    }
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
    if(card.classList.contains('card')){
        if(!card.classList.contains('open') &&!card.classList.contains('show') && !card.classList.contains('match')){
            if(openCards.length < 2){
                card.classList.add("open", 'show');
                openCards.push(card);
            }
        }
    }
}

function displayMessage(){
    var starRating = 2;
    if(movesCount > 18){
        starRating = 1;
    }
    finalScore.innerHTML = `<p>With ${moves.textContent} moves and ${starRating} star</p><p>Wooohoooo!!!</p>`;
    msgSection.classList.remove('hide');
}

function lockCards(){
    openCards.forEach((card)=>{
        card.classList.add('match', 'open', 'show');
        updateMatchCount();
    })
    setTimeout(()=>{
        openCards = [];
    }, 700);
}

function hideCards(){
    openCards.forEach((card)=>{
        card.classList.add('shake', 'notmatch');
    })
    setTimeout(()=>{
        openCards.forEach((card)=>{
            card.classList.remove('open', 'notmatch', 'shake', 'show');                   
        })
        openCards = [];
    }, 700);
}

function resetAllControls(){
    stars.forEach((star)=>{
        star.innerHTML = '<i class="fas fa-star"></i>';
    })
    cardContainer.classList.remove('hide');
    clearInterval(gameTimer);
    finalScore.innerHTML = '';
    matchCount = 0;
    openCards = [];
    movesCount = 0;
    allCards = [];
    moves.textContent = 0;
    timer.textContent = 0;
    gameTimer = setInterval(()=>{
        +(timer.textContent)++;
    }, 1000);
}
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