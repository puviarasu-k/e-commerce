import React, { useState } from "react";
// import "./index.css";
import swal from 'sweetalert'
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import image from "./profile.png"


const Products = () => {

    let myname = localStorage.getItem('username');
    let proname = localStorage.getItem('user_id');

    const [inputList, setinputList] = useState([{ variantName: '', price: '', quantity: '', varianttype: '' }]);
    const [productname, setproductname] = useState('');
    const [productdesc, setproductdesc] = useState('');
    const [nameisvalid, setnameisvalid] = useState(true);
    const [descisvalid, setdescisvalid] = useState(true);
    const [open, setOpen] = useState(false);


    console.log(inputList[0])




    const prodchange = (e) => {
        setproductname(e.target.value);
        setnameisvalid(true);
    }
    const descchange = (e) => {
        setproductdesc(e.target.value);
        setdescisvalid(true);
    }


    const handleinputchange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setinputList(list);

    }


    const handleremove = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setinputList(list);
    }

    const handleaddclick = () => {
        setinputList([...inputList, { variantName: '', price: '', quantity: '', varianttype: '' }]);
    }

    const submithandler = () => {
        setnameisvalid(productname.trim() !== '');
        setdescisvalid(productdesc.trim() !== '');
        if (productname !== '' && productdesc !== '') {
            productadd();
        }

    }

    const logOut = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('username', null);
        localStorage.setItem('proname', null);
        window.location.href = '/';
      };

    const productadd = () => {
        axios.post('http://localhost:2000/productadd', {
            productname: productname,
            description: productdesc,
            sellerid: proname,
            variant: inputList

        }).then((res) => {
            swal({
                text: res.data.title,
                icon: "success",
                type: "success"
            });
            this.props.history.push('/products');
        }).catch((err) => {
            console.log(inputList)
        });
    }

    function DropdownItem() {
        return (
    
          <div id="white" >
            <h1>{myname}</h1>
            <Button onClick={logOut}>Log out</Button>
          </div>
    
        );
      }

    return (<div>
        <div id="header" >
            <h1>&emsp;Add Product</h1>
            {/* <h1 style={{ marginLeft: 1100 }} >{myname}</h1>  */}
            <img id="imagep" alt="logo" onClick={() => setOpen(!open)} src={image} ></img>
        </div>
        <div id="slide">{
            open && (<DropdownItem />)
        }</div>
        <div>
            <span id='span1'>Product Name</span><span id='span2'>Description</span><br />
            <input id="box" placeholder="Product Name" name="productname" onChange={prodchange} value={productname} required type="text" />
            <input id="box" placeholder="Description" name="productdesc" onChange={descchange} value={productdesc} required type="text" /><br />
            {!nameisvalid && <span id="err" style={{ marginLeft: 155 }}>Please enter Product Name</span>}
            {!descisvalid && <span id="err" style={{ marginLeft: 500 }}>Please enter Description</span>}

            {
                inputList.map((x, i) => {
                    return (
                        <div>
                            <h1>Variant {i + 1}</h1>
                            {/* <br/> */}
                            <div>
                                <label style={{ marginLeft: 20 }}>Name&nbsp;</label><label style={{ marginLeft: 313 }}>Price&nbsp;</label><label style={{ marginLeft: 315 }}>Quantity&nbsp;</label><label style={{ marginLeft: 300 }}>Type&nbsp;</label><br />
                                <input id="box2" type="text" name="variantName" placeholder="Name" onChange={e => handleinputchange(e, i)} />&nbsp;
                                <input id="box2" type="text" name="price" placeholder="Price" onChange={e => handleinputchange(e, i)} />&nbsp;
                                <input id="box2" type="text" name="quantity" placeholder="Quantity" onChange={e => handleinputchange(e, i)} />&nbsp;
                                <input id="box2" type="text" name="varianttype" placeholder="Type" onChange={e => handleinputchange(e, i)} />&nbsp;
                                {
                                    inputList.length !== 1 &&
                                    <button id="remove" onClick={() => handleremove(i)} >Remove</button>
                                }<br />


                            </div>
                        </div>
                    );
                })}
            <div ><br /><button id='variantbox' onClick={handleaddclick}>Add Variant</button><br /><br />
                <button id='variantbox' onClick={submithandler}>Submit</button>
            </div>

        </div>

    </div>);
}

export default Products;