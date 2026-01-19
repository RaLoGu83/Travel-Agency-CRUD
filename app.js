class travel {
    constructor(code, destination, price, disponibility = true) {
        this.code = code;
        this.destination = destination;
        this.price = price;
        this.disponibility = disponibility;
    };

    getInfo() {
        return `Travel [${this.code}] to ${this.destination}, price: ${this.price} euros`;
    };
};

class fligth {
    constructor(code, destination, price, airline, duration) {
        super(code, destination, price);
        this.airline = airline;
        this.duration = duration;
    };

    getInfo() {
        return `${super.getInfo()}, Airline: ${this.airline}, Duration: ${this.duration} hours`;
    };
};

class hotel {
    constructor(code, destination, price, stars, roomType) {
        super(code, destination, price);
        this.stars = stars;
        this.roomType = roomType;
    };
    getInfo() {
        return `${super.getInfo()}, Hotel ${this.stars} stars, Room: ${this.roomType}`;
    };
};

class pack {
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