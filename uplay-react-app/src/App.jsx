import './App.css';
import { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import MyTheme from './themes/MyTheme';
import http from './http';
import UserContext from './contexts/UserContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Home from './pages/Home';
import Carts from './pages/Carts';
import AddCart from './pages/AddCart';
import EditCart from './pages/EditCart';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Orders from './pages/Orders';
import UserOrders from './pages/UserOrders';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ThemeProvider theme={MyTheme}>
          <AppBar position="static" className="AppBar">
            <Container>
              <Toolbar disableGutters={true}>
                <Link to="/">
                  <Typography variant="h6" component="div">
                    UPlay
                  </Typography>
                </Link>

                {user && (
                  <>
                    <Link to="/addcart" ><Typography>Add Cart</Typography></Link>
                    <Link to="/userorders" ><Typography>My Order</Typography></Link>

                    <Box sx={{ flexGrow: 1 }}></Box>

                    <Link to="/checkout" ><ShoppingCartIcon /></Link>
                    <Typography>{user.name}</Typography>
                    <Button onClick={logout}>Logout</Button>
                  </>
                )
                }
                {!user && (
                  <>
                    <Link to="/carts" ><Typography>Carts</Typography></Link>
                    <Link to="/orders" ><Typography>Orders</Typography></Link>

                    <Box sx={{ flexGrow: 1 }}></Box>

                    <Link to="/register" ><Typography>Register</Typography></Link>
                    <Link to="/login" ><Typography>Login</Typography></Link>
                  </>
                )}
              </Toolbar>
            </Container>
          </AppBar>

          <Container>
            <Routes>
              <Route path={"/"} element={<Home />} />

              {/* User Side */}
              <Route path={"/addcart"} element={<AddCart />} />
              <Route path={"/editcart/:id"} element={<EditCart />} />
              <Route path={"/checkout"} element={<Checkout />} />
              <Route path={"/checkoutsuccess"} element={<CheckoutSuccess />} />
              <Route path={"/userorders"} element={<UserOrders />} />

              
              {/* Admin Side */}
              <Route path={"/carts"} element={<Carts />} />
              <Route path={"/orders"} element={<Orders />} />


              <Route path={"/register"} element={<Register />} />
              <Route path={"/login"} element={<Login />} />

            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
