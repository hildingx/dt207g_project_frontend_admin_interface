async function fetchBookings() {
    try {
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
        return [];
    }
}

async function displayBookings() {
    const bookings = await fetchBookings();
    
    const bookingDiv = document.getElementById("bookingDiv");
    bookingDiv.innerHTML = "";
    
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
    
    bookingDiv.appendChild(table);
}

// Händelselyssnarfunktion för att hantera klick på "Ta bort"-knappar
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const id = event.target.getAttribute('data-id');
        deleteBooking(id);
    }
});

// Funktion för att ta bort en bokning
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
        displayBookings(); // Uppdatera bokningslistan
    } catch (error) {
        console.error('Det gick inte att ta bort bokningen:', error);
        alert(error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayBookings();
});