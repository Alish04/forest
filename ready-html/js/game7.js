var scenarios = [
    {
        hackerCard : {
            description : "I am sending you message by using fake ID.",
            power : 3,
        },
        playerCards : [
            {
                description : "I always reply a person whether i know him/her or not.",
                power : 1,
            },
            {
                description : "I never reply a person I don't know.",
                power : 4,
            },
            {
                description : "First i will ask him/her than i reply.",
                power : 2,
            }
        ]
    },
    {
        hackerCard : {
            description : "I asked some information about your friend",
            power : 3,
        },
        playerCards : [
            {
                description : "I will never tell him/her about my friend.",
                power : 3,
            },
            {
                description : "I will tell him/her about my freind.",
                power : 1,
            },
            {
                description : "First i will ask from him/her about my friend.",
                power : 4,
            }
        ]
    },
    {
        hackerCard : {
            description : "i want you to send me money because i have all your personal information ",
            power : 4,
        },
        playerCards : [
            {
                description : "I will send you money.",
                power : 0,
            },
            {
                description : "I will call the police.",
                power : 4,
            },
            {
                description : "I will not do anything.",
                power : 2,
            }
        ]
    },
    {
        hackerCard : {
            description : "I pretend to be your friend and asked you some sensitive information",
            power : 3,
        },
        playerCards : [
            {
                description : "I will tell him/her all information.",
                power : 1,
            },
            {
                description : "I will not tell him .",
                power : 2,
            },
            {
                description : "I will tell him personally by meeting him. ",
                power : 4,
            }
        ]
    },
    {
        hackerCard : {
            description : "I will ask you to send me your private images",
            power : 3,
        },
        playerCards : [
            {
                description : "I will never send that to anybody.",
                power : 3,
            },
            {
                description : "I will tell my parents regarding this.",
                power : 4,
            },
            {
                description : "I will keep it a secret",
                power : 1,
            }
        ]
    },

    {
        hackerCard : {
            description : "I will blackmail you by using some of your older chats",
            power : 4,
        },
        playerCards : [
            {
                description : "I will fight with him/her.",
                power : 2,
            },
            {
                description : "I will do what he want from me",
                power : 1,
            },
            {
                description : "I will file a case of cyber bullying.",
                power : 5,
            }
        ]
    },

    // {
    //   hackerCard : {
    //     description : "",
    //     power : 2,
    //   },
    //   playerCards : [
    //     {
    //       description : "I use Anti-Virus Protection & Firewall to protect my system.",
    //       power : 4,
    //     },
    //     {
    //       description : "I refused to use your USB as my system was not having Anti-Virus Protection & Firewall.",
    //       power : 3,
    //     },
    //     {
    //       description : "I used your USB as I am not afraid of my system getting corrupted.",
    //       power : 1,
    //     }
    //   ]
    // },
    // {
    //   hackerCard : {
    //     description : "Isdfgdhfjgkhhes.",
    //     power : 2,
    //   },
    //   playerCards : [
    //     {
    //       description : "You can't because I have turned on Automatic Updates for my operating system.",
    //       power : 4,
    //     },
    //     {
    //       description : "I use web browsers such as Chrome or Firefox that receive frequent, automatic security updates.",
    //       power : 3,
    //     },
    //     {
    //       description : "I don't update my softwares nor do I download security updates.",
    //       power : 1,
    //     }
    //   ]
    //}
];


var playerLife = 5;
var hackerLife = 5;

// Message when the game is over
var hackerWinnerMessage = "Game over: You got hacked!";
var playerWinnerMessage = "You defeated the hacker!";


// Game code starts here
var playerStartLife = parseInt(playerLife);
var hackerStartLife = parseInt(hackerLife);

var roundFinished = false;
var cardSelected = false;

updateScores();

document.querySelector(".game-board").classList.add("before-game");

var allCardElements = document.querySelectorAll(".card");

// Adds click handler to all player card elements
for(var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];
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
    var playerCard = document.querySelector(".played-card");
    playerCard.classList.add("reveal-power");
}

// Shows the power level on the hacker card
function revealHackerPower(){
    var hackerCard = document.querySelector(".hacker-card");
    hackerCard.classList.add("reveal-power");
}

function compareCards(){
    var playerCard = document.querySelector(".played-card");
    var playerPowerEl = playerCard.querySelector(".power");

    var hackerCard = document.querySelector(".hacker-card");
    var hackerPowerEl = hackerCard.querySelector(".power");

    var playerPower = parseInt(playerPowerEl.innerHTML);
    var hackerPower = parseInt(hackerPowerEl.innerHTML);

    var powerDifference = playerPower - hackerPower;

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


// Starts the game
function startGame() {

    document.querySelector(".game-board").classList.remove("before-game");
    document.querySelector(".game-board").classList.add("during-game");
    playTurn();
}


// Start the game over from scratch
function restartGame(){
    document.querySelector(".game-board").classList.remove("game-over");
    document.querySelector(".game-board").classList.remove("during-game");
    document.querySelector(".game-board").classList.add("before-game");

    document.querySelector(".winner-section").style.display = "none";
    document.querySelector(".hacker-card").style.display = "none";

    var cards = allCardElements;

    document.querySelector("button").removeAttribute("disabled");

    for(var i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
    }

    playerLife = playerStartLife;
    hackerLife = hackerStartLife;

    roundFinished = true;
    cardSelected = false;

    updateScores();
}

// Updates the displayed life bar and life totals
function updateScores(){

    // Update life totals for each player
    document.querySelector(".player-stats .life-total").innerHTML = playerLife;
    document.querySelector(".hacker-stats .life-total").innerHTML = hackerLife;

    // Update the player lifebar
    var playerPercent = playerLife / playerStartLife * 100;
    if (playerPercent < 0) {
        playerPercent = 0;
    }
    document.querySelector(".player-stats .life-left").style.height =  playerPercent + "%";

    // Update the hacker lifebar
    var hackerPercent = hackerLife / hackerStartLife * 100
    if (hackerPercent < 0) {
        hackerPercent = 0;
    }
    document.querySelector(".hacker-stats .life-left").style.height =  hackerPercent + "%";
}


// Shuffles an array
function shuffleArray(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
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

    for(var i = 0; i < allCardElements.length; i++) {
        var card = allCardElements[i];
        card.classList.remove("showCard");
    }

    setTimeout(function(){
        revealCards();
    }, 500);
}

function revealCards(){


    var j = 0;
    var cardIndexes = shuffleArray([0, 1, 2]);

    // Get scenario cards
    console.log("scenarios.length == " + scenarios.length);

    var randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
    var scenario = scenarios[randomScenarioIndex];
    console.log(scenario.hackerCard.description);

    scenarios.splice(randomScenarioIndex, 1);

    console.log("scenarios.length after splice == " + scenarios.length);

    var hackerCard = scenario.hackerCard;
    var hackerCardEl = document.querySelector(".hacker-area .card");

    // Contents of the player cards
    var playerCards = scenario.playerCards;

    for(var i = 0; i < allCardElements.length; i++) {
        var card = allCardElements[i];

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
