document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const finishButton = document.getElementById('finishButton');

    passwordInput.addEventListener('input', handlePasswordInput);
    finishButton.addEventListener('mouseenter', maybeMoveButton);

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
        finishButton.disabled = !allFulfilled;
    }

    function maybeMoveButton() {
        if (finishButton.disabled) {
            moveButton();
        }
    }

    function moveButton() {
        const maxX = document.body.clientWidth - finishButton.offsetWidth;
        const maxY = window.innerHeight - finishButton.offsetHeight;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        finishButton.style.position = 'fixed';
        finishButton.style.left = `${newX}px`;
        finishButton.style.top = `${newY}px`;
    }

    const exitButton = document.getElementById('exitButton');
    exitButton.addEventListener('click', () => {
        window.location.href='game.html'
    });
});
