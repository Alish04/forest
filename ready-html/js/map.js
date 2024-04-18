function updateLevelsStatus(levelProgress) {
    document.querySelectorAll('.level-point').forEach(point => {
        const level = parseInt(point.getAttribute('data-level'));
        if (level > levelProgress + 1) { // Позволяет доступ к следующему уровню после текущего завершенного
            point.classList.add('locked');
            point.addEventListener('click', (e) => e.preventDefault()); // Предотвращаем переход
        } else {
            point.classList.remove('locked');
            point.href = `/lesson${level}.html`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Здесь предполагается, что токен хранится в cookies или локальном хранилище
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];// или использование Cookies.get('token') если используется js-cookie
    if (!token) {
        console.error('Authentication token is not available');
        return;
    }

    fetch(`/levels-status`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateLevelsStatus(data.completedLevels);
        })
        .catch(error => {
            console.error('Error loading levels status:', error);
        });
});