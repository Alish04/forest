const container = document.getElementById('container');

container.addEventListener('wheel', (e) => {
    container.scrollLeft += e.deltaY; // Прокрутка вправо или влево в зависимости от направления колеса мыши
});