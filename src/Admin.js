import React, { useEffect, useState } from "react";
import "./sidebar.css"
import Home from './components/Home';
import Dashboard from "./components/dashboard";
import { Link, NavLink } from "react-router-dom";
import { $CombinedState } from "redux";
const Admin = () => {
    const linkStyle = {
        textDecorationLine: "none",
        // backgroundColor: "yellow",
        // backgroundColor: isActive ? 'salmon' : '',
        // color: isActive ? 'white' : '',
        before: "black",
        after: "whote"
    };
    return (
        <div className="sidebar">
            <ul>
                <li><span className="head">ADMIN</span></li>
                <li className="summa">
                <NavLink activeclassname="active" style={{textDecoration: 'none'}} className = "fa fa-home" to='/admin/home' >&ensp;Home</NavLink>
                    {/* <span class="icon"><i class="fa fa-user-friends"></i></span> */}
                    {/* <span class="item">Home</span> */}
                </li>
                <li>
                <NavLink activeclassname="active" style={{textDecoration: 'none'}} className = "fa fa-dashboard" to='/admin/dashboard' >&ensp;Dashboard</NavLink>
                    {/* <span class="icon"><i class="fa fa-tachometer-alt"></i></span> */}
                    {/* <span class="item">Dashboard</span> */}

                </li>
                <li>
                <NavLink activeclassname="active" style={{textDecoration: 'none'}} className="fa fa-users" to='/admin/users' >&ensp;Users</NavLink>
                    {/* <span class="icon"><i class="fa fa-database"></i></span> */}
                    {/* <span class="item">Users</span> */}
                </li>
                <li>
                <NavLink activeclassname="active" style={{textDecoration: 'none'}} className="fa fa-shopping-cart" to='/admin/products' >&ensp;Products</NavLink>
                    {/* <span class="icon"><i class="fa fa-chart-line"></i></span> */}
                    {/* <span class="item">Products</span> */}
                </li>
                <li>
                <NavLink activeclassname="active" style={{textDecoration: 'none'}} className="fa fa-bookmark" to='/admin/bookmarks' >&ensp;Bookmarks</NavLink>
                    {/* <span class="icon"><i class="fa fa-user-shield"></i></span> */}
                    {/* <span class="item">Bookmarks</span> */}

                </li>
                <li>
                <NavLink activeclassname="active" style={{textDecoration: 'none'}} className="fa fa-gear" to='/admin/settings' >&ensp;Settings</NavLink>
                    {/* <span class="icon"><i class="fa fa-cog"></i></span> */}
                    {/* <span class="item">Settings</span> */}
                </li>
            </ul>
        </div>
    )
}

export default Admin;