export interface Login {
    username : string;
    password : string;
}

export interface Name {
    firstname: string;
    lastname: string;
}

export interface Geolocation {
    lat: string;
    long: string;
}

export interface Address {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: Geolocation;
}

export interface Registration {
    email: string;
    username: string;
    password: string;
    name: Name;
    address: Address;
    phone: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    address: Address;
    phone: string;
}