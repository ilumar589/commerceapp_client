import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

    const { basket, setBasket } = useStoreContext();

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    function addItemQuantity(productId: string, quantity: number = 1) {
        agent.Basket.addItem(productId, quantity)
            .then(changedBasket => setBasket(changedBasket))
            .catch(error => console.log(error))
    }

    function removeItemQuantity(productId: string, quantity: number = 1) {
        agent.Basket.removeItem(productId, quantity)
            .then(changedBasket => setBasket(changedBasket))
            .catch(error => console.log(error))
    }

    return (
        <Fragment>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items?.map((basketItem) => (
                        <TableRow
                            key={basketItem.product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img  src={basketItem.product.pictureUrl ? basketItem.product.pictureUrl : '/images/default_no_image.jpg'}
                                          alt={basketItem.product.name}
                                          style={{ height: 50, marginRight: 20}}/>
                                    <span>{basketItem.product.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{basketItem.product.price.toFixed(2)} RON</TableCell>
                            <TableCell align="center">
                                <IconButton color="error" onClick={() => removeItemQuantity(basketItem.product.id)}>
                                    <Remove/>
                                </IconButton>
                                {basketItem.quantity}
                                <IconButton color="secondary" onClick={() => addItemQuantity(basketItem.product.id)}>
                                    <Add/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">{(basketItem.product.price * basketItem.quantity).toFixed(2)} RON</TableCell>
                            <TableCell align="right">
                                <IconButton color='error' onClick={() => removeItemQuantity(basketItem.product.id, basketItem.quantity)}>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
                <BasketSummary/>
            </Grid>
        </Grid>
        </Fragment>
    )
}