let scenarios = [
    {
        hackerCard: {
            description: "Я отправляю вам сообщение, используя поддельное удостоверение личности.",
            power: 3,
        },
        playerCards: [
            {
                description: "Я всегда отвечаю человеку, независимо от того, знаю я его или нет.",
                power: 1,
            },
            {
                description: "Я никогда не отвечаю человеку, которого не знаю.",
                power: 4,
            },
            {
                description: "Сначала я спрошу его/ее, а потом отвечу.",
                power: 2,
            }
        ]
    },
    {
        hackerCard: {
            description: "Я запросил кое-какую информацию о вашем друге.",
            power: 3,
        },
        playerCards: [
            {
                description: "Я никогда не расскажу ему/ей о своем друге.",
                power: 3,
            },
            {
                description: "Я расскажу ему/ей о своем друге.",
                power: 1,
            },
            {
                description: "Сначала я спрошу у него/нее о моем друге.",
                power: 4,
            }
        ]
    },
    {
        hackerCard: {
            description: "Я хочу, чтобы вы прислали мне деньги, потому что у меня есть вся ваша личная информация.",
            power: 4,
        },
        playerCards: [
            {
                description: "Я пришлю тебе деньги.",
                power: 0,
            },
            {
                description: "Я позвоню в полицию.",
                power: 4,
            },
            {
                description: "Я ничего не буду делать.",
                power: 2,
            }
        ]
    },
    {
        hackerCard: {
            description: "Я притворился твоим другом и попросил у тебя кое-какую конфиденциальную информацию.",
            power: 3,
        },
        playerCards: [
            {
                description: "Я сообщу ему/ей всю информацию.",
                power: 1,
            },
            {
                description: "Я ничего ему не скажу.",
                power: 2,
            },
            {
                description: "Я расскажу ему об этом лично, когда встречусь с ним.",
                power: 4,
            }
        ]
    },
    {
        hackerCard: {
            description: "Я попрошу вас прислать мне ваши личные фотографии.",
            power: 3,
        },
        playerCards: [
            {
                description: "Я никогда никому этого не отправлю.",
                power: 3,
            },
            {
                description: "Я расскажу об этом своим родителям.",
                power: 4,
            },
            {
                description: "Я сохраню это в секрете.",
                power: 1,
            }
        ]
    },

    {
        hackerCard: {
            description: "Я буду шантажировать вас, используя некоторые из ваших старых чатов.",
            power: 4,
        },
        playerCards: [
            {
                description: "Я буду бороться с ним/ней.",
                power: 2,
            },
            {
                description: "Я сделаю то, чего он от меня хочет",
                power: 1,
            },
            {
                description: "Я подам в суд на кибер-травлю.",
                power: 5,
            }
        ]
    }
];

let playerLife = 5;
let hackerLife = 5;
let hackerWinnerMessage = "Game over: You got hacked!";
let playerWinnerMessage = "You defeated the hacker!";
let playerStartLife = parseInt(playerLife);
let hackerStartLife = parseInt(hackerLife);
let roundFinished = false;
let cardSelected = false;

updateScores();

document.querySelector(".game-board").classList.add("before-game");

let allCardElements = document.querySelectorAll(".card");

// Adds click handler to all player card elements
for(let i = 0; i < allCardElements.length; i++) {
    let card = allCardElements[i];
    if(card.classList.contains("player-card")) {
        card.addEventListener("click",function(e){
            cardClicked(this);
        });
    }
}


// When a card is clicked
function cardClicked(cardEl) {

    if(cardSelected) { return; }
    cardSelected = true;

    cardEl.classList.add("played-card");

    document.querySelector(".game-board").classList.add("card-selected");

    // Wait 500ms to reveal the hacker power
    setTimeout(function(){
        revealHackerPower();
    },500)

    // Wait 750ms to reveal the player power
    setTimeout(function(){
        revealPlayerPower();
    },800)

    // Wait 1250ms to compare the card scoers
    setTimeout(function(){
        compareCards();
    }, 1400);
}

// Shows the power level on the player card
function revealPlayerPower(){
    let playerCard = document.querySelector(".played-card");
    playerCard.classList.add("reveal-power");
}

// Shows the power level on the hacker card
function revealHackerPower(){
    let hackerCard = document.querySelector(".hacker-card");
    hackerCard.classList.add("reveal-power");
}

function compareCards(){
    let playerCard = document.querySelector(".played-card");
    let playerPowerEl = playerCard.querySelector(".power");

    let hackerCard = document.querySelector(".hacker-card");
    let hackerPowerEl = hackerCard.querySelector(".power");

    let playerPower = parseInt(playerPowerEl.innerHTML);
    let hackerPower = parseInt(hackerPowerEl.innerHTML);

    let powerDifference = playerPower - hackerPower;

    if (powerDifference < 0) {
        // Player Loses
        playerLife = playerLife + powerDifference;
        hackerCard.classList.add("better-card");
        playerCard.classList.add("worse-card");
        document.querySelector(".player-stats .thumbnail").classList.add("ouch");
    } else if (powerDifference > 0) {
        // Player Wins
        hackerLife = hackerLife - powerDifference;
        playerCard.classList.add("better-card");
        hackerCard.classList.add("worse-card");
        document.querySelector(".hacker-stats .thumbnail").classList.add("ouch");
    } else {
        playerCard.classList.add("tie-card");
        hackerCard.classList.add("tie-card");
    }

    updateScores();

    if(playerLife <= 0) {
        gameOver("Hacker");
    } else if (hackerLife <= 0){
        gameOver("Player")
    }

    roundFinished = true;

    document.querySelector("button.next-turn").removeAttribute("disabled");
}

// Shows the winner message
function gameOver(winner) {
    document.querySelector(".game-board").classList.add("game-over");
    document.querySelector(".winner-section").style.display = "flex";
    document.querySelector(".winner-section").classList.remove("player-color");
    document.querySelector(".winner-section").classList.remove("hacker-color");

    if(winner == "Hacker") {
        document.querySelector(".winner-message").innerHTML = hackerWinnerMessage;
        document.querySelector(".winner-section").classList.add("hacker-color");
    } else {
        document.querySelector(".winner-message").innerHTML = playerWinnerMessage;
        document.querySelector(".winner-section").classList.add("player-color");
    }
}

function exitGame() {
    window.location.href = '../map.html';
}

function updateScores(){

    // Update life totals for each player
    document.querySelector(".player-stats .life-total").innerHTML = playerLife;
    document.querySelector(".hacker-stats .life-total").innerHTML = hackerLife;

    // Update the player lifebar
    let playerPercent = playerLife / playerStartLife * 100;
    if (playerPercent < 0) {
        playerPercent = 0;
    }
    document.querySelector(".player-stats .life-left").style.height =  playerPercent + "%";

    // Update the hacker lifebar
    let hackerPercent = hackerLife / hackerStartLife * 100;
    if (hackerPercent < 0) {
        hackerPercent = 0;
    }
    document.querySelector(".hacker-stats .life-left").style.height =  hackerPercent + "%";
}


// Shuffles an array
function shuffleArray(a) {
    let j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function startGame() {

    document.querySelector(".game-board").classList.remove("before-game");
    document.querySelector(".game-board").classList.add("during-game");
    playTurn();
}

// Plays one turn of the game
function playTurn() {

    roundFinished = true;
    cardSelected = false;

    document.querySelector(".game-board").classList.remove("card-selected");

    // Remove "ouch" class from player and hacker thumbnails
    document.querySelector(".hacker-stats .thumbnail").classList.remove("ouch");
    document.querySelector(".player-stats .thumbnail").classList.remove("ouch");

    // Hides the "next turn" button, will show again when turn is over
    document.querySelector(".next-turn").setAttribute("disabled", "true");

    for(let i = 0; i < allCardElements.length; i++) {
        let card = allCardElements[i];
        card.classList.remove("showCard");
    }

    setTimeout(function(){
        revealCards();
    }, 500);
}

function revealCards(){
    let j = 0;
    let cardIndexes = shuffleArray([0, 1, 2]);

    // Get scenario cards
    console.log("scenarios.length == " + scenarios.length);

    let randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
    let scenario = scenarios[randomScenarioIndex];
    console.log(scenario.hackerCard.description);

    scenarios.splice(randomScenarioIndex, 1);

    console.log("scenarios.length after splice == " + scenarios.length);

    let hackerCard = scenario.hackerCard;
    let hackerCardEl = document.querySelector(".hacker-area .card");

    // Contents of the player cards
    let playerCards = scenario.playerCards;

    for(let i = 0; i < allCardElements.length; i++) {
        let card = allCardElements[i];

        card.classList.remove("worse-card");
        card.classList.remove("better-card");
        card.classList.remove("played-card");
        card.classList.remove("tie-card");
        card.classList.remove("prepared");
        card.classList.remove("reveal-power");

        // Display the payer card details
        if(card.classList.contains("player-card")) {
            card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
            card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
            j++;
        }

        // Reveal each card one by one with a delay of 100ms
        setTimeout(function(card, j){
            return function() {
                card.classList.remove("prepared");
                card.style.display = "block";
                card.classList.add("showCard");
            }
        }(card,i), parseInt(i+1) * 200);
    }

    // Display the hacker card
    hackerCardEl.querySelector(".text").innerHTML = hackerCard.description;
    hackerCardEl.querySelector(".power").innerHTML = hackerCard.power;
}
