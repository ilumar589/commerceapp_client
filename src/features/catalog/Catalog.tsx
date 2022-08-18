import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductFilterOptionsAsync, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'price,DESC', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
];

export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, types, brands, filtersLoaded } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchProductFilterOptionsAsync());
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, filtersLoaded, dispatch]);

    if (status.includes('pending')) return (
        <Fragment>
            <p>Loading products...</p>
        </Fragment>
    );

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <TextField
                            label="Search products"
                            variant="outlined"
                            value=""
                            fullWidth
                        />
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <RadioGroup>
                                {sortOptions.map(({ value, label }) => {
                                    return <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                                })}
                            </RadioGroup>
                        </FormControl>
                    </Paper>


                    {filtersLoaded ?
                        <Fragment>
                            <Paper sx={{ mb: 2, p: 2 }}>
                                <FormGroup>
                                    {types.map(type => {
                                        return <FormControlLabel control={<Checkbox />} label={type} key={type} />
                                    })}
                                </FormGroup>
                            </Paper>
                            <Paper sx={{ mb: 2, p: 2 }}>
                                <FormGroup>
                                    {brands.map(brand => {
                                        return <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                                    })}
                                </FormGroup>
                            </Paper>
                        </Fragment>
                        :
                        <Fragment></Fragment>}
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={9}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography>
                            Displaying 1-6 of 20 items
                        </Typography>
                        <Pagination
                            color="secondary"
                            size="large"
                            count={10}
                            page={2}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    )
}