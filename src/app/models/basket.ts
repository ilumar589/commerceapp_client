import { Product } from "./product";

export interface BasketItem {
    id: string,
    product: Product,
    quantity: number
}

export interface Basket {
    id: string,
    buyerId: string,
    items: BasketItem[]
}