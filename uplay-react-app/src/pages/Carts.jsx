import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';
import UserContext from '../contexts/UserContext';

function Carts() {
    const [cartList, setCartList] = useState([]);
    const [search, setSearch] = useState('');
    const { user } = useContext(UserContext);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getCarts = () => {
        http.get('/cart').then((res) => {
            setCartList(res.data);
        });
    };

    const searchCarts = () => {
        http.get(`/cart?search=${search}`).then((res) => {
            setCartList(res.data);
        });
    };

    useEffect(() => {
        getCarts();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchCarts();
        }
    };

    const onClickSearch = () => {
        searchCarts();
    }

    const onClickClear = () => {
        setSearch('');
        getCarts();
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Carts
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                {
                    user && (
                        <Link to="/addcart" style={{ textDecoration: 'none' }}>
                            <Button variant='contained'>
                                Add
                            </Button>
                        </Link>
                    )
                }
            </Box>

            <Grid container spacing={2}>
                {
                    cartList.map((cart, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={cart.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {cart.service}
                                            </Typography>
                                            {
                                                user && user.id === cart.userId && (
                                                    <Link to={`/editcart/${cart.id}`}>
                                                        <IconButton color="primary" sx={{ padding: '4px' }}>
                                                            <Edit />
                                                        </IconButton>
                                                    </Link>
                                                )
                                            }
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccountCircle sx={{ mr: 1 }} />
                                            <Typography>
                                                {cart.user?.name}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(cart.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>

                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {cart.participants}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {cart.quantity}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {dayjs(cart.date).format('YYYY-MM-DD')}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {cart.time.substring(0, 5)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default Carts;