import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";

function ProductFilter() {
    return (
        <Box sx={{width: "250px", display: "inline-block"}}>
            <Accordion>
                <AccordionSummary>
                    <Typography>Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Test2</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Test2</Typography>
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
                    <Typography>Test2</Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
export default ProductFilter;