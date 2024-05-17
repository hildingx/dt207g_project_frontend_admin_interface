//Funktion för att hämta menyn
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

//Funktion för att skriva ut menyn i DOM
async function displayMenu() {
    try {
        //Hämta menydata
        const data = await fetchMenu();

        //Hämta element
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
                <button class="edit-button" data-id="${menu._id}">Redigera</button>
                <button class="delete-button" data-id="${menu._id}">Ta bort</button>
            `;
            
            //Lägger menyobjekt i rätt kategori
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

//Modaler för att ändra och skapa nya menyobjekt

/* Ändra menyobjekt */

//Händelsehanterare, vid klick hämtas id för specifikt menyobjekt. Id matchas med fetchade menyobjekt. openEditModal-funktion körs med menyobjektet som parameter.
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-button')) {
        const id = event.target.getAttribute('data-id');
        const data = await fetchMenu();
        const menu = data.find(item => item._id === id);
        openEditModal(menu);
    }
});

//Funktion som visar redigeringsmodal och förifyller värden från valt menyobjekt
function openEditModal(menu) {
    document.getElementById('editId').value = menu._id;
    document.getElementById('editName').value = menu.name;
    document.getElementById('editPrice').value = menu.price;
    document.getElementById('editCategory').value = menu.category;
    document.getElementById('editDescription').value = menu.description;
    document.getElementById('editModal').style.display = 'block';
}

//Händelselyssnare och funktion för att dölja redigeringsmodal
document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

//Händelselyssnarfunktion som hanterar formulärens submit-händelse för att uppdatera ett menyobjekt
document.getElementById('editForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('editId').value;
    const name = document.getElementById('editName').value.trim();
    const price = document.getElementById('editPrice').value;
    const category = document.getElementById('editCategory').value;
    const description = document.getElementById('editDescription').value.trim();

    try {
        const response = await fetch(`https://dt207g-project-backend.onrender.com/api/menu/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, price, category, description })
        });

        if (!response.ok) {
            throw new Error('Kunde inte uppdatera menyobjektet');
        }

        alert('Menyobjektet uppdaterat');
        closeEditModal();
        displayMenu();
    } catch (error) {
        console.error('Det gick inte att uppdatera menyobjektet:', error);
        alert(error.message);
    }
});

/* Skapa nytt menyobjekt */

//Händelselyssnare och funktion för att visa modal för att skapa nytt menyobjekt
document.getElementById('openAddModal').addEventListener('click', openAddModal);
function openAddModal() {
    document.getElementById('addModal').style.display = 'block';
}

//Händelselyssnare och funktion för att dölja modal
document.getElementById('closeAddModal').addEventListener('click', closeAddModal);
function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

//Händelselyssnarfunktion som hanterar formulärens submit-händelse för att skapa nytt menyobjekt
document.getElementById('addForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('addName').value.trim();
    const price = document.getElementById('addPrice').value;
    const category = document.getElementById('addCategory').value;
    const description = document.getElementById('addDescription').value.trim();

    try {
        const response = await fetch(`https://dt207g-project-backend.onrender.com/api/menu`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, price, category, description })
        });

        if (!response.ok) {
            throw new Error('Kunde inte lägga till menyobjektet');
        }

        alert('Menyobjektet tillagt');
        closeAddModal();
        displayMenu();
    } catch (error) {
        console.error('Det gick inte att lägga till menyobjektet:', error);
        alert(error.message);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    displayMenu();
});