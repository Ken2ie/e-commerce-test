export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating : Rating
    quantity: number;
}

export interface Rating {
    rate : number;
    count : number
}
