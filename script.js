const cards = document.querySelectorAll(".card");
const movesText = document.getElementById("moves");
const resetBtn = document.getElementById("resetBtn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matched = 0;

shuffleCards();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function flipCard(){

    if(lockBoard) return;

    if(this === firstCard) return;

    this.classList.add("flip");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;

    moves++;
    movesText.textContent = moves;

    checkMatch();
}

function checkMatch(){

    let isMatch =
        firstCard.dataset.card === secondCard.dataset.card;

    if(isMatch){
        disableCards();
    }else{
        unflipCards();
    }
}

function disableCards(){

    matched++;

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();

    if(matched === 4){
        setTimeout(() => {
            alert("Bạn đã thắng!");
        }, 500);
    }
}

function unflipCards(){

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();

    },1000);
}

function resetBoard(){

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function shuffleCards(){

    cards.forEach(card => {

        let random = Math.floor(Math.random() * 8);

        card.style.order = random;

    });
}

resetBtn.addEventListener("click", () => {

    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });

    moves = 0;
    matched = 0;

    movesText.textContent = moves;

    resetBoard();

    shuffleCards();
});