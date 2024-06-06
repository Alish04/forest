const scenarios = [
    // Массив сценариев для игры, каждый сценарий представлен объектом с полями 'text', 'correctAnswer' и 'explanation'
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
// Текущий индекс сценария, изначально установлен на 0
let correctAnswers = 0;
// Количество правильных ответов, изначально равно 0
let timerInterval;
// Переменная для хранения интервала таймера

function loadScenario() {
    // Функция для загрузки текущего сценария
    const scenarioText = document.getElementById("scenarioText");
    // Получаем элемент, в который будет отображен текст сценария
    scenarioText.textContent = scenarios[currentScenarioIndex].text;
    // Устанавливаем текст текущего сценария
}

function startTimer(duration, display) {
    // Функция для запуска таймера
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        // Устанавливаем интервал, который срабатывает каждую секунду
        minutes = parseInt(timer / 60, 10);
        // Вычисляем количество минут
        seconds = parseInt(timer % 60, 10);
        // Вычисляем количество секунд

        minutes = minutes < 10 ? "0" + minutes : minutes;
        // Добавляем ведущий ноль к минутам, если нужно
        seconds = seconds < 10 ? "0" + seconds : seconds;
        // Добавляем ведущий ноль к секундам, если нужно

        display.textContent = minutes + ":" + seconds;
        // Обновляем отображение таймера

        if (--timer < 0) {
            // Если время истекло
            clearInterval(timerInterval);
            // Останавливаем таймер
            acceptDecision();
            // Вызываем функцию обработки решения
        }
    }, 1000);
}

function makeDecision() {
    // Функция для обработки принятого решения
    clearInterval(timerInterval);
    // Останавливаем таймер
    const accessSelect = document.getElementById("accessSelect");
    // Получаем элемент выбора доступа
    const selectedValue = accessSelect.value;
    // Получаем выбранное пользователем значение
    const resultMessage = document.getElementById("result");
    // Получаем элемент для отображения сообщения о результате
    const explanation = document.getElementById("explanation");
    // Получаем элемент для отображения объяснения

    if (selectedValue === scenarios[currentScenarioIndex].correctAnswer) {
        // Проверяем, соответствует ли выбранное значение правильному ответу
        correctAnswers++;
        // Увеличиваем счетчик правильных ответов
        resultMessage.textContent = "Правильно! Вы приняли верное решение.";
        // Отображаем сообщение о правильном решении
    } else {
        resultMessage.textContent = "Неверно. Попробуйте снова.";
        // Отображаем сообщение о неправильном решении
        explanation.textContent = "Правильный ответ: " + scenarios[currentScenarioIndex].explanation;
        // Отображаем объяснение правильного ответа
    }

    currentScenarioIndex++;
    // Переходим к следующему сценарию
    if (currentScenarioIndex < scenarios.length) {
        // Если есть еще сценарии
        loadScenario();
        // Загружаем следующий сценарий
        document.getElementById("decision").style.display = "block";
        // Отображаем элемент принятия решения
        document.getElementById("scenario").style.display = "block";
        // Отображаем элемент сценария
        startTimer(60, document.getElementById("time"));
        // Запускаем таймер на 60 секунд
    } else {
        showResult();
        // Если сценарии закончились, показываем результат
    }
}

function showResult() {
    // Функция для отображения результата игры
    document.getElementById("gameResult").style.display = "block";
    // Отображаем элемент с результатом игры
    document.getElementById("scenario").style.display = "none";
    // Скрываем элемент сценария
    document.getElementById("decision").style.display = "none";
    // Скрываем элемент принятия решения
    const score = document.getElementById("score");
    // Получаем элемент для отображения счета
    score.textContent = "Правильных ответов: " + correctAnswers + " из " + scenarios.length;
    // Устанавливаем текст с количеством правильных ответов
}

function tryAgain() {
    // Функция для повторного начала игры
    currentScenarioIndex = 0;
    // Сбрасываем текущий индекс сценария
    correctAnswers = 0;
    // Сбрасываем количество правильных ответов
    document.getElementById("gameResult").style.display = "none";
    // Скрываем элемент с результатом игры
    document.getElementById("decision").style.display = "block";
    // Отображаем элемент принятия решения
    document.getElementById("scenario").style.display = "block";
    // Отображаем элемент сценария
    loadScenario();
    // Загружаем первый сценарий
    startTimer(60, document.getElementById("time"));
    // Запускаем таймер на 60 секунд
}

function exit() {
    // Функция для выхода из игры
    clearInterval(timerInterval);
    // Останавливаем таймер
    document.getElementById("gameResult").style.display = "none";
    // Скрываем элемент с результатом игры
    window.location.href='map.html'
    // Перенаправление на страницу карты
}

// Load initial scenario and start timer
// Загружаем начальный сценарий и запускаем таймер
loadScenario();
startTimer(60, document.getElementById("time"));

document.getElementById('completeGameBtn').addEventListener('click', function() {
    // Добавление обработчика события для кнопки завершения игры
    let completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
    // Получение массива завершенных уровней из localStorage или пустого массива
    if (!completedLevels.includes(1)) {
        // Проверка, включен ли текущий уровень в массив завершенных
        completedLevels.push(1);
        // Добавление текущего уровня в массив завершенных
        localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
        // Сохранение обновленного массива в localStorage
    }
    // Перенаправление обратно на карту
    window.location.href = "../map.html";
});
