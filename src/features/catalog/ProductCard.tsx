import { Fragment } from "react";
import { Card, Button, CardActions, CardContent, CardMedia, Typography, CardHeader, Avatar } from '@mui/material';
import { Product } from "../../app/models/product";

interface Props {
    product: Product,
}

export default function ProductCard({ product }: Props) {
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
                    <Button size="small">Add to cart</Button>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>
        </Fragment>
    );
};