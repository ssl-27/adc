import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';
import QueueIcon from '@mui/icons-material/Queue';
import TableChartIcon from '@mui/icons-material/TableChart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const AdminDashboardPage = () => {
  return (
    <Box p={3}>
      <h2>Admin Dashboard</h2>
      <Link to="/scan-queue-qr-code" style={{ textDecoration: 'none' }}>
        <Card variant="outlined" style={{ cursor: 'pointer' }}>
          <CardContent>
            <QueueIcon />
            <Typography variant="h5" component="h2">
              Scan Queue QR Code
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Scan QR codes to manage the queue.
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link to="/tablestatus" style={{ textDecoration: 'none' }}>
        <Card variant="outlined" style={{ cursor: 'pointer' }}>
          <CardContent>
            <TableChartIcon />
            <Typography variant="h5" component="h2">
              Table Status
            </Typography>
            <Typography variant="body2" color="textSecondary">
              View and manage table statuses.
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Link to="/orderstatus" style={{ textDecoration: 'none' }}>
        <Card variant="outlined" style={{ cursor: 'pointer' }}>
          <CardContent>
            <ShoppingBasketIcon />
            <Typography variant="h5" component="h2">
              Order Status
            </Typography>
            <Typography variant="body2" color="textSecondary">
              View and manage order statuses.
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default AdminDashboardPage;