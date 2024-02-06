const scrollableDiv = document.getElementById('container');
let isMouseDown = false;
let startX;
let scrollLeft;

// Начинаем скроллирование при зажатой левой кнопке мыши
scrollableDiv.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - scrollableDiv.offsetLeft;
    scrollLeft = scrollableDiv.scrollLeft;
});

// Продолжаем скроллирование при перемещении мыши, если кнопка зажата
scrollableDiv.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollableDiv.offsetLeft;
    const walk = (x - startX) * 2; // Умножаем на 2 для более быстрого скроллинга
    scrollableDiv.scrollLeft = scrollLeft - walk;
});

// Заканчиваем скроллирование при отпускании левой кнопки мыши
scrollableDiv.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Отменяем скроллирование при покидании курсором области скроллинга
scrollableDiv.addEventListener('mouseleave', () => {
    isMouseDown = false;
});tListener('keydown', handleArrowKeys);