import React, { useState, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import adcAxios from '../../utils/cn-axios';

const QRScannerPage: React.FC = () => {
  const [qrData, setQRData] = useState<string | null>(null);
  const qrReaderRef = useRef<QrReader | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [idTicket, setIdTicket] = useState<string>();
  const navigate = useNavigate();

  const handleScan = (data: string | null) => {
    if (data) {
      setQRData(data.text);
      setManualInput(data.text); // Set the scanned data to the manual input state
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  const handleManualInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManualInput(event.target.value);
  };

  const handleManualInputSubmit = async () => {
    try {
        // Make a GET request to fetch the table data
        const response = await adcAxios.get('/tables');
        const tables = response.data;
    
        // Find the first available table
        const availableTable = tables.find((table) => !table.seated);
        console.log(availableTable);
    
        if (availableTable) {
          // Update the seated status of the smallest table number to true
          await adcAxios.patch(`/tables/${availableTable.id}`, {
            seated: true,
          });

          await adcAxios.get(`/reservation?ticketId=${qrData}`)
          .then((reservationResponse) => {
            adcAxios.patch(`/reservation/${reservationResponse.data[0].id}`, {isActive: false})
          });
          
          // Redirect to the table status page
          navigate('/tableStatus');
        } else {
          // Handle the case when no free table is available
          console.log('No free table available');
        }
      } catch (error) {
        // Handle any errors that occur during the API requests
        console.error('Error:', error);
      }  };

  const handleManualInputClear = () => {
    setManualInput('');
  };

  const handleQRScannerReset = () => {
    setQRData(null);
    qrReaderRef.current?.openImageDialog(); // Open file dialog for scanning QR code again
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        QR Scanner
      </Typography>

      {qrData ? (
        <Box>
          <Typography variant="h6">QR Code Data:</Typography>
          <Typography>{qrData}</Typography>
          <Button variant="contained" onClick={handleQRScannerReset}>
            Scan Again
          </Button>
        </Box>
      ) : (
        <Box style={{
            position: 'relative',
            width: '40%',
            height:'40%',
            overflow: 'hidden',
          }}>
          <Typography variant="h6">Scan QR Code:</Typography>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="h6">Manual Input:</Typography>
        <TextField
          label="Enter Data"
          value={manualInput}
          onChange={handleManualInputChange}
          fullWidth
        />
        <Box mt={2}>
          <Button variant="contained" onClick={handleManualInputSubmit}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleManualInputClear}>
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QRScannerPage;