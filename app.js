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

class fligth extends travel{
    constructor(code, destination, price, airline, duration) {
        super(code, destination, price);
        this.airline = airline;
        this.duration = duration;
    };

    getInfo() {
        return `${super.getInfo()}, Airline: ${this.airline}, Duration: ${this.duration} hours`;
    };
};

class hotel extends travel{
    constructor(code, destination, price, stars, roomType) {
        super(code, destination, price);
        this.stars = stars;
        this.roomType = roomType;
    };
    getInfo() {
        return `${super.getInfo()}, Hotel ${this.stars} stars, Room: ${this.roomType}`;
    };
};

class pack extends travel{
    constructor(code, destination, price, fligth, hotel) {
        super(code, destination, price);
        this.fligth = fligth;
        this.hotel = hotel;
    };

    getInfo() {
        return `${super.getInfo()}\n - Fligth: ${this.fligth.getInfo()}\n - Hotel: ${this.hotel.getInfo()}`;
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

btnAddClient = document.getElementById("addClient");
btnAddTravel = document.getElementById("addTravel");
btnAddBooking = document.getElementById("addbooking");
const tableClients = document.getElementById("tableClients");

btnAddClient.addEventListener("click", addClient);
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
            <button class="btn btn-danger btn-sm">Delete</button>
        </td>
    `;

    tableClients.appendChild(row);
}