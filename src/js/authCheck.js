//Element att visa eller dölja beroende på om giltig token finns eller ej.
document.addEventListener('DOMContentLoaded', checkToken);

async function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'http://localhost:1234/logout.html';
        console.log("Token finns ej");
    }

    try {
        const response = await fetch('https://dt207g-project-backend.onrender.com/api/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Anrop ok");
        
        if (!response.ok) {
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:1234/logout.html';
            console.log("Token finns ej");
        } else {
            console.log("Token giltig");
        }
    } catch (error) {
        console.error('Failed to check token', error);
        window.location.href = 'http://localhost:1234/logout.html';
    }
}