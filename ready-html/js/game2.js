document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const completeGameBtn = document.getElementById('completeGameBtn');

    passwordInput.addEventListener('input', handlePasswordInput);
    completeGameBtn.addEventListener('mouseover', maybeMoveButton);

    function handlePasswordInput() {
        const password = passwordInput.value;
        const lengthFulfilled = password.length >= 9;
        const uppercaseFulfilled = /[A-Z]/.test(password);
        const numberFulfilled = /\d/.test(password);
        const specialFulfilled = /[\!\@\#\$\%\^\&\*\(\)\_\+\-]/.test(password);
        const notCommonFulfilled = !['qwerty', '1234'].includes(password);

        document.getElementById('length').classList.toggle('fulfilled', lengthFulfilled);
        document.getElementById('uppercase').classList.toggle('fulfilled', uppercaseFulfilled);
        document.getElementById('number').classList.toggle('fulfilled', numberFulfilled);
        document.getElementById('special').classList.toggle('fulfilled', specialFulfilled);
        document.getElementById('notCommon').classList.toggle('fulfilled', notCommonFulfilled);

        const allFulfilled = lengthFulfilled && uppercaseFulfilled && numberFulfilled && specialFulfilled && notCommonFulfilled;
        completeGameBtn.disabled = !allFulfilled;

    }

    function maybeMoveButton(event) {
        if (completeGameBtn.disabled) {
            moveButton(event);
        }
    }

    function moveButton(event) {
        const moveDistance = 200; // Increased move distance
        const currentLeft = completeGameBtn.offsetLeft;
        const currentTop = completeGameBtn.offsetTop;
        let newX = currentLeft + (Math.random() * moveDistance - moveDistance / 2);
        let newY = currentTop + (Math.random() * moveDistance - moveDistance / 2);

        // Ensure the button stays within the visible area
        const maxX = window.innerWidth - completeGameBtn.offsetWidth;
        const maxY = window.innerHeight - completeGameBtn.offsetHeight;

        if (newX < 0) newX = 0;
        if (newX > maxX) newX = maxX;
        if (newY < 0) newY = 0;
        if (newY > maxY) newY = maxY;

        completeGameBtn.style.position = 'fixed';
        completeGameBtn.style.left = `${newX}px`;
        completeGameBtn.style.top = `${newY}px`;
    }

    document.getElementById('exitButton').addEventListener('click', () => {
        window.location.href = 'map.html';
    });
});

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
