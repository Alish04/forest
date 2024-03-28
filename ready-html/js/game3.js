const words = ["БАБОЧКА", "ЗВЕЗДА", "СКАЗКА", "МЕЧТА", "ВОЛШЕБСТВО", "ЗВЕЗДОПАД", "МАГИЯ", "ЛУНА", "СОЛНЦЕ", "МЕЧТА"];
const shift = 3;
let mode = "decipher"; // По умолчанию режим расшифровки
let selectedWord = "";
let displayedWord = "";

function setupGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    if (mode === "decipher") {
        displayedWord = shiftText(selectedWord, shift);
        document.getElementById('task').innerText = `Расшифруйте слово: ${displayedWord}`;
    } else {
        displayedWord = selectedWord;
        document.getElementById('task').innerText = `Зашифруйте слово: ${displayedWord}`;
    }
}

window.onload = setupGame;

function shiftText(text, shift) {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        const shifted = ((code - 1072 + shift) % 32) + 1072;
        return String.fromCharCode(shifted);
    }).join('');
}

function submitAnswer() {
    const userInput = document.getElementById('userInput').value;
    if (mode === "decipher") {
        if (userInput.toLowerCase() === selectedWord.toLowerCase()) {
            document.getElementById('result').innerText = "Правильно!";
            result.style.color = "green";
        } else {
            document.getElementById('result').innerText = "Неправильно, попробуйте снова.";
            result.style.color = "red";
        }
    } else {
        const expectedEncryptedWord = shiftText(selectedWord, shift);
        if (userInput.toLowerCase() === expectedEncryptedWord.toLowerCase()) {
            document.getElementById('result').innerText = "Правильно!";
        } else {
            document.getElementById('result').innerText = "Неправильно, попробуйте снова.";
        }
    }
}

function changeMode() {
    if (mode === "decipher") {
        mode = "cipher";
    } else {
        mode = "decipher";
    }
    document.getElementById('userInput').value = ''; // Очищаем поле ввода
    document.getElementById('result').innerText = ''; // Очищаем результат
    setupGame();
}

function exitGame() {
    window.location.href='game.html';
}
