document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    //Hämta användarnamn och lösenord från formulärets inmatningsfält
    const username = sanitizeInput(document.getElementById('username').value);
    const password = sanitizeInput(document.getElementById('password').value);

    try {
        await adminLogin(username, password);
        
    } catch (error) {
        console.error('Bokning misslyckades:', error);
        alert('Ett fel uppstod. Försök igen senare.');
    }
});


async function adminLogin(username, password) {
    try {
        const response = await fetch(`https://dt207g-project-backend.onrender.com/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();

        if (response.ok) {
            console.log('Inloggning lyckad:', data);
            //Spara token i localStorage
            localStorage.setItem('token', data.token);
            
            //Omdirigera till admin-dashboard
            window.location.href = '/dashboard.html';
        } else {
            alert('Inloggning misslyckades: ' + (data.message || 'Okänt fel'));
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

//Sanera input-data
function sanitizeInput(input) {
    const trimmedInput = input.trim();
    const sanitizedInput = trimmedInput.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    return sanitizedInput;
}