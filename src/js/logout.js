//Logga ut
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtnHeader = document.getElementById('logoutBtnHeader');

    if (logoutBtnHeader) {
        logoutBtnHeader.addEventListener('click', logoutFunction);
    }
});

function logoutFunction() {
    localStorage.removeItem('authToken');
    window.location.href = '/logout.html';
}