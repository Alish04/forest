const emails = [
    {
        id: "email1",
        from: "support@paypal-verify.com",
        subject: "Urgent: Verify Your Account Information",
        message: "Dear User, your account has been temporarily suspended. Please click the link below to verify your information.",
        link: "http://paypal-verify.com",
        attachment: null,
        isPhishing: true
    },
    {
        id: "email2",
        from: "unknown@freemoney.com",
        subject: "You have won a prize!",
        message: "Congratulations! You've been selected to win $1000. Open the attached file to claim your prize.",
        link: null,
        attachment: "PrizeClaim.doc",
        isPhishing: true
    },
    {
        id: "email3",
        from: "colleague@company.com",
        subject: "Meeting notes",
        message: "Please find attached the notes from yesterday's meeting.",
        link: null,
        attachment: "MeetingNotes.pdf",
        isPhishing: false
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
        showResult("Correct! This was a phishing email.");
    } else {
        showResult("Incorrect. This was a legitimate email.");
    }
    currentEmailIndex++;
    loadEmail();
    updateScore();
}

function handleOpen() {
    const email = emails[currentEmailIndex];
    if (email.isPhishing) {
        showResult("Warning! This email contains phishing elements.");
    } else {
        showResult("This email is safe.");
    }
}

function handleDelete() {
    const email = emails[currentEmailIndex];
    if (!email.isPhishing) {
        score -= 5;
        showResult("Incorrect. This was a legitimate email.");
    } else {
        showResult("Phishing email deleted.");
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
            <p><strong>From:</strong> ${email.from}</p>
            <p><strong>Subject:</strong> ${email.subject}</p>
            <p><strong>Message:</strong> ${email.message}</p>
            ${email.link ? `<p><a href="${email.link}">${email.link}</a></p>` : ''}
            ${email.attachment ? `<p><strong>Attachment:</strong> ${email.attachment}</p>` : ''}
            <button class="phishing">Mark as Phishing</button>
            <button class="open">Open Safely</button>
            <button class="delete">Delete</button>
        `;

        mailbox.appendChild(emailDiv);

        document.querySelector('.phishing').addEventListener('click', handlePhishing);
        document.querySelector('.open').addEventListener('click', handleOpen);
        document.querySelector('.delete').addEventListener('click', handleDelete);
    } else {
        showResult("Game Over! Your final score is: " + score);
        document.getElementById('exit-button').style.display = 'block';
    }
}

function exitGame() {
    alert("Thank you for playing! Exiting the game.");
    // You can add any additional actions here if needed, like redirecting to another page
}

window.onload = loadEmail;
updateScore();
