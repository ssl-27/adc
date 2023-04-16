import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
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

  const { user } = useContext(UserContext);

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
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !firstName || !lastName || !userName) {
      setShouldShowErrorAlert(true);
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
      })
      .catch((err) => {
        setShouldShowSuccessAlert(false);
        setShouldShowErrorAlert(true);
        console.log(err);
      });
  };

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
            autoComplete="firstName"
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
            autoComplete="lastName"
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
          autoComplete="userName"
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
          autoComplete="email"
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
          autoComplete="address"
        />
        <TextField
          margin="normal"
          fullWidth
          id="district"
          label="District"
          name="district"
          value={district || ""}
          onChange={(e) => setDistrict(e.target.value)}
          autoComplete="district"
        />
        <TextField
          margin="normal"
          fullWidth
          id="city"
          label="City"
          name="city"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="city"
        />
        <TextField
          margin="normal"
          fullWidth
          id="phoneNumber"
          label="Contact Number"
          name="phoneNumber"
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
          autoComplete="phoneNumber"
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
          autoComplete="creditCardNumber"
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
            autoComplete="creditCardExpiryDate"
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
            autoComplete="creditCardCVV"
          />
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
