window.onload = function() {
    fetch('/profile?id=6' +
        '')  // Assuming user ID 1 for demonstration
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('firstName').textContent = data.firstName;
            document.getElementById('lastName').textContent = data.lastName;
            document.getElementById('email').textContent = data.email;
            document.getElementById('age').textContent = data.age;
            document.getElementById('completedLevel').textContent = data.completedLevels;
        })
        .catch(error => {
            console.error('Error:', error);
        });
};