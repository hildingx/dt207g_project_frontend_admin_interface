

async function fetchMenu() {
    try {
        const response = await fetch(`https://dt207g-project-backend.onrender.com/api/menu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error("Kunde inte hämta meny");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Kunde inte hämta data: " +error);
    }
}

async function displayMenu() {
    try {
        const data = await fetchMenu();

        const starterList = document.querySelector("#starters ul");
        const mainCourseList = document.querySelector("#mainCourses ul");
        const dessertList = document.querySelector("#desserts ul");
        const drinksList = document.querySelector("#drinks ul");

        //Rensar befintliga listor
        starterList.innerHTML = "";
        mainCourseList.innerHTML = "";
        dessertList.innerHTML = "";
        drinksList.innerHTML = "";

        //Iterera över varje objekt och skriv ut i DOM  
        data.forEach(menu => {
            const menuItem = document.createElement("li");
            menuItem.innerHTML = `
                <p><strong>Namn:</strong> ${menu.name}</p>
                <p><strong>Pris:</strong> ${menu.price}kr</p>
                <p><strong>Beskrivning:</strong> ${menu.description}</p>
                <button class="edit-button" data-id="${menu._id}">Ändra</button>
                <button class="delete-button" data-id="${menu._id}">Ta bort</button>
            `;

            if (menu.category === "starter") {
                starterList.appendChild(menuItem);
            } else if (menu.category === "main course") {
                mainCourseList.appendChild(menuItem);
            } else if (menu.category === "dessert") {
                dessertList.appendChild(menuItem);
            } else if (menu.category === "drink") {
                drinksList.appendChild(menuItem);
            }
        });

    } catch (error) {
        console.error('Problem med att uppdatera DOM', error);
    }
}

//Händelselyssnare vid klick med funktion som tar bort specifik post i db med delete-metod
document.addEventListener('click', async (event) => {
    //Kontroll för klick på delete-knapp
    if (event.target.classList.contains('delete-button')) {
        //Hämta id på target klick
        const id = event.target.getAttribute('data-id');
        try {
            //Fetchanrop med deleteförfrågan med id't
            const response = await fetch(`https://dt207g-project-backend.onrender.com/api/menu/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Kunde inte ta bort menyobjektet');
            }

            alert('Menyobjektet borttaget');
            displayMenu();
        } catch (error) {
            console.error('Det gick inte att ta bort menyobjektet:', error);
            alert(error.message);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    displayMenu();
});