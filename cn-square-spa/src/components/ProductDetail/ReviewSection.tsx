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
function ReviewSection() {
  // TODO: fetch all comments
  const reviews = [<Review></Review>, <Review></Review>, <Review></Review>];
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
        {reviews}
      </CardContent>
    </Card>
  );
}
export default ReviewSection;
