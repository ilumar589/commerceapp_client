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
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}, params?: URLSearchParams) => axios.post(url, body, {params}).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    list: (filter: any, params: URLSearchParams) => requests.post('public/catalog/products', filter, params),
    details: (id: string) => requests.get(`public/catalog/product/${id}`),
    filters: () => requests.get('public/catalog/products/filter')
}

const Basket = {
    get: () => requests.get('public/basket'),
    addItem: (productId: string, quantity: number = 1) => requests.post('public/basket', { productId, quantity }),
    removeItem: (productId: string, quantity: number = 1) => requests.delete(`public/basket/${productId}/${quantity}`),
}

const agent = {
    Catalog,
    Basket
};

export default agent;