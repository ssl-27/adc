import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import LinkButton from "../LinkButton";
import { Outlet } from "react-router-dom";

function CNAppBar() {
    return (
        <AppBar>
            <Toolbar>
                <Typography sx={{mr: 1, display: { xs: 'none', md: 'flex' }}}>CN-Square</Typography>
                <Box sx={{ flexGrow: 1}}>
                    <LinkButton href="/" label="Home"/>
                    <LinkButton href="/shop" label="Shop"/>
                </Box>
                <Box>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">My Cart</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default CNAppBar;