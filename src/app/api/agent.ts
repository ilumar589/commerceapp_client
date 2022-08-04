import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:8080/commerce/api/';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            toast.error("Bad request");
            break;
        case 500:
            toast.error("Internal Server Error");
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string, body: {}) => axios.delete(url, body).then(responseBody),
};

const Catalog = {
    list: () => requests.get('catalog/products'),
    details: (id: string) => requests.get(`catalog/product/${id}`)
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: string, quantity: number = 1) => requests.post('basket', { productId, quantity }),
    removeItem: (productId: string, quantity: number = 1) => requests.delete('basket', { productId, quantity }),
}

const agent = {
    Catalog,
    Basket
};

export default agent;