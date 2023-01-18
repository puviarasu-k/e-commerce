import React, { useEffect, useState } from "react";
// import "./index.css";
import { useContext } from "react";
import userContext from "./userContext";
import image from "./profile.png"
import Button from 'react-bootstrap/Button';
import { store } from "./index";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';




function ProductListing() {


  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();



  let proname = store.getState().id;

  


  const fetchData = () => {
    return fetch("http://localhost:2000/listing/" + proname)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);


  const logOut = () => {
    window.location.href = '/';
  };

  function DropdownItem() {
    return (
      <div id="white" >
        <h1>{store.getState().username}</h1>
        <Button onClick={logOut}>Log out</Button>
      </div>

    );
  }



  const handleLinkClick = (id) => {
    store.dispatch({
      type: 'SETVAR',
      payload:  {
          data : data,
          index : id
      }

  });
  console.log(id)
  
  // navigate('/views');
  
    
  }

  return (
    <div>
      <div id="header">
        <h1>&emsp;My Products</h1>
        {/* <h1 style={{ marginLeft: 1100 }} >{myname}</h1>  */}
        <img id="imagep" alt="logo" onClick={() => setOpen(!open)} src={image} ></img>

      </div>
      <div id="slide">{
        open && (<DropdownItem />)
      }</div>
      <br />
      <table id="table1">
        <thead>
          <tr>
            <th>{data?.productname}Product Name</th>
            <th>Description</th>
            <th>Variants</th>
          </tr>
        </thead>
        {data>0 && data?.map((item, i) => {
          console.log(item);
          return (
          <tbody key={i}>
            <tr key={i}>
              <td >{item.productname}</td>
              <td >{item.description}</td>
              {/* <td id="viewbutton"><a href="/views" onClick={()=>clickHandler(i)}>View</a></td> */}
              <td id="viewbutton"><Link id='variantbox' to="/views" onClick={()=>handleLinkClick(i) } >view</Link></td>
            </tr>
          </tbody>
          );
        })}

      </table>


    </div>
  );
}

export default ProductListing