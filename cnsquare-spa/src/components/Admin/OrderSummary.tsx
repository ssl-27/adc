import { useEffect, useState } from 'react';
import adcAxios from '../../utils/cn-axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material';

const OrderSummaryPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);  



  const fetchOrderData = async () => {
    try {
      const response = await adcAxios.get('/orders');
      setOrderData(response.data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await adcAxios.get('/products');
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    fetchOrderData();
    fetchProductData();
  }, []);



  const computeProductSum = () => {
    const productSum = [];
  
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
    orderData
      .filter((order: Order) => order.createdAt.startsWith(today))
      .forEach((order) => {
        order.items.forEach((item) => {
          const { productId, quantity } = item;
          const product = productData.find((p) => p.id === productId);
          if (product) {
            const cost = parseFloat(product.prices.find((price) => price.tier === 0)?.price || '0');
            const orderItem = {
              productId,
              quantity,
              cost: product.cost * quantity,
              revenue: cost * quantity,
              profit: cost - product.cost,
              productName: product.name,
              status: order.status,
              orderId: order.id, // Add the order ID
            };
            productSum.push(orderItem);
          }
        });
      });
  
    return productSum;
  };

  const calculateTotals = () => {
    let cost = 0;
    let revenue = 0;
    let profit = 0;
  
    Object.entries(productSum).forEach(([productId, product]) => {
      cost += product.cost;
      revenue += product.revenue;
      profit += product.profit;
    });
  
    setTotalCost(cost);
    setTotalRevenue(revenue);
    setTotalProfit(profit);
  };  

  const markOrderAsFulfilled = async (orderId: number) => {
    try {
      await adcAxios.patch(`/orders/${orderId}`, { status: 1 }); // Update the endpoint to use the order ID
      fetchOrderData();
    } catch (error) {
      console.error('Error marking order as fulfilled:', error);
    }
  };

  const productSum = computeProductSum();
  console.log("realProduct sum: ", productSum);
  useEffect(() => {
    calculateTotals();
  }, [productSum]); 

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Order Summary
      </Typography>
      <Typography variant="h6" component="h2">
        Total Cost: ${totalCost} Total Revenue: ${totalRevenue}  Total Profit: ${totalProfit}
      </Typography> 
      <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
        <Tab label="Unfulfilled Orders" />
        <Tab label="Fulfilled Orders" />
      </Tabs>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell> {/* Add the Order ID column */}
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Item Sold</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Profit</TableCell>
              {activeTab === 0 && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {productSum.map((product, index) => { // Use map() instead of Object.entries()
              const { orderId, status } = product; // Destructure the orderId
              if (
                (activeTab === 0 && status === 0) || // Unfulfilled Orders
                (activeTab === 1 && status === 1) // Fulfilled Orders
              ) {
                return (
                  <TableRow key={index}> {/* Use the array index as the key */}
                    <TableCell>{orderId}</TableCell> {/* Display the order ID */}
                    <TableCell>{product.productId}</TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.cost}</TableCell>
                    <TableCell>{product.revenue}</TableCell>
                    <TableCell>{product.profit}</TableCell>
                    {status === 0 && (
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => markOrderAsFulfilled(orderId)} // Use the order ID
                        >
                          Mark Fulfilled
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderSummaryPage;