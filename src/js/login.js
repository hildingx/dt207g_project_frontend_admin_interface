//Händelselyssnarfunktion för inloggning vid submit
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    //Hämta input från formulär och sanera
    const username = sanitizeInput(document.getElementById('username').value);
    const password = sanitizeInput(document.getElementById('password').value);

    //Element för att visa felmeddelanden
    const errorEl = document.getElementById('loginError');
    //Rensa eventuellt tidigare felmeddelande
    errorEl.innerHTML = '';

    //Laddningsindikator
    const loadingIndicatorEl = document.getElementById('loadingIndicator');
    //Visa laddningsindikator
    loadingIndicatorEl.style.display = 'block';

    try {
        //Försök att logga in
        await adminLogin(username, password);
    } catch (error) {
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ett fel uppstod. Försök igen senare.';
    } finally {
        //Dölj laddningsindikator
        loadingIndicatorEl.style.display = 'none';
    }
});

async function adminLogin(username, password) {
    //Element för att visa felmeddelanden
    const errorEl = document.getElementById('loginError');
    //Element för formulär
    const form = document.getElementById('loginForm');

    try {
        //Skicka POST-förfrågan för inloggning
        const response = await fetch('https://dt207g-project-backend.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            //Spara token i localStorage
            localStorage.setItem('token', data.token);

            //Omdirigera till admin-dashboard
            window.location.href = '/dashboard.html';
        } else {
            //Visa felmeddelande
            errorEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Fel användarnamn eller lösenord';
            form.reset();
        }
    } catch (error) {
        //Visa generellt felmeddelande
        errorEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ett fel uppstod. Försök igen senare.';
        throw error;
    }
}

//Sanera input-data
function sanitizeInput(input) {
    const trimmedInput = input.trim();
    const sanitizedInput = trimmedInput.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    return sanitizedInput;
}
