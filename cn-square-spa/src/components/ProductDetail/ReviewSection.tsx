import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Review from "./Review";
function ReviewSection(props) {
  const { reviews } = props;
  const reviewsComponents = reviews.map((v) => (
    <Review
      key={v.userId}
      userId={v.userId}
      message={v.message}
      rating={v.rating}
    ></Review>
  ));
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
          <TextField
            label="Enter your review"
            multiline
            variant="standard"
            margin="dense"
          ></TextField>
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button>Submit</Button>
          </ButtonGroup>
        </FormControl>
        {reviewsComponents}
      </CardContent>
    </Card>
  );
}
export default ReviewSection;
