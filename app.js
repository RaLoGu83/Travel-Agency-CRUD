class travel {
    constructor(code, destination, price) {
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


btnAddClient = document.getElementById("addClient");
btnAddTravel = document.getElementById("addTravel");
btnAddBooking = document.getElementById("addbooking");
const tableClients = document.getElementById("tableClients");
const tableTravel = document.getElementById("tableTravel");

btnAddClient.addEventListener("click", addClient);
btnAddTravel.addEventListener("click", addTravel);
function addClient() {
    const name = document.getElementById("nameInput").value;
    const surname = document.getElementById("surnameInput").value;
    const email = document.getElementById("emailInput").value;
    const pNumber = document.getElementById("pNumberInput").value;

    const newClient = new client(name, surname, email, pNumber);
    arrayClient.push(newClient);

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${surname}</td>
        <td>${email}</td>
        <td>${pNumber}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Delete</button>
        </td>
    `;

    tableClients.appendChild(row);
};

function addTravel(){
    const code = document.getElementById("codeInput").value;
    const destination = document.getElementById("destinationInput").value;
    const price = document.getElementById("priceInput").value;
    const typeTravel = document.getElementById("typeTravel").value;

    const newTravel = new travel(code, destination, price, typeTravel);
    arrayTravel.push(newTravel);

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${code}</td>
        <td>${destination}</td>
        <td>${price}</td>
        <td>${typeTravel}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Delete</button>
        </td>
    `;

    tableTravels.appendChild(row);
};

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", function () {
        selectedTravelType = this.dataset.value;
        document.getElementById("typeTravel").textContent = selectedTravelType;
    });
});