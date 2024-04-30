import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import adcAxios from '../../utils/cn-axios';

const StyledTable = styled('div')({
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  margin: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer', // Add cursor style to indicate clickability
});

const TableStatusPage = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await adcAxios.get('/tables');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchTableData();
  }, []);

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    // Update the seated status of the selected table to false
    const updatedTable = { ...selectedTable, seated: false };
    try {
      await adcAxios.put(`/tables/${updatedTable.id}`, updatedTable);
      setDialogOpen(false);
      // Update the tableData state to reflect the change
      setTableData((prevState) =>
        prevState.map((table) => (table.id === updatedTable.id ? updatedTable : table))
      );
    } catch (error) {
      console.error('Error updating table:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Table Status
      </Typography>
      <Grid container spacing={2}>
        {tableData.map((table) => (
          <Grid item xs={12} sm={6} md={4} key={table.id}>
            <StyledTable onClick={() => handleTableClick(table)}> {/* Add onClick handler */}
              <Typography variant="h6">Table {table.tableNumber}</Typography>
              <Typography variant="body1" color={table.seated ? 'secondary' : 'textPrimary'} padding={'1em'}>
                {table.seated ? 'Occupied' : 'Vacant'}
              </Typography>
            </StyledTable>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Is the table vacant? Clicking "Confirm" will mark the table as not seated.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableStatusPage;