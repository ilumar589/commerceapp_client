import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Fragment } from "react";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketSummary() {
    const { basket } = useStoreContext();
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0) ?? 0;
    const deliveryFee = subtotal > 400 ? 0 : 5;

    return (
        <Fragment>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal} RON</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee</TableCell>
                            <TableCell align="right">{deliveryFee} RON</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee} RON</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontStyle: 'italic'}}>*Orders over 400 RON qualify for free delivery</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}