window.onload = function() {
    fetch('/profile')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('firstName').textContent = data.firstname;
            document.getElementById('lastName').textContent = data.lastname;
            document.getElementById('email').textContent = data.email;
            document.getElementById('age').textContent = data.age;
            document.getElementById('completedLevel').textContent = data.completedLevels;
        })
        .catch(error => {
            console.error('Error:', error);
        });
};
