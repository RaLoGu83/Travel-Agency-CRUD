class travel {
    constructor(code, destination, price) {
        this.id = Date.now();
        this.code = code;
        this.destination = destination;
        this.price = price;
    };

    getInfo() {
        return `Travel [${this.code}] to ${this.destination}, price: ${this.price} euros`;
    };
};

class client {
    constructor(name, surname, email, pNumber) {
        this.id = Date.now();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.pNumber = pNumber;
    };
    getResumen() {
        return `Client: ${this.name} ${this.surname}, Email: ${this.email}, Phone number: ${this.pNumber}`;
    };
};

class booking {
    constructor(client, travel) {
        this.client = client;
        this.travel = travel;
    };
    getResumen() {
        return `${this.client.getResumen()}\nBooked: ${this.travel.getInfo()}`;
    };
};

let arrayClient = [];
let arrayTravel = [];
let arrayBooking = [];
let selectedTravelType = "";


const btnAddClient = document.getElementById("addClient");
const btnAddTravel = document.getElementById("addTravel");
const btnAddBooking = document.getElementById("addbooking");

const bookingClientBtn = document.getElementById("bookingClientBtn");
const bookingClientMenu = document.getElementById("bookingClientMenu");
const bookingTravelBtn = document.getElementById("bookingTravelBtn");
const bookingTravelMenu = document.getElementById("bookingTravelMenu");

const tableBookings = document.getElementById("tableBookings");
const tableClients = document.getElementById("tableClients");
const tableTravels = document.getElementById("tableTravels");



btnAddClient.addEventListener("click", addClient);
btnAddTravel.addEventListener("click", addTravel);

function addClient() {
    const name = document.getElementById("nameInput").value;
    const surname = document.getElementById("surnameInput").value;
    const email = document.getElementById("emailInput").value;
    const pNumber = document.getElementById("pNumberInput").value;
    const li = document.createElement("li");
    const a = document.createElement("a");

    const newClient = new client(name, surname, email, pNumber);
    arrayClient.push(newClient);

    const index = arrayClient.length - 1;

    const row = document.createElement("tr");
    row.dataset.index = index;

    row.innerHTML = `
        <td>${name}</td>
        <td>${surname}</td>
        <td>${email}</td>
        <td>${pNumber}</td>
        <td>
            <button class="btn btn-danger btn-sm">Delete</button>
        </td>
    `;

    row.querySelector("button").addEventListener("click", () => {
        deleteClient(index, row);
    });

    a.className = "dropdown-item";
    a.textContent = `${name} ${surname}`;

    a.addEventListener("click", () => {
        selectedClient = newClient;
        bookingClientBtn.textContent = `${name} ${surname}`;
    });

    li.appendChild(a);
    bookingClientMenu.appendChild(li);

    tableClients.querySelector("tbody").appendChild(row);
}

function deleteClient(index, row) {
    arrayClient.splice(index, 1);
    row.remove();
}


function addTravel() {
    const code = document.getElementById("codeInput").value;
    const destination = document.getElementById("destinationInput").value;
    const price = document.getElementById("priceInput").value;
    const typeTravel = document.getElementById("typeTravel").textContent;
    const li = document.createElement("li");
    const a = document.createElement("a");

    const newTravel = new travel(code, destination, price);
    arrayTravel.push(newTravel);

    const index = arrayTravel.length - 1;

    const row = document.createElement("tr");
    row.dataset.index = index;

    row.innerHTML = `
        <td>${code}</td>
        <td>${destination}</td>
        <td>${price}</td>
        <td>${typeTravel}</td>
        <td>
            <button class="btn btn-danger btn-sm">Delete</button>
        </td>
    `;

    a.className = "dropdown-item";
    a.textContent = `${code} - ${destination}`;
    a.href = "#";

    a.addEventListener("click", () => {
        selectedTravel = newTravel;
        bookingTravelBtn.textContent = `${code} - ${destination}`;
    });

    li.appendChild(a);
    bookingTravelMenu.appendChild(li);

    row.querySelector("button").addEventListener("click", () => {
        deleteTravel(index, row);
    });

    tableTravels.querySelector("tbody").appendChild(row);
}

function deleteTravel(index, row) {
    arrayTravel.splice(index, 1);
    row.remove();
}

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", function () {
        selectedTravelType = this.dataset.value;
        document.getElementById("typeTravel").textContent = selectedTravelType;
    });
});