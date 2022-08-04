import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketPage() {

    const { basket } = useStoreContext();

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
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
                                {basketItem.product.name}
                            </TableCell>
                            <TableCell align="right">{basketItem.product.price.toFixed(2)} RON</TableCell>
                            <TableCell align="right">{basketItem.quantity}</TableCell>
                            <TableCell align="right">{(basketItem.product.price * basketItem.quantity).toFixed(2)} RON</TableCell>
                            <TableCell align="right">
                                <IconButton color='error'>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}