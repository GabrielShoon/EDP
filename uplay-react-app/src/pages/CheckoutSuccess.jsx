import React, { useEffect, useContext, useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';

function CheckoutSuccess() {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                backgroundColor: '#2c3e50',
                color: '#ffffff',
                mt: 20,
            }}
        >
            <TaskAltIcon sx={{ color: '#81c3d7', width: '100px', height: '100px' }} />

            <Typography variant="h3" sx={{ mb: '20px', mt: '20px' }}>
                Payment Successful
            </Typography>
            <Typography variant="body1" align="center" sx={{ maxWidth: 400 }}>
                Your payment has been successfully processed. Thank you for choosing Uplay!
            </Typography>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginRight: 2 }}
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate("/userorders")}
                >
                    View Orders
                </Button>
            </Box>
        </Box>
    );
}

export default CheckoutSuccess