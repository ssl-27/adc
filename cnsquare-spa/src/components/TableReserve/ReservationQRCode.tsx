import { useEffect, useState, useContext } from "react";
import adcAxios from "../../utils/cn-axios";
import { UserContext } from "../../contexts/UserContext";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


function ReservationQRCode() {
    const { user } = useContext(UserContext);
    const [qrcode, setQRCode] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");

    useEffect(() => {
        adcAxios.get(`/reservation?userId=${user.id}&isActive=true&_sort=id&_order=desc`)
            .then((response) => {
                const reservation = response.data;
                console.log(reservation);
                const qrCodeData = `http://api.qrserver.com/v1/create-qr-code/?data=${reservation[0].ticketId}`;
                setQRCode(qrCodeData);
                setArrivalTime(reservation[0].arrivalTime);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [user.id]);

    return (
        <div>
            {qrcode && (
                <div>
                    <Typography variant="h4">Show this QR code upon arrival:</Typography>
                    <img src={qrcode} alt="QR Code" />
                    <Typography><p>Your arrival time is: {arrivalTime}.</p></Typography>
                    
                </div>
            )}
            <Button variant="contained" color="inherit" component={Link} href="/shop" to="/shop" >
                Order Food now
            </Button>
        </div>
    );
}

export default ReservationQRCode;