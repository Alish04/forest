document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "Что из перечисленного НЕ является основным принципом информационной безопасности?", answers: ["Конфиденциальность", "Целостность", "Доступность", "Производительность"], correct: 3 },
        { question: "Что такое аутентификация?", answers: ["Процесс определения того, кто вы есть", "Процесс определения того, что вы можете делать", "Процесс шифрования информации", "Процесс резервного копирования данных"], correct: 0 },
        { question: "Что такое авторизация?", answers: ["Процесс определения того, кто вы есть", "Процесс определения того, что вы можете делать", "Процесс шифрования информации", "Процесс резервного копирования данных"], correct: 1 },
        { question: "Что такое фишинг?", answers: ["Способ обмана людей с целью заставить их раскрыть конфиденциальную информацию", "Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"], correct: 0 },
        { question: "Что такое инсайдерская угроза?", answers: ["Угроза, исходящая от сотрудника, подрядчика или другого инсайдера", "Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"], correct: 0 },
        { question: "Что такое утечка данных?", answers: ["Несанкционированный доступ к конфиденциальным данным", "Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"], correct: 0 },
        { question: "Что такое DoS-атака?", answers: ["Тип вредоносного ПО", "Атака, направленная на нарушение доступности услуг", "Метод атаки на компьютерные сети", "Тип криптографического алгоритма"], correct: 1 },
        { question: "Что такое социальная инженерия?", answers: ["Тип вредоносного ПО", "Метод атаки на компьютерные сети", "Метод обмана людей с целью совершения действий, ставящих под угрозу безопасность", "Тип криптографического алгоритма"], correct: 2 },
        { question: "Что из перечисленного НЕ является мерой защиты информации?", answers: ["Шифрование", "Контроль доступа", "Обновление ПО", "Обучение сотрудников"], correct: 2 },
        { question: "Что такое план реагирования на инциденты?", answers: ["План действий на случай стихийных бедствий", "План действий на случай нарушения информационной безопасности", "План резервного копирования данных", "План обучения сотрудников"], correct: 1 },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            document.getElementById('quiz-container').style.display = 'none';
            const resultContainer = document.getElementById('result');
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = `<div id="resultText">ВАШ РЕЗУЛЬТАТ: ${score} из ${questions.length}</div>
            <button id="retry" onclick="window.location.reload()">Повторить</button>
            <button id="exit" onClick="exitQuiz()">Выход</button>
            `;
            // Показываем кнопки, которые были скрыты
            return;
        }

        const question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.question;
        const answersUl = document.getElementById('answers');
        answersUl.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const li = document.createElement('li');
            li.textContent = answer;
            li.addEventListener('click', () => selectAnswer(index));
            answersUl.appendChild(li);
        });
    }

    document.getElementById('retry').addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('result');
        document.getElementById('quiz-container');
        showQuestion();
    });

    showQuestion();

    function selectAnswer(index) {
        if (index === questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        showQuestion();
    }

});
window.exitQuiz = function() {
    window.location.href = '../game.html';
}