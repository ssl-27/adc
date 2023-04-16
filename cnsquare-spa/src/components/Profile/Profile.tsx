import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useContext, useEffect, useState } from "react";
import cnAxios from "../../utils/cn-axios";
import { UserContext } from "../../contexts/UserContext";

function Profile() {
  const [shouldShowSuccessAlert, setShouldShowSuccessAlert] = useState(false);
  const [shouldShowErrorAlert, setShouldShowErrorAlert] = useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [avatar, setAvatar] = useState("");

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [creditCardIssuer, setCreditCardIssuer] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExpiryDate, setCreditCardExpiryDate] = useState("");
  const [creditCardCVV, setCreditCardCVV] = useState("");

  const [tier, setTier] = useState(0);
  const [points, setPoints] = useState(0);

  const { user, pullUserInfo } = useContext(UserContext);

  useEffect(() => {
    getUserObject();
  }, []);

  const getUserObject = () => {
    cnAxios
      .get(`/users/${user.id}`)
      .then((res) => {
        const data = res.data;

        setUserName(data.userName);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);

        setAvatar(data.avatar);

        setAddress(data.address);
        setDistrict(data.district);
        setCity(data.city);
        setPhoneNumber(data.phoneNumber);

        setCreditCardIssuer(data.creditCardIssuer);
        setCreditCardNumber(data.creditCardNumber);
        setCreditCardExpiryDate(data.creditCardExpiryDate);
        setCreditCardCVV(data.creditCardCVV);

        setTier(data.tier);
        setPoints(data.points);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !firstName || !lastName || !userName) {
      setShouldShowErrorAlert(true);
      window.scrollTo(0, 0);
      return;
    }

    const payload = {
      userName,
      firstName,
      lastName,
      email,

      address,
      district,
      city,
      phoneNumber,

      creditCardIssuer,
      creditCardNumber,
      creditCardExpiryDate,
      creditCardCVV,
    };

    cnAxios
      .patch(`/users/${user.id}`, payload)
      .then((res) => {
        setShouldShowSuccessAlert(true);
        setShouldShowErrorAlert(false);
        pullUserInfo();
      })
      .catch((err) => {
        setShouldShowSuccessAlert(false);
        setShouldShowErrorAlert(true);
        console.log(err);
      });

    window.scrollTo(0, 0);
  };

  const tiers = ["CN Square Member", "CN Square Student", "CN Square VIP"];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom={true} sx={{ mt: 3 }}>
        My Profile
      </Typography>
      {shouldShowSuccessAlert ? (
        <Alert severity="success">Update profile success</Alert>
      ) : (
        ""
      )}
      {shouldShowErrorAlert ? (
        <Alert severity="error">Please fill out all required fields</Alert>
      ) : (
        ""
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Membership Information
        </Typography>{" "}
        <Box sx={{ display: "flex" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="tier"
            label="Membership Tier"
            name="tier"
            value={tiers[tier] || ""}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ flexBasis: 0, flexGrow: 1, minWidth: 0, mr: 2 }}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            required
            aria-readonly
            fullWidth
            id="points"
            label="Reward Points"
            name="points"
            value={points || ""}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ flexBasis: 0, flexGrow: 1, minWidth: 0, ml: 2 }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        {points < 1000 ? (
          <div>
            <LinearProgress
              variant="determinate"
              value={(points * 100) / 1000}
              sx={{ mt: 2 }}
            />
            <p>Earn {1000 - points} more points to become VIP member</p>
          </div>
        ) : (
          ""
        )}
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Personal Information
        </Typography>
        <Avatar alt={firstName} src={avatar} sx={{ width: 64, height: 64 }}>
          {firstName[0]}
        </Avatar>
        <Box sx={{ display: "flex" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ flexBasis: 0, flexGrow: 1, minWidth: 0, mr: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ flexBasis: 0, flexGrow: 1, minWidth: 0, ml: 2 }}
          />
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Username"
          name="userName"
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Delivery Information
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="address"
          label="Address"
          name="address"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="district"
          label="District"
          name="district"
          value={district || ""}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="city"
          label="City"
          name="city"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          id="phoneNumber"
          label="Contact Number"
          name="phoneNumber"
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Payment Information
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="creditCardNumber"
          label="Credit Card Number"
          name="creditCardNumber"
          value={creditCardNumber || ""}
          onChange={(e) => setCreditCardNumber(e.target.value)}
        />
        <Box sx={{ display: "flex" }}>
          <TextField
            margin="normal"
            id="creditCardExpiryDate"
            label="Credit Card Expiry Date"
            name="creditCardExpiryDate"
            value={creditCardExpiryDate || ""}
            onChange={(e) => setCreditCardExpiryDate(e.target.value)}
            sx={{ flexBasis: 0, flexGrow: 1, minWidth: 0, mr: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="creditCardCVV"
            label="Credit Card CVV"
            name="creditCardCVV"
            value={creditCardCVV || ""}
            onChange={(e) => setCreditCardCVV(e.target.value)}
            sx={{ flexBasis: 0, flexGrow: 1, minWidth: 0, ml: 2 }}
          />
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
          <SaveIcon sx={{ pl: 1 }} />
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
