import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image from './honey.jpg'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReactPaginate from "react-paginate"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import Badge from "@material-ui/core/Badge";
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    paddingLeft: 2,
    paddingTop: 10,
    borderRadius: 10,
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));


export default function Singleproduct({ item,click }) {
    const [quantity, setQuantity] = useState(0);
    return (
        <>
            <Grid item xs={2} sm={4} md={4}>
                <Item><div className='popup'>
                    <img style={{
                        backgroundRepeat: 'no-repeat',
                        width: '50%',
                        borderRadius: 10,
                        float: 'left',
                        paddingTop: 20,
                        display: 'block'
                    }} src={image} alt="horse" /><br />
                    <div style={{ marginLeft: 10, float: 'left' }}>
                        <Link style={{ fontSize: "250%", cursor: 'pointer', wordBreak: 'break-word' }} to="/details" name={item.productname}>{item.productname}</Link>
                        <h6 >₹899</h6>
                        <h6 >Flipzon.com</h6>
                        <h5 >Yokee Traders</h5>
                        <h4>
                            <button value={0} onClick={() => setQuantity(pre => pre - 1)} style={{ width: 20 }} disabled={quantity <= 0}>-</button>&nbsp;
                            {quantity}&nbsp;
                            <button value={"puvi"} onClick={() => (setQuantity(pre => pre + 1))} style={{ width: 20 }}>+</button>
                        </h4>
                        
                        
                    </div>
                    <Badge color="primary" style={{ marginLeft: "90%", cursor: 'pointer' }} badgeContent={quantity}>
                    <AddShoppingCartIcon style={{ marginLeft: "95%", cursor: 'pointer' }} />
                    </Badge>
                </div>
                </Item>
            </Grid>
        </>
    )
}
