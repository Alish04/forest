const emails = [
    {
        id: "email1",
        from: "support@paypal-verify.com",
        subject: "Срочно: Подвердите данные вашего аккаунта",
        message: "Уважаемый пользователь, действие вашей учетной записи было временно приостановлено. Пожалуйста, перейдите по ссылке ниже, чтобы подтвердить свои данные.",
        link: "http://paypal-verify.com",
        attachment: null,
        isPhishing: true
    },
    {
        id: "email2",
        from: "unknown@freemoney.com",
        subject: "Вы выйграли приз!",
        message: "Поздравляю! Вы были выбраны для получения 1000 долларов. Откройте прикрепленный файл, чтобы получить свой приз..",
        link: null,
        attachment: "PrizeClaim.doc",
        isPhishing: true
    },
    {
        id: "email3",
        from: "colleague@company.com",
        subject: "Заметки о встрече",
        message: "Пожалуйста, ознакомьтесь с прилагаемыми заметками о вчерашней встрече.",
        link: null,
        attachment: "MeetingNotes.pdf",
        isPhishing: false
    },
    {
        id: "email4",
        from: "teammember@company.com",
        subject: "Обновление проекта",
        message: "Прилагается последняя информация о статусе проекта.",
        link: null,
        attachment: "ProjectUpdate.pdf",
        isPhishing: false
    },
    {
        id: "email5",
        from: "lucky@lotterywinners.com",
        subject: "Забирайте свой выигрыш в Лотерею!",
        message: "Отличные новости! Вы выиграли в лотерею! Откройте прилагаемый документ, чтобы узнать, как получить свой приз в размере 5000 долларов.",
        link: null,
        attachment: "LotteryClaim.doc",
        isPhishing: true
    },
    {
        id: "email6",
        from: "hr@company.com",
        subject: "Обновление политики",
        message: "Пожалуйста, ознакомьтесь с прилагаемым документом, касающимся обновленной политики компании.",
        link: null,
        attachment: "PolicyUpdate.pdf",
        isPhishing: false
    },
    {
        id: "email7",
        from: "admin@freeraffle.com",
        subject: "Вы выиграли в розыгрыше!",
        message: "Потрясающая новость! Вы были выбраны победителем нашего розыгрыша 2000 долларов. Пожалуйста, откройте прикрепленный файл, чтобы получить вознаграждение.",
        link: null,
        attachment: "RafflePrize.doc",
        isPhishing: true
    }

];

let score = 0;
let currentEmailIndex = 0;

function showResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
}

function updateScore() {
    const scoreSpan = document.getElementById('score');
    scoreSpan.textContent = score;
}

function handlePhishing() {
    const email = emails[currentEmailIndex];
    if (email.isPhishing) {
        score += 10;
        showResult("Верно! Это было фишинговое сообщение.");
    } else {
        showResult("Неверно. Это было безопасное сообщение.");
    }
    currentEmailIndex++;
    loadEmail();
    updateScore();
}

function handleOpen() {
    const email = emails[currentEmailIndex];
    if (email.isPhishing) {
        showResult("Внимание! Это сообщение может быть фишинговым.");
    } else {
        showResult("Это сообщение безопасное.");
    }
}

function handleDelete() {
    const email = emails[currentEmailIndex];
    if (!email.isPhishing) {
        score -= 5;
        showResult("Неверно. Это было безопасное сообщение.");
    } else {
        showResult("Фишинговое сообщения удалено.");
    }
    currentEmailIndex++;
    loadEmail();
    updateScore();
}

function loadEmail() {
    const mailbox = document.getElementById('mailbox');
    mailbox.innerHTML = '';

    if (currentEmailIndex < emails.length) {
        const email = emails[currentEmailIndex];
        const emailDiv = document.createElement('div');
        emailDiv.classList.add('email');
        emailDiv.id = email.id;

        emailDiv.innerHTML = `
            <p><strong>От кого:</strong> ${email.from}</p>
            <p><strong>Кому:</strong> ${email.subject}</p>
            <p><strong>Сообщение:</strong> ${email.message}</p>
            ${email.link ? `<p><a href="${email.link}">${email.link}</a></p>` : ''}
            ${email.attachment ? `<p><strong>Прложение сообщения:</strong> ${email.attachment}</p>` : ''}
            <button class="phishing">Отметить как фишинг</button>
            <button class="open">Отметить как безопасное</button>
            <button class="delete">Удалить</button>
        `;

        mailbox.appendChild(emailDiv);

        document.querySelector('.phishing').addEventListener('click', handlePhishing);
        document.querySelector('.open').addEventListener('click', handleOpen);
        document.querySelector('.delete').addEventListener('click', handleDelete);
    } else {
        showResult("Игра окончена! Ваш конечный резльутат:  " + score);
        document.getElementById('exit-button').style.display = 'block';
    }
}

function exitGame() {
    window.location.href = '../map.html';
}

window.onload = loadEmail;
updateScore();
