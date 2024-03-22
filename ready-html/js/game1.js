let questions;
questions = [
    {
        "question": "Что из перечисленного НЕ является основным принципом информационной безопасности?",
        "answers": ["Конфиденциальность", "Целостность", "Доступность", "Производительность"],
        "correctAnswer": "Производительность"
    },
    {
        "question": "Что такое аутентификация?",
        "answers": ["Процесс определения того, кто вы есть", "Процесс определения того, что вы можете делать", "Процесс шифрования информации", "Процесс резервного копирования данных"],
        "correctAnswer": "Процесс определения того, кто вы есть"
    },
    {
        "question": "Что такое авторизация?",
        "answers": ["Процесс определения того, кто вы есть", "Процесс определения того, что вы можете делать", "Процесс шифрования информации", "Процесс резервного копирования данных"],
        "correctAnswer": "Процесс определения того, что вы можете делать"
    },
    {
        "question": "Что такое фишинг?",
        "answers": ["Способ обмана людей с целью заставить их раскрыть конфиденциальную информацию", "Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"],
        "correctAnswer": "Способ обмана людей с целью заставить их раскрыть конфиденциальную информацию"
    },
    {
        "question": "Что такое инсайдерская угроза?",
        "answers": ["Угроза, исходящая от сотрудника, подрядчика или другого инсайдера", "Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"],
        "correctAnswer": "Угроза, исходящая от сотрудника, подрядчика или другого инсайдера"
    },
    {
        "question": "Что такое утечка данных?",
        "answers": ["Несанкционированный доступ к конфиденциальным данным", "Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"],
        "correctAnswer": "Несанкционированный доступ к конфиденциальным данным"
    },
    {
        "question": "Что такое DoS-атака?",
        "answers": ["Тип вредоносного ПО", "Атака, направленная на нарушение доступности услуг", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"],
        "correctAnswer": "Атака, направленная на нарушение доступности услуг"
    },
    {
        "question": "Что такое социальная инженерия?",
        "answers": ["Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Метод обмана людей с целью совершения действий, ставящих под угрозу безопасность", "Тип криптографического алгоритма"],
        "correctAnswer": "Метод обмана людей с целью совершения действий, ставящих под угрозу безопасность"
    },
    {
        "question": "Что из перечисленного НЕ является мерой защиты информации?",
        "answers": ["Шифрование", "Контроль доступа", "Обновление ПО", "Обучение сотрудников"],
        "correctAnswer": "Обновление ПО"
    },
    {
        "question": "Что такое план реагирования на инциденты?",
        "answers": ["План действий на случай стихийных бедствий", "План действий на случай нарушения информационной безопасности", "План резервного копирования данных", "План обучения сотрудников"],
        "correctAnswer": "План действий на случай нарушения информационной безопасности"
    }
];

function shuffleQuestions(questions) {
    // Алгоритм перемешивания Фишера-Йетса
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function displayQuiz(questions) {
    const quizContainer = document.getElementById("quiz-container");
    for (const question of questions) {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionElement.appendChild(questionText);

        const answerList = document.createElement("ul");
        for (let i = 0; i < question.answers.length; i++) {
            const answerElement = document.createElement("li");
            const answerInput = document.createElement("input");
            answerInput.type = "radio";
            answerInput.name = question.question;
            answerInput.value = question.answers[i]; // Используем текст ответа
            answerElement.appendChild(answerInput);

            const answerLabel = document.createElement("label");
            answerLabel.textContent = question.answers[i];
            answerElement.appendChild(answerLabel);

            answerList.appendChild(answerElement);
        }
        questionElement.appendChild(answerList);

        quizContainer.appendChild(questionElement);
    }
}


function submitAnswers() {
    const answers = [];
    const questions = document.getElementsByClassName("question");
    for (const question of questions) {
        const answerInput = question.querySelector('input[type="radio"]:checked');
        if (answerInput) {
            answers.push(answerInput.value);
        } else {
            answers.push(null);
        }
    }

    checkAnswers(answers); // Вызываем функцию checkAnswers() с массивом ответов
}


function checkAnswers(answers) {
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
        const currentQuestion = questions[i];
        const correctAnswer = currentQuestion.correctAnswer;
        const userAnswer = answers[i];

        if (userAnswer === correctAnswer) {
            score++;
        }
    }

    displayResults(score);
}


// Функция для отображения результатов
function displayResults(score) {
    const resultsContainer = document.getElementById("results-container");
    const resultText = `Ваш результат: ${score} из ${questions.length}`;

    // Создаем элемент <p>
    const paragraphElement = document.createElement("p");
    // Задаем текст элементу
    paragraphElement.textContent = resultText;

    // Очищаем содержимое контейнера
    resultsContainer.innerHTML = '';
    // Добавляем элемент <p> в контейнер
    resultsContainer.appendChild(paragraphElement);
}



shuffleQuestions(questions);
displayQuiz(questions);

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitAnswers);