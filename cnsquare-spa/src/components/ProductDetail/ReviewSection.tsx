import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Review from "./Review";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import cnAxios from "../../utils/cn-axios";
function ReviewSection(props) {
  const { reviews, productId } = props;
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState(5);
  const { user } = useContext(UserContext);
  const isLoggedIn = user.id !== null;

  const reviewsComponents = reviews.map((v) => (
    <Grid key={`${v.userId}-${v.createdAt}`} xs={12}>
      <Review userId={v.userId} message={v.message} rating={v.rating} timestamp={v.createdAt}></Review>
    </Grid>
  ));

  const clearInputs = (event) => {
    setReviewText("");
    setReviewScore(5);
  };

  const submitReview = (event) => {
    if (reviewText.length == 0) {
      return; // TODO: error?
    }
    const payload = {
      userId: parseInt(user.id as string),
      productId: productId,
      message: reviewText,
      rating: reviewScore,
      createdAt: new Date().toISOString(),
    };
    cnAxios.post("/reviews", payload).then(() => {
      location.reload();
    });
  };

  return (
    <Card>
      <CardContent>
        {/* TODO: move this somewhere else */}
        <Grid container>
          <Grid xs={12}>
            <Typography>Reviews</Typography>
          </Grid>
          <Grid xs={12} marginBottom={"10px"}>
            <FormControl
              sx={{ display: "flex", flexDirection: "column", width: "75ch" }}
            >
              {!isLoggedIn && (
                <Typography>Please Log in to enter your review!</Typography>
              )}
              <TextField
                label="Enter your review"
                disabled={!isLoggedIn}
                value={reviewText}
                onInput={(event: any) => setReviewText(event.target.value)}
                multiline
                variant="standard"
                margin="dense"
              ></TextField>
            </FormControl>
          </Grid>
          <Grid xs={3} container>
            <Typography>Rating:</Typography>
            <Rating
              name="size-medium"
              disabled={!isLoggedIn}
              value={reviewScore}
              onChange={(event: any) =>
                setReviewScore(parseInt(event.target.value))
              }
            />
          </Grid>
          <Grid>
            <ButtonGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button onClick={submitReview} disabled={!isLoggedIn}>
                Submit
              </Button>
              <Button onClick={clearInputs} disabled={!isLoggedIn}>
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
          {reviewsComponents}
        </Grid>
      </CardContent>
    </Card>
  );
}
export default ReviewSection;
