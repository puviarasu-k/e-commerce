import Admin from "../Admin"
// import "../sidebar.css"
import React, { useEffect, useState } from "react";
import { Box, Avatar, ListItemIcon, Divider, Typography, Tooltip, IconButton, Menu, MenuItem, TextField } from "@mui/material";
// import "./users.css"
import { store } from "../index";
import { Navigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Logout from '@mui/icons-material/Logout';
import ReactPaginate from "react-paginate"




// console.log("dfghdfg")
const Users = () => {

    const [data, setData] = useState([]);
    const [click, setclick] = useState(true);
    const [search, setsearch] = useState('');
    const [page, setpage] = useState(1);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const open1 = Boolean(anchorE2);

    const fetchData = () => {
        const data = { field: 'username', value: 1, page: 0 };
        return fetch("http://localhost:2000/getusers", {
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    const searchtext = (e) => {
        let searchValue = e.target.value
        setsearch(e.target.value);
        const data = { searchValue: searchValue };
        return fetch("http://localhost:2000/getusers", {
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
        return fetch("http://localhost:2000/getusers", {
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
        const value = (click) ? -1 : 1
        // const value = sort==1?-1:1
        const data = { field: field, value: value ,page : page};
        return fetch("http://localhost:2000/getusers", {
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
        console.log(selectedPage + 1);
        const value = (click) ? 1 : -1
        setpage(selectedPage)
        const data = { field: 'username', value: 1, page: selectedPage,value: value };
        return fetch("http://localhost:2000/getusers", {
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
    // const count = 
    const nPages = Math.ceil(data.count / 5)
    const logOut = () => {
        Navigate('/')
        // window.location.href = '/';
    };
    const handleclick = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleclose = () => {
        setAnchorE2(null);
    };

    const states = ['BUYER', 'ADMIN']
    //   console.log(load)

    useEffect(() => {
        console.log("search", search)
    }, [search])
    return (
        <div>
            <div>
                <Admin />
            </div>
            <div id="header">
                    <h1 style={{ marginLeft: "10%" }}>&emsp;Users</h1>
                    {/* <h1 style={{ marginLeft: 1100 }} >{myname}</h1>  */}
                    <div style={{ marginLeft: "75%",paddingTop : "1.9%" }}>
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
                                    <Avatar /> Profile
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
                <br/>
            <div className="div-2">                
                <TextField
                    id="outlined"
                    autoFocus
                    size="small"
                    label="Search"
                    type="text"
                    sx={{ width: 320, height: 60 }}
                    inputProps={{ style: { fontSize: 20 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 20, } }}
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
                            <th onClick={() => sorting("username")} value={"username"} >User Name {click ? <>▲</> : <>▼</>}</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>User Role</th>
                        </tr>
                    </thead>
                </table>
                {data?.users?.map((item, i) => {
                    return (
                        // <p>
                        //     <td key={i}>{item?.username}</td>

                        // </p>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="name" data-label="Payment">{item?.username}</td>
                                    <td data-label="Issue Date">{item?.mobile}</td>
                                    <td className="name">{item?.email}</td>
                                    <td className="name1">{item?.userRole}</td>
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
                <div style={{ height: 400, width: '100%', marginLeft: '65%' }}>
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
            </div>
        </div>

    )
}

export default Users