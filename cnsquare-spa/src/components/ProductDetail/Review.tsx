import { Avatar, Box, Rating, Typography } from "@mui/material";
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
      <Box>
        <Avatar src={avatar} />
        <Typography>{userName}</Typography>
        <Typography>{message}</Typography>
        <Typography>Rating:</Typography>
        <Rating name="size-medium" defaultValue={rating} readOnly />
      </Box>
    );
  } else {
    return <Typography>Loading</Typography>;
  }
}
export default Review;
