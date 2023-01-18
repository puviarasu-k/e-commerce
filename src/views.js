import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import image from "./profile.png";
import { Link } from "react-router-dom";
import { store } from "./index";


// import "./index.css";


const Views = (props) => {

    // const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    let data = store.getState().data;
    let index = store.getState().index;
    // const fetchData = () => {
    //     return fetch("http://localhost:2000/listing/"+variant)
    //         .then((response) => response.json())
    //         .then((data) => setData(data));
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [])

    const logOut = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
        localStorage.setItem('proname', null);
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

    return ( <div>
         <div id="header">
            <h1 className='productsheading'>Product Details</h1>
            <img id="imagep" onClick={()=> setOpen(!open)} src={image} ></img>
        </div>
        <div id="slide">{ 
        open &&  ( <DropdownItem/>)  
      }</div>
        {data.length>0 && <div>
            <span id='span1'>Product Name</span><span id='span2'>Description</span><br />
            <input id="box" disabled placeholder="Product Name" value={ data[index].productname } name="productname" required type="text" />
            <input id="box" disabled placeholder="Description" value={ data[index].description } name="productdesc" required type="text" /><br />

            
               { data[index].variant.map((x, i) => {
                    return (
                        <div>
                            <h1>Variant {i + 1}</h1>
                            {/* <br/> */}
                            <div>
                                <label style={{ marginLeft: 20 }}>Name&nbsp;</label><label style={{ marginLeft: 313 }}>Price&nbsp;</label><label style={{ marginLeft: 315 }}>Quantity&nbsp;</label><label style={{ marginLeft: 300 }}>Type&nbsp;</label><br />
                                <input id="box2" type="text" disabled value={x.variantName} name="variantName" placeholder="Name" />&nbsp;
                                <input id="box2" type="text" disabled value={x.price} name="price" placeholder="Price"/>&nbsp;
                                <input id="box2" type="text" disabled value={x.quantity} name="quantity" placeholder="Quantity" />&nbsp;
                                <input id="box2" type="text" disabled value={x.varianttype} name="varianttype" placeholder="Type" />&nbsp;
                                <br />
                            </div>
                        </div>
                    );
                })}
            <div ><br />
            <button id='variantbox'  >Edit</button>
            {/* <a href='/listing'> <button id='variantbox' >Back to home</button></a> */}
            <Link id='variantbox' to="/listing">Back to home</Link>
            </div>

        </div>}


    </div>);
}

export default Views;