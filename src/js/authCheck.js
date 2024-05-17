document.addEventListener('DOMContentLoaded', checkToken);
//Kontrollera om token finns i localstorage, omdirigera 
tokenAvail();

function tokenAvail() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
    }
}

//Funktion för att kontrollera om token är giltig
async function checkToken() {
    const token = localStorage.getItem('token');
    displayBodyEl = document.querySelector('body.display-body');

    try {
        //Verifiera token genom get-anrop till API
        const response = await fetch('https://dt207g-project-backend.onrender.com/api/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            localStorage.removeItem('token');
            window.location.href = '/logout.html';
        } else {
            //Token är giltig, visa sidan
            displayBodyEl.style.display = 'block';
        }
    } catch (error) {
        console.error('Failed to check token', error);
        window.location.href = '/logout.html';
    }
}