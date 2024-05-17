//Funktion för att hämta bokningar från API
async function fetchBookings() {
    try {
        //Skicka GET-förfrågan
        const response = await fetch('https://dt207g-project-backend.onrender.com/api/booking', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Kunde inte hämta bokningar');
        }

        const bookings = await response.json();
        return bookings;
    } catch (error) {
        console.error('Det gick inte att hämta bokningar:', error);
        alert(error.message);
    }
}

//Skriv ut bokningar i DOM
async function displayBookings() {
    //Hämta bokningar
    const bookings = await fetchBookings();
    
    //Hämta Div för bokningar
    const bookingDiv = document.getElementById("bookingDiv");
    //Töm Div
    bookingDiv.innerHTML = "";
    
    //Skapa tabell och skriv ut hämtad data
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Namn</th>
                <th>Datum</th>
                <th>Tid</th>
                <th>Antal Personer</th>
                <th>Särskilda önskemål</th>
            </tr>
        </thead>
        <tbody>
            ${bookings.map(booking => `
                <tr>
                    <td>${booking.name}</td>
                    <td>${new Date(booking.date).toLocaleDateString()}</td>
                    <td>${booking.time}</td>
                    <td>${booking.numberOfPeople}</td>
                    <td>${booking.specialRequests || ''}</td>
                    <td><button class="delete-button" data-id=${booking._id}>Ta bort</button></td>
                </tr>
            `).join('')}
        </tbody>
    `;
    //Lägg till tabell i Div
    bookingDiv.appendChild(table);
}

//Händelselyssnarfunktion för att hantera klick på ta bort-knappar
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.getAttribute('data-id');
        deleteBooking(id);
    }
});

//Funktion för att ta bort en bokning
async function deleteBooking(id) {
    if (!confirm('Är du säker på att du vill ta bort denna bokning?')) {
        return;
    }

    try {
        const response = await fetch(`https://dt207g-project-backend.onrender.com/api/booking/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Kunde inte ta bort bokningen');
        }

        alert('Bokningen har tagits bort');
        //Uppdatera bokningslistan
        displayBookings();
    } catch (error) {
        console.error('Det gick inte att ta bort bokningen:', error);
        alert(error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayBookings();
});