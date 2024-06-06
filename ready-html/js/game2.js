document.addEventListener('DOMContentLoaded', () => {
    // Событие 'DOMContentLoaded' запускается, когда весь HTML был полностью загружен и разобран
    const passwordInput = document.getElementById('passwordInput');
    // Получение элемента ввода пароля по его ID
    const completeGameBtn = document.getElementById('completeGameBtn');
    // Получение кнопки завершения игры по её ID

    passwordInput.addEventListener('input', handlePasswordInput);
    // Добавление обработчика события для ввода пароля
    completeGameBtn.addEventListener('mouseover', maybeMoveButton);
    // Добавление обработчика события для наведения мыши на кнопку завершения игры

    function handlePasswordInput() {
        // Функция для обработки ввода пароля
        const password = passwordInput.value;
        // Получение значения пароля
        const lengthFulfilled = password.length >= 9;
        // Проверка длины пароля
        const uppercaseFulfilled = /[A-Z]/.test(password);
        // Проверка наличия заглавной буквы в пароле
        const numberFulfilled = /\d/.test(password);
        // Проверка наличия цифры в пароле
        const specialFulfilled = /[\!\@\#\$\%\^\&\*\(\)\_\+\-]/.test(password);
        // Проверка наличия специального символа в пароле
        const notCommonFulfilled = !['qwerty', '1234'].includes(password);
        // Проверка, что пароль не является общим

        document.getElementById('length').classList.toggle('fulfilled', lengthFulfilled);
        // Добавление или удаление класса 'fulfilled' для элемента длины пароля
        document.getElementById('uppercase').classList.toggle('fulfilled', uppercaseFulfilled);
        // Добавление или удаление класса 'fulfilled' для элемента заглавной буквы
        document.getElementById('number').classList.toggle('fulfilled', numberFulfilled);
        // Добавление или удаление класса 'fulfilled' для элемента цифры
        document.getElementById('special').classList.toggle('fulfilled', specialFulfilled);
        // Добавление или удаление класса 'fulfilled' для элемента специального символа
        document.getElementById('notCommon').classList.toggle('fulfilled', notCommonFulfilled);
        // Добавление или удаление класса 'fulfilled' для элемента общих паролей

        const allFulfilled = lengthFulfilled && uppercaseFulfilled && numberFulfilled && specialFulfilled && notCommonFulfilled;
        // Проверка выполнения всех условий
        completeGameBtn.disabled = !allFulfilled;
        // Отключение кнопки завершения игры, если условия не выполнены
    }

    function maybeMoveButton(event) {
        // Функция для возможного перемещения кнопки
        if (completeGameBtn.disabled) {
            // Проверка, отключена ли кнопка
            moveButton(event);
            // Вызов функции перемещения кнопки
        }
    }

    function moveButton(event) {
        // Функция для перемещения кнопки
        const moveDistance = 200; // Увеличенное расстояние перемещения
        const currentLeft = completeGameBtn.offsetLeft;
        // Текущее положение кнопки по оси X
        const currentTop = completeGameBtn.offsetTop;
        // Текущее положение кнопки по оси Y
        let newX = currentLeft + (Math.random() * moveDistance - moveDistance / 2);
        // Новая позиция по оси X с учетом случайного смещения
        let newY = currentTop + (Math.random() * moveDistance - moveDistance / 2);
        // Новая позиция по оси Y с учетом случайного смещения

        // Обеспечение нахождения кнопки в видимой области
        const maxX = window.innerWidth - completeGameBtn.offsetWidth;
        // Максимальная позиция по оси X
        const maxY = window.innerHeight - completeGameBtn.offsetHeight;
        // Максимальная позиция по оси Y

        if (newX < 0) newX = 0;
        // Проверка и установка минимальной позиции по оси X
        if (newX > maxX) newX = maxX;
        // Проверка и установка максимальной позиции по оси X
        if (newY < 0) newY = 0;
        // Проверка и установка минимальной позиции по оси Y
        if (newY > maxY) newY = maxY;
        // Проверка и установка максимальной позиции по оси Y

        completeGameBtn.style.position = 'fixed';
        // Установка позиции кнопки как 'fixed'
        completeGameBtn.style.left = `${newX}px`;
        // Установка новой позиции по оси X
        completeGameBtn.style.top = `${newY}px`;
        // Установка новой позиции по оси Y
    }

    document.getElementById('exitButton').addEventListener('click', () => {
        // Добавление обработчика события для кнопки выхода
        window.location.href = 'map.html';
        // Перенаправление на страницу карты
    });
});

document.getElementById('completeGameBtn').addEventListener('click', function() {
    // Обработчик события для кнопки завершения игры
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
