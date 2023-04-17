import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  Slider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function ProductFilter(props) {
  const { info, setPreviewInfo } = props;
  const [priceRange, setPriceRange] = useState<number[]>([20, 50]);
  const [ratingChecked, setRatingChecked] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const updatePriceRange = (event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  const updateRatingChecked = (id: number, value: boolean) => {
    if (id === 0) {
      setRatingChecked([true, false, false, false, false, false]);
    } else {
      const temp = [...ratingChecked];
      if (value) {
        temp[0] = false;
      }
      temp[id] = value;
      if (temp[1] && temp[2] && temp[3] && temp[4] && temp[5]) {
        setRatingChecked([true, false, false, false, false, false]);
      } else if (temp[1] || temp[2] || temp[3] || temp[4] || temp[5]) {
        setRatingChecked(temp);
      } else {
        setRatingChecked([true, false, false, false, false, false]);
      }
    }
  };
  // filter
  useEffect(() => {
    const lowerBound = priceRange[0] * 10;
    const upperBound = priceRange[1] * 10;
    const priceFiltered = info.filter(
      (v) => lowerBound <= v.price && upperBound >= v.price
    );
    const ratingFiltered = ratingChecked[0]
      ? priceFiltered
      : priceFiltered.filter((v) => ratingChecked[v.popularity]);
    // TODO: add more filters
    setPreviewInfo(ratingFiltered);
  }, [priceRange, ratingChecked]);
  return (
    <Box sx={{ width: "250px", display: "inline-block" }}>
      <Accordion>
        <AccordionSummary>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="All"
            />
            <FormControlLabel control={<Checkbox />} label="Feature Products" />
            <FormControlLabel control={<Checkbox />} label="Writing Tools" />
            <FormControlLabel control={<Checkbox />} label="Paper Products" />
            <FormControlLabel control={<Checkbox />} label="Desk Accessories" />
            <FormControlLabel control={<Checkbox />} label="Others" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            getAriaLabel={() => "Price range"}
            value={priceRange}
            onChange={updatePriceRange}
            scale={(value) => 10 * value}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ratingChecked[0]}
                  onChange={(event) =>
                    updateRatingChecked(0, event.target.checked)
                  }
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ratingChecked[1]}
                  onChange={(event) =>
                    updateRatingChecked(1, event.target.checked)
                  }
                />
              }
              label={<Rating name="size-medium" defaultValue={1} readOnly />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ratingChecked[2]}
                  onChange={(event) =>
                    updateRatingChecked(2, event.target.checked)
                  }
                />
              }
              label={<Rating name="size-medium" defaultValue={2} readOnly />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ratingChecked[3]}
                  onChange={(event) =>
                    updateRatingChecked(3, event.target.checked)
                  }
                />
              }
              label={<Rating name="size-medium" defaultValue={3} readOnly />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ratingChecked[4]}
                  onChange={(event) =>
                    updateRatingChecked(4, event.target.checked)
                  }
                />
              }
              label={<Rating name="size-medium" defaultValue={4} readOnly />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ratingChecked[5]}
                  onChange={(event) =>
                    updateRatingChecked(5, event.target.checked)
                  }
                />
              }
              label={<Rating name="size-medium" defaultValue={5} readOnly />}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography>Size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Small" />
            <FormControlLabel control={<Checkbox />} label="Medium" />
            <FormControlLabel control={<Checkbox />} label="Large" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
export default ProductFilter;
