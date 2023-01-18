import Admin from "../Admin"
import "../sidebar.css"
import { store } from "../index";
import { Box, Avatar, ListItemIcon, Divider, Typography, Tooltip, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReactPaginate from "react-paginate"
import Logout from '@mui/icons-material/Logout';
import { Link, NavLink } from "react-router-dom";
import Edit from "./edit";


const Products = () => {

    const [data, setData] = useState([]);
    const [click, setclick] = useState(false);
    let name = store.getState().username;
    const [search, setsearch] = useState('');
    const [edit, setedit] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [vari, setvari] = useState('')
    const opens = Boolean(anchorEl);
    const open12 = Boolean(anchorEl2)
    const [anchorE2, setAnchorE2] = React.useState(null);
    const open1 = Boolean(anchorE2);
    const Swal = require('sweetalert2')


    useEffect(() => {
        const data = { field: 'productname', value: 1, page: 0 };
        fetch("http://localhost:2000/getprods", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)

        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }, []);
    const searchtext = (e) => {
        let searchValue = e.target.value
        setsearch(e.target.value);
        const data = { searchValue: searchValue };
        return fetch("http://localhost:2000/getprods", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }
    const filtertext = (e) => {
        const data = { filterValue: e.target.value };
        return fetch("http://localhost:2000/getprods", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }

    const sorting = (field) => {
        setclick(!click)
        // const value = Number(click)
        const value = (click) ? 1 : -1
        // const value = sort==1?-1:1
        const data = { field: field, value: value };
        return fetch("http://localhost:2000/getprods", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }
    function handlePageClick({ selected: selectedPage }) {
        // setCurrentPage(selectedPage);
        const data = { field: 'productname', value: 1, page: selectedPage };
        return fetch("http://localhost:2000/getprods", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)

        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
    }
    const nPages = Math.ceil(data.count / 5)
    const logOut = () => {
        window.location.href = '/';
    };
    const handleclick = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleclose = () => {
        setAnchorE2(null);
    };

    const states = ['APPROVED', 'UNAPPROVED']
    const handleClick = (event) => {
        setvari(event.currentTarget.value);
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setvari(event.currentTarget.value);
        setAnchorEl2(event.currentTarget);
    };
    const accept = (tds) => {
        setAnchorEl(null);
        Swal.fire({
            title: 'Accept the product',
            text: "You won't be able to revert this!",
            // icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm!'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = { productname: tds, status: 'accept' };
                fetch("http://localhost:2000/status", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })
                setvari('')
                Swal.fire(
                    'Confirmed!',
                    // 'Your file has been deleted.',
                    // 'success'
                )
            }
        })
    };
    const handleClose = () => {

        setAnchorEl(null);
        setAnchorEl2(null);
    }

    const reject = (tds) => {
        setAnchorEl(null);
        Swal.fire({
            title: 'Reject Reason!',
            input: 'text',
            // text: "You won't be able to revert this!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Reject!'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = { productname: tds, status: 'reject', rejectreason: result.value };
                fetch("http://localhost:2000/status", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                })
                Swal.fire(
                    'Rejected!',
                    // 'Your file has been deleted.',
                    // 'success'
                )
            }
        })
    };
    return (

        <div>
            <div>
                <Admin />
            </div>{edit ?<>
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
            <div className="div-2">

                {/* <br/> */}

                <TextField
                    id="outlined-search"
                    autoFocus
                    size="small"
                    label="Search"
                    type="text"
                    sx={{ width: 320, height: 60 }}
                    inputProps={{ style: { fontSize: 20 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 25, } }}
                    variant="outlined"
                    value={search}
                    onChange={searchtext}
                />
                <select className="custom-select" onChange={filtertext}>
                    {
                        states.map((state, index) => {
                            return <option key={index}>{state}</option>
                        })
                    }
                </select>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => sorting("productname")} >Product Name{click ? <>▲</> : <>▼</>}</th>
                            <th onClick={() => sorting("description")}>description{click ? <>▲</> : <>▼</>}</th>
                            <th>Status</th>
                            <th className="status">Action</th>
                        </tr>
                    </thead>
                </table>
                {
                    data?.users?.map((item, index) => {
                        return (
                            <React.Fragment key={item._id}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="name">{item?.productname}</td>
                                            <td className="name">{item?.description}</td>
                                            <td>{item?.status}</td>
                                            <td className="status">{item.status == 'UNAPPROVED' ?
                                                <div>
                                                    <div>
                                                        <IconButton
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={opens ? 'long-menu' : undefined}
                                                            aria-expanded={opens ? 'true' : undefined}
                                                            aria-haspopup="true"
                                                            value={item.sellerid}
                                                            onClick={handleClick}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu
                                                            key={item}
                                                            // id="demo-positioned-menu"
                                                            aria-labelledby="demo-positioned-button"
                                                            anchorEl={anchorEl}
                                                            open={opens}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}
                                                        >
                                                            <MenuItem style={{ fontSize: 15, borderTopColor: "black" }} onClick={() => accept(vari)}>Accept</MenuItem>
                                                            <MenuItem style={{ fontSize: 15 }} onClick={() => reject(vari)}>Reject</MenuItem>
                                                            <MenuItem style={{ fontSize: 15 }} onClick={() => setedit(!edit)}>Edit</MenuItem>
                                                            {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
                                                            {/* <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin/edit' state={{ id: vari }} >&emsp;&nbsp;Edit</Link> */}
                                                        </Menu>
                                                    </div>
                                                </div> : <div>
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open12 ? 'long-menu' : undefined}
                                                        aria-expanded={open12 ? 'true' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={handleClick2}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <Menu
                                                        key={item}
                                                        // id="demo-positioned-menu"
                                                        aria-labelledby="demo-positioned-button"
                                                        anchorEl={anchorEl2}
                                                        open={open12}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                    >
                                                        <MenuItem style={{ fontSize: 15 }} onClick={() => reject(vari)}>Reject</MenuItem>
                                                        <MenuItem style={{ fontSize: 15 }} onClick={() => setedit(!edit)}>Edit</MenuItem>
                                                        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                                    </Menu>
                                                </div>
                                            }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </React.Fragment>
                        );
                    })
                }
                <div style={{ height: 400, width: '100%', marginLeft: '75%' }}>
                    <div>
                        <ReactPaginate
                            previousLabel={"← Previous"}
                            nextLabel={"Next →"}
                            pageCount={nPages}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            // previousLinkClassName={"pagination__link"}
                            // nextLinkClassName={"pagination__link"}
                            // disabledClassName={"pagination__link--disabled"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            </div ></>:<Edit id ={vari}/>}
        </div >)
}

export default Products