let remainingTime = 10 * 60; // 10 минут в секундах

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            alert('Время вышло! Попробуйте снова.');
            // Заблокировать ввод данных после окончания времени
            document.getElementById('password').disabled = true;
            document.getElementById('decryptedWord').disabled = true;
            document.getElementById('finalPassword').disabled = true;
            // Скрыть кнопки
            document.querySelectorAll('button').forEach(button => button.style.visibility = 'hidden');
        }
    }, 1000);
}

window.onload = function () {
    const timeDisplay = document.getElementById('time');
    startTimer(remainingTime, timeDisplay);
};



function caesarCipher(str, shift) {
    const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    return str.toUpperCase().split('').map(char => {
        const index = alphabet.indexOf(char);
        if (index === -1) {
            return char; // символ не найден в алфавите, возвращаем его же
        }
        // Считаем новый индекс с учетом сдвига
        const newIndex = (index + shift) % alphabet.length;
        return alphabet[newIndex];
    }).join('');
}

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'qwerty') {
        // Используем шифрование для слова "Сатпаев" с сдвигом 5
        const encryptedWord = caesarCipher('Сатпаев', 5);
        document.getElementById('encryptedWord').textContent = `Зашифрованное слово: ${encryptedWord}`;
    } else {
        alert('Неверный пароль!');
    }
}

function checkDecryptedWord() {
    const decryptedWord = document.getElementById('decryptedWord').value;
    if (decryptedWord.toLowerCase() === 'сатпаев') {
        document.getElementById('finalPasswordHint').textContent = 'Пароль: success';
    } else {
        alert('Неверное слово!');
    }
}

function checkFinalPassword() {
    const finalPassword = document.getElementById('finalPassword').value;
    if (finalPassword === 'success') {
        document.getElementById('completionMessage').textContent = 'Поздравляем! Атака остановлена.';

        // Создание кнопки выхода
        const exitButton = document.createElement('button');
        exitButton.textContent = 'Выход';
        exitButton.onclick = function() {
            window.location.href='../map.html'; // Попытка закрыть текущее окно браузера
        };

        // Добавляем кнопку выхода на страницу
        const finalInputBox = document.getElementById('finalInput');
        finalInputBox.appendChild(exitButton);
    } else {
        alert('Неверный пароль!');
    }
}


document.getElementById('completeGameBtn').addEventListener('click', function() {
    // Here we assume level 1 corresponds to game 1
    let completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
    if (!completedLevels.includes(1)) {
        completedLevels.push(1);
        localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
    }
    // Redirect back to the map
    window.location.href = "../map.html";
});