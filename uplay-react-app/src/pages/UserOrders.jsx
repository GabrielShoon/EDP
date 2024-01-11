import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import http from '../http';
import UserContext from '../contexts/UserContext';

function UserOrders() {
  const [orderList, setOrderList] = useState([]);
  const { user } = useContext(UserContext);

  const getOrders = () => {
    http.get('/order').then((res) => {
      setOrderList(res.data);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      {orderList.map((order, i) => (
        user && user.id === order.userId && (
          <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`order-details-${order.id}-content`}
              id={`order-details-${order.id}-header`}
            >
              <Typography variant="h6">
                Order Date: {order.orderDate}, Total Amount: {order.totalAmount}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {order.orderDetails && (
                  order.orderDetails.map((orderDetail, j) => (
                    <Box key={j} marginBottom={2}>
                      <Typography variant="subtitle1">
                        Service: {orderDetail.service}
                      </Typography>
                      <Typography variant="body1">
                        Participants: {orderDetail.participants}
                      </Typography>
                      <Typography variant="body1">
                        Quantity: {orderDetail.quantity}
                      </Typography>
                      <Typography variant="body1">
                        Date: {orderDetail.date}
                      </Typography>
                      <Typography variant="body1">
                        Time: {orderDetail.time}
                      </Typography>
                      <Typography variant="body1">
                        Price: {orderDetail.price}
                      </Typography>
                      <hr />
                    </Box>
                  ))
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      ))}
    </Box>
  );
}

export default UserOrders;
