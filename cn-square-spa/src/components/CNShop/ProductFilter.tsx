import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";

function ProductFilter() {
  const [priceRange, setPriceRange] = useState<number[]>([20, 50]);
  const updatePriceRange = (event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
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
            <FormControlLabel control={<Checkbox />} label="Mesauring Tools" />
            <FormControlLabel
              control={<Checkbox />}
              label="Erasers & Correction"
            />
            <FormControlLabel control={<Checkbox />} label="Calculators" />
            <FormControlLabel control={<Checkbox />} label="Pens & Pencils" />
            <FormControlLabel control={<Checkbox />} label="Featured Items" />
            <FormControlLabel
              control={<Checkbox />}
              label="Highlighters & Markers"
            />
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
          <Typography>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Test2</Typography>
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
