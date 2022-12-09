import React from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    const returnToPage = () => navigate('/')
    return (
        <div>
            <Grid
                container
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                style={{padding: "20vh 0", gap: '22px'}}

            >
                <Typography variant="h1">Page not found</Typography>
                <Typography variant="h3">Return to main page?</Typography>
                <Grid item>
                    <Button
                        onClick={returnToPage}
                        variant={"outlined"}
                    >Main page</Button>
                </Grid>

            </Grid>
        </div>
    );
}