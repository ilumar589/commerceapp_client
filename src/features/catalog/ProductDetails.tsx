import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
    const dispatch = useAppDispatch();
    const { basket } = useAppSelector(state => state.basket);
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const item = basket?.items.find(item => item.product.id === product?.id);

    function handleInputChange(event: any) {
        if(event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        setSubmitted(true);
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, updatedQuantity)
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setSubmitted(false));
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, updatedQuantity)
                .then(basket => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setSubmitted(false));
        }
    }

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        agent.Catalog.details(id!)
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id, item]);

    if (loading) return <h3> Loading ... </h3>

    if (!product) <h3> Product not found </h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={!product?.pictureUrl || product?.pictureUrl.length === 0 ? "/images/default_no_image.jpg" : product?.pictureUrl} style={{ width: '100%' }} alt={product?.name}></img>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product?.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color='secondary'>{product?.price.toFixed(2)} RON</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product?.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product?.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} sx={{marginTop: '10px'}}>
                    <Grid item xs={6}>
                        <TextField 
                            variant="outlined"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            sx={{height: '55px'}} 
                            color='primary'  
                            size='large'
                            variant='contained'
                            fullWidth
                            loading={submitted}
                            onClick={handleUpdateCart}
                        >
                            {item ? "Update Quantity": "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}