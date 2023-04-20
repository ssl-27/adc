import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function ProductFilter(props) {
  const { info, setPreviewInfo } = props;
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [ratingChecked, setRatingChecked] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [sizeChecked, setSizeChecked] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  const [categoryChecked, setCategoryChecked] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortOption, setSortOption] = useState<number>(0);
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
  const updateSizeChecked = (id: number, value: boolean) => {
    if (id === 0) {
      setSizeChecked([true, false, false, false]);
    } else {
      const temp = [...sizeChecked];
      if (value) {
        temp[0] = false;
      }
      temp[id] = value;
      if (temp[1] && temp[2] && temp[3]) {
        setSizeChecked([true, false, false, false]);
      } else if (temp[1] || temp[2] || temp[3]) {
        setSizeChecked(temp);
      } else {
        setSizeChecked([true, false, false, false]);
      }
    }
  };
  const updateCategoryChecked = (id: number, value: boolean) => {
    if (id === 0) {
      setCategoryChecked([true, false, false, false]);
    } else {
      const temp = [...categoryChecked];
      if (value) {
        temp[0] = false;
      }
      temp[id] = value;
      if (temp[1] && temp[2] && temp[3]) {
        setCategoryChecked([true, false, false, false]);
      } else if (temp[1] || temp[2] || temp[3]) {
        setCategoryChecked(temp);
      } else {
        setCategoryChecked([true, false, false, false]);
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
    const sizeFiltered = sizeChecked[0]
      ? ratingFiltered
      : ratingFiltered.filter(
          (v) =>
            (v.size === "small" && sizeChecked[1]) ||
            (v.size === "medium" && sizeChecked[2]) ||
            (v.size === "large" && sizeChecked[3])
        );
    const categoryFiltered = categoryChecked[0]
      ? sizeFiltered
      : sizeFiltered.filter(
          (v) =>
            (v.type === "writing_tools" && categoryChecked[1]) ||
            (v.type === "paper_products" && categoryChecked[2]) ||
            (v.type === "desk_accessories" && categoryChecked[3])
        );
    const searchFiltered =
      searchValue === ""
        ? categoryFiltered
        : categoryFiltered.filter((v) =>
            v.name.toLowerCase().includes(searchValue.toLowerCase())
          );
    const sorted = searchFiltered.sort((a, b) => {
      switch (sortOption) {
        case 0:
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
          break;
        case 1:
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          }
          break;
        case 2:
          if (a.feature === "new" && b.feature !== "new") {
            return -1;
          } else if (a.feature !== "new" && b.feature === "new") {
            return 1;
          }
          break;
        case 3:
          if (a.feature === "hot" && b.feature !== "hot") {
            return -1;
          } else if (a.feature !== "hot" && b.feature === "hot") {
            return 1;
          }
          break;
      }
      return 0;
    });
    setPreviewInfo(sorted);
  }, [
    priceRange,
    ratingChecked,
    sizeChecked,
    categoryChecked,
    searchValue,
    sortOption,
  ]);
  return (
    <Box sx={{ maxWidth: "250px", display: "inline-block" }}>
      <Box margin={"5px"}>
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption.toString()}
            label="Sort By"
            onChange={(event: SelectChangeEvent) => {
              setSortOption(parseInt(event.target.value));
            }}
          >
            <MenuItem value={0}>A - Z</MenuItem>
            <MenuItem value={1}>Low - High Price</MenuItem>
            <MenuItem value={2}>Newest</MenuItem>
            <MenuItem value={3}>Hot</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box margin={"5px"}>
        <TextField
          label="Search Product"
          variant="filled"
          value={searchValue}
          fullWidth
          onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value)
          }
        />
      </Box>
      <Accordion>
        <AccordionSummary>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={categoryChecked[0]}
                  onChange={(event) =>
                    updateCategoryChecked(0, event.target.checked)
                  }
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={categoryChecked[1]}
                  onChange={(event) =>
                    updateCategoryChecked(1, event.target.checked)
                  }
                />
              }
              label="Writing Tools"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={categoryChecked[2]}
                  onChange={(event) =>
                    updateCategoryChecked(2, event.target.checked)
                  }
                />
              }
              label="Paper Products"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={categoryChecked[3]}
                  onChange={(event) =>
                    updateCategoryChecked(3, event.target.checked)
                  }
                />
              }
              label="Desk Accessories"
            />
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={sizeChecked[0]}
                  onChange={(event) =>
                    updateSizeChecked(0, event.target.checked)
                  }
                />
              }
              label="All"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sizeChecked[1]}
                  onChange={(event) =>
                    updateSizeChecked(1, event.target.checked)
                  }
                />
              }
              label="Small"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sizeChecked[2]}
                  onChange={(event) =>
                    updateSizeChecked(2, event.target.checked)
                  }
                />
              }
              label="Medium"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sizeChecked[3]}
                  onChange={(event) =>
                    updateSizeChecked(3, event.target.checked)
                  }
                />
              }
              label="Large"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
export default ProductFilter;
