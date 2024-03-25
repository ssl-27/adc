import { Box, Button } from '@mui/material';
import CSS from 'csstype';
import { Link } from "react-router-dom";


function Home() {
    const imgStyle: CSS.Properties = {
        position: "absolute",
        top: 0,
        left: 0,
        paddingTop: "64px",
        width: "100vw",
        height: "calc(100vh - 64px)",
        filter: "blur(3px)",
        objectFit: "cover",
    }

    const shopStyle: CSS.Properties = {
        position: "absolute",
        top: "50%",
        left: "50%",        
        transform: "translate(-50%, -50%)",        
        padding: "16px 32px",
        color: "#ffffff",
        fontWeight: "bolder",
        background: "#cc0000",
        borderRadius: "32px",
    }

    return (
        <Box>
            <img src="/background.jpeg" alt="background" style={imgStyle} />
            <Button color="inherit" component={Link} href="/shop" to="/shop" style={shopStyle}>
                Go to our shop now
            </Button>
        </Box>
    );
}

export default Home;