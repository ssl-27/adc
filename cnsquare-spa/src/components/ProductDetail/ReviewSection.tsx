import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
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
    <Review
      key={v.userId}
      userId={v.userId}
      message={v.message}
      rating={v.rating}
    ></Review>
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
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {/* TODO: move this somewhere else */}
        <Typography>Reviews</Typography>
        <FormControl
          sx={{ display: "flex", flexDirection: "column", width: "75ch" }}
        >
          {!isLoggedIn && (
            <Typography>Please Log in to enter your review!</Typography>
          )}
          <TextField
            label="Enter your review"
            disabled={!isLoggedIn}
            defaultValue={reviewText}
            onInput={(event: any) => setReviewText(event.target.value)}
            multiline
            variant="standard"
            margin="dense"
          ></TextField>
          <Typography>Rating:</Typography>
          <Rating
            name="size-medium"
            disabled={!isLoggedIn}
            value={reviewScore}
            onChange={(event: any) =>
              setReviewScore(parseInt(event.target.value))
            }
          />
          <ButtonGroup
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Button onClick={clearInputs} disabled={!isLoggedIn}>
              Cancel
            </Button>
            <Button onClick={submitReview} disabled={!isLoggedIn}>
              Submit
            </Button>
          </ButtonGroup>
        </FormControl>
        {reviewsComponents}
      </CardContent>
    </Card>
  );
}
export default ReviewSection;
