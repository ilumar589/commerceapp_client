import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const dispatch = useAppDispatch();
    const { basket, status } = useAppSelector(state => state.basket);
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState<number>(0);
    const item = basket?.items.find(item => item.product.id === product?.id);

    function handleInputChange(event: any) {
        if(event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}));
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}));
        }
    }

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) {
            dispatch(fetchProductAsync({productId: id!}))
        }
    }, [id, item, dispatch, product]);

    if (productStatus.includes('pending')) return <h3> Loading ... </h3>

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
                            loading={status === 'pendingRemoveItem' + item?.product.id}
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