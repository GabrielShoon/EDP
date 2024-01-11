import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import http from '../http';

function Orders() {
    const [orderList, setOrderList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const getOrders = () => {
        http.get('/order').then((res) => {
            setOrderList(res.data);
        });
    };

    useEffect(() => {
        getOrders();
    }, []);

    const handleButtonClick = (orderId) => {
        const selectedOrder = orderList.find((order) => order.id === orderId);
        setSelectedOrder(selectedOrder);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const columns = [
        { field: 'id', headerName: 'Order ID', flex: 1 },
        { field: 'orderDate', headerName: 'Order Date', flex: 1 },
        { field: 'totalAmount', headerName: 'Total Amount', flex: 1 },
        { field: 'userName', headerName: 'User Name', flex: 1 },
        {
            field: 'detailsButton',
            headerName: 'Details',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleButtonClick(params.row.id)}>
                    Details
                </Button>
            ),
        },
    ];

    const rows = orderList.map((order, i) => ({
        id: order.id,
        orderDate: order.orderDate,
        totalAmount: order.totalAmount,
        userName: order.user?.name,
        detailsButton: 'details',
    }));

    const [pageSize, setPageSize] = useState(5)

    return (
        <Box
            height='75vh'
            m='40px 0 0 0'
            mb='200px'
        >

            <DataGrid
                columns={columns}
                rows={rows}
                slots={{
                    toolbar: GridToolbar,
                }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pageSizeOptions={[5, 10, 25, 100]}
            >
            </DataGrid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{`Order Details (Order ID: ${selectedOrder?.id})`}</DialogTitle>
                <DialogContent>
                    
                    {selectedOrder?.orderDetails.map((orderDetail) => (
                        <Box key={orderDetail.id}>
                            {/* Display order detail information */}
                            <Typography variant="body1">{`Service: ${orderDetail.service}`}</Typography>
                            <Typography variant="body1">{`Participants: ${orderDetail.participants}`}</Typography>
                            <Typography variant="body1">{`Quantity: ${orderDetail.quantity}`}</Typography>
                            <hr/>
                        </Box>
                    ))}
                </DialogContent>
            </Dialog>

        </Box>
    );
}


export default Orders;