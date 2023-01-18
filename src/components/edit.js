import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { Box, Avatar, ListItemIcon, Divider, Typography, Tooltip, IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { store } from "../index";
// import "../index.css";
import Admin from "../Admin"
import Logout from '@mui/icons-material/Logout';



const Edit = (props) => {
    console.log(props);

    const [data, setData] = useState([]);
    let name = store.getState().username;
    let location = useLocation();
    const [anchorE2, setAnchorE2] = React.useState(null);
    // const [inputList, setinputList] = useState({ variantName: '', price: '', quantity: '', varianttype: '' });
    const open1 = Boolean(anchorE2);
    // let data = store.getState().data;
    let index = store.getState();
    const fetchData = () => {
        return fetch("http://localhost:2000/listing/" + props.id)
            .then((response) => response.json())
            .then((data) => setData(data));
    }

    useEffect(() => {
        fetchData();
    }, [])
    const logOut = () => {
        window.location.href = '/';
    };
    const handleclick = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleclose = () => {
        setAnchorE2(null);
    };
    const handleinputchange = (e, index) => {
        const { name, value } = e.target;
        // console.log(data.variant[index][name]);
        data.variant[index][name] = value
        console.log(data);
        // const list = data;
        // lis[index][name] = value;
        // console.log(list);
        // // setData(list);
        // // console.log(inputList);
    }
    const updatechange = ()=>{
        const details = { data: data };
        fetch("http://localhost:2000/editupdate", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(details)

        })
    }

    return (
        <div>
            {/* <div>
                <Admin />
            </div> */}
            <div id="header">
                <h1 className="title">Products</h1>
                {/* <h1 style={{ marginLeft: 1100 }} >{myname}</h1>  */}
                <div className="slide">
                    <React.Fragment>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleclick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open1 ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open1 ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorE2}
                            id="account-menu"
                            open={open1}
                            onClose={handleclose}
                            onClick={handleclose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <Avatar /> {name}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={logOut}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                </div>
            </div>
            <br />
            {data && <div>
                <label style={{ marginLeft: "13%" }}>Product Name&nbsp;</label><label style={{ marginLeft: "34%" }}>Description&nbsp;</label>
                <br />
                <input id="box1" placeholder="Product Name" defaultValue={data.productname} name="productname" required type="text" />
                <input id="box" placeholder="Description" defaultValue={data.description} name="productdesc" required type="text" /><br />


                {data?.variant?.map((x, i) => {
                    return (
                        <div key={i}>
                            <h1 style={{ marginLeft: "12%" }}>Variant {i + 1}</h1>
                            {/* <br/> */}
                            <div>
                                <label style={{ marginLeft: "13.5%" }}>Name&nbsp;</label><label style={{ marginLeft: "17%" }}>Price&nbsp;</label><label style={{ marginLeft: "18%" }}>Quantity&nbsp;</label><label style={{ marginLeft: "16%" }}>Type&nbsp;</label><br />
                                <input id="box21" type="text" defaultValue={x.variantName} onChange={e => handleinputchange(e, i)} name="variantName" />
                                <input id="box2" type="text" defaultValue={x.price} onChange={e => handleinputchange(e, i)} name="price" />&nbsp;
                                <input id="box2" type="text" defaultValue={x.quantity} onChange={e => handleinputchange(e, i)} name="quantity" />&nbsp;
                                <input id="box2" type="text" defaultValue={x.varianttype} onChange={e => handleinputchange(e, i)} name="varianttype" />&nbsp;
                                <br />
                            </div>
                        </div>
                    );
                })}
                <div style={{ marginLeft: "50%",paddingTop : "1%" }}>
                    <Button variant="contained" onClick={updatechange} color="success" size="large">Update</Button><br/>
                    {/* <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/admin/home' >Back to home</NavLink> */}
                </div>

            </div>}


        </div>
    );
}

export default Edit;