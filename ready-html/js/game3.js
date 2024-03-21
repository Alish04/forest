document.addEventListener('DOMContentLoaded', function () {
    const words = ["радуга", "сказка", "звезда", "молния", "лунный", "добрый", "лагерь", "сияние", "цветок", "дружба"];
    const shift = 3;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const encryptedWord = encryptCaesar(randomWord, shift);
    document.getElementById('encryptedWord').textContent = encryptedWord;

    const optionsContainer = document.getElementById('options');
    generateOptions(words, randomWord).forEach(option => {
        const div = document.createElement('div');
        div.textContent = option;
        div.onclick = function () {
            checkAnswer(option, randomWord);
        };
        optionsContainer.appendChild(div);
    });

    document.getElementById('submit').style.display = 'none';
});

function encryptCaesar(word, shift) {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    let encrypted = '';
    for (let i = 0; i < word.length; i++) {
        let char = word[i];
        let index = alphabet.indexOf(char);
        if (index == -1) {
            encrypted += char;
        } else {
            let shiftedIndex = (index + shift) % alphabet.length;
            encrypted += alphabet[shiftedIndex];
        }
    }
    return encrypted;
}

function generateOptions(words, correctWord) {
    let options = [correctWord];
    while (options.length < 4) {
        let option = words[Math.floor(Math.random() * words.length)];
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function checkAnswer(option, correctWord) {
    const result = document.getElementById('result');
    if (option === correctWord) {
        result.textContent = "Правильно!";
        result.style.color = "green";
    } else {
        result.textContent = "Неправильно. Правильный ответ: " + correctWord;
        result.style.color = "red";
    }

    // Скрываем варианты ответов после выбора
    const optionsContainer = document.getElementById('options');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }

    // Показываем кнопку для новой игры
    const submitButton = document.getElementById('submit');
    submitButton.textContent = "Новая игра";
    submitButton.style.display = 'inline-block';
    submitButton.onclick = function() {
        window.location.reload(); // Просто перезагружаем страницу для новой игры
    };

    // Добавляем обработчик для кнопки "Выйти из игры"
    const exitButton = document.getElementById('exit');
    exitButton.onclick = function() {
        // Можно перенаправить пользователя на главную страницу или выполнить другое действие
        window.location.href = 'game.html'; // Перенаправление на главную страницу
    };

}

// Вспомогательная функция шифрования методом Цезаря
function encryptCaesar(word, shift) {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    let encrypted = '';
    for (let char of word) {
        let index = alphabet.indexOf(char);
        if (index === -1) {
            encrypted += char; // Если символ не найден в алфавите, просто добавляем его без изменений
        } else {
            let shiftedIndex = (index + shift) % alphabet.length; // Вычисляем новый индекс с учетом сдвига
            encrypted += alphabet[shiftedIndex]; // Добавляем зашифрованный символ в результат
        }
    }
    return encrypted;
}
