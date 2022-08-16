import { Typography } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { CounterState } from "./counterReducer";

export default function ContactPage() {
    const {data, title} = useSelector((state: CounterState) => state);

    return (
        <Fragment>
            <Typography variant="h2">
                {title}
            </Typography>
            <Typography variant="h5">
                This data is: {data}
            </Typography>
        </Fragment>
    )
}