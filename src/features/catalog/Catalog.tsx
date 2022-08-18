import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductFilterOptionsAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductSearchParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'price,DESC', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
];

export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, types, brands, filtersLoaded, productParams, pagedMetadata } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchProductFilterOptionsAsync());
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, filtersLoaded, dispatch]);

    if(!pagedMetadata) {
        return (
            <Fragment></Fragment>
        );
    }

    return (
        <Fragment>
            <Grid container columnSpacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <ProductSearch />
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductSearchParams({ orderBy: e.target.value }))}
                        />
                    </Paper>


                    {filtersLoaded ?
                        <Fragment>
                            <Paper sx={{ mb: 2, p: 2 }}>
                                <CheckBoxButtons
                                    items={brands}
                                    checked={productParams.brands}
                                    onChange={(items: string[]) => dispatch(setProductSearchParams({ brands: items }))}
                                />
                            </Paper>
                            <Paper sx={{ mb: 2, p: 2 }}>
                                <CheckBoxButtons
                                    items={types}
                                    checked={productParams.types}
                                    onChange={(items: string[]) => dispatch(setProductSearchParams({ types: items }))}
                                />
                            </Paper>
                        </Fragment>
                        :
                        <Fragment></Fragment>}
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={9} sx={{mb: 2}}>
                    <AppPagination 
                        pagedMetadata={pagedMetadata!}
                        onPageChange={(page: number) => dispatch(setPageNumber(page - 1))}
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}