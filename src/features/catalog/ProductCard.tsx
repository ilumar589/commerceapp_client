import { Fragment } from "react";
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Product } from "../../app/models/product";

interface Props {
    product: Product,
}

export default function ProductCard({ product }: Props) {
    return (
        <Fragment>
            <ListItem key = {product.id}>
                <ListItemAvatar>
                    <Avatar src="https://picsum.photos/id/237/200/300" />
                </ListItemAvatar>
                <ListItemText>{product.name} - {product.price}</ListItemText>
            </ListItem>
        </Fragment>
    );
};