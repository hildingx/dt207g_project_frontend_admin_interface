document.addEventListener('DOMContentLoaded', checkToken);

async function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/logout.html';
        console.log("Token finns ej");
    }

    try {
        const response = await fetch('https://dt207g-project-backend.onrender.com/api/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            localStorage.removeItem('token');
            window.location.href = '/logout.html';
            console.log("Token finns ej");
        }
    } catch (error) {
        console.error('Failed to check token', error);
        window.location.href = '/logout.html';
    }
}