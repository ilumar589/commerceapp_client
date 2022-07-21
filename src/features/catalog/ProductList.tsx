import { List } from '@mui/material';
import { Fragment } from 'react';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
    products: Product[],
};

export default function ProductList({ products }: Props) {
    return (
        <Fragment>
            <List>
                {products.map((product: Product) => (
                    <ProductCard product={product} />
                ))}
            </List>
        </Fragment> 
    );
}