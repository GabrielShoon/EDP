import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


function AddCart() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            service: "",
            participants: "",
            quantity: "",
            date: dayjs().add(1, 'day'),
            time: dayjs().minute(0),
        },
        validationSchema: yup.object({
            service: yup.string().trim()
                .min(3, 'Service must be at least 3 characters')
                .max(100, 'Service must be at most 100 characters')
                .required('Service is required'),
            participants: yup.string().trim()
                .min(3, 'Participants must be at least 3 characters')
                .max(500, 'Participants must be at most 500 characters')
                .required('Participants is required'),
            quantity: yup.number()
                .integer('Please enter an integer value')
                .min(1, 'Quantity must be at least 1')
                .required('Quantity is required'),
            date: yup.date().typeError('Invalid date').required('Date is required'),
            time: yup.date().typeError('Invalid time').required('Time is required'),
        }),
        onSubmit: (data) => {
            data.service = data.service.trim();
            data.participants = data.participants.trim();
            data.quantity = data.quantity;
            data.date = data.date.format('YYYY-MM-DD');
            data.time = data.time.format('HH:mm');

            const servicePrices = {
                'High Tea Session': 40,
                'Yacht Rental': 50,
                'SG Pub Crawls': 35,
                'Skating Lessons': 30,
            };

            // Calculate the price based on the selected service and quantity
            const selectedService = data.service;
            const servicePrice = servicePrices[selectedService] || 0;
            const totalPrice = servicePrice * data.quantity;

            data.price = totalPrice;

            http.post("/cart", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/checkout");
                })
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2, textAlign: 'center' }}>
                Add Cart
            </Typography>

            <Box
                border="1px solid #ccc"
                borderRadius="8px"
                p={4}
                mx="auto"
                maxWidth="600px" // Set your desired max width
                mt={3}
            >
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="dense"
                                error={formik.touched.service && Boolean(formik.errors.service)}>
                                <InputLabel>Services</InputLabel>
                                <Select label="Service"
                                    name="service"
                                    variant="filled"
                                    value={formik.values.service}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <MenuItem value={'High Tea Session'}>High Tea Session ($40)</MenuItem>
                                    <MenuItem value={'Yacht Rental'}>Yacht Rental ($50)</MenuItem>
                                    <MenuItem value={'SG Pub Crawls'}>SG Pub Crawls ($35)</MenuItem>
                                    <MenuItem value={'Skating Lessons'}>Skating Lessons ($30)</MenuItem>
                                </Select>
                                <FormHelperText>{formik.touched.service && formik.errors.service}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth margin="dense" autoComplete="off"
                                variant="filled"
                                label="Participants"
                                name="participants"
                                value={formik.values.participants}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.participants && Boolean(formik.errors.participants)}
                                helperText={formik.touched.participants && formik.errors.participants}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth margin="dense" autoComplete="off"
                                variant="filled"
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                helperText={formik.touched.quantity && formik.errors.quantity}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker format="DD/MM/YYYY"
                                        label="Select Date"
                                        name="date"
                                        value={formik.values.date}
                                        onChange={(date) => formik.setFieldValue('date', date)}
                                        onBlur={() => formik.setFieldTouched('date', true)}
                                        slotProps={{
                                            textField: {
                                                error: formik.touched.date && Boolean(formik.errors.date),
                                                helperText: formik.touched.date && formik.errors.date
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Select Time"
                                        name="time"
                                        value={formik.values.time}
                                        onChange={(time) => formik.setFieldValue('time', time)}
                                        onBlur={() => formik.setFieldTouched('time', true)}
                                        slotProps={{
                                            textField: {
                                                error: formik.touched.time && Boolean(formik.errors.time),
                                                helperText: formik.touched.time && formik.errors.time
                                            }
                                        }} />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                            <Button variant="contained" type="submit" sx={{ width: '200px' }}>
                                Add to Cart
                            </Button>
                            <Button variant="contained" sx={{ width: '200px' }} onClick={() => navigate("/checkout")}>
                                Go to Cart
                            </Button>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}

export default AddCart;