import { Fragment } from "react";
import { Card, Button, CardActions, CardContent, CardMedia, Typography, CardHeader, Avatar } from '@mui/material';
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product,
}

export default function ProductCard({ product }: Props) {

    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Fragment>
            <Card>
                <CardHeader avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }} />
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light'}}
                    image={!product.pictureUrl || product.pictureUrl.length === 0 ? "images/default_no_image.jpg" : product.pictureUrl}
                    title={product.name}
                />
                <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    {(product.price).toFixed(2)} RON
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton loading={status ==='pendingAddItem' + product.id} size="small" onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}>Add to cart</LoadingButton>
                    <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
                </CardActions>
            </Card>
        </Fragment>
    );
};