class Travel {
    constructor(code, destination, price, type) {
        this.id = Date.now();
        this.code = code;
        this.destination = destination;
        this.price = price;
        this.type = type;
    }

    getInfo() {
        return `Travel [${this.code}] to ${this.destination}`;
    }
}

class Client {
    constructor(name, surname, email, pNumber) {
        this.id = Date.now();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.pNumber = pNumber;
    }

    getResumen() {
        return `${this.name} ${this.surname}`;
    }
}

class Booking {
    constructor(client, travel) {
        this.id = Date.now();
        this.client = client;
        this.travel = travel;
        this.date = new Date().toLocaleDateString();
    }

    getResumen() {
        return `${this.client.getResumen()} - Booked: ${this.travel.getInfo()}`;
    }
}

let arrayClient = [];
let arrayTravel = [];
let arrayBooking = [];

const nameInput = document.getElementById("nameInput");
const surnameInput = document.getElementById("surnameInput");
const emailInput = document.getElementById("emailInput");
const pNumberInput = document.getElementById("pNumberInput");

const codeInput = document.getElementById("codeInput");
const destinationInput = document.getElementById("destinationInput");
const priceInput = document.getElementById("priceInput");
const selTravelType = document.getElementById("selTravelType");

const btnAddClient = document.getElementById("addClient");
const btnAddTravel = document.getElementById("addTravel");

const tableClients = document.getElementById("tableClients");
const tableTravels = document.getElementById("tableTravels");

const selClient = document.getElementById("selClient");
const selTravel = document.getElementById("selTravel");

const btnAddBooking = document.getElementById("addBooking");
const tableBookings = document.getElementById("tableBookings");

btnAddClient.addEventListener("click", addClient);
btnAddTravel.addEventListener("click", addTravel);
btnAddBooking.addEventListener("click", addBooking);

function addClient() {
    // Impone que los campos estén rellenos
    if (!nameInput.value || !surnameInput.value || !emailInput.value || !pNumberInput.value) {
        alert("Fill all CLIENT fields");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailInput.value)) {
        alert("Not a valid email");
        emailInput.focus();
        return;
    }

    const regexTel = /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{3}$/;
    if (!regexTel.test(pNumberInput.value)){
        alert("Not a valid Phone Number");
        pNumberInput.focus();
        return;
    }

    // Crea un nuevo cliente con sus valores
    const client = new Client(
        nameInput.value,
        surnameInput.value,
        emailInput.value,
        pNumberInput.value
    );

    // Guarda en array
    arrayClient.push(client);

    // Crea la fila con los datos del cliente en la tabla cliente
    // El delete guarda la id para poder eliminar el cliente posteriormente
    tableClients.querySelector("tbody").innerHTML += `
        <tr>
            <td>${client.name}</td>
            <td>${client.surname}</td>
            <td>${client.email}</td>
            <td>${client.pNumber}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-client" data-id="${client.id}">
                    Delete
                </button>
            </td>
        </tr>
    `;

    // Añade al select de booking
    selClient.innerHTML += `
        <option value="${client.id}">
            ${client.name} ${client.surname}
        </option>
    `;

    // Limpia los inputs
    nameInput.value = "";
    surnameInput.value = "";
    emailInput.value = "";
    pNumberInput.value = "";

    // Guarda la información localmente
    saveToLocalStorage();
}

function addTravel() {
    if (!codeInput.value || !destinationInput.value || !priceInput.value || !selTravelType.value) {
        alert("Fill all TRAVEL fields");
        return;
    }

    const travel = new Travel(
        codeInput.value,
        destinationInput.value,
        priceInput.value,
        selTravelType.value
    );

    arrayTravel.push(travel);

    tableTravels.querySelector("tbody").innerHTML += `
        <tr>
            <td>${travel.code}</td>
            <td>${travel.destination}</td>
            <td>${travel.price}€</td>
            <td>${travel.type}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-travel" data-id="${travel.id}">
                    Delete
                </button>
            </td>
        </tr>
    `;

    selTravel.innerHTML += `
        <option value="${travel.id}">
            ${travel.code} - ${travel.destination}
        </option>
    `;

    codeInput.value = "";
    destinationInput.value = "";
    priceInput.value = "";
    selTravelType.value = "";

    saveToLocalStorage();
}

function addBooking() {
    if (!selClient.value || !selTravel.value) {
        alert("Select a CLIENT and a TRAVEL in the BOOKING selectors");
        return;
    }

    const client = arrayClient.find(c => c.id == selClient.value);
    const travel = arrayTravel.find(t => t.id == selTravel.value);

    const booking = new Booking(client, travel);

    arrayBooking.push(booking);

    tableBookings.querySelector("tbody").innerHTML += `
        <tr>
            <td>${booking.client.name} ${booking.client.surname}</td>
            <td>${booking.travel.code} - ${booking.travel.destination}</td>
            <td>${booking.date}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-booking" data-id="${booking.id}">
                    Delete
                </button>
            </td>
        </tr>
    `;

    selClient.value = "";
    selTravel.value = "";

    saveToLocalStorage();
}

tableClients.addEventListener("click", e => {
    if (e.target.classList.contains("delete-client")) {
        const id = Number(e.target.dataset.id);

        arrayClient = arrayClient.filter(c => c.id !== id);
        e.target.closest("tr").remove();

        [...selClient.options].forEach(o => Number(o.value) === id && o.remove());
    }

    saveToLocalStorage();
});

tableTravels.addEventListener("click", e => {
    if (e.target.classList.contains("delete-travel")) {
        const id = Number(e.target.dataset.id);

        arrayTravel = arrayTravel.filter(t => t.id !== id);
        e.target.closest("tr").remove();

        [...selTravel.options].forEach(o => Number(o.value) === id && o.remove());
    }

    saveToLocalStorage();
});

tableBookings.addEventListener("click", e => {
    if (e.target.classList.contains("delete-booking")) {
        const id = Number(e.target.dataset.id);

        arrayBooking = arrayBooking.filter(b => b.id !== id);
        e.target.closest("tr").remove();

        saveToLocalStorage();
    }
});

function saveToLocalStorage() {
    localStorage.setItem("clients", JSON.stringify(arrayClient));
    localStorage.setItem("travels", JSON.stringify(arrayTravel));
    localStorage.setItem("bookings", JSON.stringify(arrayBooking));
}

function loadFromLocalStorage() {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    const travels = JSON.parse(localStorage.getItem("travels")) || [];
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Para cada cliente se crea su fila con los valores del cliente. Lo mismo con Viajes y Reservas
    clients.forEach(c => {
        arrayClient.push(c);
        tableClients.querySelector("tbody").innerHTML += `
            <tr>
                <td>${c.name}</td>
                <td>${c.surname}</td>
                <td>${c.email}</td>
                <td>${c.pNumber}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-client" data-id="${c.id}">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        selClient.innerHTML += `
            <option value="${c.id}">${c.name} ${c.surname}</option>
        `;
    });

    travels.forEach(t => {
        arrayTravel.push(t);
        tableTravels.querySelector("tbody").innerHTML += `
            <tr>
                <td>${t.code}</td>
                <td>${t.destination}</td>
                <td>${t.price}€</td>
                <td>${t.type}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-travel" data-id="${t.id}">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        selTravel.innerHTML += `
            <option value="${t.id}">${t.code} - ${t.destination}</option>
        `;
    });

    bookings.forEach(b => {
        const client = arrayClient.find(c => c.id === b.client.id);
        const travel = arrayTravel.find(t => t.id === b.travel.id);
        if (client && travel) {
            const booking = new Booking(client, travel);
            booking.id = b.id;
            booking.date = b.date;

            arrayBooking.push(booking);

            tableBookings.querySelector("tbody").innerHTML += `
            <tr>
                <td>${booking.client.name} ${booking.client.surname}</td>
                <td>${booking.travel.code} - ${booking.travel.destination}</td>
                <td>${booking.date}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-booking" data-id="${booking.id}">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        }
    });

}

loadFromLocalStorage();
