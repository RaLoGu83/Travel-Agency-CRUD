class travel {
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

class client {
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

let arrayClient = [];
let arrayTravel = [];

const btnAddClient = document.getElementById("addClient");
const btnAddTravel = document.getElementById("addTravel");

const selNameClient = document.getElementById("selNameClient");
const selNameTravel = document.getElementById("selNameTravel");
const selNameTravelType = document.getElementById("selNameTravelType");

btnAddClient.addEventListener("click", addClient);
btnAddTravel.addEventListener("click", addTravel);

function addClient() {
    const name = nameInput.value;
    const surname = surnameInput.value;
    const email = emailInput.value;
    const pNumber = pNumberInput.value;

    const newClient = new client(name, surname, email, pNumber);
    arrayClient.push(newClient);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>${surname}</td>
        <td>${email}</td>
        <td>${pNumber}</td>
        <td><button class="btn btn-danger btn-sm">Delete</button></td>
    `;
    tableClients.querySelector("tbody").appendChild(row);

    const option = document.createElement("option");
    option.value = newClient.id;
    option.textContent = `${name} ${surname}`;
    selNameClient.appendChild(option);
}

function addTravel() {
    const code = codeInput.value;
    const destination = destinationInput.value;
    const price = priceInput.value;
    const type = selNameTravelType.value;

    const newTravel = new travel(code, destination, price, type);
    arrayTravel.push(newTravel);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${code}</td>
        <td>${destination}</td>
        <td>${price}</td>
        <td>${type}</td>
        <td><button class="btn btn-danger btn-sm">Delete</button></td>
    `;
    tableTravels.querySelector("tbody").appendChild(row);

    const option = document.createElement("option");
    option.value = newTravel.id;
    option.textContent = `${code} - ${destination}`;
    selNameTravel.appendChild(option);
}
