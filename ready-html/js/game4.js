const scenarios = [
    {
        text: "Ваша компания разрабатывает новый продукт. На кого вы предоставите доступ к конфиденциальным техническим спецификациям?",
        correctAnswer: "employee1",
        explanation: "Сотрудник 1 имеет техническую экспертизу и должен получить доступ к конфиденциальным техническим спецификациям."
    },
    {
        text: "На вашем проекте появился новый участник. Кому вы предоставите доступ к общему хранилищу документов?",
        correctAnswer: "employee2",
        explanation: "Сотрудник 2, как новый участник проекта, должен получить доступ к общему хранилищу документов для ознакомления с проектной документацией."
    },
    {
        text: "Вы получили запрос на доступ к финансовым отчетам. Какому сотруднику вы предоставите доступ?",
        correctAnswer: "employee3",
        explanation: "Сотрудник 3 имеет доступ к финансовой информации и должен получить доступ к финансовым отчетам."
    },
    {
        text: "Необходимо предоставить доступ к переговорной комнате для проведения важного совещания. Кто получит доступ?",
        correctAnswer: "employee1",
        explanation: "Сотрудник 1, вероятно, имеет необходимые полномочия или ключи для доступа к переговорной комнате."
    },
    {
        text: "Важный клиент приезжает на встречу. Кому вы предоставите доступ к информации о его заказах?",
        correctAnswer: "employee3",
        explanation: "Сотрудник 3 имеет доступ к информации о заказах и клиентах, следовательно, должен получить доступ к информации о заказах важного клиента."
    },
    {
        text: "Требуется предоставить доступ к базе данных с клиентской информацией для создания нового маркетингового отчета. Кто получит доступ?",
        correctAnswer: "employee2",
        explanation: "Сотрудник 2, ответственный за маркетинг, должен получить доступ к базе данных для создания отчета."
    },
    {
        text: "Критически важные данные были скомпрометированы. Кому нужно ограничить доступ?",
        correctAnswer: "employee3",
        explanation: "Сотрудник 3, ответственный за безопасность, должен ограничить доступ к критически важным данным."
    },
];
let currentScenarioIndex = 0;
let correctAnswers = 0;
let timerInterval;

function loadScenario() {
    const scenarioText = document.getElementById("scenarioText");
    scenarioText.textContent = scenarios[currentScenarioIndex].text;
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            acceptDecision();
        }
    }, 1000);
}

function makeDecision() {
    clearInterval(timerInterval);
    const accessSelect = document.getElementById("accessSelect");
    const selectedValue = accessSelect.value;
    const resultMessage = document.getElementById("result");
    const explanation = document.getElementById("explanation");

    if (selectedValue === scenarios[currentScenarioIndex].correctAnswer) {
        correctAnswers++;
        resultMessage.textContent = "Правильно! Вы приняли верное решение.";
    } else {
        resultMessage.textContent = "Неверно. Попробуйте снова.";
        explanation.textContent = "Правильный ответ: " + scenarios[currentScenarioIndex].explanation;
    }

    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        loadScenario();
        document.getElementById("decision").style.display = "block";
        document.getElementById("scenario").style.display = "block";
        startTimer(60, document.getElementById("time"));
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("gameResult").style.display = "block";
    document.getElementById("scenario").style.display = "none";
    document.getElementById("decision").style.display = "none";
    const score = document.getElementById("score");
    score.textContent = "Правильных ответов: " + correctAnswers + " из " + scenarios.length;
}

function tryAgain() {
    currentScenarioIndex = 0;
    correctAnswers = 0;
    document.getElementById("gameResult").style.display = "none";
    document.getElementById("decision").style.display = "block";
    document.getElementById("scenario").style.display = "block";
    loadScenario();
    // Запуск таймера только при начале новой игры
    startTimer(60, document.getElementById("time"));
}

function exit() {
    clearInterval(timerInterval);
    document.getElementById("gameResult").style.display = "none";
}

// Load initial scenario and start timer
loadScenario();
startTimer(60, document.getElementById("time"));

