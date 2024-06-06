const words = ["БАБОЧКА", "ЗВЕЗДА", "СКАЗКА", "МЕЧТА", "ВОЛШЕБСТВО", "ЗВЕЗДОПАД", "МАГИЯ", "ЛУНА", "СОЛНЦЕ", "МЕЧТА"];
// Массив слов, которые будут использоваться в игре
const shift = 3;
// Смещение для шифрования и расшифровки текста
let mode = "decipher"; // По умолчанию режим расшифровки
// Режим работы игры: "decipher" - расшифровка, "cipher" - шифровка
let selectedWord = "";
// Переменная для хранения выбранного слова
let displayedWord = "";
// Переменная для хранения отображаемого слова (зашифрованного или исходного)

function setupGame() {
    // Функция настройки игры
    selectedWord = words[Math.floor(Math.random() * words.length)];
    // Выбор случайного слова из массива
    if (mode === "decipher") {
        // Если режим - расшифровка
        displayedWord = shiftText(selectedWord, shift);
        // Шифруем выбранное слово и сохраняем его в displayedWord
        document.getElementById('task').innerText = `Расшифруйте слово: ${displayedWord}`;
        // Устанавливаем текст задания для расшифровки слова
    } else {
        // Если режим - шифровка
        displayedWord = selectedWord;
        // Отображаем исходное слово
        document.getElementById('task').innerText = `Зашифруйте слово: ${displayedWord}`;
        // Устанавливаем текст задания для шифровки слова
    }
}

window.onload = setupGame;
// Запуск функции настройки игры при загрузке страницы

function shiftText(text, shift) {
    // Функция для шифровки текста с заданным смещением
    return text.split('').map(char => {
        // Разбиваем текст на массив символов и применяем функцию для каждого символа
        const code = char.charCodeAt(0);
        // Получаем код символа
        const shifted = ((code - 1072 + shift) % 32) + 1072;
        // Вычисляем новый код символа с учетом смещения
        return String.fromCharCode(shifted);
        // Преобразуем новый код обратно в символ
    }).join('');
    // Объединяем массив символов обратно в строку
}

function submitAnswer() {
    // Функция для обработки ответа пользователя
    const userInput = document.getElementById('userInput').value;
    // Получаем введенное пользователем значение
    if (mode === "decipher") {
        // Если режим - расшифровка
        if (userInput.toLowerCase() === selectedWord.toLowerCase()) {
            // Проверяем, совпадает ли ответ пользователя с исходным словом
            document.getElementById('result').innerText = "Правильно!";
            // Отображаем сообщение о правильном ответе
            result.style.color = "green";
            // Устанавливаем цвет текста результата в зеленый
        } else {
            document.getElementById('result').innerText = "Неправильно, попробуйте снова.";
            // Отображаем сообщение о неправильном ответе
            result.style.color = "red";
            // Устанавливаем цвет текста результата в красный
        }
    } else {
        // Если режим - шифровка
        const expectedEncryptedWord = shiftText(selectedWord, shift);
        // Шифруем исходное слово для проверки
        if (userInput.toLowerCase() === expectedEncryptedWord.toLowerCase()) {
            // Проверяем, совпадает ли зашифрованное слово с ответом пользователя
            document.getElementById('result').innerText = "Правильно!";
            // Отображаем сообщение о правильном ответе
        } else {
            document.getElementById('result').innerText = "Неправильно, попробуйте снова.";
            // Отображаем сообщение о неправильном ответе
        }
    }
}

function changeMode() {
    // Функция для изменения режима игры
    if (mode === "decipher") {
        mode = "cipher";
        // Переключаем режим на "cipher"
    } else {
        mode = "decipher";
        // Переключаем режим на "decipher"
    }
    document.getElementById('userInput').value = ''; // Очищаем поле ввода
    // Очищаем поле ввода
    document.getElementById('result').innerText = ''; // Очищаем результат
    // Очищаем текст результата
    setupGame();
    // Настраиваем игру заново
}

function exitGame() {
    // Функция для выхода из игры
    window.location.href='map.html';
    // Перенаправление на страницу карты
}

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
