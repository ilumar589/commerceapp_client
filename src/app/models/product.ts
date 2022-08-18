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

export interface PageMetadata {
    number: number,
    numberOfElements: number,
    size: number,
    totalElements: number,
    totalPages: number
}

export interface PagedProducts {
    content: Product[],
    number: number,
    numberOfElements: number,
    size: number,
    totalElements: number,
    totalPages: number
};

export interface ProductFilterOptions {
    types: string[],
    brands: string[]
};

export interface ProductSearchParams {
    page: number,
    size: number,
    orderBy: string,
    productName? : string,
    types? : string[],
    brands? : string[]
};

export interface ProductSearchBodyParams {
    productName? : string,
    types? : string[],
    brands? : string[]
};

export function toProductSearchBodyPams(productParams: ProductSearchParams) : ProductSearchBodyParams {
    return {
        productName: productParams.productName,
        types: productParams.types,
        brands: productParams.brands
    }
}