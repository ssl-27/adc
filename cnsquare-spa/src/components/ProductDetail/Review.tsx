import { Avatar, Grid, Rating, Typography } from "@mui/material";
import cnAxios from "../../utils/cn-axios";
import { useEffect, useState } from "react";

function Review(props) {
  const { userId, message, rating } = props;
  const [userData, setUserData] = useState(undefined);
  useEffect(() => {
    const response = cnAxios.get(`/users/${userId}`);
    response.then((res) => {
      setUserData(res.data);
    });
  }, []);
  if (userData) {
    const { userName, avatar } = userData;
    return (
      <Grid container marginTop={"10px"}>
        <Grid
          xs={6}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={"7px"}
        >
          <Avatar src={avatar} />
          <Typography>{userName}</Typography>
        </Grid>
        <Grid
          xs={6}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={"7px"}
        >
          <Typography>Rating:</Typography>
          <Rating name="size-medium" defaultValue={rating} readOnly />
        </Grid>
        <Grid xs={12}>
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    );
  } else {
    return <Typography>Loading</Typography>;
  }
}
export default Review;
