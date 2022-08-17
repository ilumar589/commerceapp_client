export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    pictureUrl: string,
    type: string,
    brand: string,
    quantityInStock: number
};

export interface PagedProducts {
    content: Product[],
    number: number,
    numberOfElements: number,
    size: number,
    totalElement: number,
    totalPages: number
}