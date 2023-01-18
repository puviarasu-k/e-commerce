import image from '../honey.jpg'
import styles from './details.module.css'
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { Badge } from '@mui/material';

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return { quantity: state.quantity + 1, price: state.price + 899 }
        case "MINUS":
            return { quantity: state.quantity - 1, price: state.price - 899 }
        default:
            return state;
    }
}
export default function ProductDetailsPage({name}) {
    console.log(name);
    const [anchorEl, setAnchorEl] = useState(null)
    const [state, dispatch] = useReducer(reducer, { quantity: 0, price: 899 })

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/* <IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							 <MenuIcon />
						</IconButton> */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Products
                        </Typography>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Badge color="secondary" badgeContent={state.quantity}>
                                    <ShoppingCartIcon sx={{ fontSize: 30 }} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle sx={{ fontSize: 30 }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                PaperProps={{
                                    style: {
                                        transform: 'translateX(10px) translateY(50px)',
                                        width:200,
                                        height:100
                                    }
                                }}
                                keepMounted={false}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} style={{fontSize:20}}>Profile</MenuItem>
                                <MenuItem onClick={handleClose} style={{fontSize:20}}>My account</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={styles.maindiv}>
                <div className={styles.imagediv}>
                    <img className={styles.productimage} src={image} alt="horse" />
                </div>
                <div style={{ padding: "1%" }}>
                    <a style={{ cursor: 'pointer', fontSize: 20 }}>Yokee Traders</a>
                    <ShareIcon fontSize='large' style={{ float: 'right' }} />
                    <h3>Honey Bee(1 Litre)</h3>
                    <h4>
                        <button value={0} onClick={() => { dispatch({ type: "MINUS" }) }} style={{ width: 25, boxShadow: '0px 0px 1px 1px rgb(0,0,0)' }} disabled={state.quantity <= 0}>-</button>&nbsp;
                        &ensp;{state.quantity}&emsp;
                        <button value={"puvi"} onClick={() => { dispatch({ type: "ADD" }) }} style={{ width: 25, boxShadow: '0px 0px 1px 1px rgb(0,0,0)' }}>+</button>
                    </h4>
                    <h2 >₹{state.price}</h2><strong><h5 style={{ color: 'green' }}>11% Offers</h5></strong>
                    <h6>Local tax included (where applicable)</h6><br />
                    <Button variant="contained" sx={{
                        fontSize: 20, width: '25%', transition: 'transform .2s', boxShadow: 1, '&:hover': {
                            color: 'red',
                            borderColor: 'black',
                            backgroundColor: 'white',
                            transform: 'scale(1.1)'
                        }
                    }} startIcon={<LocalMallIcon />}>
                        Buy
                    </Button>&emsp;
                    <Button variant="contained" sx={{
                        fontSize: 20, width: '40%', transition: 'transform .2s', boxShadow: 1, '&:hover': {
                            color: 'red',
                            backgroundColor: 'white',
                            borderColor: 'black',
                            transform: 'scale(1.1)'
                        }
                    }} startIcon={<AddShoppingCartIcon />}>
                        Add to cart
                    </Button>
                    <br />
                    <h5>Available Offers</h5>
                    <p><LocalOfferIcon />&nbsp;<strong>Bank Offer</strong> 5% Cashback on Flipkart Axis Bank Card <strong><a>T&C</a></strong></p>
                    <p><LocalOfferIcon />&nbsp;Buy this Product and Get Extra ₹500 Off on Two-Wheelers <strong><a>T&C</a></strong></p>
                    <p><LocalOfferIcon />&nbsp;Buy this Product & get Extra 10% Off on future inks purchase <strong><a>T&C</a></strong></p>
                    <p><LocalOfferIcon />&nbsp;<strong>Partner Offer</strong> Buy this product and get upto ₹500 off on Flipkart Furniture <strong><a>Know More</a></strong></p>
                </div>

            </div>
        </div>
    )
}