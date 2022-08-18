import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductSearchParams } from "./catalogSlice";

export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    const [searchTerm, setSearchTerm] = useState(productParams.productName);

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductSearchParams({productName: event.target.value}));
    }, 1000);

    return (
        <TextField
                label="Search products"
                variant="outlined"
                fullWidth
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
            />
    );
}