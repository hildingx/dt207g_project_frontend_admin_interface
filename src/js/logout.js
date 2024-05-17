//Händelsehanterarfunktion som kör logga ut-funktion vid klick på logout-knapp
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtnHeader = document.getElementById('logoutBtnHeader');

    if (logoutBtnHeader) {
        logoutBtnHeader.addEventListener('click', logoutFunction);
    }
});

function logoutFunction() {
    localStorage.removeItem('token');
    window.location.href = '/logout.html';
}