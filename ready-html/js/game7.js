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
                power: 5,
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
                power: 5,
            },
            {
                description: "Я расскажу ему/ей о своем друге.",
                power: 1,
            },
            {
                description: "Сначала я спрошу у него/нее о моем друге.",
                power: 2,
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
                power: 6,
            },
            {
                description: "Я ничего не буду делать.",
                power: 5,
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
                power: 5,
            },
            {
                description: "Я расскажу ему об этом лично, когда встречусь с ним.",
                power: 3,
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
                power: 4,
            },
            {
                description: "Я расскажу об этом своим родителям.",
                power: 5,
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
                power: 5,
            },
            {
                description: "Я сделаю то, чего он от меня хочет",
                power: 1,
            },
            {
                description: "Я подам в суд на кибер-травлю.",
                power: 6,
            }
        ]
    }
];

let playerLife = 5;
let hackerLife = 5;
// Устанавливаем начальное количество жизней игрока и хакера
let hackerWinnerMessage = "Игра окончилась: вас взломали!";
let playerWinnerMessage = "Вы победили хакера!";
// Сообщения о победе хакера и игрока
let playerStartLife = parseInt(playerLife);
let hackerStartLife = parseInt(hackerLife);
// Преобразование начального количества жизней в целые числа
let roundFinished = false;
let cardSelected = false;
// Переменные для отслеживания завершения раунда и выбора карты

updateScores();
// Обновление счетов жизней

document.querySelector(".game-board").classList.add("before-game");
// Добавление класса 'before-game' к игровому полю

let allCardElements = document.querySelectorAll(".card");
// Получение всех элементов карт

// Добавляем обработчик событий на все карты игрока
for(let i = 0; i < allCardElements.length; i++) {
    let card = allCardElements[i];
    if(card.classList.contains("player-card")) {
        card.addEventListener("click", function(e){
            cardClicked(this);
        });
    }
}

// Когда карта выбрана
function cardClicked(cardEl) {
    if(cardSelected) { return; }
    cardSelected = true;
    // Если карта уже выбрана, выходим из функции

    cardEl.classList.add("played-card");
    // Добавление класса 'played-card' к выбранной карте

    document.querySelector(".game-board").classList.add("card-selected");
    // Добавление класса 'card-selected' к игровому полю

    // Ожидаем 500 мс перед раскрытием силы хакера
    setTimeout(function(){
        revealHackerPower();
    }, 500);

    // Ожидаем 750 мс перед раскрытием силы игрока
    setTimeout(function(){
        revealPlayerPower();
    }, 800);

    // Ожидаем 1250 мс перед сравнением силы карт
    setTimeout(function(){
        compareCards();
    }, 1400);
}

// Показывает уровень силы на карте игрока
function revealPlayerPower(){
    let playerCard = document.querySelector(".played-card");
    playerCard.classList.add("reveal-power");
}

// Показывает уровень силы на карте хакера
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
        // Игрок проиграл
        playerLife = playerLife + powerDifference;
        hackerCard.classList.add("better-card");
        playerCard.classList.add("worse-card");
        document.querySelector(".player-stats .thumbnail").classList.add("ouch");
    } else if (powerDifference > 0) {
        // Игрок выиграл
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
        gameOver("Player");
    }

    roundFinished = true;

    document.querySelector("button.next-turn").removeAttribute("disabled");
}

// Показывает сообщение о победителе
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
    window.location.href = 'map.html';
}

function updateScores() {
    // Обновление количества жизней для каждого игрока
    document.querySelector(".player-stats .life-total").innerHTML = playerLife;
    document.querySelector(".hacker-stats .life-total").innerHTML = hackerLife;

    // Обновление шкалы жизней игрока
    let playerPercent = playerLife / playerStartLife * 100;
    if (playerPercent < 0) {
        playerPercent = 0;
    }
    document.querySelector(".player-stats .life-left").style.height =  playerPercent + "%";

    // Обновление шкалы жизней хакера
    let hackerPercent = hackerLife / hackerStartLife * 100;
    if (hackerPercent < 0) {
        hackerPercent = 0;
    }
    document.querySelector(".hacker-stats .life-left").style.height =  hackerPercent + "%";
}

// Перемешивает массив
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

// Проигрывает один ход игры
function playTurn() {
    roundFinished = true;
    cardSelected = false;

    document.querySelector(".game-board").classList.remove("card-selected");

    // Удаление класса 'ouch' с миниатюр игрока и хакера
    document.querySelector(".hacker-stats .thumbnail").classList.remove("ouch");
    document.querySelector(".player-stats .thumbnail").classList.remove("ouch");

    // Скрывает кнопку 'следующий ход', покажет снова после завершения хода
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

    // Получаем карты сценария
    console.log("scenarios.length == " + scenarios.length);

    let randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
    let scenario = scenarios[randomScenarioIndex];
    console.log(scenario.hackerCard.description);

    scenarios.splice(randomScenarioIndex, 1);

    console.log("scenarios.length after splice == " + scenarios.length);

    let hackerCard = scenario.hackerCard;
    let hackerCardEl = document.querySelector(".hacker-area .card");

    // Содержимое карт игрока
    let playerCards = scenario.playerCards;

    for(let i = 0; i < allCardElements.length; i++) {
        let card = allCardElements[i];

        card.classList.remove("worse-card");
        card.classList.remove("better-card");
        card.classList.remove("played-card");
        card.classList.remove("tie-card");
        card.classList.remove("prepared");
        card.classList.remove("reveal-power");

        // Отображаем детали карты игрока
        if(card.classList.contains("player-card")) {
            card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
            card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
            j++;
        }

        // Показ каждой карты одна за другой с задержкой в 100 мс
        setTimeout(function(card, j){
            return function() {
                card.classList.remove("prepared");
                card.style.display = "block";
                card.classList.add("showCard");
            }
        }(card,i), parseInt(i+1) * 200);
    }

    // Отображение карты хакера
    hackerCardEl.querySelector(".text").innerHTML = hackerCard.description;
    hackerCardEl.querySelector(".power").innerHTML = hackerCard.power;
}
