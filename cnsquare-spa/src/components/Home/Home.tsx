import { Box, Button } from '@mui/material';
import CSS from 'csstype';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import adcAxios from '../../utils/cn-axios';
import { UserContext } from "../../contexts/UserContext";


function Home() {
    const [reserved, setReserved] = useState<boolean>(false);
    const { user } = useContext(UserContext);

    adcAxios.get(`/reservation?userId=${user.id}&isActive=true&_sort=id&_order=desc`)
    .then((response) => {
        if (response.data.length != 0) {
            setReserved(true);
        }
    })

    
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
            {/* <Button color="inherit" component={Link} href="/shop" to="/shop" style={shopStyle}>
                Go to our shop now
            </Button> */}
            <Button color="inherit" component={Link} href={reserved ? '/reservationCode' : '/tableReserve'} to={reserved ? '/reservationCode' : '/tableReserve'} style={shopStyle}>
            {reserved ? 'View Reservation' : 'Reserve a table now'}
            </Button>
        </Box>
    );
}

export default Home;

